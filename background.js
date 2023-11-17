// background.js

// Create an audio element in the background script
const audio = new Audio();
audio.src = chrome.runtime.getURL('assets/ghareebon.mp3'); // Adjust the audio path accordingly

// Function to play the audio
function playAudio() {
  audio.play()
    .then(() => {
      console.log('Audio playback started!');
    })
    .catch(error => {
      console.error('Error playing audio:', error);
    });
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'playAudio') {
    playAudio();
  }
});