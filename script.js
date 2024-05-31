let timer;
let startTime;
let elapsedTime = 0;
let running = false;

function formatTime(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = time % 1000;

  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');
  milliseconds = String(milliseconds).padStart(3, '0');

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  document.getElementById('display').textContent = formatTime(elapsedTime);
}

function startStop() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function() {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    document.getElementById('startStopBtn').textContent = 'Stop';
  } else {
    clearInterval(timer);
    document.getElementById('startStopBtn').textContent = 'Start';
  }
  running = !running;
}

function reset() {
  clearInterval(timer);
  running = false;
  elapsedTime = 0;
  updateDisplay();
  document.getElementById('startStopBtn').textContent = 'Start';
}
// Existing code...

// Function to handle numpad button click
function handleNumButtonClick(event) {
    const num = event.target.textContent;
    document.getElementById('bibNumberInput').value += num;
  }
  
  // Add event listeners to numpad buttons
  const numButtons = document.querySelectorAll('.numBtn');
  numButtons.forEach(button => {
    button.addEventListener('click', handleNumButtonClick);
  });
  // Existing code...

// Function to handle capture button click
function handleCaptureButtonClick() {
    const bibNumber = document.getElementById('bibNumberInput').value.trim();
    if (bibNumber === '') {
      alert('Please enter a bib number.');
      return;
    }
    
    const time = formatTime(elapsedTime);
    const finishersList = document.getElementById('finishersList');
    const listItem = document.createElement('li');
    listItem.textContent = `Bib Number: ${bibNumber} - Time: ${time}`;
    finishersList.appendChild(listItem);
  
    // Clear bib number input field
    document.getElementById('bibNumberInput').value = '';
  }
  
  // Add event listener to capture button
  document.getElementById('captureBtn').addEventListener('click', handleCaptureButtonClick);
  
// Function to handle finishing the race and exporting the list of bib numbers
// Function to handle finishing the race and exporting the list of bib numbers with stopwatch times
function finishRace() {
    const finishers = Array.from(document.querySelectorAll('#finishersList li'))
                           .map(item => item.textContent.split('-').map(entry => entry.trim()));
  
    if (finishers.length === 0) {
      alert('No finishers to export.');
      return;
    }
  
    let textToSave = '';
    finishers.forEach(finisher => {
      const bibNumber = finisher[0].split(':')[1].trim();
      const time = finisher[1].split(':')[1].trim();
      textToSave += `Bib Number: ${bibNumber} - Time: ${time}\n`;
    });
  
    // Create a blob for the text content
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
  
    // Create a temporary <a> element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finishers.txt';
    document.body.appendChild(a);
    a.click();
  
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  
  // Add event listener to finish race button
  document.getElementById('finishRaceBtn').addEventListener('click', finishRace);
  
  // Existing code...
  
document.getElementById('startStopBtn').addEventListener('click', startStop);
document.getElementById('resetBtn').addEventListener('click', reset);
