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
var btnHomeHighscores = document.getElementById("c_hs");
    // question page
var questionEl = document.getElementById('question');
var choicesList = document.getElementById('choices-list');
var feedbackEl = document.getElementById('feedback');
    // good end page
var spanScore = document.getElementById('spanScore');
var btnSubmitHighscore = document.getElementById('submit-highscore-btn');
var inputNameEl = document.getElementById("input-player-name");
var btnHome3 = document.getElementById("home-btn3");
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
var gameTime = 60;
var currentQuestion = 0;
var secsLeft = gameTime;
var feedbackTime = 1;
var time;
var ones;

// a function to covert a number to a asthetic time to input into timer
function timeFormat(number) {
    if (number>=130){
        ones = number-120
        return time = "2:" + ones
    } else if (number>=120){
        ones = number-120
        return time = "2:0" + ones
    } else if (number>=70){
        ones = number-60
        return time = "1:" + ones
    } else if (number>=60) {
        ones = number-60
        return time = "1:0" + ones
    } else if (number>=10) {
        return time = "0:" + number
    } else {
        return time = "0:0" + number
    }
};

// start timer function
function countDown() {
    timerEl.textContent = timeFormat(secsLeft);
    window.timeInterval = setInterval(function() {
        secsLeft--;
        timerEl.textContent = timeFormat(secsLeft);
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
    score = secsLeft;
    secsLeft = gameTime;
    currentQuestion = 0;
    switchPage(pgQuestion, pgEndGood);
    clearInterval(window.timeInterval);
    spanScore.textContent = score;
};

// check the answer clicked on by the user and move to next question or end game
function checkAnswer(event) {
    event.preventDefault();
    event.stopPropagation();
    var isCorrect = event.target.getAttribute('data-is-correct') === 'true';
    // if answer is correct, show correct in feedback element
    if (isCorrect) {
        var fedbak = document.createElement('p');
        fedbak.textContent = "Correct! :D";
        feedbackEl.appendChild(fedbak);
        setTimeout(function() {
            feedbackEl.removeChild(fedbak);
        }, 1000)
    } 
    // if answer is incorrect, show wrong in feedback element and subtract 10 secs from time left
    if (!isCorrect) {
        secsLeft = secsLeft - 10;
        var fedbak = document.createElement('p');
        fedbak.textContent = "Wrong :/";
        feedbackEl.appendChild(fedbak);
        setTimeout(function() {
            feedbackEl.removeChild(fedbak);
        }, 1000);
    }
    // increase question to move to next question
    currentQuestion++;
    // check if current question is the last question
    if (currentQuestion >= questions.length){
        // if time is less than zero, score should not be submited
        if (secsLeft < 0) {
            secsLeft = gameTime;
            currentQuestion = 0;
            timerEl.textContent = timeFormat(0);
            clearInterval(window.timeInterval);
            switchPage(pgQuestion, pgEndBad);
        } else {
            // else score can be added to local storage
            endGame();
        }
    } else {
        // else keep going through the questions
        renderQuestion(currentQuestion);
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
            btn.setAttribute('class', 'btn-option')
            btn.setAttribute('id', question.answers[i].answer);
            btn.addEventListener('click', checkAnswer);
            li.appendChild(btn);
            choicesList.appendChild(li);
        }
    // if the question is multiple choice show with different styling
    } else if (question.type === "multiple-choice") {
        choicesList.classList.add('multiple-choice');
        for (var i = 0; i < question.answers.length; i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'multiLi')
            var btn = document.createElement('btn');
            btn.textContent = question.answers[i].answer;
            btn.setAttribute('data-is-correct', question.answers[i].isCorrect);
            btn.setAttribute('class', 'btn-option');
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
    switchPage(pgHome, pgQuestion);
    countDown();
    renderQuestion(currentQuestion);
});

// try again button that starts the quiz again
btnTryAgain1.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    switchPage(pgEndBad, pgQuestion);
    countDown();
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
    switchPage(pgHighscore, pgQuestion);
    countDown();
    renderQuestion(currentQuestion);
});

// button that sends the user to the inital home page after failing the quiz
btnHome2.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    switchPage(pgHighscore, pgHome);
});
// button to send the user home from good ending page
btnHome3.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    switchPage(pgEndGood, pgHome);
});

//  function to compare scores and order them
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

// creation of high score array
var hs = [];

// a function run on page load to retrieve any scores stored in local storage
function init() {
    // Get stored todos from localStorage
    var storedHS = JSON.parse(localStorage.getItem("highscores"));
  
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedHS !== null) {
      hs = storedHS;
    }
    timerEl.textContent = timeFormat(gameTime);
};

// function to render high scores from local storage
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
            li.classList.add('highLi')
            li.textContent = score.name + " - " + score.score;
            highscoreListEl.appendChild(li);
        }
    }
    
};

//  button to submit name and highscore to local storage
btnSubmitHighscore.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var name = inputNameEl.value
    if (name === "") {
        return;
    }
    thing = {
        name: name,
        score: score
    }
    hs.push(thing);
    inputNameEl.value = "";

    localStorage.setItem("highscores", JSON.stringify(hs));
    switchPage(pgEndGood, pgHighscore);
    renderHighscores();
});

// button to clear local storage
btnClearHighscores.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    localStorage.clear();
    hs = [];
    renderHighscores();
});

// button to move to high score page from any page in the app
btnHomeHighscores.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    clearInterval(window.timeInterval);
    score = secsLeft;
    secsLeft = gameTime;
    currentQuestion = 0;
    pgHome.classList.add('hidded');
    pgQuestion.classList.add('hidded');
    pgEndGood.classList.add('hidded');
    pgEndBad.classList.add('hidded');
    pgHome.classList.add('hidded');
    pgHighscore.classList.remove('hidded');
    renderHighscores();
});

init()

