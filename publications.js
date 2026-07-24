/* =====================================================================
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
window.PUBLICATIONS = [
  {
    "id": "masld-neutrophil-ev-2026",
    "year": "2026",
    "title": "Neutrophils Promote Metabolic Dysfunction-Associated Steatotic Liver Disease through Extracellular Vesicle-mediated Lipid Transfer",
    "desc": "호중구 유래 세포외소포(EV)가 간세포로 지질을 전달하여 대사질환 관련 지방간(MASLD)을 촉진함을 규명",
    "venueName": "under revision",
    "venue": "purple",
    "doi": "",
    "url": "",
    "citations": null
  },
  {
    "id": "ferroptosis-in-neutrophils-2025",
    "year": "2025",
    "title": "Ferroptosis in neutrophils",
    "desc": "호중구에서 일어나는 페롭토시스(ferroptosis)의 기전과 면역학적 의미를 정리한 연구",
    "venueName": "J. Leukocyte Biology",
    "venue": "ink",
    "doi": "10.1093/jleuko/qiaf039",
    "url": "https://doi.org/10.1093/jleuko/qiaf039",
    "citations": 17
  },
  {
    "id": "diabetes-net-trained-immunity-2024",
    "year": "2024",
    "title": "Diabetes primes neutrophils for neutrophil extracellular trap formation through trained immunity",
    "desc": "당뇨가 훈련면역을 통해 호중구의 NET 형성을 촉진하는 기전 규명",
    "venueName": "Research",
    "venue": "ink",
    "doi": "10.34133/research.0365",
    "url": "https://doi.org/10.34133/research.0365",
    "citations": 39
  },
  {
    "id": "sars-cov-2-net-2021",
    "year": "2021",
    "title": "Nucleocapsid and spike proteins of SARS-CoV-2 drive neutrophil extracellular trap formation",
    "desc": "SARS-CoV-2의 뉴클레오캡시드·스파이크 단백질이 호중구 NET 형성을 유도함을 규명",
    "venueName": "Immune Network",
    "venue": "ink",
    "doi": "10.4110/in.2021.21.e16",
    "url": "https://doi.org/10.4110/in.2021.21.e16",
    "citations": 41
  },
  {
    "id": "dhl60-ev-delivery-2021",
    "year": "2021",
    "title": "Extracellular vesicles from dHL-60 cells as delivery vehicles for diverse therapeutics",
    "desc": "dHL-60 세포 유래 세포외소포를 다양한 치료제의 전달체로 활용하는 연구",
    "venueName": "Scientific Reports",
    "venue": "ink",
    "doi": "10.1038/s41598-021-87891-8",
    "url": "https://doi.org/10.1038/s41598-021-87891-8",
    "citations": 16
  },
  {
    "id": "neutrophil-trail-ev-2021",
    "year": "2021",
    "title": "Neutrophil-derived TRAIL is a proinflammatory subtype of neutrophil-derived extracellular vesicles",
    "desc": "호중구 유래 TRAIL이 전염증성 세포외소포 아형임을 규명",
    "venueName": "Theranostics",
    "venue": "ink",
    "doi": "10.7150/thno.51756",
    "url": "https://doi.org/10.7150/thno.51756",
    "citations": 74
  }
];
