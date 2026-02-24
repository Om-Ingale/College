const questions = [
        {
            q: "Which keyword is used to declare a constant in JS?",
            a: [
                { text: "let", correct: false },
                { text: "var", correct: false },
                { text: "const", correct: true },
                { text: "constant", correct: false }
            ]
        },
        {
            q: "What does DOM stand for?",
            a: [
                { text: "Document Object Model", correct: true },
                { text: "Data Object Management", correct: false },
                { text: "Digital Ordinance Model", correct: false },
                { text: "Desktop Oriented Mode", correct: false }
            ]
        },
        {
            q: "Which array method adds an element to the end?",
            a: [
                { text: "pop()", correct: false },
                { text: "push()", correct: true },
                { text: "shift()", correct: false },
                { text: "unshift()", correct: false }
            ]
        },
        {
            q: "How do you write 'Hello World' in an alert box?",
            a: [
                { text: "msg('Hello World')", correct: false },
                { text: "alertBox('Hello World')", correct: false },
                { text: "alert('Hello World')", correct: true },
                { text: "console.log('Hello World')", correct: false }
            ]
        },
        {
            q: "Which operator is used to compare both value and type?",
            a: [
                { text: "==", correct: false },
                { text: "=", correct: false },
                { text: "===", correct: true },
                { text: "!=", correct: false }
            ]
        }
    ];

    const questionEl = document.getElementById('question');
    const answerButtonsEl = document.getElementById('answer-buttons');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const scoreEl = document.getElementById('score-counter');
    const resultScreen = document.getElementById('result-screen');
    const questionContainer = document.getElementById('question-container');
    const finalScoreEl = document.getElementById('final-score');

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        scoreEl.innerText = `Score: ${score}`;
        resultScreen.classList.add('hide');
        questionContainer.classList.remove('hide');
        nextBtn.classList.add('hide');
        showQuestion();
    }

    function showQuestion() {
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        questionEl.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.q}`;

        currentQuestion.a.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) button.dataset.correct = "true";
            button.addEventListener('click', selectAnswer);
            answerButtonsEl.appendChild(button);
        });
    }

    function resetState() {
        nextBtn.classList.add('hide');
        while (answerButtonsEl.firstChild) {
            answerButtonsEl.removeChild(answerButtonsEl.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        
        if (isCorrect) {
            selectedBtn.classList.add('correct');
            score++;
            scoreEl.innerText = `Score: ${score}`;
        } else {
            selectedBtn.classList.add('wrong');
        }

        Array.from(answerButtonsEl.children).forEach(button => {
            if (button.dataset.correct === "true") button.classList.add('correct');
            button.disabled = true;
        });

        if (questions.length > currentQuestionIndex + 1) {
            nextBtn.classList.remove('hide');
        } else {
            showResults();
        }
    }

    function showResults() {
        questionContainer.classList.add('hide');
        resultScreen.classList.remove('hide');
        finalScoreEl.innerText = `You scored ${score} out of ${questions.length}!`;
    }

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        showQuestion();
    });

    restartBtn.addEventListener('click', startQuiz);

    startQuiz();