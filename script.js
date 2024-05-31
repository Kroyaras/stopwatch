let startTime;
let running = false;
let interval;

function startStop() {
    if (running) {
        clearInterval(interval);
        running = false;
        document.getElementById("startStopBtn").innerHTML = "Start";
        document.getElementById("recordBtn").disabled = true;
        document.getElementById("bibNumber").disabled = true;
    } else {
        startTime = Date.now();
        interval = setInterval(updateStopwatch, 100);
        running = true;
        document.getElementById("startStopBtn").innerHTML = "Stop";
        document.getElementById("recordBtn").disabled = false;
        document.getElementById("bibNumber").disabled = false;
    }
}

function updateStopwatch() {
    let elapsedTime = Date.now() - startTime;
    let minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let tenths = Math.floor((elapsedTime / 100) % 10);

    minutes = padZero(minutes);
    seconds = padZero(seconds);

    document.getElementById("stopwatch").innerHTML = minutes + ":" + seconds + "." + tenths;
}

function padZero(num) {
    return (num < 10 ? "0" : "") + num;
}

function enterDigit(digit) {
    let currentBib = document.getElementById("bibNumber").value;
    document.getElementById("bibNumber").value = currentBib + digit;
}

function recordTime() {
    let bibNumber = document.getElementById("bibNumber").value;
    let timestamp = document.getElementById("stopwatch").innerText;
    let timeEntry = `<div>${bibNumber}: ${timestamp}</div>`;
    document.getElementById("timesList").innerHTML += timeEntry;
    document.getElementById("bibNumber").value = ""; // Clear the bib entry box
}

