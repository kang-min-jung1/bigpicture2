// ── 탭 전환 ──────────────────────────────────────────────────


document.querySelectorAll('.cat-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const cat = btn.dataset.cat;
    document.querySelectorAll('.cat-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('.cat-content').forEach(function(c) { c.classList.remove('show'); });
    document.getElementById('cat-' + cat).classList.add('show');
  });
});

// ── 카카오톡 채널 상담 링크 (공용) ─────────────────────────────
const KAKAO_CHANNEL_URL = 'http://pf.kakao.com/_xnxgfGX/chat';

// ── 이미지 슬롯 HTML 생성 ────────────────────────────────────
function imgSlot(src, alt) {
  return `<div class="img-slot">
    <img src="${src}" alt="${alt}"
      onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <div class="placeholder" style="display:none">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
      <span>이미지 교체</span>
    </div>
  </div>`;
}

// ════════════════════════════════════════════════
//  탭1: 상업공간 로직
// ════════════════════════════════════════════════
const SPACE = {
  cafe: {
    title: '까페·편집샵·호텔·미용실 — 스타일 선택',
    opts: [
      { l: '북까페',                          m: 1.7, img: 'img/estimate/mural_sample (33).jpg' },
      { l: '북까페',                          m: 1.7, img: 'img/estimate/mural_sample (1).jpg' },
      { l: '까페, 편집샵',                    m: 1.7, img: 'img/estimate/mural_sample (25).jpg' },
      { l: '개인점포 1:1디자인 제작 상담',                     m: 1.8, img: 'img/estimate/mural_cacao_shop.jpg',link: true },
      { l: '프랜차이즈 1:1 디자인 제작 상담',            m: 1.8, img: 'img/estimate/mural_cacao_pranchize.jpg', link: true },
      
      { l: '로고·문구 스텐실',                m: 1.8, img: 'img/estimate/mural_sample (30).jpg' },
      { l: '로고+그림 스텐실',                m: 1.8, img: 'img/estimate/mural_sample (18).jpg' },
      { l: '프로방스풍',                      m: 1.8, img: 'img/estimate/mural_sample (20).jpg' },
      { l: '샌드위치 까페_로고·일러스트',     m: 1.8, img: 'img/estimate/mural_sample (10).jpg' },
      { l: '독서실·스터디까페_일러스트 나무', m: 1.7, img: 'img/estimate/mural_sample  (41).jpg' },
      { l: '미용실·식당_라인드로잉',          m: 1.8, img: 'img/estimate/mural_sample (27).jpg' },
      { l: '이색까페_금붕어·사실화느낌',      m: 2.5, img: 'img/estimate/mural2.jpg' },
      { l: '만화까페',                        m: 1.8, img: 'img/estimate/mural3.jpg' },
    ]
  },
  restaurant: {
    title: '식당·포차술집 — 스타일 선택',
    opts: [
      { l: '고급식당·레스토랑',             m: 1.8, img: 'img/estimate/mural_sample (22).jpg' },
      { l: '술집 포차_레트로 (컬러)',        m: 2.0, img: 'img/estimate/mural_sample (14).jpg' },
      { l: '술집포차_레트로 (라인)',         m: 1.8, img: 'img/estimate/mural_sample  (42).jpg' },
       { l: '개인점포 1:1디자인 제작 상담',                     m: 1.8, img: 'img/estimate/mural_cacao_shop.jpg',link: true },
      { l: '프랜차이즈 1:1 디자인 제작 상담',            m: 1.8, img: 'img/estimate/mural_cacao_pranchize.jpg', link: true },
      { l: '스시집',                        m: 1.8, img: 'img/estimate/mural_sample  (40).jpg' },
      { l: '샌드위치 가게',                 m: 1.8, img: 'img/estimate/mural_sample (10).jpg' },
    ]
  },
  office: {
    title: '사무실·학원·자동차공업소 — 스타일 선택',
    opts: [
      { l: '자동차정비소_빈티지·셔터벽화', m: 1.8, img: 'img/estimate/mural_sample (15).jpg' },
      { l: '자동차정비소_사실화',           m: 2.0, img: 'img/estimate/mural4.jpg' },
      { l: '자동차정비소_트릭아트',         m: 2.0, img: 'img/estimate/mural5.jpg' },
      { l: '사무실 로고+그림 스텐실',       m: 1.8, img: 'img/estimate/mural_sample (18).jpg' },
      { l: '사무실',                        m: 1.8, img: 'img/estimate/mural_sample (7).jpg' },
    ]
  },
  kids: {
    title: '유치원·키즈까페 — 스타일 선택',
    opts: [
      { l: '캐릭터 컬러풀',      m: 1.8, img: 'img/estimate/mural_sample (35).jpg' },
      { l: '어린왕자',           m: 1.9, img: 'img/estimate/어린왕자.jpg' },
      { l: '아이들 일러스트',    m: 1.7, img: 'img/estimate/mural_sample (11).jpg' },
       { l: '개인점포 1:1디자인 제작 상담',                     m: 1.8, img: 'img/estimate/mural_cacao_shop.jpg',link: true },
      { l: '서점_일러스트그림',  m: 1.8, img: 'img/estimate/mural_sample (9).jpg' },
      { l: '유치원 전경_파스텔', m: 1.7, img: 'img/estimate/mural_sample (34).jpg' },
      { l: '야외 놀이 일러스트', m: 1.7, img: 'img/estimate/mural_sample (24).jpg' },
      { l: '꽃·자전거',          m: 1.7, img: 'img/estimate/mural_sample (25).jpg' },
    ]
  },
  home: {
    title: '개인집 — 스타일 선택',
    opts: [
      { l: '개인집',              m: 1.8, img: 'img/estimate/mural7.jpg' },
      { l: '개인차고지 셔터벽화', m: 1.9, img: 'img/estimate/mural6.jpg' },
    ]
  },
  container: {
    title: '컨테이너 — 스타일 선택',
    opts: [
      { l: '개인집 스타일',       m: 1.8, img: 'img/estimate/con_home.jpg' },
      { l: '개인차고지 셔터벽화', m: 1.9, img: 'img/estimate/con_garage.jpg' },
    ]
  }
};

// ── 지역 (4그룹) ─────────────────────────────────────────────
const REGIONS = [
  { l: '서울·경기·충청북도·경상북도', m: 1.2 },
  { l: '충청남도·전라북도',           m: 1.0 },
  { l: '강원도·경상남도·전라남도·제주도', m: 1.3 },
  { l: '그 외 지역',                  m: 1.0 },
];

const st = {
  size: 0, loc: null, locL: '', mat: null, matL: '',
  hgt: null, hgtL: '', hasDesign: null,
  style: null, styleL: '', space: null, spaceL: '',
  spaceStyle: null, spaceStyleL: '', reg: null, regL: ''
};

function pick(btn, key, val, label) {
  document.querySelectorAll(`[data-g="${btn.dataset.g}"]`).forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  st[key] = val;
  st[key + 'L'] = label;
  updateSidebar();
  markFilled(btn.closest('.section'));
}

function pickImg(btn, key, val, label) {
  document.querySelectorAll(`[data-g="${btn.dataset.g}"]`).forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  st[key] = val;
  st[key + 'L'] = label;
  updateSidebar();
  markFilled(btn.closest('.section'));
}

function pickDesign(btn, hasD) {
  document.querySelectorAll('[data-g="design"]').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  st.hasDesign = hasD;
  st.style = null; st.styleL = '';
  st.space = null; st.spaceL = '';
  st.spaceStyle = null; st.spaceStyleL = '';
  document.querySelectorAll('[data-g="style"],[data-g="space"],[data-g="spaceStyle"]').forEach(b => b.classList.remove('sel'));
  if (hasD) {
    show('s6a'); hide('s6b'); hide('s7');
    document.getElementById('s8num').textContent = 'Step 07';
    // 시안 있음: 첫 번째 스타일 자동선택
    const firstStyleBtn = document.querySelector('#opts-6a .opt-img');
    if (firstStyleBtn) firstStyleBtn.click();
 } else {
    hide('s6a');
    show('s6b');

    // 첫번째 공간 자동선택
    const firstSpaceBtn = document.querySelector('[data-g="space"]');

    if (firstSpaceBtn) {
        firstSpaceBtn.click();
    }

    document.getElementById('s8num').textContent = 'Step 08';
}
  updateSidebar();
  markFilled(btn.closest('.section'));
}

function pickSpace(btn, key, label) {
  document.querySelectorAll('[data-g="space"]').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  st.space = key;
  st.spaceL = label;
  st.spaceStyle = null;
  st.spaceStyleL = '';
  renderSpaceOpts(key);
  show('s7');
  updateSidebar();
  markFilled(btn.closest('.section'));
}

function renderSpaceOpts(key) {
  const d = SPACE[key];
  document.getElementById('s7title').textContent = d.title;
  const c = document.getElementById('s7opts');
  c.innerHTML = '';
  st.spaceStyle = null;
  d.opts.forEach((o, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opt-img';
    btn.dataset.g = 'spaceStyle';
    btn.innerHTML = imgSlot(o.img, o.l) +
      `<div class="opt-img-label"><div class="ol">${o.l}</div></div>`;
    btn.onclick = function () {
      // ★ 카카오 상담 링크 버튼: 견적 계산에 반영하지 않고 새 탭으로 카카오채널 오픈
      if (o.link) {
        window.open(KAKAO_CHANNEL_URL, '_blank');
        return;
      }
      document.querySelectorAll('[data-g="spaceStyle"]').forEach(b => b.classList.remove('sel'));
      btn.classList.add('sel');
      st.spaceStyle = o.m;
      st.spaceStyleL = o.l;
      updateSidebar();
      markFilled(document.getElementById('s7'));
    };
    c.appendChild(btn);
    // 링크 버튼은 자동선택 대상에서 제외
    if (idx === 0 && !o.link) {
      btn.classList.add('sel');
      st.spaceStyle = o.m;
      st.spaceStyleL = o.l;
    }
  });
  updateSidebar();
  markFilled(document.getElementById('s7'));
}

function show(id) { const el = document.getElementById(id); if(el) el.classList.add('show'); }
function hide(id) { const el = document.getElementById(id); if(el) el.classList.remove('show'); }
function markFilled(s) { if (s) s.classList.add('filled'); }

function updateSidebar() {
  setPI('pi-size',  'pi-size-v',  st.size ? st.size + '㎡' : null);
  setPI('pi-loc',   'pi-loc-v',   st.locL  || null);
  setPI('pi-mat',   'pi-mat-v',   st.matL  || null);
  setPI('pi-hgt',   'pi-hgt-v',   st.hgtL  || null);
  const sl = st.hasDesign ? st.styleL : (st.spaceStyleL || st.spaceL || null);
  setPI('pi-style', 'pi-style-v', sl);
  setPI('pi-reg',   'pi-reg-v',   st.regL  || null);
}

function setPI(rowId, valId, val) {
  const row = document.getElementById(rowId);
  const v   = document.getElementById(valId);
  if (!row || !v) return;
  if (val) { row.classList.add('done'); v.textContent = val; }
  else      { row.classList.remove('done'); v.textContent = '—'; }
}

function calculate() {
  if (!st.size || st.size <= 0)       { alert('벽 사이즈를 입력해주세요.'); return; }
  if (!st.loc)                         { alert('작업 위치를 선택해주세요.'); return; }
  if (!st.mat)                         { alert('벽의 재질을 선택해주세요.'); return; }
  if (!st.hgt)                         { alert('벽면 높이를 선택해주세요.'); return; }
  if (st.hasDesign === null)           { alert('시안 여부를 선택해주세요.'); return; }
  if (st.hasDesign && !st.style)       { alert('시안 스타일을 선택해주세요.'); return; }
  if (!st.hasDesign && !st.spaceStyle) { alert('공간 스타일을 선택해주세요.'); return; }
  if (!st.reg)                         { alert('현장 위치를 선택해주세요.'); return; }

  const styleMult = st.hasDesign ? st.style : st.spaceStyle;
  const base  = st.size * st.loc * st.mat * st.hgt * styleMult * st.reg;
  const paint = Math.round(base * 0.20);
  const mat2  = Math.round(base * 0.15);
  const labor = Math.round(base * 0.40);
  const mgmt  = Math.round(base * 0.25);
  const vat   = Math.round(base * 0.10);
  const grand = base + vat;
  const fmt   = n => Math.round(n).toLocaleString('ko-KR');

  document.getElementById('rPrice').textContent = fmt(grand);
  document.getElementById('bkRows').innerHTML = [
    { k: '페인트',      v: fmt(paint) + '원' },
    { k: '부자재',      v: fmt(mat2)  + '원' },
    { k: '인건비',      v: fmt(labor) + '원' },
    { k: '총진행관리비', v: fmt(mgmt) + '원' },
    { k: '소계',        v: fmt(base)  + '원', t: true },
    { k: '부가세 (10%)', v: fmt(vat)  + '원' },
    { k: '최종 견적',   v: fmt(grand) + '원', ac: true },
  ].map(r =>
    `<div class="bk-row${r.t ? ' total' : ''}">
      <span class="bk-k">${r.k}</span>
      <span class="bk-v${r.ac ? ' ac' : ''}">${r.v}</span>
    </div>`
  ).join('');

  document.getElementById('alertBig').style.display = st.size >= 30 ? 'block' : 'none';
  document.getElementById('resultOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeOverlay(e) {
  if (e.target === document.getElementById('resultOverlay')) closeResult();
}
function closeResult() {
  document.getElementById('resultOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

// ════════════════════════════════════════════════
//  탭2: 공공기관 로직
// ════════════════════════════════════════════════
const PUBLIC_SPACE = {
  elementary: {
    title: '초등학교 — 벽화 스타일 선택',
    opts: [
      { l: '캐릭터·만화풍 컬러풀',   m: 1.8, img: 'img/estimate/mural_sample (35).jpg' },
      { l: '1:1 맞춤 디자인 제작문의',   m: 1.9, img: 'img/estimate/mural_cacao.jpg', link: true },
      { l: '아이들 일러스트',         m: 2.0, img: 'img/estimate/mural_sample (11).jpg' },
      { l: '아이들 일러스트 2',       m: 1.8, img: 'img/estimate/dd.jpg' },
      { l: '야외 놀이 일러스트',      m: 1.8, img: 'img/estimate/mural_sample (24).jpg' },
      { l: '파스텔 자연·동물',        m: 1.8, img: 'img/estimate/mural_sample (34).jpg' },
      { l: '어린왕자',                m: 1.8, img: 'img/estimate/어린왕자.jpg' },
      { l: '꽃·나비 일러스트',        m: 1.8, img: 'img/estimate/mural_sample (25).jpg' },
      { l: '파스텔 자연',             m: 1.8, img: 'img/estimate/mural_sample (31).jpg' },
    ]
  },
  middle_high: {
    title: '중·고등학교 — 벽화 스타일 선택',
    opts: [
      { l: '꽃·나비 일러스트',  m: 1.8, img: 'img/estimate/mural_sample (25).jpg' },
      { l: '어린왕자',          m: 1.8, img: 'img/estimate/어린왕자.jpg' },
       { l: '1:1 맞춤 디자인 제작문의',   m: 1.9, img: 'img/estimate/mural_cacao.jpg', link: true },
      { l: '파스텔 자연',       m: 1.8, img: 'img/estimate/mural_sample (31).jpg' },
      { l: '포인트벽화',        m: 1.8, img: 'img/estimate/mural_sample (38).jpg' },
      { l: '만화스타일',        m: 1.8, img: 'img/estimate/mural_sample (33).jpg' },
      { l: '초록풀 일러스트',   m: 1.8, img: 'img/estimate/mural_sample (26).jpg' },
      { l: '꽃과 글자레터링',   m: 1.8, img: 'img/estimate/mural_sample (24).jpg' },
    ]
  },
  fire: {
    title: '소방서 — 벽화 스타일 선택',
    opts: [
      { l: '불나면 대피먼저',   m: 1.8, img: 'img/estimate/mural_sample (8).jpg' },
      { l: '소화기 사용법',     m: 1.8, img: 'img/estimate/mural_sample (13).jpg' },
      { l: '소방관 사실화',     m: 1.8, img: 'img/estimate/mural_sample (12).jpg' },
    ]
  },
  village: {
    title: '마을벽화 — 벽화 스타일 선택',
    opts: [
      { l: '마을 풍경 일러스트', m: 1.8, img: 'img/estimate/mural_sample (4).jpg' },
      { l: '꽃·자연 배경',       m: 1.8, img: 'img/estimate/mural_sample (5).jpg' },
       { l: '1:1 맞춤 디자인 제작문의',   m: 1.9, img: 'img/estimate/mural_sample (17).jpg', link: true },
      { l: '손그림 일러스트',    m: 1.8, img: 'img/estimate/mural_sample (6).jpg' },
      { l: '파스텔 자연',        m: 1.8, img: 'img/estimate/mural_sample (31).jpg' },
      { l: '사실화·트릭아트',    m: 1.8, img: 'img/estimate/mural_sample (25).jpg' },
      { l: '추상·패턴 컬러풀',   m: 1.8, img: 'img/estimate/mural_sample (2).jpg' },
      { l: '벽면 가득 채우는 벽화', m: 1.8, img: 'img/estimate/mural_sample (28).jpg' },
    ]
  },
  welfare: {
    title: '각종 복지센터 — 벽화 스타일 선택',
    opts: [
      { l: '따뜻한 일러스트',      m: 1.8, img: 'img/estimate/mural_sample (11).jpg' },
       { l: '1:1 맞춤 디자인 제작문의',   m: 1.9, img: 'img/estimate/mural_sample (17).jpg', link: true },
      { l: '초록풀 일러스트',      m: 1.8, img: 'img/estimate/mural_sample (26).jpg' },
      { l: '꽃과 글자레터링',      m: 1.8, img: 'img/estimate/mural_sample (24).jpg' },
      { l: '꽃·자연 배경',         m: 1.8, img: 'img/estimate/mural_sample (5).jpg' },
      { l: '어르신·사람 일러스트', m: 1.8, img: 'img/estimate/mural_sample (34).jpg' },
      { l: '깔끔한 도형',          m: 1.8, img: 'img/estimate/mural_sample (7).jpg' },
    ]
  },
  library: {
    title: '도서관 — 벽화 스타일 선택',
    opts: [
      { l: '북까페 스타일',     m: 1.8, img: 'img/estimate/mural_sample (33).jpg' },
       { l: '1:1 맞춤 디자인 제작문의',   m: 1.9, img: 'img/estimate/mural_sample (17).jpg', link: true },
      { l: '서점·책 일러스트',  m: 1.8, img: 'img/estimate/mural_sample (38).jpg' },
      { l: '풀 자연 일러스트',  m: 1.8, img: 'img/estimate/mural_sample (26).jpg' },
      { l: '깔끔한 도형',       m: 1.8, img: 'img/estimate/mural_sample (7).jpg' },
    ]
  }
};

// 벽화체험 스타일
const EXP_STYLES = [
  { l: '캐릭터·만화풍 컬러풀',   m: 2.0, img: 'img/estimate/mural_sample (35).jpg' },
  { l: '아이들 일러스트',         m: 2.0, img: 'img/estimate/mural_sample (11).jpg' },
   { l: '1:1 맞춤 디자인 제작문의',   m: 1.9, img: 'img/estimate/mural_cacao.jpg', link: true },
  { l: '야외 놀이 일러스트',      m: 2.0, img: 'img/estimate/mural_sample (24).jpg' },
  { l: '파스텔 자연·동물',        m: 1.9, img: 'img/estimate/mural_sample (34).jpg' },
  { l: '어린왕자',                m: 2.0, img: 'img/estimate/어린왕자.jpg' },
  { l: '꽃·나비 일러스트',        m: 2.0, img: 'img/estimate/mural_sample (25).jpg' },
  { l: '파스텔 자연',             m: 2.0, img: 'img/estimate/mural_sample (31).jpg' },
  { l: '포인트벽화',              m: 2.0, img: 'img/estimate/mural_sample (38).jpg' },
  { l: '만화스타일',              m: 2.0, img: 'img/estimate/mural_sample (33).jpg' },
  { l: '초록풀 일러스트',         m: 2.0, img: 'img/estimate/mural_sample (26).jpg' },
  { l: '꽃과 글자레터링',         m: 2.0, img: 'img/estimate/mural_sample (24).jpg' },
  { l: '마을 풍경 일러스트',      m: 2.0, img: 'img/estimate/mural_sample (4).jpg' },
  { l: '꽃·자연 배경',            m: 2.0, img: 'img/estimate/mural_sample (5).jpg' },
  { l: '손그림 일러스트',         m: 2.0, img: 'img/estimate/mural_sample (6).jpg' },
  { l: '사실적 풍경 마을벽화',        m: 2.4, img: 'img/estimate/mural_sample (2).jpg' },
  { l: '사실적풍경 마을벽화2',   m: 2.4, img: 'img/estimate/mural_sample (28).jpg' },
];

// 공공기관 상태
const pst = {
  size: 0, loc: null, locL: '', mat: null, matL: '',
  hgt: null, hgtL: '',
  pubSpace: null, pubSpaceL: '',
  pubStyle: null, pubStyleL: '', pubStyleM: null,
  reg: null, regL: ''
};

function pPick(btn, key, val, label) {
  document.querySelectorAll(`[data-pg="${btn.dataset.pg}"]`).forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  pst[key] = val;
  pst[key + 'L'] = label;
  updatePubSidebar();
  markFilled(btn.closest('.section'));
}

function pPickSpace(btn, key, label) {
  document.querySelectorAll('[data-pg="pubSpace"]').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  pst.pubSpace = key;
  pst.pubSpaceL = label;
  pst.pubStyle = null; pst.pubStyleL = ''; pst.pubStyleM = null;
  renderPubStyleOpts(key);
  // ★ 이미 항상 보이므로 show() 불필요하지만 안전하게 유지
  show('ps7');
  updatePubSidebar();
  markFilled(btn.closest('.section'));
}

function renderPubStyleOpts(key) {
  const d = PUBLIC_SPACE[key];
  document.getElementById('ps7title').textContent = d.title;
  const c = document.getElementById('ps7opts');
  c.innerHTML = '';
  d.opts.forEach((o, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opt-img';
    btn.dataset.pg = 'pubStyle';
    btn.innerHTML = imgSlot(o.img, o.l) +
      `<div class="opt-img-label"><div class="ol">${o.l}</div></div>`;
    btn.onclick = function () {
      // ★ 카카오 상담 링크 버튼: 견적 계산에 반영하지 않고 새 탭으로 카카오채널 오픈
      if (o.link) {
        window.open(KAKAO_CHANNEL_URL, '_blank');
        return;
      }
      document.querySelectorAll('[data-pg="pubStyle"]').forEach(b => b.classList.remove('sel'));
      btn.classList.add('sel');
      pst.pubStyle = o.l;
      pst.pubStyleL = o.l;
      pst.pubStyleM = o.m;
      updatePubSidebar();
      markFilled(document.getElementById('ps7'));
    };
    c.appendChild(btn);
    // 링크 버튼은 자동선택 대상에서 제외
    if (idx === 0 && !o.link) {
      btn.classList.add('sel');
      pst.pubStyle = o.l;
      pst.pubStyleL = o.l;
      pst.pubStyleM = o.m;
    }
  });
  updatePubSidebar();
  markFilled(document.getElementById('ps7'));
}

function updatePubSidebar() {
  setPubPI('ppi-size',  'ppi-size-v',  pst.size ? pst.size + '㎡' : null);
  setPubPI('ppi-loc',   'ppi-loc-v',   pst.locL  || null);
  setPubPI('ppi-mat',   'ppi-mat-v',   pst.matL  || null);
  setPubPI('ppi-hgt',   'ppi-hgt-v',   pst.hgtL  || null);
  setPubPI('ppi-style', 'ppi-style-v', pst.pubStyleL || pst.pubSpaceL || null);
  setPubPI('ppi-reg',   'ppi-reg-v',   pst.regL  || null);
}

function setPubPI(rowId, valId, val) {
  const row = document.getElementById(rowId);
  const v   = document.getElementById(valId);
  if (!row || !v) return;
  if (val) { row.classList.add('done'); v.textContent = val; }
  else      { row.classList.remove('done'); v.textContent = '—'; }
}

function calcPublic() {
  if (!pst.size || pst.size <= 0)  { alert('벽 사이즈를 입력해주세요.'); return; }
  if (!pst.loc)                     { alert('작업 위치를 선택해주세요.'); return; }
  if (!pst.mat)                     { alert('벽의 재질을 선택해주세요.'); return; }
  if (!pst.hgt)                     { alert('벽면 높이를 선택해주세요.'); return; }
  if (!pst.pubSpace)                { alert('공공기관 성격을 선택해주세요.'); return; }
  if (!pst.pubStyleM)               { alert('벽화 스타일을 선택해주세요.'); return; }
  if (!pst.reg)                     { alert('현장 위치를 선택해주세요.'); return; }

  const base  = pst.size * pst.loc * pst.mat * pst.hgt * pst.pubStyleM * pst.reg;
  const paint = Math.round(base * 0.20);
  const mat2  = Math.round(base * 0.15);
  const labor = Math.round(base * 0.40);
  const mgmt  = Math.round(base * 0.25);
  const vat   = Math.round(base * 0.10);
  const grand = base + vat;
  const fmt   = n => Math.round(n).toLocaleString('ko-KR');

  document.getElementById('pub-rPrice').textContent = fmt(grand);
  document.getElementById('pub-bkRows').innerHTML = [
    { k: '페인트',      v: fmt(paint) + '원' },
    { k: '부자재',      v: fmt(mat2)  + '원' },
    { k: '인건비',      v: fmt(labor) + '원' },
    { k: '총진행관리비', v: fmt(mgmt) + '원' },
    { k: '소계',        v: fmt(base)  + '원', t: true },
    { k: '부가세 (10%)', v: fmt(vat)  + '원' },
    { k: '최종 견적',   v: fmt(grand) + '원', ac: true },
  ].map(r =>
    `<div class="bk-row${r.t ? ' total' : ''}">
      <span class="bk-k">${r.k}</span>
      <span class="bk-v${r.ac ? ' ac' : ''}">${r.v}</span>
    </div>`
  ).join('');

  document.getElementById('pub-alertBig').style.display = pst.size >= 30 ? 'block' : 'none';
  document.getElementById('pubResultOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closePubOverlay(e) {
  if (e.target === document.getElementById('pubResultOverlay')) closePubResult();
}
function closePubResult() {
  document.getElementById('pubResultOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

// ════════════════════════════════════════════════
//  탭3: 벽화체험 로직
// ════════════════════════════════════════════════
const est = {
  size: 0, loc: null, locL: '', mat: null, matL: '',
  hgt: null, hgtL: '',
  expStyle: null, expStyleL: '',
  target: null, targetL: '', pricePerPerson: 0,
  count: 0,
  reg: null, regL: ''
};

function ePickBase(btn, key, val, label) {
  document.querySelectorAll(`[data-eg="${btn.dataset.eg}"]`).forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  est[key] = val;
  est[key + 'L'] = label;
  updateExpSidebar();
  markFilled(btn.closest('.section'));
}

function pickExpTarget(btn, targetKey, label, pricePerPerson) {
  document.querySelectorAll('[data-eg="target"]').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  est.target = targetKey;
  est.targetL = label;
  est.pricePerPerson = pricePerPerson;
  updateExpSidebar();
  markFilled(btn.closest('.section'));

  const priceNote = document.getElementById('exp-price-note');
  if (priceNote) {
    priceNote.textContent = `1인당 단가: ${pricePerPerson.toLocaleString('ko-KR')}원`;
    priceNote.style.display = 'block';
  }
}

function updateExpSidebar() {
  setExpPI('epi-size',   'epi-size-v',   est.size ? est.size + '㎡' : null);
  setExpPI('epi-loc',    'epi-loc-v',    est.locL   || null);
  setExpPI('epi-mat',    'epi-mat-v',    est.matL   || null);
  setExpPI('epi-hgt',    'epi-hgt-v',    est.hgtL   || null);
  setExpPI('epi-target', 'epi-target-v', est.targetL || null);
  setExpPI('epi-count',  'epi-count-v',  est.count ? est.count + '명' : null);
  setExpPI('epi-reg',    'epi-reg-v',    est.regL || null);
}

function setExpPI(rowId, valId, val) {
  const row = document.getElementById(rowId);
  const v   = document.getElementById(valId);
  if (!row || !v) return;
  if (val) { row.classList.add('done'); v.textContent = val; }
  else      { row.classList.remove('done'); v.textContent = '—'; }
}

function calcExperience() {
  if (!est.size || est.size <= 0)      { alert('벽 사이즈를 입력해주세요.'); return; }
  if (!est.loc)                         { alert('작업 위치를 선택해주세요.'); return; }
  if (!est.mat)                         { alert('벽의 재질을 선택해주세요.'); return; }
  if (!est.hgt)                         { alert('벽면 높이를 선택해주세요.'); return; }
  if (!est.target)                      { alert('체험 대상을 선택해주세요.'); return; }
  if (!est.count || est.count < 1)      { alert('체험 인원수를 입력해주세요.'); return; }
  if (!est.reg)                         { alert('현장 위치를 선택해주세요.'); return; }

  const styleM = est.expStyle || 2.0;
  const wallBase = est.size * est.loc * est.mat * est.hgt * styleM * est.reg;

  // ★ 상업공간/공공기관과 동일하게 벽화 작업비 세부 항목 분리
  const paint = Math.round(wallBase * 0.20);
  const mat2  = Math.round(wallBase * 0.15);
  const labor = Math.round(wallBase * 0.40);
  const mgmt  = Math.round(wallBase * 0.25);

  const expBase  = est.count * est.pricePerPerson * est.reg;
  const base  = wallBase + expBase;
  const vat   = Math.round(base * 0.10);
  const grand = base + vat;
  const fmt   = n => Math.round(n).toLocaleString('ko-KR');

  document.getElementById('exp-rPrice').textContent = fmt(grand);
  document.getElementById('exp-bkRows').innerHTML = [
    { k: '페인트',                 v: fmt(paint) + '원' },
    { k: '부자재',                 v: fmt(mat2)  + '원' },
    { k: '인건비',                 v: fmt(labor) + '원' },
    { k: '총진행관리비',           v: fmt(mgmt)  + '원' },
    { k: '벽화 작업비 소계',       v: fmt(wallBase) + '원' },
    { k: '체험 대상',              v: est.targetL },
    { k: '참가 인원',              v: est.count + '명' },
    { k: '1인당 추가재료 단가',        v: fmt(est.pricePerPerson) + '원' },
    { k: '체험비 소계',            v: fmt(expBase) + '원' },
    { k: '합계',                   v: fmt(base) + '원', t: true },
    { k: '부가세 (10%)',           v: fmt(vat)  + '원' },
    { k: '최종 견적',              v: fmt(grand) + '원', ac: true },
  ].map(r =>
    `<div class="bk-row${r.t ? ' total' : ''}">
      <span class="bk-k">${r.k}</span>
      <span class="bk-v${r.ac ? ' ac' : ''}">${r.v}</span>
    </div>`
  ).join('');

  document.getElementById('expResultOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeExpOverlay(e) {
  if (e.target === document.getElementById('expResultOverlay')) closeExpResult();
}
function closeExpResult() {
  document.getElementById('expResultOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

// ════════════════════════════════════════════════
//  DOMContentLoaded: 입력 이벤트 + 동적 버튼 렌더링
// ════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {

  // ── 상업공간 벽 사이즈 ──
  const wallSizeInput = document.getElementById('wallSize');
  if (wallSizeInput) {
    wallSizeInput.addEventListener('input', function () {
      const v = parseFloat(this.value);
      st.size = (v > 0) ? v : 0;
      document.getElementById('warn30').style.display = v >= 30 ? 'block' : 'none';
      if (v > 0) document.getElementById('s1').classList.add('filled');
      else        document.getElementById('s1').classList.remove('filled');
      updateSidebar();
    });
  }

  // ── 공공기관 벽 사이즈 ──
  const pubSizeInput = document.getElementById('pubWallSize');
  if (pubSizeInput) {
    pubSizeInput.addEventListener('input', function () {
      const v = parseFloat(this.value);
      pst.size = (v > 0) ? v : 0;
      const warn = document.getElementById('pub-warn30');
      if (warn) warn.style.display = v >= 30 ? 'block' : 'none';
      const sec = document.getElementById('ps1');
      if (sec) {
        if (v > 0) sec.classList.add('filled');
        else sec.classList.remove('filled');
      }
      updatePubSidebar();
    });
  }

  // ── 체험 벽 사이즈 ──
  const expSizeInput = document.getElementById('expWallSize');
  if (expSizeInput) {
    expSizeInput.addEventListener('input', function() {
      const v = parseFloat(this.value);
      est.size = (v > 0) ? v : 0;
      if (v > 0) document.getElementById('es1').classList.add('filled');
      else document.getElementById('es1').classList.remove('filled');
      updateExpSidebar();
    });
  }

  // ── 체험 인원수 ──
  const expCountInput = document.getElementById('expCount');
  if (expCountInput) {
    expCountInput.addEventListener('input', function() {
      const v = parseInt(this.value);
      est.count = (v > 0) ? v : 0;
      if (v > 0) document.getElementById('es6').classList.add('filled');
      else document.getElementById('es6').classList.remove('filled');
      updateExpSidebar();
    });
  }

  // ── 상업공간 지역 버튼 렌더링 ──
  const comRegContainer = document.getElementById('com-reg-opts');
  if (comRegContainer) {
    REGIONS.forEach(r => {
      const btn = document.createElement('button');
      btn.className = 'opt';
      btn.dataset.g = 'reg';
      btn.innerHTML = `<div class="ol">${r.l}</div>`;
      btn.onclick = function() {
        document.querySelectorAll('[data-g="reg"]').forEach(b => b.classList.remove('sel'));
        btn.classList.add('sel');
        st.reg = r.m;
        st.regL = r.l;
        updateSidebar();
        markFilled(btn.closest('.section'));
      };
      comRegContainer.appendChild(btn);
    });
  }

  // ── 공공기관 지역 버튼 렌더링 ──
  const regContainer = document.getElementById('pub-reg-opts');
  if (regContainer) {
    REGIONS.forEach(r => {
      const btn = document.createElement('button');
      btn.className = 'opt';
      btn.dataset.pg = 'reg';
      btn.innerHTML = `<div class="ol">${r.l}</div>`;
      btn.onclick = function() {
        document.querySelectorAll('[data-pg="reg"]').forEach(b => b.classList.remove('sel'));
        btn.classList.add('sel');
        pst.reg = r.m;
        pst.regL = r.l;
        updatePubSidebar();
        markFilled(btn.closest('.section'));
      };
      regContainer.appendChild(btn);
    });
  }

  // ── 체험 지역 버튼 렌더링 ──
  const expRegContainer = document.getElementById('exp-reg-opts');
  if (expRegContainer) {
    REGIONS.forEach(r => {
      const btn = document.createElement('button');
      btn.className = 'opt';
      btn.dataset.eg = 'ereg';
      btn.innerHTML = `<div class="ol">${r.l}</div>`;
      btn.onclick = function() {
        document.querySelectorAll('[data-eg="ereg"]').forEach(b => b.classList.remove('sel'));
        btn.classList.add('sel');
        est.reg = r.m;
        est.regL = r.l;
        updateExpSidebar();
        markFilled(btn.closest('.section'));
      };
      expRegContainer.appendChild(btn);
    });
  }

  // ── 체험 스타일 렌더링 (항상 노출, 첫 번째 자동 선택) ──
  const expStyleContainer = document.getElementById('exp-style-opts');
  if (expStyleContainer) {
    EXP_STYLES.forEach((o, idx) => {
      const btn = document.createElement('button');
      btn.className = 'opt-img';
      btn.dataset.eg = 'estyle';
      btn.innerHTML = imgSlot(o.img, o.l) +
        `<div class="opt-img-label"><div class="ol">${o.l}</div></div>`;
      btn.onclick = function() {
        document.querySelectorAll('[data-eg="estyle"]').forEach(b => b.classList.remove('sel'));
        btn.classList.add('sel');
        est.expStyle = o.m;
        est.expStyleL = o.l;
        updateExpSidebar();
        markFilled(btn.closest('.section'));
      };
      expStyleContainer.appendChild(btn);
      if (idx === 0) {
        btn.classList.add('sel');
        est.expStyle = o.m;
        est.expStyleL = o.l;
      }
    });
    markFilled(document.getElementById('es-style'));
  }

  // ★ 핵심 변경: 상업공간 s6a 이미지 섹션을 처음부터 표시
  // (시안 있음/없음 선택 전에도 이미지 미리 보여주기)
  // s6a는 기본적으로 첫 번째 스타일 자동 선택 후 표시
  // 여기서 s6a를 show 처리해서 기본 노출
 const firstDesignBtn = document.querySelector('[data-g="design"]');

if (firstDesignBtn) {
  firstDesignBtn.click();
}

  // ★ 공공기관 ps7도 처음부터 초등학교로 기본 렌더링해서 이미지 바로 보이게
  renderPubStyleOpts('elementary');
  show('ps7');
  // ps5 초등학교 버튼 자동 선택
  const firstInstBtn = document.querySelector('[data-pg="pubSpace"]');
  if (firstInstBtn) {
    firstInstBtn.classList.add('sel');
    pst.pubSpace = 'elementary';
    pst.pubSpaceL = '초등학교';
    updatePubSidebar();
    markFilled(document.getElementById('ps5'));
  }

});