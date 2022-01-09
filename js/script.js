// define all pages
var pgHome = document.getElementById("home-page");
var pgQuestion = document.getElementById("question-page");
var pgEndGood = document.getElementById("end-page-good");
var pgEndBad = document.getElementById("end-page-bad");
var pgHighscore = document.getElementById('highscore-page');
// define elements
var timerEl = document.getElementById("timer");
var btnStartEl = document.getElementById("start-btn");
var questionEl = document.getElementById('question');
var choicesList = document.getElementById('choices-list');
var feedbackEl = document.getElementById('feedback');
var spanScore = document.getElementById('spanScore');
var btnTryAgain = document.getElementById('try-again-btn');
var btnSubmit = document.getElementById('submit-highscore-btn');
var btnHome = document.getElementById('home-btn');


// global variables
var currentQuestion = 0
var secsLeft = 60
var feedbackTime = 1

// start timer function
function countDown() {
    secsLeft = 1
    timerEl.textContent = secsLeft;
    window.timeInterval = setInterval(function() {
        secsLeft--;
        timerEl.textContent = secsLeft;
        if (secsLeft === 0) {
            clearInterval(window.timeInterval);
            switchPage(pgQuestion, pgEndBad);
        };
    }, 1000);
};

// Switch between pages by hidding the shown page and showing a hidden page
function switchPage(pageHide, pageShow) {
    pageHide.classList.add('hidded');
    pageShow.classList.remove('hidded');
};

// end the quiz and move to the good end page
function endGame() {
    switchPage(pgQuestion, pgEndGood);
    clearInterval(window.timeInterval);
    spanScore.textContent = secsLeft
};

// check the answer clicked on by the user and move to next question or end game
function checkAnswer(event) {
    event.preventDefault();
    event.stopPropagation();
    var isCorrect = event.target.getAttribute('data-is-correct') === 'true';

    // if (isCorrect) {
    // } else {

    // }
    currentQuestion++;
    if (currentQuestion >= questions.length){
        endGame()
    } else {
        renderQuestion(currentQuestion)
    }
};

// render the question on the screen
function renderQuestion(index) {
    // remove any content or classes from previous render
    choicesList.textContent = '';
    choicesList.setAttribute('class', '');
    // display the question
    var question = questions[index];
    questionEl.textContent = question.question;
    // if the question is a true or false, show with different styling
    if (question.type === "true/false") {
        choicesList.classList.add('true-false');
        for (var i = 0; i < question.answers.length; i++) {
            var li = document.createElement('li');
            var btn = document.createElement('btn');
            btn.textContent = question.answers[i].answer;
            btn.setAttribute('data-is-correct', question.answers[i].isCorrect);
            btn.addEventListener('click', checkAnswer);
            li.appendChild(btn);
            choicesList.appendChild(li);
        }
    // if the question is multiple choice show with different styling
    } else if (question.type === "multiple-choice") {
        choicesList.classList.add('multiple-choice');
        for (var i = 0; i < question.answers.length; i++) {
            var li = document.createElement('li');
            var btn = document.createElement('btn');
            btn.textContent = question.answers[i].answer;
            btn.setAttribute('data-is-correct', question.answers[i].isCorrect);
            btn.addEventListener('click', checkAnswer);
            li.appendChild(btn);
            choicesList.appendChild(li);
        }
    }
};

// the init which starts the game when clicking on the start quiz button
btnStartEl.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    currentQuestion = 0
    switchPage(pgHome, pgQuestion);
    countDown(event);
    renderQuestion(currentQuestion);
})

// try again button that starts the quiz again
btnTryAgain.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    currentQuestion = 0
    switchPage(pgEndBad, pgQuestion);
    countDown(event);
    renderQuestion(currentQuestion);
})

// button that sends the user to the inital home page after failing the quiz
btnHome.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    switchPage(pgEndBad, pgHome);
})

// highscore

// 