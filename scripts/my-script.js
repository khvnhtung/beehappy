/* MEDITATION MODES - INDEX-COMPONENTS.HTML */

// Store references to frequently accessed elements
var backgroundMusicVolumeSlider = document.getElementById('background-music-volume');
var instructorVolumeSlider = document.getElementById('instructor-volume');
var backgroundMusicSelect = document.getElementById('background-music');
var instructorSelect = document.getElementById('instructor');
var meditationDurationSelect = document.getElementById('meditation-duration');
var timerDisplay = document.getElementById('timer-display');

// Initialize variables to store audio elements and progress
var backgroundMusicAudio = new Audio("AUDIOS/Rain.mp3");
var instructorAudio = new Audio("AUDIOS/male-meditation.mp3");
var backgroundMusicPlaying = false;
var instructorPlaying = false;
var countdownInterval; // Variable to store countdown interval

// Add input and change event listeners to the volume sliders
backgroundMusicVolumeSlider.addEventListener('input', updateBackgroundMusicVolume);
backgroundMusicVolumeSlider.addEventListener('change', updateBackgroundMusicVolume);
instructorVolumeSlider.addEventListener('input', updateInstructorVolume);
instructorVolumeSlider.addEventListener('change', updateInstructorVolume);

// Function to update the volume of the background music
function updateBackgroundMusicVolume() {
    var backgroundMusicVolume = parseFloat(backgroundMusicVolumeSlider.value);
    backgroundMusicAudio.volume = backgroundMusicVolume;
}

// Function to update the volume of the instructor sound
function updateInstructorVolume() {
    var instructorVolume = parseFloat(instructorVolumeSlider.value);
    instructorAudio.volume = instructorVolume;
}

// Function to play audio
function playSound(audioFile, volume, duration) {
    var audio = new Audio(audioFile);
    audio.volume = volume;

    audio.addEventListener('playing', function () {
        if (audio === backgroundMusicAudio) {
            backgroundMusicPlaying = true;
        } else if (audio === instructorAudio) {
            instructorPlaying = true;
        }
    });

    audio.addEventListener('ended', function () {
        if (audio === backgroundMusicAudio) {
            backgroundMusicPlaying = false;
        } else if (audio === instructorAudio) {
            instructorPlaying = false;
        }
    });

    audio.play();

    // Update the timer duration
    startTimer(duration, timerDisplay);
}

// Function to format time
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

// Function to update the timer display with the selected duration
function updateTimerDisplay(duration, display) {
    var minutes = parseInt(duration / 60, 10);
    var seconds = parseInt(duration % 60, 10);
    display.textContent = formatTime(minutes) + ":" + formatTime(seconds);
}

// Function to start the timer
function startTimer(duration, display) {
    var timer = duration;
    clearInterval(countdownInterval); // Clear the previous interval
    countdownInterval = setInterval(function () {
        var minutes = parseInt(timer / 60, 10);
        var seconds = parseInt(timer % 60, 10);
        display.textContent = formatTime(minutes) + ":" + formatTime(seconds);

        if (--timer < 0) {
            clearInterval(countdownInterval);
            // You can add code here to close the popup or show a message
        }
    }, 1000);
}

// Find all elements that open the popup
document.querySelectorAll('[data-menu="ad-timed-2"]').forEach(function (element) {
    element.addEventListener('click', function () {
        var meditationDuration = parseInt(meditationDurationSelect.value, 10);
        updateTimerDisplay(meditationDuration, timerDisplay);
    });
});

// Play Layered Sounds Button Click Event
document.getElementById('play-layered-sounds').addEventListener('click', function () {
    if (isPlaying) {
        // If audio is currently playing, pause it
        pauseAudioAndTimers();
        // Update the "Pause" button text to "Resume" when paused
        pauseButton.textContent = "Resume";
    } else {
        // If audio is paused, play it
        var backgroundMusic = backgroundMusicSelect.value;
        var instructor = instructorSelect.value;
        var meditationDuration = parseInt(meditationDurationSelect.value, 10);

        var timerDuration = meditationDuration;
        updateTimerDisplay(timerDuration, timerDisplay);

        var backgroundMusicVolume = parseFloat(backgroundMusicVolumeSlider.value);
        var instructorVolume = parseFloat(instructorVolumeSlider.value);

        playSound("AUDIOS/" + backgroundMusic + ".mp3", backgroundMusicVolume, timerDuration);
        playSound("AUDIOS/" + instructor + "-meditation.mp3", instructorVolume, timerDuration);

        setInterval(function () {
            if (backgroundMusicPlaying) {
                updateBackgroundMusicVolume();
            }
            if (instructorPlaying) {
                updateInstructorVolume();
            }
        }, 100); // Adjust the interval as needed

        // Update the "Pause" button text to "Pause" when resumed
        pauseButton.textContent = "Pause";
        // Set the flag to indicate that audio is playing
        isPlaying = true;
    }
});
// Add an event listener to the "Meditation Duration" dropdown to update the timer display immediately
meditationDurationSelect.addEventListener('change', function () {
    var meditationDuration = parseInt(this.value, 10);
    updateTimerDisplay(meditationDuration, timerDisplay);
});

document.addEventListener("DOMContentLoaded", function () {
    // Initial setup, adjust as needed
    updateBackgroundMusicVolume();
    updateInstructorVolume();
    updateTimerDisplay(0, timerDisplay);
});

// Add a reference to the pause button
var pauseButton = document.getElementById('pause-layered-sounds');

// Variable to track whether audio is currently playing
var isPlaying = false;

// Function to pause all audio and timers
function pauseAudioAndTimers() {
    // Pause background music and instructor audio
    backgroundMusicAudio.pause();
    instructorAudio.pause();

    // Clear the countdown interval
    clearInterval(countdownInterval);

    // Set the flag to indicate that audio is paused
    isPlaying = false;
}

// Function to handle pause button click event
pauseButton.addEventListener('click', function () {
    if (isPlaying) {
        // If audio is currently playing, pause it
        pauseAudioAndTimers();
        // Update the button text to "Resume" when paused
        pauseButton.textContent = "Tiếp tục";
    } else {
        // If audio is paused, resume it
        backgroundMusicAudio.play();
        instructorAudio.play();
        // Resume the timer
        startTimer(parseInt(meditationDurationSelect.value, 10), timerDisplay);
        // Update the button text to "Pause" when resumed
        pauseButton.textContent = "Tạm dừng";
        // Set the flag to indicate that audio is playing
        isPlaying = true;
    }
});


// SOME OTHER CODE HERE FOR MOOD CALENDAR I SUPPOSE

   function showMoodInfoCard(day) {
       // Placeholder data - replace with actual data as needed
       var mood = "Vui"; // Example mood
       var activity = "Ở nhà, lái xe, cùng bạn bè"; // Example activity

       // Update placeholders
       document.getElementById('moodPlaceholder').textContent = mood;
       document.getElementById('activityPlaceholder').textContent = activity;

       // Show mood info card
       var moodInfoCard = document.getElementById('moodInfoCard');
       moodInfoCard.classList.add('active');
       moodInfoCard.style.display = 'block'; // Make the card visible

       // Wait for the next animation frame to add the opacity transition
       requestAnimationFrame(() => {
           moodInfoCard.style.opacity = 1;
       });
   }

   function closeMoodInfoCard() {
       var moodInfoCard = document.getElementById('moodInfoCard');
       moodInfoCard.style.opacity = 0;

       // Wait for the transition to finish before hiding the card
       moodInfoCard.addEventListener('transitionend', () => {
           moodInfoCard.classList.remove('active');
           moodInfoCard.style.display = 'none'; // Hide the card after transition
       }, {
           once: true
       });
   }

