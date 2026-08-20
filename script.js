(function () {
  "use strict";

  var PUZZLES = [
    {
      title: "Q. 사진집",
      intro: "어느 여성의 아주 잘 찍힌 영상을 본 매니저는<br>그녀를 사무실로 불렀고, 얼마 뒤 여자는 그 사무실에서<br>사진집을 내게 되었습니다.<br>그 사진집은 아주 인기가 많았으나<br>여성은 칭찬받기는커녕 쓴소리를 듣고 있었습니다.",
      questions: [
        { q: "쓴소리를 한 주체가 누군지가 중요한가요?", a: "네", type: "yes" },
        { q: "사무실 측이 쓴소리를 했나요?", a: "그렇다고 볼 수 있습니다", type: "neutral" },
        { q: "문제에 등장하는 여성(그녀)은 모두 동일 인물인가요?", a: "네", type: "yes" },
        { q: "사진집이 민감한 주제를 건드렸나요?", a: "아니요", type: "no" },
        { q: "영상과 사진집의 괴리감 때문에 쓴소리를 받았나요?", a: "아니요", type: "no" },
        { q: "여성은 연예인인가요?", a: "아니요", type: "no" },
        { q: "여성은 학생인가요?", a: "성인이어도 학생이어도 성립합니다", type: "neutral" },
        { q: "여성의 직업이 중요한가요?", a: "아니요", type: "no" },
        { q: "혹시 그 인기 많은 사진집(들)이 어딘가에 버려졌나요?", a: "아니요", type: "no" },
        { q: "여자는 평범한 일반인이라 해도 성립하나요?", a: "네", type: "yes" },
        { q: "매니저가 불법적이거나 비윤리적인 짓을 저질렀나요?", a: "아니요", type: "no" },
        { q: "여성은 범죄를 저질렀나요?", a: "네", type: "yes" },
        { q: "여성이 저지른 범죄가 중요한가요?", a: "네", type: "yes" },
        { q: "사진집이 여자의 범죄를 다뤘나요?", a: "아니요", type: "no" }
      ]
    },
    {
      title: "Q. 새와 비행기",
      intro: "새가 비행기 아래에 있는 걸 발견했기에,<br>그는 비행기에 탈 수 있었습니다.",
      questions: [
        { q: "일반적으로 비행기라면, 경비행기입니까?", a: "경비행기에 가까움!", type: "neutral" },
        { q: "새는 비행기 아래에서 저공으로 날고 있었습니까?", a: "아니요", type: "no" },
        { q: "비행기 아래에 깔려있었습니까?", a: "아니요", type: "no" },
        { q: "남자는 가까이서 새를 발견했습니까?", a: "아니요", type: "no" },
        { q: "남자는 건물 안에서 창문을 통해서 봤나요?", a: "건물 안에서, 그러나 창문은 아닙니다", type: "neutral" },
        { q: "새는 실제 살아있는 새가 맞습니까?", a: "아니요", type: "no" },
        { q: "건물 안에서 CCTV 같은 걸 보고 있었나요?", a: "아니요", type: "no" },
        { q: "땅바닥에 새 그림이 있었습니까?", a: "아니요", type: "no" },
        { q: "비행기가 건물 안에 있었던 것입니까?", a: "네", type: "yes" },
        { q: "비행기 아래에 새 그림이 새겨진 어떤 물체가 있었습니까?", a: "아니요", type: "no" },
        { q: "남자가 본 비행기와 탄 비행기는 다른 비행기인가요?", a: "네", type: "yes" },
        { q: "남자랑 남자가 본 비행기는 같은 층에 있었습니까?", a: "네", type: "yes" },
        { q: "남자는 비행기 조종사입니까?", a: "네", type: "yes" },
        { q: "전투기나 제트기입니까?", a: "전자입니다 (전투기)", type: "neutral" },
        { q: "두 비행 물체 다 전투기입니까?", a: "남자가 탄 쪽만", type: "neutral" },
        { q: "새 문양이 새겨진 무언가는 만질 수 있습니까?", a: "네", type: "yes" },
        { q: "새가 그려진 물체는 종이입니까? 의류입니까?", a: "전자입니다 (종이)", type: "neutral" },
        { q: "남자는 실제 사람인가요?", a: "네", type: "yes" },
        { q: "종이는 일종의 어떤 통지서입니까?", a: "아니요", type: "no" },
        { q: "새를 발견한 시점과 비행기에 탑승한 시점 사이에는 오랜 시간 간격이 있습니까?", a: "네", type: "yes" },
        { q: "남자가 제트기를 타지 않았던 것은 원래는 그것이 불법이기 때문입니까?", a: "네, 저 사건 이후 자격을 얻은 것입니다", type: "yes" },
        { q: "종이를 발견하기 이전에도 조종사였습니까?", a: "아니요", type: "no" },
        { q: "훈련이나 시험의 일환이었습니까?", a: "네", type: "yes" },
        { q: "어떻게 보느냐에 따라 새가 보일 수도 있고 안 보일 수도 있는 것입니까?", a: "네", type: "yes" },
        { q: "새를 찾는 것이 시험의 일환입니까?", a: "네", type: "yes" }
      ]
    }
  ];

  var ANSWER_CLASS = { yes: "ans-yes", no: "ans-no", neutral: "ans-neutral" };

  var currentPuzzle = 0;
  var pool = [];
  var asked = [];
  var answering = false;

  function questions() {
    return PUZZLES[currentPuzzle].questions;
  }

  function refillPool() {
    var qs = questions();
    pool = qs.map(function (_, i) { return i; });
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
    }
  }

  function nextQuestion() {
    if (pool.length === 0) refillPool();
    var idx = pool.pop();
    return questions()[idx];
  }

  function buildStars() {
    var host = document.getElementById("stars");
    var count = window.innerWidth < 480 ? 60 : 110;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var s = document.createElement("span");
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDelay = (Math.random() * 3.4).toFixed(2) + "s";
      var size = (Math.random() * 1.6 + 1).toFixed(1) + "px";
      s.style.width = size;
      s.style.height = size;
      frag.appendChild(s);
    }
    host.appendChild(frag);
  }

  function renderCat() {
    var img = document.getElementById("catSource");
    var canvas = document.getElementById("catCanvas");
    var ctx = canvas.getContext("2d");

    function draw() {
      var w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      var frame = ctx.getImageData(0, 0, w, h);
      var d = frame.data;
      for (var p = 0; p < d.length; p += 4) {
        if (d[p] > 232 && d[p + 1] > 232 && d[p + 2] > 232) {
          d[p + 3] = 0;
        }
      }
      ctx.putImageData(frame, 0, 0);
    }

    if (img.complete && img.naturalWidth) {
      draw();
    } else {
      img.addEventListener("load", draw);
    }
  }

  function renderLog() {
    var log = document.getElementById("log");
    var count = document.getElementById("logCount");
    count.textContent = String(asked.length);

    if (asked.length === 0) {
      log.innerHTML = '<li class="log-empty" style="display:block;border:none;">아직 질문한 기록이 없습니다.</li>';
      return;
    }

    log.innerHTML = "";
    for (var i = asked.length - 1; i >= 0; i--) {
      var item = asked[i];
      var li = document.createElement("li");
      var qSpan = document.createElement("span");
      qSpan.className = "q";
      qSpan.textContent = item.q;
      var aSpan = document.createElement("span");
      aSpan.className = "a " + ANSWER_CLASS[item.type];
      aSpan.textContent = item.a;
      li.appendChild(qSpan);
      li.appendChild(aSpan);
      log.appendChild(li);
    }
  }

  function renderPuzzleHeader() {
    var puzzle = PUZZLES[currentPuzzle];
    document.getElementById("quizTitle").innerHTML = puzzle.title;
    document.getElementById("quizIntro").innerHTML = puzzle.intro;
  }

  function resetBubble() {
    var bubble = document.getElementById("bubble");
    var bubbleQ = document.getElementById("bubbleQ");
    var bubbleA = document.getElementById("bubbleA");
    bubble.classList.add("bubble-placeholder");
    bubble.classList.remove("pop");
    bubbleQ.textContent = "말풍선을 눌러 질문을 골라보세요";
    bubbleA.hidden = true;
    bubbleA.textContent = "";
    bubbleA.className = "bubble-a";
  }

  function switchPuzzle(index) {
    if (index === currentPuzzle) return;
    currentPuzzle = index;
    pool = [];
    asked = [];
    answering = false;

    renderPuzzleHeader();
    resetBubble();
    renderLog();

    var buttons = document.querySelectorAll(".puzzle-btn");
    buttons.forEach(function (btn) {
      var active = Number(btn.getAttribute("data-puzzle")) === currentPuzzle;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function ask() {
    if (answering) return;
    answering = true;

    var bubble = document.getElementById("bubble");
    var bubbleQ = document.getElementById("bubbleQ");
    var bubbleA = document.getElementById("bubbleA");
    var item = nextQuestion();

    bubble.classList.remove("bubble-placeholder");
    bubbleA.hidden = true;
    bubbleA.textContent = "";
    bubbleA.className = "bubble-a";
    bubbleQ.textContent = item.q;

    bubble.classList.remove("pop");
    void bubble.offsetWidth;
    bubble.classList.add("pop");

    window.setTimeout(function () {
      bubbleA.hidden = false;
      bubbleA.textContent = item.a;
      bubbleA.className = "bubble-a " + ANSWER_CLASS[item.type];
      asked.push(item);
      renderLog();
      answering = false;
    }, 550);
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildStars();
    renderCat();
    renderPuzzleHeader();
    renderLog();

    document.getElementById("askBtn").addEventListener("click", ask);
    document.getElementById("catBtn").addEventListener("click", ask);
    document.getElementById("bubble").addEventListener("click", ask);

    var switchHost = document.getElementById("puzzleSwitch");
    switchHost.addEventListener("click", function (e) {
      var btn = e.target.closest(".puzzle-btn");
      if (!btn) return;
      switchPuzzle(Number(btn.getAttribute("data-puzzle")));
    });
  });
})();
