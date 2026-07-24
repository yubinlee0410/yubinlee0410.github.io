/* =====================================================================
   Tailwind 테마 (색·폰트) — 색을 바꾸려면 아래 값만 수정하세요.
   ===================================================================== */
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink:         '#141318',
        'ink-soft':  '#4a4754',
        purple:      '#6d28d9',
        'purple-2':  '#8b5cf6',
        'purple-ink':'#4c1d95',
        wash:        '#f6f4fb',
        line:        '#e9e6f1',
      },
      fontFamily: {
        sans:  ['"Pretendard Variable"', 'Pretendard', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'serif'],
      },
      maxWidth: { content: '1080px' },
      boxShadow: {
        portrait: '0 24px 60px -30px rgba(109,40,217,.35)',
        card: '0 22px 44px -26px rgba(76,29,149,.4)',
      },
    },
  },
};


/* =====================================================================
   ✏️  여기만 고치면 됩니다 — 홈페이지 내용 (모든 페이지가 공유)
       · " " 안 글자만 바꾸세요.
       · 항목을 늘리려면 { ... } 한 덩어리를 콤마(,)와 함께 복사해 붙이세요.
       · 글자 안에서 <b>굵게</b> 처럼 강조 태그를 써도 됩니다(짝 맞춰 닫기).
   ===================================================================== */
const SITE = {

  /* ── 기본 정보 ── */
  name:      "이 유 빈",
  nameEn:    "Yu-Bin Lee",
  email:     "leeyoubin0410@gmail.com",
  brandSub:  "Neutrophil Biology · Immune Cell Physiology",
  eyebrow:   "Immune Cell Physiology · Neutrophil Research",

  /* ── 히어로(첫 화면) ── */
  heroRole:  '사람 말초혈액에서 <b class="text-ink font-semibold">면역세포</b>를 분리하고, ' +
             '<b class="text-ink font-semibold">단일세포 RNA 시퀀싱</b>으로 다양한 질환에서 ' +
             '<b class="text-ink font-semibold">호중구(Neutrophil)</b>의 기능이 어떻게 변화하는지 규명하는 ' +
             '<b class="text-ink font-semibold">면역세포 중심 생리학</b> 연구자입니다.' +
             '<span class="block mt-3 pl-3.5 border-l-2 border-purple-2/40 text-[15px] text-ink-soft leading-relaxed">An immune cell&#8211;focused physiologist. I isolate immune cells from human peripheral blood and use single-cell RNA sequencing to uncover how neutrophil function changes across a range of diseases.</span>',
  heroQuote: '“호중구가 감염과 염증에서<br>어떻게 반응하는지, 세포 하나하나의<br>언어로 읽어냅니다.”' +
             '<span class="block mt-3 pt-3 border-t border-line text-[13.5px] font-normal text-ink-soft leading-relaxed">&#8220;Reading, cell by cell, how neutrophils respond to infection and inflammation.&#8221;</span>',
  heroStats: [
    { num: "__PUBCOUNT__", label: "Publications" },
    { num: "호중구",        label: "Neutrophil focus" },
    { num: "scRNA",        label: "-seq · FACS" },
  ],
  heroCaption: '<b class="text-purple-ink">이유빈</b> · 면역세포 중심 생리학 전공 · 호중구 생물학 연구' +
               '<span class="block mt-1 text-ink-soft"><b class="text-purple-ink">Yu-Bin Lee</b> · Immune Cell Physiology · Neutrophil Biology</span>',

  /* ── 소개(About) ──
       aboutParagraphs = 한글 문단(먼저 표시), aboutParagraphsEn = 영어 문단(그 아래 묶어서 표시)
       두 배열의 순서가 서로 대응됩니다. */
  aboutParagraphs: [
    '<b class="text-ink">면역세포의 생리를 실험으로 읽어냅니다.</b> 저는 사람 말초혈액(peripheral blood)에서 면역세포를 분리하고, FACS Calibur·Western blot·qPCR 등 분자생물학 실험을 기반으로 자연 면역의 최전선인 <b class="text-ink">호중구(Neutrophil)</b>의 기능을 연구합니다.',
    '최근에는 <b class="text-ink">단일세포 RNA 시퀀싱(single-cell RNA sequencing)</b>을 통해 감염·대사질환·자가면역 등 다양한 질환에서 호중구의 기능이 어떻게 변화하는지를 지속적으로 규명하고 있습니다.',
    '호중구 세포외 덫(NET) 형성, 호중구 유래 세포외소포(EV), 페롭토시스(ferroptosis)에 이르기까지 — 호중구가 질환마다 보이는 이질적인 반응을 하나의 축으로 꿰는 연구를 지향합니다.',
  ],
  aboutParagraphsEn: [
    'I read the physiology of immune cells through experiments. I isolate immune cells from human peripheral blood and study the function of neutrophils&#8212;the front line of innate immunity&#8212;using molecular techniques such as FACS Calibur, Western blot, and qPCR.',
    'More recently, I have used single-cell RNA sequencing to continuously uncover how neutrophil function shifts across diverse diseases, including infection, metabolic disease, and autoimmunity.',
    'From neutrophil extracellular traps (NETs) and neutrophil-derived extracellular vesicles (EVs) to ferroptosis, I aim to weave the heterogeneous responses of neutrophils across diseases into a single, coherent axis.',
  ],
  aboutFacts: [
    { k: "소속",      ke: "Affiliation", v: "경북대학교 심혈관연구소",            en: "Cardiovascular Research Institute, Kyungpook National University" },
    { k: "전공",      ke: "Major",      v: "면역세포 중심 생리학",              en: "Immune Cell Physiology" },
    { k: "핵심 주제", ke: "Focus",      v: "호중구 생물학 · NETs · 세포외소포(EV)", en: "Neutrophil biology · NETs · EVs" },
    { k: "실험 기법", ke: "Techniques", v: "FACS Calibur · Western blot · qPCR · scRNA-seq", en: "" },
    { k: "Email",     ke: "",           v: "__EMAIL__",                          en: "" },
  ],

  /* ── 연구 주제(3칸 카드) ── */
  researchSub: "호중구(Neutrophil)를 중심에 두고, 세 가지 축으로 면역세포의 생리를 탐구합니다.",
  researchCards: [
    { title: "호중구 NET 형성",
      desc:  "SARS-CoV-2 단백질, 당뇨 유래 훈련면역(trained immunity) 등 다양한 자극이 호중구 세포외 덫(NET) 형성을 어떻게 유도하는지 규명합니다.",
      tag:   "NETs · 감염 · 대사질환" },
    { title: "호중구 유래 세포외소포(EV)",
      desc:  "호중구·dHL-60 세포에서 유래한 세포외소포의 기능과 치료 전달체로서의 가능성, 그리고 TRAIL 매개 전염증성 아형을 연구합니다.",
      tag:   "EV · TRAIL · 치료 전달" },
    { title: "단일세포 전사체 · 질환별 호중구",
      desc:  "단일세포 RNA 시퀀싱으로 여러 질환에서의 호중구 이질성과 기능 변화, 그리고 페롭토시스(ferroptosis)와 같은 세포 죽음 프로그램을 해석합니다.",
      tag:   "scRNA-seq · ferroptosis" },
  ],

  /* ── 논문 ──
       ▶ 논문 목록은 publications.js 파일에서 관리합니다 (인용수·저널·DOI 자동 갱신). */

  /* ── 이력 타임라인 (위에서부터 표시 = 최신순) ──
       ▶ 경력이 생기면 { period, title, desc } 한 줄을 맨 위에 복사해 추가하세요. */
  timeline: [
    { period: "2025 – 현재", title: "박사후연구원 (Postdoctoral Researcher)",
      desc: "경북대학교 심혈관연구소." },
    { period: "2020 – 2025", title: "이학박사 (Ph.D.), 생리학",
      desc: "경북대학교 의과학과 생리학교실 · 면역세포 중심 생리학, 호중구 연구." },
    { period: "2018 – 2020", title: "이학석사 (M.S.), 생리학",
      desc: "경북대학교 의과학과 생리학교실." },
    { period: "2012 – 2018", title: "학사 (B.S.), 생명공학",
      desc: "영남대학교 생명공학전공." },
  ],

  /* ── 연락처 카드 ── */
  contactTitle: "함께 연구해요",
  contactSub:   "공동연구, 세미나, 문의를 환영합니다.",
  contactRows: [
    { icon: "mail", label: "Email",    value: "__EMAIL__", href: "mailto:__EMAIL__" },
    { icon: "id",   label: "ORCID",    value: "0000-0002-0746-0419", href: "https://orcid.org/0000-0002-0746-0419" },
    { icon: "node", label: "전공",     value: "면역세포 중심 생리학 · 호중구 연구" },
    { icon: "wave", label: "연구 재료", value: "사람 말초혈액 유래 면역세포" },
  ],
};


/* =====================================================================
   조립(렌더) 코드 — 수정할 필요 없음
   ===================================================================== */
document.addEventListener('DOMContentLoaded', function () {
  const S = SITE;
  const esc = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const email = S.email;
  const namePlain = String(S.name || S.nameEn || '').split(' ').join('');
  const fill = (v) => String(v).split('__EMAIL__').join(email);
  const set = (key, html) => {
    document.querySelectorAll('[data-bind="'+key+'"]').forEach(el => { el.innerHTML = html; });
  };

  const ICONS = [
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="8" cy="9" r="3.2"/><circle cx="16.5" cy="15" r="2.3"/><circle cx="15" cy="7" r="1.6"/></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v16"/><path d="M12 13l2 2 3-4"/></svg>',
  ];
  const CONTACT_ICONS = {
    mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>',
    node: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="6" r="2.4"/><circle cx="6" cy="17" r="2.4"/><circle cx="18" cy="17" r="2.4"/><path d="M12 8.4V13m0 0l-4.2 2.2M12 13l4.2 2.2"/></svg>',
    wave: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12a8 8 0 0116 0"/><circle cx="12" cy="12" r="2.2"/><path d="M12 4v2M4 12H2M22 12h-2"/></svg>',
    id:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 10.5v5"/><circle cx="12" cy="8" r="0.8" fill="currentColor" stroke="none"/></svg>',
  };

  /* 내비게이션 (페이지 목록) */
  const NAV = [
    { href: 'index.html',        page: 'home',         label: 'ABOUT' },
    { href: 'research.html',     page: 'research',     label: 'RESEARCH' },
    { href: 'publications.html', page: 'publications', label: 'PUBLICATIONS' },
    { href: 'cv.html',           page: 'cv',           label: 'CURRICULUM VITAE' },
  ];
  const active = document.body.getAttribute('data-page');
  const menu = NAV.map(n => {
    const on = n.page === active;
    return '<a class="navlink '+(on?'text-purple':'text-ink-soft')+' hover:text-purple transition-colors" href="'+n.href+'">'+esc(n.label)+'</a>';
  }).join('');
  set('site-nav',
    '<header class="sticky top-0 z-50 border-b border-line bg-white/80 backdrop-blur-md backdrop-saturate-150">'+
      '<div class="max-w-content mx-auto px-6 md:px-8 h-[68px] flex items-center justify-between">'+
        '<a class="flex items-center gap-3 font-bold tracking-tight" href="index.html">'+
          '<span class="w-[30px] h-[30px] rounded-[9px] grid place-items-center text-white text-[15px] bg-gradient-to-br from-purple to-purple-2">◇</span>'+
          '<span class="leading-tight">'+esc(namePlain)+' <span class="text-ink-soft font-normal">'+esc(S.nameEn)+'</span>'+
            '<small class="block font-normal text-[11px] text-ink-soft tracking-wide">'+esc(S.brandSub)+'</small>'+
          '</span>'+
        '</a>'+
        '<nav class="hidden sm:flex gap-7 text-[14.5px] font-medium">'+menu+'</nav>'+
      '</div>'+
    '</header>');

  /* 푸터 */
  set('site-footer',
    '<footer class="py-10 border-t border-line bg-white">'+
      '<div class="max-w-content mx-auto px-6 md:px-8 flex flex-wrap justify-between items-center gap-3.5 text-[13px] text-ink-soft">'+
        '<div>© 2026 '+esc(namePlain)+' ('+esc(S.nameEn)+') · Neutrophil Biology &amp; Immune Cell Physiology</div>'+
        '<div class="flex gap-2.5">'+
          '<a href="mailto:'+esc(email)+'" aria-label="Email" class="w-9 h-9 rounded-[9px] border border-line grid place-items-center text-ink-soft hover:text-purple hover:border-purple-2 transition">'+CONTACT_ICONS.mail+'</a>'+
        '</div>'+
      '</div>'+
    '</footer>');

  /* 히어로 (index.html) */
  set('eyebrow', esc(S.eyebrow));
  set('name', esc(S.name));
  set('nameEn', esc(S.nameEn));
  set('heroRole', S.heroRole);
  set('heroQuote', S.heroQuote);
  set('heroCaption', S.heroCaption);
  const PUB = (window.PUBLICATIONS || []);
  const pubCount = PUB.length;
  set('heroStats', S.heroStats.map(s => {
    const num = String(s.num).split('__PUBCOUNT__').join(pubCount);
    return '<div class="flex flex-col"><b class="text-[20px] font-bold text-purple">'+esc(num)+'</b><span class="text-[11.5px] text-ink-soft">'+esc(s.label)+'</span></div>';
  }).join(''));

  /* 소개 (index.html) */
  const koHtml = (S.aboutParagraphs || []).map(p => '<p>'+p+'</p>').join('');
  const enHtml = (S.aboutParagraphsEn && S.aboutParagraphsEn.length)
    ? '<div class="mt-6 pl-4 border-l-2 border-purple-2/40 space-y-3 text-[14.5px] text-ink-soft leading-relaxed">'
      + '<div class="text-[11px] font-bold tracking-[.12em] uppercase text-purple/70 not-italic mb-1">English</div>'
      + S.aboutParagraphsEn.map(p => '<p>'+p+'</p>').join('')
      + '</div>'
    : '';
  set('aboutParagraphs', koHtml + enHtml);
  set('aboutFacts', S.aboutFacts.map(f => {
    const v = fill(f.v);
    const isEmail = v.indexOf('@') !== -1 && v.indexOf(' ') === -1;
    const val = isEmail ? '<a class="hover:text-purple break-all" href="mailto:'+esc(v)+'">'+esc(v)+'</a>' : esc(v);
    const keyEn = f.ke ? '<span class="block text-[11px] font-normal text-purple/60">'+esc(f.ke)+'</span>' : '';
    const valEn = f.en ? '<span class="block mt-0.5 text-[13px] text-ink-soft/80">'+esc(f.en)+'</span>' : '';
    return '<div class="row flex gap-4 py-[11px] text-[14.5px]">'+
        '<span class="w-24 shrink-0 text-purple font-semibold">'+esc(f.k)+keyEn+'</span>'+
        '<span>'+val+valEn+'</span>'+
      '</div>';
  }).join(''));

  /* 연구 주제 (research.html) */
  set('researchSub', esc(S.researchSub));
  set('researchCards', S.researchCards.map((c, i) =>
    '<div class="group bg-white border border-line rounded-2xl px-6 py-7 transition hover:-translate-y-1 hover:shadow-card hover:border-[#d9d0f2]">'+
      '<div class="w-12 h-12 rounded-xl grid place-items-center mb-4 bg-wash text-purple border border-line">'+ICONS[i % ICONS.length]+'</div>'+
      '<h3 class="text-[18px] font-bold tracking-tight">'+esc(c.title)+'</h3>'+
      '<p class="text-ink-soft text-[14.5px] mt-2.5">'+c.desc+'</p>'+
      '<span class="inline-block mt-4 text-[12px] font-semibold text-purple bg-wash px-3 py-1 rounded-full">'+esc(c.tag)+'</span>'+
    '</div>'
  ).join(''));

  /* 논문 (publications.html) — 목록·인용수·저널·DOI는 publications.js에서 옴 */
  set('publications', PUB.map(p => {
    const badge = p.venue === 'purple' ? 'bg-purple' : 'bg-ink';
    const link = p.url || (p.doi ? 'https://doi.org/'+p.doi : '');
    const linkEsc = esc(link);
    const title = link
      ? '<a href="'+linkEsc+'" target="_blank" rel="noopener" class="font-semibold tracking-tight group-hover:text-purple transition-colors">'+esc(p.title)+'</a>'
      : '<span class="font-semibold tracking-tight">'+esc(p.title)+'</span>';
    const cite = (typeof p.citations === 'number')
      ? '<div class="text-[12.5px] text-ink-soft mt-1.5">인용 <b class="text-purple">'+esc(p.citations)+'</b>회 · <span>OpenAlex</span></div>'
      : (p.venue === 'purple'
          ? '<div class="text-[12.5px] text-ink-soft mt-1.5">출판 심사 중 · 게재되면 자동 업데이트</div>'
          : '');
    const venueBase = 'text-[12px] font-semibold text-white '+badge+' px-3 py-1.5 rounded-md whitespace-nowrap self-center justify-self-start';
    const venue = link
      ? '<a href="'+linkEsc+'" target="_blank" rel="noopener" title="저널에서 논문 보기" class="'+venueBase+' hover:opacity-80 transition-opacity">'+esc(p.venueName)+'</a>'
      : '<span class="'+venueBase+'">'+esc(p.venueName)+'</span>';
    return '<div class="group grid md:grid-cols-[70px_1fr_auto] gap-2 md:gap-6 py-6 border-b border-line md:items-baseline">'+
        '<div class="font-serif italic text-[20px] text-purple">'+esc(p.year)+'</div>'+
        '<div>'+title+(p.desc ? '<div class="text-[13.5px] text-ink-soft mt-1">'+esc(p.desc)+'</div>' : '')+cite+'</div>'+
        venue+
      '</div>';
  }).join(''));

  /* 이력 (cv.html) */
  set('timeline', S.timeline.map(t =>
    '<div class="tl">'+
      '<div class="text-[12.5px] font-bold text-purple tracking-wide">'+esc(t.period)+'</div>'+
      '<h4 class="text-[16px] font-semibold mt-1 mb-0.5">'+esc(t.title)+'</h4>'+
      '<p class="text-[13.5px] text-ink-soft">'+t.desc+'</p>'+
    '</div>'
  ).join(''));

  /* 연락처 (cv.html) */
  set('contactTitle', esc(S.contactTitle));
  set('contactSub', esc(S.contactSub));
  set('contactRows', S.contactRows.map(r => {
    const icon = '<span class="w-[34px] h-[34px] rounded-[9px] bg-wash text-purple grid place-items-center shrink-0">'+(CONTACT_ICONS[r.icon]||CONTACT_ICONS.node)+'</span>';
    const inner = icon+'<span><b class="font-semibold">'+esc(r.label)+'</b><br><span class="text-ink-soft break-all">'+esc(fill(r.value))+'</span></span>';
    return r.href
      ? '<a class="flex items-center gap-3.5 py-3 border-t border-line text-[14.5px]" href="'+esc(fill(r.href))+'">'+inner+'</a>'
      : '<div class="flex items-center gap-3.5 py-3 border-t border-line text-[14.5px]">'+inner+'</div>';
  }).join(''));
});
