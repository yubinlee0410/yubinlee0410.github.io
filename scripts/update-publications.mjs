/* =====================================================================
   publications.js 자동 갱신 스크립트 (OpenAlex + ORCID 기반)

   매주 GitHub Actions 에서 실행되며 다음을 수행합니다:
   1) 기존 논문의 인용수(citations)를 최신값으로 갱신
   2) 아래 ORCID 로 "출판된 논문"을 자동 발견하여, 목록에 없는 논문은 추가
        - 발견 경로: ① ORCID 공개 API(프로필에 등록된 논문)
                     ② OpenAlex author.orcid 필터(출판사가 ORCID 연결한 논문)
   3) doi 가 비어 있는(심사 중) 논문이 출판되면 제목 매칭으로 저널·DOI·링크 자동 기입
   4) 최신순 정렬 후 저장

   로컬 실행: `node scripts/update-publications.mjs`
   ===================================================================== */
import fs from 'node:fs';
import vm from 'node:vm';

const FILE = new URL('../publications.js', import.meta.url);
const MAILTO = 'knu19css@gmail.com';
const ORCID = '0000-0002-0746-0419';
const UA = { 'User-Agent': 'yubinlee0410-homepage/1.0 (mailto:' + MAILTO + ')', 'Accept': 'application/json' };

/* 자동 추가에서 제외할 논문의 DOI를 여기에 넣으세요 (소문자, 예: '10.1000/xyz') */
const IGNORE_DOIS = [
].map((s) => s.toLowerCase());

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/* publications.js 를 안전하게 평가해 배열을 얻는다 */
function loadPubs() {
  const code = fs.readFileSync(FILE, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.PUBLICATIONS || [];
}

/* 제목 유사도(자카드) — 잘못된 논문 매칭 방지용 안전장치 */
const words = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
function similarity(a, b) {
  const A = new Set(words(a)), B = new Set(words(b));
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return inter / new Set([...A, ...B]).size;
}

const cleanDoi = (d) => d ? String(d).replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').trim() : '';
const journalName = (w) => (w && w.primary_location && w.primary_location.source && w.primary_location.source.display_name) || '';
function landing(w) {
  const url = w && w.primary_location && w.primary_location.landing_page_url;
  const doi = cleanDoi(w && w.doi);
  return url || (doi ? 'https://doi.org/' + doi : '');
}
function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'paper';
}

async function getJson(url) {
  const r = await fetch(url, { headers: UA });
  if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + url);
  return r.json();
}

/* OpenAlex: DOI 하나의 상세 정보 */
const enrich = (doi) =>
  getJson('https://api.openalex.org/works/doi:' + encodeURIComponent(doi) +
          '?select=title,cited_by_count,primary_location,publication_year,doi,type,is_paratext&mailto=' + MAILTO);

/* ORCID 공개 API: 프로필에 등록된 논문들의 DOI */
async function orcidProfileDois(orcid) {
  try {
    const d = await getJson('https://pub.orcid.org/v3.0/' + orcid + '/works');
    const dois = [];
    for (const g of (d.group || [])) {
      const ids = (g['external-ids'] && g['external-ids']['external-id']) || [];
      for (const id of ids) {
        if (String(id['external-id-type'] || '').toLowerCase() === 'doi') {
          const v = cleanDoi(id['external-id-value']);
          if (v) dois.push(v.toLowerCase());
          break;
        }
      }
    }
    return dois;
  } catch (e) { console.error('ORCID API: ' + e.message); return []; }
}

/* OpenAlex: 이 ORCID 로 연결된 논문들의 DOI */
async function openAlexOrcidDois(orcid) {
  try {
    const dois = [];
    let cursor = '*', guard = 0;
    const base = 'https://api.openalex.org/works?filter=author.orcid:' + encodeURIComponent(orcid) +
                 '&select=doi&per-page=200&mailto=' + MAILTO;
    while (cursor && guard < 10) {
      const d = await getJson(base + '&cursor=' + encodeURIComponent(cursor));
      for (const w of (d.results || [])) { const v = cleanDoi(w.doi); if (v) dois.push(v.toLowerCase()); }
      cursor = d.meta && d.meta.next_cursor;
      guard++;
      if (!d.results || !d.results.length) break;
    }
    return dois;
  } catch (e) { console.error('OpenAlex ORCID: ' + e.message); return []; }
}

const acceptWork = (w) => !!(w && w.title && !w.is_paratext);

const ORDER = ['id', 'year', 'title', 'desc', 'venueName', 'venue', 'doi', 'url', 'citations'];
function ordered(p) {
  const o = {};
  for (const k of ORDER) if (k in p) o[k] = p[k];
  for (const k of Object.keys(p)) if (!(k in o)) o[k] = p[k];
  return o;
}

const HEADER = `/* =====================================================================
   논문 목록 — 사이트가 이 파일을 읽어 논문 섹션을 그립니다.

   ✏️ 사람이 편집: title(제목), desc(설명)
   🤖 매주 자동 갱신(GitHub Actions):
        · citations(인용수) — OpenAlex 기준으로 갱신
        · ORCID(${ORCID})로 새로 출판된 논문 자동 추가 (desc 는 비어 있으니 채워 넣으세요)
        · 심사 중 논문이 출판되면 venueName·doi·url 자동 기입, venue → "ink"

   새 논문 추가(아직 출판 전): 아래 배열 맨 위에 이 형태로 추가하세요.
     {
       "id": "고유한-영문-슬러그",
       "year": "2026",
       "title": "논문 제목",
       "desc": "한 줄 설명",
       "venueName": "under revision",
       "venue": "purple",
       "doi": "",
       "url": "",
       "citations": null
     }
   ===================================================================== */
window.PUBLICATIONS = `;

function write(pubs) {
  fs.writeFileSync(FILE, HEADER + JSON.stringify(pubs.map(ordered), null, 2) + ';\n');
}

async function main() {
  const pubs = loadPubs();

  /* 1) 기존 논문 인용수 갱신 */
  for (const p of pubs) {
    if (!p.doi) continue;
    try {
      const w = await enrich(p.doi);
      if (typeof w.cited_by_count === 'number') p.citations = w.cited_by_count;
      const url = landing(w); if (url) p.url = url;
      console.log('citations: ' + p.id + ' -> ' + p.citations);
    } catch (e) { console.error('skip ' + p.id + ': ' + e.message); }
    await sleep(250);
  }

  /* 2) ORCID 로 출판 논문 발견 (두 경로 합집합) */
  const discoveredDois = Array.from(new Set([
    ...(await orcidProfileDois(ORCID)),
    ...(await openAlexOrcidDois(ORCID)),
  ])).filter((d) => !IGNORE_DOIS.includes(d));
  console.log('ORCID로 발견한 DOI 수: ' + discoveredDois.length);

  const discovered = [];
  for (const doi of discoveredDois) {
    try { const w = await enrich(doi); if (acceptWork(w)) discovered.push(w); }
    catch (e) { console.error('enrich ' + doi + ': ' + e.message); }
    await sleep(250);
  }

  /* 3) 심사 중(무 DOI) 항목을 제목으로 매칭해 채움 */
  for (const p of pubs) {
    if (p.doi) continue;
    const hit = discovered.find((w) => cleanDoi(w.doi) && similarity(w.title, p.title) >= 0.7);
    if (hit) {
      p.doi = cleanDoi(hit.doi);
      p.venueName = journalName(hit) || p.venueName;
      p.url = landing(hit);
      p.venue = 'ink';
      if (typeof hit.cited_by_count === 'number') p.citations = hit.cited_by_count;
      if (hit.publication_year) p.year = String(hit.publication_year);
      console.log('PUBLISHED(심사중→출판): ' + p.id + ' -> ' + p.venueName + ' (' + p.doi + ')');
    }
  }

  /* 4) 목록에 없는 새 논문 추가 */
  const existing = new Set(pubs.map((p) => cleanDoi(p.doi).toLowerCase()).filter(Boolean));
  const ids = new Set(pubs.map((p) => p.id));
  for (const w of discovered) {
    const doi = cleanDoi(w.doi).toLowerCase();
    if (!doi || existing.has(doi)) continue;
    const year = w.publication_year ? String(w.publication_year) : '';
    let id = slugify(w.title) + (year ? '-' + year : '');
    while (ids.has(id)) id += '-x';
    ids.add(id); existing.add(doi);
    pubs.push({
      id, year,
      title: w.title,
      desc: '',
      venueName: journalName(w) || (w.type ? cap(w.type) : 'Publication'),
      venue: 'ink',
      doi: cleanDoi(w.doi),
      url: landing(w),
      citations: typeof w.cited_by_count === 'number' ? w.cited_by_count : null,
    });
    console.log('ADDED: ' + id + ' — ' + w.title);
  }

  /* 5) 정렬: 심사 중(무 DOI) 먼저, 그다음 연도 내림차순 (동일 연도는 기존 순서 유지) */
  pubs.sort((a, b) => {
    const ua = a.doi ? 0 : 1, ub = b.doi ? 0 : 1;
    if (ua !== ub) return ub - ua;
    return (parseInt(b.year) || 0) - (parseInt(a.year) || 0);
  });

  write(pubs);
  console.log('done. ' + pubs.length + ' entries.');
}

main().catch((e) => { console.error(e); process.exit(1); });
