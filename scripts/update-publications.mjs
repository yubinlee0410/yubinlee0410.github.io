/* =====================================================================
   publications.js 자동 갱신 스크립트 (OpenAlex 기반)
   - 각 논문의 인용수(citations)를 최신값으로 갱신
   - doi 가 비어 있는(출판 심사 중) 논문은 제목으로 OpenAlex를 검색하여,
     확실히 일치하는 출판물이 발견되면 doi·저널명·링크·연도·인용수를 자동 기입하고
     venue 를 "ink" 로 바꿉니다.
   - GitHub Actions(주 1회)에서 실행됩니다.  로컬 실행: `node scripts/update-publications.mjs`
   ===================================================================== */
import fs from 'node:fs';
import vm from 'node:vm';

const FILE = new URL('../publications.js', import.meta.url);
const MAILTO = 'knu19css@gmail.com';
const UA = { 'User-Agent': 'yubinlee0410-homepage/1.0 (mailto:' + MAILTO + ')' };

/* publications.js 를 안전하게 평가해 배열을 얻는다 */
function loadPubs() {
  const code = fs.readFileSync(FILE, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.PUBLICATIONS || [];
}

/* 제목 유사도(자카드) — 잘못된 논문이 매칭되는 것을 막기 위한 안전장치 */
const words = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
function similarity(a, b) {
  const A = new Set(words(a)), B = new Set(words(b));
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return inter / new Set([...A, ...B]).size;
}

const cleanDoi = (d) => d ? String(d).replace(/^https?:\/\/(dx\.)?doi\.org\//i, '') : '';
const journalName = (w) => (w && w.primary_location && w.primary_location.source && w.primary_location.source.display_name) || '';
function landing(w) {
  const url = w && w.primary_location && w.primary_location.landing_page_url;
  const doi = cleanDoi(w && w.doi);
  return url || (doi ? 'https://doi.org/' + doi : '');
}

async function getJson(url) {
  const r = await fetch(url, { headers: UA });
  if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + url);
  return r.json();
}
const oaByDoi = (doi) =>
  getJson('https://api.openalex.org/works/doi:' + encodeURIComponent(doi) +
          '?select=cited_by_count,primary_location,publication_year,doi&mailto=' + MAILTO);
const oaSearchTitle = (title) =>
  getJson('https://api.openalex.org/works?filter=title.search:' + encodeURIComponent(title) +
          '&select=title,cited_by_count,primary_location,publication_year,doi&per-page=5&mailto=' + MAILTO)
    .then((d) => d.results || []);

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
   🤖 매주 자동 갱신(GitHub Actions + OpenAlex): citations(인용수), 그리고
      출판되면 venueName(저널)·doi·url이 자동으로 채워지고 venue가 "ink"로 바뀝니다.

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
  for (const p of pubs) {
    try {
      if (p.doi) {
        const w = await oaByDoi(p.doi);
        if (typeof w.cited_by_count === 'number') p.citations = w.cited_by_count;
        const url = landing(w);
        if (url) p.url = url;
        console.log('updated: ' + p.id + ' -> ' + p.citations + ' citations');
      } else {
        const results = await oaSearchTitle(p.title);
        const hit = results.find((r) => cleanDoi(r.doi) && similarity(r.title, p.title) >= 0.7);
        if (hit) {
          p.doi = cleanDoi(hit.doi);
          p.venueName = journalName(hit) || p.venueName;
          p.url = landing(hit);
          p.venue = 'ink';
          if (typeof hit.cited_by_count === 'number') p.citations = hit.cited_by_count;
          if (hit.publication_year) p.year = String(hit.publication_year);
          console.log('PUBLISHED detected: ' + p.id + ' -> ' + p.venueName + ' (' + p.doi + ')');
        } else {
          console.log('still unpublished: ' + p.id);
        }
      }
    } catch (e) {
      console.error('skip ' + (p.id || p.title) + ': ' + e.message);
    }
    await new Promise((r) => setTimeout(r, 300)); // OpenAlex 예의상 간격
  }
  write(pubs);
  console.log('publications.js written (' + pubs.length + ' entries).');
}

main().catch((e) => { console.error(e); process.exit(1); });
