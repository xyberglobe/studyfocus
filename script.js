let timer;
let isRunning = false;
let totalTime = 1500; // Default to 25 minutes in seconds
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const studyLog = document.getElementById('study-log');
const backgroundMusic = document.getElementById('background-music');
const musicCheckbox = document.getElementById('music');

function updateDisplay() {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startButton.disabled = true; // Disable start button while running
    timer = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(timer);
            isRunning = false;
            alert("Time's up!");
            if (musicCheckbox.checked) {
                backgroundMusic.play();
            }
            startButton.disabled = false; // Re-enable start button
            return;
        }
        totalTime--;
        updateDisplay();
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    totalTime = parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
    updateDisplay();
    startButton.disabled = false; // Re-enable start button
}

startButton.addEventListener('click', () => {
    totalTime = parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
    updateDisplay();
    startTimer();
});

resetButton.addEventListener('click', resetTimer);
updateDisplay();