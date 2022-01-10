// define all pages
var pgHome = document.getElementById("home-page");
var pgQuestion = document.getElementById("question-page");
var pgEndGood = document.getElementById("end-page-good");
var pgEndBad = document.getElementById("end-page-bad");
var pgHighscore = document.getElementById('highscore-page');

// define elements
    // Home
var timerEl = document.getElementById("timer");
var btnStartEl = document.getElementById("start-btn");
    // question page
var questionEl = document.getElementById('question');
var choicesList = document.getElementById('choices-list');
var feedbackEl = document.getElementById('feedback');
    // good end page
var spanScore = document.getElementById('spanScore');
var btnSubmitHighscore = document.getElementById('submit-highscore-btn');
var inputNameEl = document.getElementById("input-player-name");
    // bad end page
var btnTryAgain1 = document.getElementById('try-again-btn1');
var btnHome1 = document.getElementById('home-btn1');
    // highscore page
var noHighscoreEl = document.getElementById('no-highs');
var btnClearHighscores = document.getElementById('clear-highscore-btn');
var btnTryAgain2 = document.getElementById('try-again-btn2');
var btnHome2 = document.getElementById('home-btn2');
var highscoreListEl = document.getElementById('highscoresList');


// global variables
var currentQuestion = 0
var secsLeft = 60
var feedbackTime = 1

// start timer function
function countDown() {
    secsLeft = 60
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
});

// try again button that starts the quiz again
btnTryAgain1.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    currentQuestion = 0
    switchPage(pgEndBad, pgQuestion);
    countDown(event);
    renderQuestion(currentQuestion);
});

// button that sends the user to the inital home page after failing the quiz
btnHome1.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    switchPage(pgEndBad, pgHome);
});

// try again button that starts the quiz again
btnTryAgain2.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    currentQuestion = 0
    switchPage(pgHighscore, pgQuestion);
    countDown(event);
    renderQuestion(currentQuestion);
});

// button that sends the user to the inital home page after failing the quiz
btnHome2.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    switchPage(pgHighscore, pgHome);
});

function compare( obj1, obj2 ) {
// compare the objects based on personName property
    if ( obj1.score < obj2.score ){
        return 1;
    };
    if ( obj1.score > obj2.score ){
        return -1;
    };
    return 0;
};

var hs = [];

function init() {
    // Get stored todos from localStorage
    var storedHS = JSON.parse(localStorage.getItem("highscores"));
  
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedHS !== null) {
      hs = storedHS;
    }
};

function renderHighscores() {
    storedHS = JSON.parse(localStorage.getItem("highscores"));
    if (storedHS === null) {
        noHighscoreEl.textContent = "There are no highscores right now. Give the quiz a go to top the leaderboard!";
        highscoreListEl.textContent = "";
    } else {
        noHighscoreEl.textContent = "";
        highscoreListEl.textContent = "";
        hs = storedHS.sort(compare);
        for (var i = 0; i < hs.length; i++) {
            score = hs[i];
            var li = document.createElement('li');
            li.textContent = score.name + " - " + score.score;
            highscoreListEl.appendChild(li);
        }
    }
    
};

btnSubmitHighscore.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var name = inputNameEl.value
    if (name === "") {
        return;
    }
    thing = {
        name: name,
        score: secsLeft
    }
    hs.push(thing);
    inputNameEl.value = "";

    localStorage.setItem("highscores", JSON.stringify(hs));
    switchPage(pgEndGood, pgHighscore);
    renderHighscores();
});

btnClearHighscores.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    localStorage.clear();
    hs = [];
    renderHighscores();
})



init()

