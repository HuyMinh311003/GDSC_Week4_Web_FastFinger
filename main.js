let input = document.getElementById('text-input');
let word = document.getElementById('keyword');
let score = document.getElementById('point');
let mistake = document.getElementById('error');
let resetButton = document.getElementById('btn');
let timeLeft = document.getElementById('time');
let announcement = document.getElementById('announcement');

let keywords = ['cat', 'yellow', 'stairs', 'happy', 'enormous', 'beer', 'clothes', 'shield', 'violet', 'hat', 'mountain', 'horse', 'red',
    'orange', 'super', 'fish', 'whale', 'lucky', 'item', 'bag', 'life', 'die', 'furious', 'sleep', 'excite', 'sit', 'eat', 'food', 'room',
    'word', 'key', 'bike', 'car', 'traffic', 'game', 'board', 'erase', 'flash', 'light', 'dark', 'fire', 'blue', 'sea', 'water', 'boat', 'ice'];

let random = keywords[Math.floor(Math.random() * keywords.length)];
let time = 30;
let point = 0;
let error = 0;
let countdown;

function handleTimer() {
    countdown = setInterval(timer, 1000); //Toc do dem nguoc
}

word.innerHTML = random;

//Ham chay game
function game() {
    score.innerHTML = "Point: " + point;
    mistake.innerHTML = "Error: " + error;
    random = keywords[Math.floor(Math.random() * keywords.length)];
    word.innerHTML = random;
    input.value = "";
}

input.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        if (input.value === random) {
            point++;
            announcement.innerHTML = "Correct";
            game();
        }
        else {
            error++;
            announcement.innerHTML = "Incorrect";
            game();
        }
    }
});

//Restart game
function restart() {
    input.disabled = false;
    handleTimer();
    resetButton.style.display = "none";
    console.log(resetButton);
    point = 0;
    error = 0;
    time = 30;
    game();
    input.hidden = false;
    timeLeft.style.color = "#1288d7";
    timeLeft.style.alignSelf = "start";
    timeLeft.style.fontSize = "23px";
}

resetButton.addEventListener("click", restart);

//Bo dem thoi gian
function timer() {
    timeLeft.innerText = "Time Left: " + time + "s";
    if (time <= 0) {
        time = 0;
        resetButton.innerHTML = "Play Again";

        timeLeft.innerText = "Time Up!!!";
        timeLeft.style.alignSelf = "center";
        timeLeft.style.fontSize = "3rem";

        input.hidden = true;
        resetButton.style.display = "flex";
        clearInterval(countdown);
    }
    else {
        time--;
    }
}

//Keyboard click effect
function handleKeyDown(key) {
    const tempKey = key.toUpperCase();
    //META la nut window
    if (tempKey === " " || tempKey === "CONTROL" || tempKey === "SHIFT" || tempKey === "ALT" || tempKey === "META" || tempKey === "TAB") {
        return; //ignore
    }
    let keyElement = document.getElementById(tempKey);
    console.log(keyElement);
    keyElement.classList.add("isClicked");
    const handleKeyUp = () => {
        keyElement.classList.remove("isClicked");
        window.removeEventListener("keyup", handleKeyUp);
    };
    window.addEventListener("keyup", handleKeyUp);
}

window.addEventListener("keydown", ({ key }) => {
    handleKeyDown(key);
});
