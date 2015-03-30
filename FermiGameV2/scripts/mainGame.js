var turnCounter = 1;
var scorePlayer = 0;
var player;
var gameOver = false;

//function fillField(fieldId) {
//    turnCounter++;
//    var empty = document.getElementById(fieldId).value == '';
//    if (turnCounter % 2 == 0 && empty && !gameOver) {
//        document.getElementById(fieldId).value = 'x';
//    }
//    else if (turnCounter % 2 == 1 && empty && !gameOver) {
//        document.getElementById(fieldId).value = 'o';
//    }
//}
//
//// If Player wins we have to call this func else 'GAME OVER'
//function announceWinner() {
//    document.getElementById('winner').style.display = 'block';
//    if (!gameOver) {
//        if (turnCounter % 2 == 0) {
//            document.getElementById('winnerAnounce').value = "The winner is " + player;
//            scorePlayer++;
//        }
//    }
//    gameOver = true;
//    document.getElementById('scoreboard').innerHTML = player + ": " + scorePlayer;
//}

function beginGame() {
    document.getElementById('game-field').style.display = 'flex';
    document.getElementById('players').style.display = 'none';
    player = document.getElementById('player').value;
    if (player == '') {
        player = 'Player';
    }
}

function resetGame() {
    document.getElementById('winner').style.display = 'none';
    turnCounter = 1;
    gameOver = false;
}

