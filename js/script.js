
const readySound = new Audio('ready.mp3');
const goSound = new Audio('go.mp3');
var delay;
var goTime;
var gameOn = false;
var winner;
var falseStart = false;
var score1 = 0;
var score2 = 0;

const keyWasPressed = (event) => {

    document.getElementById("keycode-display").innerHTML = event.keyCode;
    if (event.keyCode === 90) {
        document.getElementById("button1").click();
    }
    if (event.keyCode === 77) {
        document.getElementById("button2").click();
    }
    if (gameOn && !falseStart) {
        if (event.keyCode === 90) {
            let player1Time = Date.now() - goTime;
            document.getElementById("button1").innerHTML = (player1Time/1000).toFixed(3) + ' sec';
            document.getElementById("ready-button").style.backgroundColor = "orange";
            document.getElementById("ready-button").innerHTML = "Ready";
            gameOn = false;
            winner = 'Player 1 ';
            score1++;
            showScores();
            document.getElementById("showzone").innerHTML = winner + ' wins this round!';
        } else if (event.keyCode === 77) {
            let player2Time = Date.now() - goTime;
            document.getElementById("button2").innerHTML = (player2Time/1000).toFixed(3) + ' sec';
            document.getElementById("ready-button").style.backgroundColor = "orange";
            document.getElementById("ready-button").innerHTML = "Ready";
            gameOn = false;
            winner = 'Player 2 ';
            score2++;
            showScores();
            document.getElementById("showzone").innerHTML = winner + ' wins this round!';
        } else {
            document.getElementById("showzone").innerHTML = 'Cool! Another button! Press Z or M to win!';
            showScores();
        }
    } else if (winner) {
        document.getElementById("showzone").innerHTML = winner + ' won this round!';
        showScores();
    } else {
        falseStart = true;
        document.getElementById("showzone").innerHTML = 'Yoicks! False start!';
        if (event.keyCode === 116) {
            document.getElementById("showzone").innerHTML = 'Hone Your Marks again!';
        }
        if (event.keyCode === 90) {
            document.getElementById("showzone").innerHTML = 'Player 1 lost!';
            document.getElementById("button1").innerHTML = 'Disqualified!';
            gameOn = false;
            score1--;
            showScores();
        }
        if (event.keyCode === 77) {
            document.getElementById("showzone").innerHTML = 'Player 2 lost!';
            document.getElementById("button2").innerHTML = 'Disqualified!';
            gameOn = false;
            score2--;
            showScores();
        }
    }
}


const writeReady = () => {
    document.getElementById("showzone").innerHTML = 'Ready!'
}

const writeGo = () => {
    document.getElementById("showzone").innerHTML = 'Go!'
}

const sayReady = () => {
    readySound.play();
}

const sayGo = () => {
    goSound.play();
}

const resetButtonsTexts = () => {
    document.getElementById("button1").innerHTML = 'Player 1';
    document.getElementById("button2").innerHTML = 'Player 2';
}

const showScores = () => {
    document.getElementById("score1-display").innerHTML = score1;
    document.getElementById("score2-display").innerHTML = score2;
}

const doGo = () => {
    if (!falseStart) {
        document.getElementById("ready-button").style.backgroundColor = "green";
        document.getElementById("ready-button").innerHTML = "Go!";
        writeGo();
        sayGo();
        goTime = Date.now();
        gameOn = true;
    }
}

const doReadyGo = () => {
    if (!gameOn){
        delay = Math.floor(500 + (Math.random()*4000)); // indroduce random delay in a range of 500 to 4499
        document.getElementById("ready-button").style.backgroundColor = "red";
        document.getElementById("ready-button").innerHTML = "Wait!";
        winner = 0;
        falseStart = false;
        resetButtonsTexts();
        writeReady();
        sayReady();
        setTimeout(doGo, delay);
    }
}
