// app.js — 고양이 말풍선 인터랙션 및 질문 은행 (이미지: space.jpg, cat.png 사용)
// 기능 개선: 말풍선 애니메이션, 키보드 접근성, 깔끔한 로그 포맷

const qaList = [
  {q:"남자가 마신 액체는 실제로 술이었습니까?", a:"아니오."},
  {q:"남자는 그 액체를 술이라고 생각하고 마셨습니까?", a:"예."},
  {q:"남자가 마신 액체는 친구가 일부러 술이라고 말한 것입니까?", a:"아니오."},
  {q:"액체의 겉모습이 술과 비슷했습니까?", a:"예."},
  {q:"액체의 냄새가 술과 비슷했습니까?", a:"중요하지 않습니다."},
  {q:"남자가 그 액체를 마신 것은 실수였습니까?", a:"예."},
  {q:"남자는 그 액체를 마시기 전에 그것이 무엇인지 알고 있었습니까?", a:"아니오."},
  {q:"남자가 액체를 마신 장소가 중요한가요?", a:"예."},
  {q:"남자는 친구의 집에 놀러 갔습니까?", a:"예."},
  {q:"액체는 친구의 집에 원래 있던 것입니까?", a:"예."},
  {q:"친구는 그 액체를 술이라고 생각하고 있었습니까?", a:"아니오."},
  {q:"친구가 남자에게 직접 그 액체를 마시라고 권했습니까?", a:"아니오."},
  {q:"친구는 남자가 마신 액체의 정체를 알고 있었습니까?", a:"예."},
  {q:"액체가 담겨 있던 용기가 중요한 단서입니까?", a:"아니오."},
  {q:"남자가 마신 액체는 사람이 마실 수 있는 액체였습니까?", a:"아니오."},
  {q:"그 액체는 원래 다른 용도로 사용되는 것이었습니까?", a:"예."},
  {q:"그 액체는 위험한 물질입니까?", a:"예."},
  {q:"액체 자체가 남자의 구토를 일으킨 원인입니까?", a:"예."},
  {q:"액체는 휘발성이 있습니까?", a:"예."},
  {q:"액체는 불이 붙을 수 있는 물질입니까?", a:"예."},
  {q:"남자는 액체의 정체를 알고 나서 구토한 것입니까?", a:"아니오."},
  {q:"남자가 담배를 피우려 한 것이 죽음의 직접적인 원인입니까?", a:"예."},
  {q:"남자가 담배를 피우려 한 행동이 중요합니까?", a:"예."},
  {q:"담배 자체에 문제가 있었습니까?", a:"아니오."},
  {q:"담배가 액체와 관련이 있습니까?", a:"예."},
  {q:"담배에 불을 붙이는 순간 문제가 발생했습니까?", a:"예."},
  {q:"남자가 담배를 피우려 한 장소가 중요합니까?", a:"아니오."},
  {q:"남자가 입고 있던 옷이 사건과 관련이 있습니까?", a:"예."},
  {q:"남자가 토한 액체가 옷에 묻었습니까?", a:"예."},
  {q:"토한 액체가 묻은 옷이 사건의 원인이 되었습니까?", a:"예."},
  {q:"그 액체는 불이 잘 붙는 물질입니까?", a:"예."},
  {q:"남자는 담배에 불을 붙이는 과정에서 사고를 당했습니까?", a:"예."},
  {q:"남자의 옷에 묻은 물질에 담뱃불이 옮겨붙었습니까?", a:"예."},
  {q:"남자는 옷에 불이 붙은 뒤 사망한 것입니까?", a:"예."}
];

let bank = [...qaList];
let log = [];
const maxLog = 50;

// DOM 요소
const catEl = document.getElementById('cat');
const bubbleEl = document.getElementById('bubble');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const resetBtn = document.getElementById('resetBtn');
const logEl = document.getElementById('log');
const bankEl = document.getElementById('bank');
const toggleListBtn = document.getElementById('toggleListBtn');
const bankPanel = document.getElementById('bankPanel');

function renderBank(){
  if(!bankEl) return;
  bankEl.innerHTML = '';
  bank.forEach((item, idx) => {
    const wrap = document.createElement('div');
    wrap.className = 'qa';
    wrap.innerHTML = `<div class="time">Q${idx+1}</div>
      <div class="q">${item.q}</div>
      <div class="a">${item.a}</div>`;
    bankEl.appendChild(wrap);
  });
}

function addLog(item){
  log.unshift(item);
  if(log.length>maxLog) log.pop();
  renderLog();
}

function renderLog(){
  logEl.innerHTML = '';
  if(log.length===0){ logEl.innerHTML = '<div class="qa">아직 질문이 없습니다.</div>'; return; }
  log.forEach(it=>{
    const d = document.createElement('div');
    d.className = 'qa';
    d.innerHTML = `<div class="time">${it.time}</div>
                   <div class="q">${it.q}</div>
                   <div class="a">${it.a}</div>`;
    logEl.appendChild(d);
  });
}

function randIndex(n){ return Math.floor(Math.random()*n); }

let isBusy=false;
async function showRandomQA(){
  if(isBusy) return;
  isBusy=true;
  if(bank.length===0){
    showBubbleText("모든 문항을 다 봤습니다. 리셋하세요.");
    isBusy=false;
    return;
  }
  const idx = randIndex(bank.length);
  const item = bank.splice(idx,1)[0];

  // 말풍선에 질문 보이기, 잠깐 후 답 표시
  showBubbleText(item.q);
  await sleep(650);
  showBubbleText(`${item.q}  →  ${item.a}`);
  addLog({q:item.q, a:item.a, time:new Date().toLocaleString()});
  renderBank();
  isBusy=false;
}

function showBubbleText(text){
  bubbleEl.textContent = text;
  bubbleEl.classList.add('visible');
  // 숨기기 타이머 (몇 초 후 자동으로 사라지게 하고 싶으면 주석 해제)
  // clearTimeout(bubbleTimer); bubbleTimer = setTimeout(()=>bubbleEl.classList.remove('visible'), 3500);
}

function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

// 이벤트 바인딩
catEl.addEventListener('click', showRandomQA);
catEl.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showRandomQA(); } });
nextBtn.addEventListener('click', showRandomQA);

shuffleBtn.addEventListener('click', ()=>{
  for(let i=bank.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [bank[i],bank[j]] = [bank[j],bank[i]]; }
  renderBank();
});

resetBtn.addEventListener('click', ()=>{
  bank = [...qaList];
  log = [];
  bubbleEl.classList.remove('visible');
  bubbleEl.textContent = "말풍선을 클릭해 질문을 꺼내세요";
  renderBank();
  renderLog();
});

toggleListBtn.addEventListener('click', ()=>{
  bankPanel.style.display = bankPanel.style.display === 'none' ? 'block' : 'none';
});

// 초기 렌더
renderBank();
renderLog();
