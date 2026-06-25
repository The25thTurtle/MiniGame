let symbols = ["🍎","🍎","⭐","⭐","🚀","🚀","🎮","🎮"];

let firstCard = null;
let secondCard = null;

let score = 0;
let attempts = 0;
let time = 0;

let timer;
let lockBoard = false; // 🔥 prevents spam clicking

function startGame() {

    document.getElementById("game").innerHTML = "";

    symbols.sort(() => Math.random() - 0.5);

    score = 0;
    attempts = 0;
    time = 0;

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    document.getElementById("score").innerHTML = score;
    document.getElementById("attempts").innerHTML = attempts;
    document.getElementById("time").innerHTML = time;

    clearInterval(timer);

    timer = setInterval(() => {
        time++;
        document.getElementById("time").innerHTML = time;
    }, 1000);

    symbols.forEach(symbol => {

        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = "?";
        card.dataset.symbol = symbol;

        card.onclick = function () {

            if (lockBoard) return;              // 🔥 prevents abuse
            if (card.innerHTML !== "?") return;

            card.innerHTML = symbol;

            if (!firstCard) {
                firstCard = card;
                return;
            }

            secondCard = card;
            attempts++;
            document.getElementById("attempts").innerHTML = attempts;

            checkMatch();
        };

        document.getElementById("game").appendChild(card);
    });
}

function checkMatch() {

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {

        score++;
        document.getElementById("score").innerHTML = score;

        firstCard = null;
        secondCard = null;

        // ✅ better win condition (dynamic)
        if (score === symbols.length / 2) {
            clearInterval(timer);
            alert("You finished! Time: " + time + " seconds");
        }

    } else {

        lockBoard = true; // 🔥 freeze board during animation

        setTimeout(() => {

            firstCard.innerHTML = "?";
            secondCard.innerHTML = "?";

            firstCard = null;
            secondCard = null;

            lockBoard = false;

        }, 800);
    }
}

function restartGame() {
    startGame();
}

startGame();