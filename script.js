const questions = [
  {
    q: "GitHub Pages로 퀴즈 게임을 배포할 때, 별도의 백엔드 서버가 필요한가요?",
    options: ["필요하다", "필요 없다 — 정적 파일만으로 충분하다", "데이터베이스가 반드시 필요하다", "유료 서버를 결제해야 한다"],
    answer: 1,
    explain: "HTML/CSS/JS 정적 파일만으로 충분해서 별도 서버가 필요 없어요."
  },
  {
    q: "순수 HTML/CSS/JS 구조에서 퀴즈의 문제 배열, 정답 체크, 점수 계산 같은 '로직'을 담당하는 파일은?",
    options: ["index.html", "style.css", "script.js", "readme.md"],
    answer: 2,
    explain: "script.js가 퀴즈 로직(문제, 정답 체크, 점수 계산)을 담당해요."
  },
  {
    q: "게임 느낌을 살리기 위한 요소 중, 최고 점수를 브라우저에 저장해두는 데 쓰는 기술은?",
    options: ["localStorage", "cookie 강제 삭제", "print()", "alert()"],
    answer: 0,
    explain: "localStorage를 쓰면 새로고침해도 최고 점수가 남아있어요."
  },
  {
    q: "로컬 저장소를 깃허브의 원격 저장소와 연결할 때 사용하는 명령어는?",
    options: ["git commit -m", "git remote add origin <주소>", "git clone", "git status"],
    answer: 1,
    explain: "git remote add origin으로 로컬과 원격 저장소를 연결해요."
  },
  {
    q: "기본 브랜치 이름을 main으로 지정할 때 사용하는 명령어는?",
    options: ["git branch -M main", "git push main", "git main create", "git switch --new main"],
    answer: 0,
    explain: "git branch -M main으로 브랜치 이름을 main으로 바꿔줘요."
  },
  {
    q: "깃허브 저장소에서 배포(Pages) 설정을 하는 메뉴는 어디인가요?",
    options: ["Issues", "Settings → Pages", "Pull requests", "Actions → New workflow"],
    answer: 1,
    explain: "Settings 탭의 Pages 메뉴에서 배포 브랜치와 폴더를 지정해요."
  },
  {
    q: "GitHub Pages 배포 시 Source로 지정하는, 흔히 쓰는 기본 브랜치 이름은?",
    options: ["dev", "release", "main", "test"],
    answer: 2,
    explain: "보통 main 브랜치와 루트(/) 폴더를 소스로 지정해요."
  },
  {
    q: "퀴즈 문제 데이터를 나중에 쉽게 추가·수정하려고 분리해서 관리하기 좋은 파일 형식은?",
    options: ["JSON", "EXE", "ZIP", "DLL"],
    answer: 0,
    explain: "문제를 JSON으로 분리해두면 코드를 건드리지 않고 문제만 추가/수정할 수 있어요."
  },
  {
    q: "React 같은 프레임워크로 만든 사이트를 GitHub Pages에 올리기 전에 반드시 해야 하는 작업은?",
    options: ["빌드(build)해서 결과물을 만든다", "아무 작업도 필요 없다", "서버를 직접 구매한다", "코드를 압축해서 이메일로 보낸다"],
    answer: 0,
    explain: "빌드 결과물(정적 파일)을 만들어서 그걸 Pages에 올려야 해요."
  },
  {
    q: "게임 느낌을 위해 추천된 요소 중, 정해진 시간 안에 문제를 풀도록 압박감을 주는 요소는?",
    options: ["제한 시간 타이머", "다크 모드", "폰트 크기 조절", "언어 변경 버튼"],
    answer: 0,
    explain: "제한 시간 타이머가 있으면 긴장감 있는 게임 느낌이 살아나요."
  }
];

let current = 0;
let score = 0;
let answered = false;
const results = [];

const graphEl = document.getElementById('graph');
const commitTagEl = document.getElementById('commitTag');
const scoreTagEl = document.getElementById('scoreTag');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const quizCard = document.getElementById('quizCard');
const resultCard = document.getElementById('resultCard');
const deployScoreEl = document.getElementById('deployScore');
const deployTitleEl = document.getElementById('deployTitle');
const commitLogEl = document.getElementById('commitLog');
const restartBtn = document.getElementById('restartBtn');

function buildGraph(){
  graphEl.innerHTML = '';
  questions.forEach((_, i) => {
    const node = document.createElement('div');
    node.className = 'node';
    node.id = 'node-' + i;
    node.textContent = i + 1;
    graphEl.appendChild(node);
    if(i < questions.length - 1){
      const branch = document.createElement('div');
      branch.className = 'branch';
      branch.id = 'branch-' + i;
      graphEl.appendChild(branch);
    }
  });
}

function updateGraph(){
  questions.forEach((_, i) => {
    const node = document.getElementById('node-' + i);
    node.classList.remove('current', 'correct', 'wrong');
    if(results[i] === true) node.classList.add('correct');
    else if(results[i] === false) node.classList.add('wrong');
    else if(i === current) node.classList.add('current');

    if(i < questions.length - 1){
      const branch = document.getElementById('branch-' + i);
      if(results[i] !== undefined) branch.classList.add('done');
      else branch.classList.remove('done');
    }
  });
}

function renderQuestion(){
  answered = false;
  const q = questions[current];
  commitTagEl.textContent = `commit ${current + 1}/${questions.length}`;
  scoreTagEl.textContent = `score ${score}`;
  questionEl.textContent = q.q;
  feedbackEl.textContent = '';
  nextBtn.disabled = true;
  nextBtn.textContent = current === questions.length - 1 ? '결과 보기 →' : '다음 커밋 →';

  optionsEl.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(i));
    optionsEl.appendChild(btn);
  });

  updateGraph();
}

function selectAnswer(i){
  if(answered) return;
  answered = true;
  const q = questions[current];
  const isCorrect = i === q.answer;
  results[current] = isCorrect;

  if(isCorrect) score++;
  scoreTagEl.textContent = `score ${score}`;

  [...optionsEl.children].forEach((btn, idx) => {
    btn.disabled = true;
    if(idx === q.answer) btn.classList.add('reveal-correct');
    if(idx === i && isCorrect) btn.classList.add('selected-correct');
    if(idx === i && !isCorrect) btn.classList.add('selected-wrong');
  });

  feedbackEl.textContent = (isCorrect ? '✔ 정답! ' : '✘ 오답. ') + q.explain;
  nextBtn.disabled = false;
  updateGraph();
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
  quizCard.hidden = true;
  resultCard.hidden = false;

  const total = questions.length;
  deployScoreEl.textContent = `${total}개의 커밋 중 ${score}개 성공 (${Math.round(score/total*100)}%)`;
  deployTitleEl.textContent = score === total ? '🚀 Deploy 성공 — 퍼펙트' : score >= total * 0.6 ? '🚀 Deploy 성공' : '⚠ Deploy 실패 — 다시 커밋해보세요';

  commitLogEl.innerHTML = '';
  questions.forEach((q, i) => {
    const li = document.createElement('li');
    const ok = results[i];
    li.innerHTML = `<span class="tag ${ok ? 'ok' : 'fail'}">${ok ? 'PASS' : 'FAIL'}</span><span>#${i + 1} ${q.q}</span>`;
    commitLogEl.appendChild(li);
  });
}

restartBtn.addEventListener('click', () => {
  current = 0;
  score = 0;
  results.length = 0;
  quizCard.hidden = false;
  resultCard.hidden = true;
  buildGraph();
  renderQuestion();
});

buildGraph();
renderQuestion();
