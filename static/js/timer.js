document.addEventListener('DOMContentLoaded', function () {
  // Initialize timer variables
  var timer = parseInt(localStorage.getItem('timerValue')) || 0;
  var timerInterval; // Interval to update the timer
  var isRunning = false; // Flag to track if the timer is running

  var numname = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  // Function to update the timer and display it
  function updateTimer() {
    // Increment the timer value by 1 second
    timer++;

    // Separate the timer value into hours, minutes, and seconds
    var hours = Math.floor(timer / 3600);
    var minutes = Math.floor((timer % 3600) / 60);
    var seconds = timer % 60;

    // Update the display of the timer digits
    document.getElementById('hour-tens').className = 'digit ' + numname[Math.floor(hours / 10)];
    document.getElementById('hour-ones').className = 'digit ' + numname[hours % 10];
    document.getElementById('minute-tens').className = 'digit ' + numname[Math.floor(minutes / 10)];
    document.getElementById('minute-ones').className = 'digit ' + numname[minutes % 10];
    document.getElementById('second-tens').className = 'digit ' + numname[Math.floor(seconds / 10)];
    document.getElementById('second-ones').className = 'digit ' + numname[seconds % 10];
    
    localStorage.setItem('timerValue', timer.toString());
  }

  // Function to handle the button click
  function toggleTimer() {
    if (isRunning) {
      // Stop the timer
      clearInterval(timerInterval);
      startStopButton.textContent = 'Start';
    } else {
      // Start the timer
      timerInterval = setInterval(updateTimer, 1000);
      startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning; // Toggle the running state
  }

  // Attach the toggleTimer function to the start/stop button click event if the button exists
  var startStopButton = document.getElementById('startStopButton');
  if (startStopButton) {
    startStopButton.addEventListener('click', toggleTimer);
  }

  // Function to handle the reset button click
  function resetTimer() {
    // Reset the timer value
    timer = 0;

    // Update the display of the timer digits to show 00:00:00
    document.getElementById('hour-tens').className = 'digit zero';
    document.getElementById('hour-ones').className = 'digit zero';
    document.getElementById('minute-tens').className = 'digit zero';
    document.getElementById('minute-ones').className = 'digit zero';
    document.getElementById('second-tens').className = 'digit zero';
    document.getElementById('second-ones').className = 'digit zero';
    
    // Clear the previous timer value from local storage
    localStorage.removeItem('timerValue');
  }

  // Attach the resetTimer function to the reset button click event if the button exists
  var resetButton = document.getElementById('resetButton');
  if (resetButton) {
    resetButton.addEventListener('click', resetTimer);
  }

  // Initial setup to continue the timer from where it left off
  if (isRunning) {
    timerInterval = setInterval(updateTimer, 1000);
  }
});


