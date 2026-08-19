const questions = [
  {
    q: "GitHub Pages로 사이트를 배포할 때, 별도의 백엔드 서버가 필요할까요?",
    options: ["필요해요", "필요 없어요 — 정적 파일만으로 충분해요", "우주선이 필요해요", "유료 서버를 사야 해요"],
    answer: 1,
    explain: "HTML/CSS/JS 정적 파일만으로 충분해서 서버가 따로 필요 없어요."
  },
  {
    q: "퀴즈의 문제, 정답 체크, 점수 계산 같은 '로직'을 담당하는 파일은 무엇일까요?",
    options: ["index.html", "style.css", "script.js", "readme.md"],
    answer: 2,
    explain: "script.js가 문제, 정답 체크, 점수 계산 같은 로직을 담당해요."
  },
  {
    q: "최고 점수를 브라우저에 저장해서 새로고침해도 남아있게 하려면 어떤 기술을 쓸까요?",
    options: ["localStorage", "쿠키 굽기", "print()", "alert()"],
    answer: 0,
    explain: "localStorage를 쓰면 새로고침해도 최고 점수가 남아있어요."
  },
  {
    q: "로컬 저장소를 깃허브 원격 저장소와 연결할 때 쓰는 명령어는?",
    options: ["git commit -m", "git remote add origin <주소>", "git clone", "git status"],
    answer: 1,
    explain: "git remote add origin으로 로컬과 원격 저장소를 연결해요."
  },
  {
    q: "기본 브랜치 이름을 main으로 바꿀 때 쓰는 명령어는?",
    options: ["git branch -M main", "git push main", "git main create", "git switch --new main"],
    answer: 0,
    explain: "git branch -M main으로 브랜치 이름을 main으로 바꿔줘요."
  },
  {
    q: "깃허브 저장소에서 배포(Pages) 설정을 하는 곳은 어디일까요?",
    options: ["Issues", "Settings → Pages", "Pull requests", "Actions → New workflow"],
    answer: 1,
    explain: "Settings 탭의 Pages 메뉴에서 배포 브랜치를 지정해요."
  },
  {
    q: "GitHub Pages 배포 시 흔히 Source로 지정하는 기본 브랜치 이름은?",
    options: ["dev", "release", "main", "test"],
    answer: 2,
    explain: "보통 main 브랜치와 루트(/) 폴더를 소스로 지정해요."
  },
  {
    q: "퀴즈 문제 데이터를 나중에 쉽게 추가·수정하려면 어떤 형식으로 분리하면 좋을까요?",
    options: ["JSON", "EXE", "ZIP", "DLL"],
    answer: 0,
    explain: "문제를 JSON으로 분리해두면 코드를 안 건드리고 문제만 추가할 수 있어요."
  },
  {
    q: "React 같은 프레임워크로 만든 사이트를 Pages에 올리기 전에 꼭 해야 하는 작업은?",
    options: ["빌드(build)해서 결과물을 만든다", "아무 작업도 필요 없다", "서버를 직접 산다", "코드를 이메일로 보낸다"],
    answer: 0,
    explain: "빌드 결과물(정적 파일)을 만들어서 그걸 Pages에 올려야 해요."
  },
  {
    q: "게임 느낌을 살리기 위해, 정해진 시간 안에 풀도록 압박감을 주는 요소는?",
    options: ["제한 시간 타이머", "다크 모드", "폰트 크기 조절", "언어 변경 버튼"],
    answer: 0,
    explain: "제한 시간 타이머가 있으면 긴장감 있는 게임 느낌이 살아나요."
  }
];

let current = 0;
let score = 0;
let answered = false;
const results = [];

const trackEl = document.getElementById('track');
const bubbleText = document.getElementById('bubbleText');
const mascot = document.getElementById('mascot');
const momoMouth = document.getElementById('momoMouth');
const pupilL = document.getElementById('pupilL');
const pupilR = document.getElementById('pupilR');
const questionCount = document.getElementById('questionCount');
const starCount = document.getElementById('starCount');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const stage = document.getElementById('stage');
const resultCard = document.getElementById('resultCard');
const resultTitle = document.getElementById('resultTitle');
const resultScore = document.getElementById('resultScore');
const logEl = document.getElementById('log');
const restartBtn = document.getElementById('restartBtn');

const MOUTH_NEUTRAL = "M92 152 Q110 166 128 152";
const MOUTH_HAPPY = "M85 150 Q110 180 135 150";
const MOUTH_SAD = "M90 162 Q110 146 130 162";

function buildTrack(){
  trackEl.innerHTML = '';
  questions.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.id = 'dot-' + i;
    trackEl.appendChild(dot);
  });
}

function updateTrack(){
  questions.forEach((_, i) => {
    const dot = document.getElementById('dot-' + i);
    dot.classList.remove('current', 'correct', 'wrong');
    if(results[i] === true) dot.classList.add('correct');
    else if(results[i] === false) dot.classList.add('wrong');
    else if(i === current) dot.classList.add('current');
  });
}

function resetFace(){
  momoMouth.setAttribute('d', MOUTH_NEUTRAL);
  pupilL.setAttribute('cy', 114);
  pupilR.setAttribute('cy', 114);
  mascot.classList.remove('correct', 'wrong');
}

function renderQuestion(){
  answered = false;
  resetFace();
  const q = questions[current];
  questionCount.textContent = `문제 ${current + 1}/${questions.length}`;
  starCount.textContent = `⭐ ${score}`;
  bubbleText.textContent = q.q;
  feedbackEl.textContent = '';
  nextBtn.disabled = true;
  nextBtn.textContent = current === questions.length - 1 ? '결과 보러 가기 →' : '다음 행성으로 →';

  optionsEl.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(i));
    optionsEl.appendChild(btn);
  });

  updateTrack();
}

function selectAnswer(i){
  if(answered) return;
  answered = true;
  const q = questions[current];
  const isCorrect = i === q.answer;
  results[current] = isCorrect;

  if(isCorrect){
    score++;
    momoMouth.setAttribute('d', MOUTH_HAPPY);
    pupilL.setAttribute('cy', 110);
    pupilR.setAttribute('cy', 110);
    mascot.classList.add('correct');
  } else {
    momoMouth.setAttribute('d', MOUTH_SAD);
    pupilL.setAttribute('cy', 118);
    pupilR.setAttribute('cy', 118);
    mascot.classList.add('wrong');
  }
  starCount.textContent = `⭐ ${score}`;

  [...optionsEl.children].forEach((btn, idx) => {
    btn.disabled = true;
    if(idx === q.answer) btn.classList.add('reveal-correct');
    if(idx === i && isCorrect) btn.classList.add('selected-correct');
    if(idx === i && !isCorrect) btn.classList.add('selected-wrong');
  });

  feedbackEl.textContent = (isCorrect ? '✔ 정답이에요! ' : '✘ 아쉬워요. ') + q.explain;
  nextBtn.disabled = false;
  updateTrack();
}

nextBtn.addEventListener('click', () => {
  if(current < questions.length - 1){
    current++;
    renderQuestion();
  } else {
    showResult();
  }
});

function showResult(){
  stage.hidden = true;
  trackEl.hidden = true;
  resultCard.hidden = false;

  const total = questions.length;
  resultScore.textContent = `${total}개의 행성 중 ${score}개에서 별을 모았어요 (${Math.round(score/total*100)}%)`;
  resultTitle.textContent = score === total ? '완벽한 우주 항해! 🚀✨' : score >= total * 0.6 ? '미션 성공! 🚀' : '다시 도전해봐요 🌠';

  logEl.innerHTML = '';
  questions.forEach((q, i) => {
    const li = document.createElement('li');
    const ok = results[i];
    li.innerHTML = `<span class="tag ${ok ? 'ok' : 'fail'}">${ok ? '별 획득' : '실패'}</span><span>#${i + 1} ${q.q}</span>`;
    logEl.appendChild(li);
  });
}

restartBtn.addEventListener('click', () => {
  current = 0;
  score = 0;
  results.length = 0;
  stage.hidden = false;
  trackEl.hidden = false;
  resultCard.hidden = true;
  buildTrack();
  renderQuestion();
});

buildTrack();
renderQuestion();
