let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3,
    },
    {
        "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1,
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem attribut title aus?",
        "answer_1": "a[title]{...}",
        "answer_2": "a > title {...}",
        "answer_3": "a.title {...}",
        "answer_4": "a=title {...}",
        "right_answer": 1,
    },
    {
        "question": "Wie definiert man in JavaScript eine Variable",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = let rate;",
        "answer_3": "rate = 100;",
        "answer_4": "let rate = 100;",
        "right_answer": 4,
    }
];

let rightQuestions = 0;
let currentQuestions = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_DEFAULT = new Audio('audio/default.mp3');

function init() {
    allNumberOfQuestions();
}

function allNumberOfQuestions() {
    document.getElementById('all-currentNumber').innerHTML = questions.length;

    showQuestion();
}

function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateToProgressBar();
        loadToNextQuestion();
    }
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('progressBar').style = 'display:none;';
    document.getElementById('main-card').style = 'display:none;';
    document.getElementById('all-currentNumber1').innerHTML = questions.length;
    document.getElementById('addRightQuestion').innerHTML = rightQuestions;
}

function updateToProgressBar() {
    let percent = (currentQuestions) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent}%`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}

function loadToNextQuestion() {
    let question = questions[currentQuestions];
    document.getElementById('current-number').innerHTML = currentQuestions + 1;
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function gameIsOver() {
    return currentQuestions >= questions.length;
}

function answer(selection) {
    let question = questions[currentQuestions];
    // hier wird abgefragt in welcher Frage wir uns befinden!
    let selectedQuestionNumber = selection.slice(-1);
    // hier wird die Nummer der Anwort abefragt (z.B. die Anwort answer_1 = 1)
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    // mit der Variablen wird festgelegt die Richtige Antwort

    if (document.querySelector('.selected-answer')) {
        return;
    }

    if (rightToQuestion(selectedQuestionNumber, question)) {
        // in der Abfrage wird verglichen ob die Angeklickte Anwort mit der Richtigen Anwort übereinstimmt
        successToQuestion(selection);
    } else {
        fauilToQuestion(idOfRightAnswer, selection);
    }
    document.getElementById('next-button').disabled = false;
}

function rightToQuestion(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer']
}

function successToQuestion(selection) {
    document.getElementById(selection).parentNode.classList.add('bg-success');
    //die richtige Anwort mit einem Grünen Banner markiert
    AUDIO_SUCCESS.play();
    rightQuestions++;
    // hier wird die Anzahl der Richtigen Antworten in den Array der Richtigen Antworten gepusht
    document.getElementById(selection).classList.add('selected-answer');
}

function fauilToQuestion(idOfRightAnswer, selection) {
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    //Bei falschen Antwort wird die Antwort Rot dargestellt
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    //wenn auf die Falsche Antwort geklickt worden ist wird automatisch die Richtige Antwort angezeigt
    AUDIO_DEFAULT.play();
    //gibt den Sound raus beim anklicken auf eine falsche Antwort
    document.getElementById(selection).classList.add('selected-answer');
}


function nextQuestion() {
    currentQuestions++;
    showQuestion();

    document.getElementById('next-button').disabled = true;
    resetAnswerButton();
}

function resetAnswerButton() {
    document.querySelectorAll('.selected-answer').forEach(button => {
        button.classList.remove('selected-answer');
        button.parentNode.classList.remove('bg-success');
    });

    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-danger');
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-success');
    }
}

function restartGame() {
    currentQuestions = 0;
    rightQuestions = 0;
    document.getElementById('main-card').style = 'display:none;';
    document.getElementById('endScreen').style = 'display:none;';
    document.getElementById('startScreen').style = '';
    init();
}

function startQuiz() {
    document.getElementById('startScreen').style = 'display: none;';
    document.getElementById('main-card').style = '';
    document.getElementById('progressBar').style = '';
}