var scoresArray = JSON.parse(localStorage.getItem("localHighScores"));
        
function printAndShowLeaderboard() {
    var scoresList = document.querySelector("#scoresList");
    var html = "";
    var scoreAlternating = false;
    for (var i = 0; i < scoresArray.length; i++) {
        if (scoreAlternating) {
            html += `<h3 class="scoreStyle scoreAltColour">${i + 1}. ${scoresArray[i].initials} - ${scoresArray[i].score}</h3>`
            scoreAlternating = false;
        } else {
            html += `<h3 class="scoreStyle">${i + 1}. ${scoresArray[i].initials} - ${scoresArray[i].score}</h3>`
            scoreAlternating = true;
        }
    }
    scoresList.innerHTML = html;
}

function clearSavedScores() {
    localStorage.clear();
    scoresList.innerHTML = "";
}

printAndShowLeaderboard();
document.querySelector("#clearScores").onclick = clearSavedScores;