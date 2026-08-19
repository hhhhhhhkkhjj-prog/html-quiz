// 게임 데이터
const gameData = {
    storyAnswers: [
        "배에 탔던 남자",
        "배가 침몰",
        "구명보트",
        "섬에 표류",
        "인육",
        "인육을 먹음",
        "생존",
        "바다거북",
        "거짓말",
        "주방장이 거짓",
        "진짜 바다거북이 아님",
        "인간의 고기"
    ],
    questionCount: 0,
    attemptCount: 0,
    conversationHistory: []
};

// AI 응답 데이터베이스
const aiResponses = {
    "남자": {
        "독점": "아니오",
        "범죄": "예",
        "죽": "예",
        "배": "예",
        "배가 침몰": "예",
        "구명보트": "예",
        "식인": "예",
        "인육": "예",
        "레스토랑": "예",
        "수프": "예",
        "거짓": "예",
        "주방장": "예, 성별은 중요하지 않습니다",
        "진짜 바다거북": "네, 중요한 질문입니다",
        "맛": "아니오, 맛은 있어도 중요하지 않습니다",
        "여자": "예, 남자여도 됩니다",
        "죽었어": "아니오",
        "생존": "예",
        "과거": "예, 과거 사건이 있습니다",
        "표류": "예",
        "섬": "예",
        "고기": "예",
        "사람": "예"
    }
};

// 텍스트 유사도 검사 함수
function calculateSimilarity(str1, str2) {
    const s1 = str1.toLowerCase().replace(/[^가-힣a-z0-9]/g, "");
    const s2 = str2.toLowerCase().replace(/[^가-힣a-z0-9]/g, "");
    
    let matches = 0;
    const minLen = Math.min(s1.length, s2.length);
    
    for (let i = 0; i < minLen; i++) {
        if (s1[i] === s2[i]) {
            matches++;
        }
    }
    
    const similarity = (matches / Math.max(s1.length, s2.length)) * 100;
    return similarity;
}

// 질문 처리 함수
function askQuestion() {
    const questionInput = document.getElementById("questionInput");
    const question = questionInput.value.trim();
    
    if (!question) {
        alert("질문을 입력해주세요!");
        return;
    }
    
    // 질문 수 증가
    gameData.questionCount++;
    document.getElementById("questionCount").textContent = gameData.questionCount;
    
    // 사용자 질문 표시
    displayMessage(question, "user");
    
    // AI 응답 생성
    const answer = generateAIResponse(question);
    
    // 짧은 지연 후 AI 응답 표시
    setTimeout(() => {
        displayMessage(answer, "ai");
        
        // 탐정 캐릭터의 말풍선 업데이트
        const detectiveSpeech = document.getElementById("detectiveSpeech");
        detectiveSpeech.textContent = answer;
    }, 500);
    
    // 입력 필드 초기화
    questionInput.value = "";
    questionInput.focus();
}

// AI 응답 생성 함수
function generateAIResponse(question) {
    const q = question.toLowerCase();
    
    // 키워드 매칭으로 응답 찾기
    for (let keyword in aiResponses["남자"]) {
        if (q.includes(keyword)) {
            return aiResponses["남자"][keyword];
        }
    }
    
    // 유사한 질문에 대한 응답 찾기 (Fuzzy matching)
    for (let keyword in aiResponses["남자"]) {
        const similarity = calculateSimilarity(q, keyword);
        if (similarity > 60) {
            return aiResponses["남자"][keyword];
        }
    }
    
    // 기본 응답
    const defaultResponses = [
        "흠... 그것은 질문의 방식에 따라 다릅니다.",
        "그것은 중요한 질문입니다.",
        "아니오.",
        "예.",
        "그것에 대해 더 자세히 설명하기는 어렵습니다.",
        "당신이 올바른 방향으로 가고 있는 것 같습니다."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// 메시지 표시 함수
function displayMessage(message, type) {
    const history = document.getElementById("conversationHistory");
    
    // 초기 메시지 제거
    if (history.children.length === 1 && history.children[0].textContent.includes("질문을 시작")) {
        history.innerHTML = "";
    }
    
    const messageElement = document.createElement("div");
    messageElement.className = `message ${type === 'user' ? 'user-question' : 'ai-answer'}`;
    
    if (type === 'user') {
        messageElement.innerHTML = `<strong>👤 질문:</strong> ${message}`;
    } else {
        messageElement.innerHTML = `<strong>🔍 탐정의 답변:</strong> ${message}`;
    }
    
    history.appendChild(messageElement);
    
    // 자동 스크롤
    history.scrollTop = history.scrollHeight;
    
    // 대화 기록 저장
    gameData.conversationHistory.push({
        type: type,
        message: message
    });
}

// 정답 제출 함수
function submitAnswer() {
    const answerInput = document.getElementById("answerInput");
    const answer = answerInput.value.trim();
    
    if (!answer) {
        alert("정답을 입력해주세요!");
        return;
    }
    
    // 시도 수 증가
    gameData.attemptCount++;
    document.getElementById("attemptCount").textContent = gameData.attemptCount;
    
    // 정답 검사
    let isCorrect = false;
    
    for (let correctAnswer of gameData.storyAnswers) {
        const similarity = calculateSimilarity(answer, correctAnswer);
        if (similarity > 50) {
            isCorrect = true;
            break;
        }
    }
    
    // 결과 표시
    const resultMessage = document.getElementById("resultMessage");
    resultMessage.classList.add("show");
    
    if (isCorrect) {
        resultMessage.className = "result-message success show";
        resultMessage.innerHTML = `
            <div style="font-size: 1.2em; margin-bottom: 10px;">🎉 정답입니다!</div>
            <div>축하합니다! ${gameData.questionCount}개의 질문으로 미스터리를 풀었습니다!</div>
            <div style="margin-top: 10px; font-size: 0.9em;">
                <strong>정답:</strong> 한 남자는 배가 침몰해서 구명보트에 탔다가 섬에 표류했습니다. 
                극한의 상황에서 다른 사람들이 인육으로 수프를 만들었고, 그것을 바다거북 수프라고 거짓말했습니다. 
                남자는 그것을 먹고 생존했지만, 나중에 진짜 바다거북 수프를 맛보았을 때 전혀 다른 맛이었기 때문에 
                진실을 깨닫고 레스토랑을 떠났습니다.
            </div>
        `;
    } else {
        resultMessage.className = "result-message failure show";
        resultMessage.innerHTML = `
            <div style="font-size: 1.2em; margin-bottom: 10px;">❌ 틀렸습니다.</div>
            <div>더 많은 질문을 통해 미스터리를 파헤쳐 보세요!</div>
        `;
    }
    
    // 입력 필드 초기화
    answerInput.value = "";
    
    // 5초 후 결과 메시지 숨기기
    setTimeout(() => {
        resultMessage.classList.remove("show");
    }, 5000);
}

// Enter 키로 질문 제출
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("questionInput").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            askQuestion();
        }
    });
    
    document.getElementById("answerInput").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            submitAnswer();
        }
    });
});
