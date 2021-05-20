var answerText = "";
var time = 60;
var timeLimit;
var questionDiv = document.querySelector("#questionBlock");
var alertBoxDiv = document.querySelector("#alertBox");
var answerDiv = document.querySelector("#answerResult");
var endGameDiv = document.querySelector("#endGameBlock");
var optionButtons = [document.querySelector("#quizOption1"), document.querySelector("#quizOption2"),
document.querySelector("#quizOption3"), document.querySelector("#quizOption4")]
var playerInitials = document.querySelector("#playerInitials");
var questionNum = 0;
var scoresArray;
playerInitials.value = '';

if (localStorage.getItem("localHighScores")) {
    scoresArray = JSON.parse(localStorage.getItem("localHighScores"));
} else {
    scoresArray = [];
}

function startQuiz() {
    event.stopPropagation();
    document.querySelector("#titleScreen").style = "animation-play-state: running;"
    document.querySelector(".navbar-text").textContent = "Time: " + time;
    changeQuestion();
    setTimeout(function () {
        document.querySelector("#titleScreen").style = "display: none;";
        document.querySelector("#questionBlock").style = "display: block;";
        document.querySelector("#questionBlock").className = "slideUp";
    }, 400);

    timeLimit = setInterval(function () {
        time--;
        document.querySelector(".navbar-text").textContent = "Time: " + time;
        if (time <= 0) {
            clearInterval(timeLimit);
            showEndGame();
        }
    }, 1000);
}

function changeQuestion() {
    var questionInfo = questions[questionNum];
    if (questionInfo == undefined) {
        clearInterval(timeLimit);
        showEndGame();
        return;
    }
    setTimeout(function () {
        for (var i = 0; i < optionButtons.length; i++) {
            optionButtons[i].textContent = i + 1 + '. ' + questionInfo.choices[i];
            optionButtons[i].value = questionInfo.choices[i];
        }
        document.querySelector("#questionPrompt").textContent = questionInfo.title;
        questionDiv.className = "questionFadeIn";
    }, 400);

}

function checkAnswer() {
    if (event.target.nodeName == "BUTTON") {
        var playerAnswer = event.target.value;
        if (playerAnswer) {
            if (playerAnswer === questions[questionNum].answer) {
                answerText = "Correct!";
                time += 10;
            } else {
                answerText = "Wrong!";
                time -= 10;
                if (time <= 0) {
                    time = 0;
                }
            }
            answerDiv.innerHTML = `<hr /> ${answerText}`
            if (answerDiv.style != "display: block;") {
                answerDiv.style = "display: block;";
            }
            answerDiv.className = "answerSlideUp";
            setTimeout(function () {
                answerDiv.className = "fadeAway";
                setTimeout(function () {
                    answerDiv.style = "display: none;";
                }, 300);
            }, 700);
            questionDiv.className = "questionFadeOut";
        }
        questionNum++;
        changeQuestion();
    }
}

function showEndGame() {
    document.querySelector(".navbar-text").textContent = "Time: " + time;
    if (time != 0) {
        document.querySelector("#showScore").textContent = time;
    } else {
        document.querySelector("#showScore").textContent = "DNF";
    }
    if (questionDiv.className != "questionFadeOut") {
        questionDiv.className = "questionFadeOut";
    }
    setTimeout(function () {
        questionDiv.style = "display: none;";
        answerDiv.style = "display: none;";
        endGameDiv.style = "display: block;";
        endGameDiv.className = "slideDown";
    }, 700)
}

function submitAndSaveScore(event) {
    event.preventDefault();
    if (playerInitials.value.trim() == '') {
        if (alertBoxDiv.style != "display:block;") {
            alertBoxDiv.style = "display:block;";

            setTimeout(function () {
                alertBoxDiv.style = "display: none;";
            }, 1000);
        }
        return;
    } else {
        var newHighScore = {
            initials: playerInitials.value.toUpperCase().trim(),
            score: time
        };
        scoresArray.push(newHighScore);
        scoresArray.sort(function (a, b) { return b.score - a.score });
        localStorage.setItem("localHighScores", JSON.stringify(scoresArray));
        window.location.href = "./scores.html"
    }
}

document.querySelector("#quizStart").onclick = startQuiz;
document.addEventListener("click", checkAnswer);
document.querySelector("#submitButton").onclick = submitAndSaveScore;
