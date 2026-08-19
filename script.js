const quizData = [
    {
        question: "HTML은 무엇의 약자일까요?",
        options: [
            "HyperText Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyper Transfer Model Language"
        ],
        correct: 0,
        explanation: "HTML은 HyperText Markup Language의 약자로, 웹페이지의 구조를 만드는 언어예요."
    },
    {
        question: "웹페이지를 집에 비유했을 때, HTML은 무엇에 해당할까요?",
        options: [
            "인테리어와 색깔",
            "뼈대(기둥, 벽)",
            "가전제품의 작동",
            "집 주소"
        ],
        correct: 1,
        explanation: "HTML은 집의 뼈대처럼 웹페이지의 구조를 세우는 역할을 해요."
    },
    {
        question: "웹페이지의 '디자인'을 담당하는 언어는 무엇일까요?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        correct: 1,
        explanation: "CSS는 옷이나 화장처럼 웹페이지를 꾸미는 역할을 담당해요."
    },
    {
        question: "버튼을 클릭했을 때 반응하는 것처럼, 웹페이지의 '동작'을 담당하는 언어는?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "HTTP"
        ],
        correct: 2,
        explanation: "JavaScript는 클릭, 움직임 등 웹페이지의 행동과 인터랙션을 담당해요."
    },
    {
        question: "컴퓨터가 웹페이지의 요소(제목, 사진, 버튼 등)를 구분하기 위해 HTML이 필요한 이유는?",
        options: [
            "컴퓨터는 화면만 보고는 각 요소가 무엇인지 알 수 없기 때문",
            "인터넷 속도를 빠르게 하기 위해서",
            "글자 크기를 자동으로 정하기 위해서",
            "이미지 용량을 줄이기 위해서"
        ],
        correct: 0,
        explanation: "컴퓨터는 화면에 보이는 것만으로는 구조를 알 수 없어서, 구조를 알려주는 언어인 HTML이 필요해요."
    },
    {
        question: "HTML 문서에서 실제로 화면에 보이는 내용이 들어가는 태그는?",
        options: [
            "<head>",
            "<title>",
            "<body>",
            "<html>"
        ],
        correct: 2,
        explanation: "<body> 태그 안에 우리가 화면에서 실제로 보는 내용이 들어가요."
    },
    {
        question: "눈에 보이지 않는 정보(페이지 제목 등)가 들어가는 태그는?",
        options: [
            "<body>",
            "<head>",
            "<p>",
            "<img>"
        ],
        correct: 1,
        explanation: "<head> 태그에는 화면에 직접 보이지 않지만 페이지 제목 등 중요한 정보가 들어가요."
    },
    {
        question: "이미지를 넣을 때 사용하는 태그는?",
        options: [
            "<a>",
            "<p>",
            "<img>",
            "<button>"
        ],
        correct: 2,
        explanation: "<img> 태그는 image(이미지)의 줄임말로, 사진을 삽입할 때 사용해요."
    },
    {
        question: "다른 페이지로 이동하는 링크를 만들 때 사용하는 태그는?",
        options: [
            "<link>",
            "<a>",
            "<move>",
            "<go>"
        ],
        correct: 1,
        explanation: "<a> 태그(anchor의 줄임말)는 다른 페이지나 위치로 이동하는 링크를 만들 때 사용해요."
    },
    {
        question: "HTML, CSS, JavaScript의 관계를 가장 잘 설명한 것은?",
        options: [
            "셋 중 하나만 있으면 완벽한 웹페이지가 완성된다",
            "HTML이 구조를 만들고, CSS가 꾸미고, JS가 동작을 담당하며 함께 완성된 웹페이지를 만든다",
            "세 언어는 서로 전혀 관련이 없다",
            "CSS가 없으면 HTML도 존재할 수 없다"
        ],
        correct: 1,
        explanation: "세 언어가 각자의 역할(구조-디자인-동작)을 맡아 함께 작동해야 완성된 웹페이지가 만들어져요."
    }
];

let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);
let quizFinished = false;

function initQuiz() {
    currentQuestion = 0;
    userAnswers = new Array(quizData.length).fill(null);
    quizFinished = false;
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('result-container').classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    const quiz = quizData[currentQuestion];
    document.getElementById('question-text').textContent = quiz.question;
    document.getElementById('current-question').textContent = currentQuestion + 1;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    quiz.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = String.fromCharCode(65 + index) + '. ' + option;
        
        if (userAnswers[currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }
        
        if (quizFinished) {
            if (index === quiz.correct) {
                optionDiv.classList.add('correct');
            } else if (userAnswers[currentQuestion] === index && index !== quiz.correct) {
                optionDiv.classList.add('incorrect');
            }
            optionDiv.classList.add('disabled');
        } else {
            optionDiv.onclick = () => selectOption(index);
        }
        
        optionsContainer.appendChild(optionDiv);
    });
    
    updateProgress();
    updateButtonStates();
}

function selectOption(index) {
    userAnswers[currentQuestion] = index;
    showQuestion();
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        finishQuiz();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function updateButtonStates() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = currentQuestion === 0;
    
    if (quizFinished) {
        nextBtn.textContent = '완료';
        nextBtn.disabled = false;
    } else if (currentQuestion === quizData.length - 1) {
        nextBtn.textContent = '제출';
        nextBtn.disabled = userAnswers[currentQuestion] === null;
    } else {
        nextBtn.textContent = '다음';
        nextBtn.disabled = false;
    }
}

function finishQuiz() {
    quizFinished = true;
    
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            score += 10;
        }
    });
    
    // 결과 표시
    currentQuestion = 0;
    showQuestion();
    
    // 결과 페이지 표시
    setTimeout(() => {
        showResults(score);
    }, 500);
}

function showResults(score) {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
    document.getElementById('score').textContent = score;
    
    const resultDetails = document.getElementById('result-details');
    resultDetails.innerHTML = '';
    
    userAnswers.forEach((answer, index) => {
        const quiz = quizData[index];
        const isCorrect = answer === quiz.correct;
        
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item ' + (isCorrect ? 'correct' : 'incorrect');
        
        const statusText = isCorrect ? '✓ 정답' : '✗ 오답';
        const answerText = answer !== null ? quiz.options[answer] : '선택 안 함';
        const correctText = quiz.options[quiz.correct];
        
        resultItem.innerHTML = `
            <strong>${statusText} - 문제 ${index + 1}</strong><br>
            ${isCorrect ? 
                `<div style="margin-top: 5px;">당신의 답: ${answerText}</div><div style="font-size: 0.85em; margin-top: 5px; opacity: 0.8;">${quiz.explanation}</div>` : 
                `<div style="margin-top: 5px;">당신의 답: ${answerText}</div><div style="margin-top: 5px;">정답: ${correctText}</div><div style="font-size: 0.85em; margin-top: 5px; opacity: 0.8;">${quiz.explanation}</div>`
            }
        `;
        
        resultDetails.appendChild(resultItem);
    });
}

function restartQuiz() {
    initQuiz();
}

// 페이지 로드 시 초기화
window.addEventListener('load', () => {
    initQuiz();
});
