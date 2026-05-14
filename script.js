    let seconds = 0;
    let minutes = 0;
    let miliseconds = 0;
    let interval;

    let inspection = false;
    let inspectionTime = 15;
    let inspectionInterval;

    let timerRunning = false;
    let readyToStart = false;

function startInspection() {
    inspection = true;
    inspectionTime = 15;
    document.getElementById("timer").innerHTML = "15";

    inspectionInterval = setInterval(() => {
        inspectionTime--;
        document.getElementById("timer").innerHTML = inspectionTime;

        if (inspectionTime <= 0) {
            clearInterval(inspectionInterval);
            inspection = false;
            startSolve();
        }
    }, 1000);
}

function startSolve() {
    timerRunning = true;
    interval = setInterval(() => {
        miliseconds++;
        if (miliseconds === 100) {
            miliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        document.getElementById("timer").innerHTML =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${miliseconds.toString().padStart(2, '0')}`;
    }, 10);
}

function stopSolve() {
    clearInterval(interval);
    timerRunning = false;
    submitSolve(document.getElementById("timer").innerHTML);
}

function startAndStop() {
    if (!timerRunning && !inspection) {
        startInspection();
    } else if (timerRunning) {
        stopSolve();
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

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();

        if (!timerRunning && !inspection) {
            readyToStart = true;
            document.getElementById("timer").style.color = "red";
        }
        else if (!timerRunning && inspection) {
            clearInterval(inspectionInterval);
            inspection = false;
            startSolve();
        }
        else if (timerRunning) {
            stopSolve();
        }
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
        e.preventDefault();

        if (readyToStart && !timerRunning && !inspection) {
            readyToStart = false;
            document.getElementById("timer").style.color = "white";
            startAndStop();
        }
    }
});

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
    const menu = document.getElementById("menu-items");
    menu.classList.toggle("active");
}

function darkmode() {
    const isDark = document.body.classList.toggle("dark-mode");

    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
}
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
});

window.onload = function () {
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "enabled") {
        document.body.classList.add("dark-mode");
    }
};

function nav_toggle() {
    const nav = document.querySelector("nav");
    nav.classList.toggle("active");
}
window.addEventListener("scroll", function () {
    const btn = document.getElementById("scrollTopBtn");

    if (window.scrollY > 300) {
        btn.classList.add("show");
    } else {
        btn.classList.remove("show");
    }
});

function scrolltotop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const toc = document.getElementById("tocPanel");
    const list = document.getElementById("tocList");
    const headings = document.querySelectorAll("h1");

    headings.forEach((h1, index) => {
        if (!h1.id) {
            h1.id = "heading-" + index;
        }

        const item = document.createElement("li");
        item.textContent = h1.textContent;

        item.addEventListener("click", () => {
            document.getElementById(h1.id).scrollIntoView({
                behavior: "smooth"
            });
        });

        list.appendChild(item);
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            toc.classList.add("show");
        } else {
            toc.classList.remove("show");
        }
    });
});

function submitSolve(timeString) {
    const [minSec, ms] = timeString.split(".");
    const [min, sec] = minSec.split(":");

    const totalSeconds =
        (parseInt(min) * 60) +
        parseInt(sec) +
        (parseInt(ms) / 100);

    addSolve(totalSeconds);
}


let solves = JSON.parse(localStorage.getItem("solves")) || [];

function saveSolves() {
    localStorage.setItem("solves", JSON.stringify(solves));
}

function addSolve(seconds) {
    solves.push(seconds);
    saveSolves();
    updateStats();
    updateSolveList();
}

function clearSolves() {
    solves = [];
    saveSolves();
    updateStats();
    updateSolveList();
}

function average(arr) {
    if (arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function updateStats() {
    const best = solves.length ? Math.min(...solves) : 0;
    const worst = solves.length ? Math.max(...solves) : 0;
    const mean = average(solves);

    const ao5 = solves.length >= 5 ? average(solves.slice(-5)) : 0;
    const ao12 = solves.length >= 12 ? average(solves.slice(-12)) : 0;

    document.getElementById("best").textContent = best.toFixed(2);
    document.getElementById("worst").textContent = worst.toFixed(2);
    document.getElementById("mean").textContent = mean.toFixed(2);
    document.getElementById("ao5").textContent = ao5.toFixed(2);
    document.getElementById("ao12").textContent = ao12.toFixed(2);
}

function updateSolveList() {
    const list = document.getElementById("solveList");
    list.innerHTML = "";

    solves.forEach((s, i) => {
        const li = document.createElement("li");
        li.textContent = `${(i + 1)}. ${s.toFixed(2)}s`;
        list.appendChild(li);
    });
}

window.onload = () => {
    updateStats();
    updateSolveList();
};
