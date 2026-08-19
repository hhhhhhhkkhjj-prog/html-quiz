(function () {
  "use strict";

  var QUESTIONS = [
    { q: "남자가 마신 액체는 실제로 술이었습니까?", a: "no" },
    { q: "남자는 그 액체를 술이라고 생각하고 마셨습니까?", a: "yes" },
    { q: "액체의 겉모습이 술과 비슷했습니까?", a: "yes" },
    { q: "액체의 냄새가 술과 비슷했습니까?", a: "neutral" },
    { q: "남자가 그 액체를 마신 것은 실수였습니까?", a: "yes" },
    { q: "남자는 그 액체를 마시기 전에 그것이 무엇인지 알고 있었습니까?", a: "no" },
    { q: "남자가 액체를 마신 장소가 중요한가요?", a: "yes" },
    { q: "남자는 친구의 집에 놀러 갔습니까?", a: "yes" },
    { q: "액체는 친구의 집에 원래 있던 것입니까?", a: "yes" },
    { q: "친구가 남자에게 직접 그 액체를 마시라고 권했습니까?", a: "no" },
    { q: "친구는 남자가 마신 액체의 정체를 알고 있었습니까?", a: "yes" },
    { q: "액체가 담겨 있던 용기가 중요한 단서입니까?", a: "no" },
    { q: "남자가 마신 액체는 사람이 마실 수 있는 액체였습니까?", a: "no" },
    { q: "그 액체는 원래 다른 용도로 사용되는 것이었습니까?", a: "yes" },
    { q: "그 액체는 위험한 물질입니까?", a: "yes" },
    { q: "액체 자체가 남자의 구토를 일으킨 원인입니까?", a: "yes" },
    { q: "액체는 휘발성이 있습니까?", a: "yes" },
    { q: "액체는 불이 붙을 수 있는 물질입니까?", a: "yes" },
    { q: "남자는 액체의 정체를 알고 나서 구토한 것입니까?", a: "no" },
    { q: "남자가 담배를 피우려 한 것이 죽음의 직접적인 원인입니까?", a: "yes" },
    { q: "남자가 담배를 피우려 한 행동이 중요합니까?", a: "yes" },
    { q: "담배 자체에 문제가 있었습니까?", a: "no" },
    { q: "담배가 액체와 관련이 있습니까?", a: "yes" },
    { q: "담배에 불을 붙이는 순간 문제가 발생했습니까?", a: "yes" },
    { q: "남자가 담배를 피우려 한 장소가 중요합니까?", a: "no" },
    { q: "남자가 입고 있던 옷이 사건과 관련이 있습니까?", a: "yes" },
    { q: "남자가 토한 액체가 옷에 묻었습니까?", a: "yes" },
    { q: "토한 액체가 묻은 옷이 사건의 원인이 되었습니까?", a: "yes" },
    { q: "그 액체는 불이 잘 붙는 물질입니까?", a: "yes" },
    { q: "남자는 담배에 불을 붙이는 과정에서 사고를 당했습니까?", a: "yes" },
    { q: "남자의 옷에 묻은 물질에 담뱃불이 옮겨붙었습니까?", a: "yes" },
    { q: "남자는 옷에 불이 붙은 뒤 사망한 것입니까?", a: "yes" }
  ];

  var ANSWER_LABEL = { yes: "예", no: "아니오", neutral: "중요하지 않습니다" };
  var ANSWER_CLASS = { yes: "ans-yes", no: "ans-no", neutral: "ans-neutral" };

  var pool = [];
  var asked = [];
  var answering = false;

  function refillPool() {
    pool = QUESTIONS.map(function (_, i) { return i; });
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
    }
  }

  function nextQuestion() {
    if (pool.length === 0) refillPool();
    var idx = pool.pop();
    return QUESTIONS[idx];
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
      aSpan.className = "a " + ANSWER_CLASS[item.a];
      aSpan.textContent = ANSWER_LABEL[item.a];
      li.appendChild(qSpan);
      li.appendChild(aSpan);
      log.appendChild(li);
    }
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
      bubbleA.textContent = ANSWER_LABEL[item.a];
      bubbleA.className = "bubble-a " + ANSWER_CLASS[item.a];
      asked.push(item);
      renderLog();
      answering = false;
    }, 550);
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildStars();
    renderCat();
    renderLog();

    document.getElementById("askBtn").addEventListener("click", ask);
    document.getElementById("catBtn").addEventListener("click", ask);
    document.getElementById("bubble").addEventListener("click", ask);
  });
})();
