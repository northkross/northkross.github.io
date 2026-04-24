    let seconds = 0;
    let minutes = 0;
    let miliseconds = 0;
    let interval;

function startAndStop() {
    let startStopBtn = document.getElementById("startStopBtn");
    let timer = document.getElementById("timer");
    if (startStopBtn.innerHTML === "Start") {
        startStopBtn.innerHTML = "Stop";
        interval = setInterval( () => {
            miliseconds++;
            if (miliseconds === 100) {
                miliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${miliseconds.toString().padStart(2, '0')}`;
        }, 10);
    } else {
        clearInterval(interval);
        startStopBtn.innerHTML = "Start";

    }
}

function resetTimer() {
    let timer = document.getElementById("timer");
    clearInterval(interval);
    seconds = 0;
    minutes = 0;
    miliseconds = 0;
    timer.innerHTML = "00:00.00";
}
function randomscramble() {
    const moves = ["R", "R'", "R2", "L", "L'", "L2", "U", "U'", "U2", "D", "D'", "D2", "F", "F'", "F2", "B", "B'", "B2"];
    let scramble1 = "";
    for (let i = 0; i < 25; i++) {
        scramble1 += moves[Math.floor(Math.random() * moves.length)] + " ";
    }
    let scrambleElement = document.getElementById("randomscramble");
    scrambleElement.innerHTML = scramble1;
}

function startBenchmark() {
    let benchmarkBtn = document.getElementById("startBenchmarkBtn");
    let timer = document.getElementById("benchmarkTimer");
    seconds = 0;
    minutes = 0;
    miliseconds = 0;
    timer.innerHTML = "00:00.00";
    if (benchmarkBtn.innerHTML === "Start") {
        benchmarkBtn.innerHTML = "Stop";
        interval = setInterval( () => {
            miliseconds++;
            if (miliseconds === 100) {
                miliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${miliseconds.toString().padStart(2, '0')}`;
        }, 10);
    } else {
        clearInterval(interval);
        benchmarkBtn.innerHTML = "Start";
    }
}

function resetBenchmark() {
    let timer = document.getElementById("benchmarkTimer");
    clearInterval(interval);
    seconds = 0;
    minutes = 0;
    miliseconds = 0;
    timer.innerHTML = "00:00.00";
    randombenchmarkscramble();
}

function randombenchmarkscramble() {
    const moves = ["R", "R'", "R2", "L", "L'", "L2", "U", "U'", "U2", "D", "D'", "D2", "F", "F'", "F2", "B", "B'", "B2"];
    let scramble2 = "";
    for (let i = 0; i < 25; i++) {
        scramble2 += moves[Math.floor(Math.random() * moves.length)] + " ";
    }
    let scrambleElement = document.getElementById("randombenchmarkscramble");
    scrambleElement.innerHTML = scramble2;
}
function toggle() {
    const option = getElementById("options");
    const navtoggle = getElementbyId("menu-toggle");
    option.style.display = "block"
    navtoggle.style.display = "none"
}

function darkmode() {
    const nav = document.getElementById("main-nav");
    nav.style.backgroundColor = "darkgrey"
}