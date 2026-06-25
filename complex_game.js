let symbols = [
    "🍎","🍎",
    "⭐","⭐",
    "🚀","🚀",
    "🎮","🎮",
    "🔥","🔥",
    "⚽","⚽",
    "🎵","🎵",
    "💎","💎"
];

let first = null;
let second = null;

let score = 0;
let combo = 0;
let hints = 2;
let time = 60;

let timer;
let matchedCount = 0;

function startGame() {

    document.getElementById("game").innerHTML = "";

    symbols.sort(() => Math.random() - 0.5);

    score = 0;
    combo = 0;
    hints = 2;
    time = 60;
    matchedCount = 0;

    document.getElementById("score").innerHTML = 0;
    document.getElementById("combo").innerHTML = 0;
    document.getElementById("hints").innerHTML = 2;
    document.getElementById("time").innerHTML = 60;
    document.getElementById("bar").style.width = "0%";

    clearInterval(timer);

    timer = setInterval(() => {
        time--;
        document.getElementById("time").innerHTML = time;

        if (time <= 0) {
            clearInterval(timer);
            alert("Time expired!");
        }
    }, 1000);

    symbols.forEach(symbol => {

        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = "?";
        card.dataset.symbol = symbol;

        card.onclick = function () {

            if (card.innerHTML !== "?") return;

            card.innerHTML = symbol;

            if (first == null) {
                first = card;
            } else {
                second = card;
                checkMatch();
            }
        };

        document.getElementById("game").appendChild(card);
    });
}

function checkMatch() {

    if (first.dataset.symbol === second.dataset.symbol) {

        score++;
        combo++;
        score += combo;

        matchedCount += 2;

        document.getElementById("score").innerHTML = score;
        document.getElementById("combo").innerHTML = combo;

        document.getElementById("bar").style.width =
            (matchedCount / symbols.length) * 100 + "%";

        first = null;
        second = null;

        if (combo >= 3) {
            alert("🔥 Combo Bonus!");
        }

        if (matchedCount === symbols.length) {
            clearInterval(timer);
            alert("You completed the challenge!");
        }

    } else {

        combo = 0;
        document.getElementById("combo").innerHTML = 0;

        setTimeout(() => {
            first.innerHTML = "?";
            second.innerHTML = "?";
            first = null;
            second = null;
        }, 700);
    }
}

function useHint() {

    if (hints <= 0) {
        alert("No hints left");
        return;
    }

    hints--;
    document.getElementById("hints").innerHTML = hints;

    let hiddenCards = [...document.querySelectorAll(".card")]
        .filter(c => c.innerHTML === "?");

    let map = {};

    hiddenCards.forEach(card => {
        let sym = card.dataset.symbol;
        if (!map[sym]) map[sym] = [];
        map[sym].push(card);
    });

    let keys = Object.keys(map).filter(k => map[k].length >= 2);

    if (keys.length === 0) return;

    let randomSymbol = keys[Math.floor(Math.random() * keys.length)];
    let pair = map[randomSymbol];

    pair[0].innerHTML = randomSymbol;
    pair[1].innerHTML = randomSymbol;

    setTimeout(() => {
        pair[0].innerHTML = "?";
        pair[1].innerHTML = "?";
    }, 1000);
}

startGame();