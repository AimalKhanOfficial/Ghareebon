/**
 * Plays audio files from extension service workers
 * @param {string} source - path of the audio file
 * @param {number} volume - volume of the playback
 */
async function playSound(source = '/assets/ghareebon.mp3', volume = 1) {
    await createOffscreen();
    await chrome.runtime.sendMessage({ play: { source, volume } });
}

// Create the offscreen document if it doesn't already exist
async function createOffscreen() {
    if (await chrome.offscreen.hasDocument()) return;
    await chrome.offscreen.createDocument({
        url: '/offscreen/offscreen.html',
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'testing' // details for using the API
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'playAudio') {
        playSound();
    }
});