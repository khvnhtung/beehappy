   // LIST-MULTIPURPOSE JOURNAL TRACKING

   function toggleButton(element) {
       element.classList.toggle('selected');
   }

   // Update emotion name based on slider
   document.getElementById('moodSlider').addEventListener('input', updateEmotion);

   function updateEmotion() {
       var moodValue = this.value;
       var moodEmoji = '😐'; // Default to neutral
       var emotionName = '';
       switch (moodValue) {
           case '1':
               moodEmoji = 'buồn 😢';
               emotionName = 'buồn';
               break;
           case '2':
               moodEmoji = 'tức giận 😠';
               emotionName = 'tức giận';
               break;
           case '3':
               moodEmoji = 'bình thường 😐';
               emotionName = 'bình thường';
               break;
           case '4':
               moodEmoji = 'lo lắng 😟';
               emotionName = 'lo lắng';
               break;
           case '5':
               moodEmoji = 'vui 😊';
               emotionName = 'vui';
               break;
       }
       document.getElementById('moodEmoji').textContent = moodEmoji;

       // Update all elements with class 'emotion-name'
       var emotionElements = document.getElementsByClassName('emotion-name');
       for (var i = 0; i < emotionElements.length; i++) {
           emotionElements[i].textContent = emotionName;
       }
   }

   // JavaScript to display the value of the sleep duration slider
   document.getElementById('sleepDuration').oninput = function () {
       document.getElementById('sleepDurationDisplay').textContent = this.value + ' hours';
   };

   document.getElementById('saveLink').onclick = function () {
       // Show the popup
       document.getElementById('successPopup').style.display = 'block';

       // Fade in effect (optional)
       document.getElementById('successPopup').style.opacity = 0;
       var fadeEffect = setInterval(function () {
           if (document.getElementById('successPopup').style.opacity < 1) {
               document.getElementById('successPopup').style.opacity = parseFloat(document.getElementById('successPopup').style.opacity) + 0.2;
           } else {
               clearInterval(fadeEffect);
           }
       }, 50);
   };

   document.getElementById('okButton').onclick = function () {
       // Redirect to 'index-pages.html'
       window.location.href = 'index-pages.html';
   };

   // JavaScript to display the value of the sleep duration slider
   document.getElementById('sleepDuration').oninput = function () {
       document.getElementById('sleepDurationDisplay').textContent = this.value + ' hours';
   };

   // JavaScript to populate exercise time pickers
   window.onload = function () {
       var hoursSelect = document.getElementById('exerciseHours');
       var minutesSelect = document.getElementById('exerciseMinutes');

       for (var i = 0; i <= 23; i++) {
           hoursSelect.options[hoursSelect.options.length] = new Option(i < 10 ? '0' + i : i, i);
       }

       for (var i = 0; i < 60; i++) {
           minutesSelect.options[minutesSelect.options.length] = new Option(i < 10 ? '0' + i : i, i);
       }
   };

   