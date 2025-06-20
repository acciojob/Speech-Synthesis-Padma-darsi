// Your script here.

  const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  // Function to populate voice list
  function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  // Set voice when user selects from dropdown
  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle(); // Restart speaking if voice changes
  }

  // Toggle speaking (cancel + start)
  function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver && msg.text.trim() !== '') {
      speechSynthesis.speak(msg);
    }
  }

  // Update pitch, rate, text values dynamically
  function setOption() {
    msg[this.name] = this.value;
  }

  // Load voices (some browsers delay this)
  speechSynthesis.addEventListener('voiceschanged', populateVoices);

  // Event listeners
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', () => toggle(true));
  stopButton.addEventListener('click', () => toggle(false));

  // Set initial message text
  msg.text = document.querySelector('[name="text"]').value;
