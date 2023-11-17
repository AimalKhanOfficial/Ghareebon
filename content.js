const allWebSitesNames = [
    "amazon",
    "daraz",
    "olx"
];

(() => {
    console.log('Content script is running!');

    const websiteMatches = (currentWebsite) => {
        for (let i = 0; i < allWebSitesNames.length; i++) {
            if (currentWebsite.includes(allWebSitesNames[i])) {
                return true;
            }
        }
        return false;
    }

    const playAudio = () => {
        const audio = new Audio();
        audio.src = chrome.runtime.getURL('audio/ghareebon.mp3');
        audio.play();
    }

    const addImageAndAnimate = () => {
        const img = document.createElement('img');
        const imageUrl = chrome.runtime.getURL('assets/shahid.png');
        img.src = imageUrl;
        img.alt = 'Shahid PNG';
        document.body.appendChild(img);
        const cssStyles = `
            position: fixed;
            bottom: -100px;
            height: 250px;
            width: 250px;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            animation: slideUp 2s ease-in-out forwards;
        `;
        // Define the animation using CSS directly within the content script
        const styles = `
            @keyframes slideUp {
                0% {
                    bottom: -100px;
                    opacity: 0;
                }
                100% {
                    bottom: 0;
                    opacity: 1;
                }
            }
            @keyframes slideDown {
                0% {
                  bottom: 0;
                  opacity: 1;
                }
                100% {
                  bottom: -100px;
                  opacity: 0;
                }
              }
        `;

        // Create a <style> tag and append CSS rules to it
        const styleSheet = document.createElement('style');
        styleSheet.innerText = styles;

        // Append the <style> tag to the document head
        document.head.appendChild(styleSheet);
        img.style.cssText = cssStyles;
        chrome.runtime.sendMessage({ action: 'playAudio' });
        setTimeout(() => {
            img.style.animation = 'slideDown 2s ease-in-out forwards';
        }, 2500);
    }

    function checkWebsite() {
        const currentURL = window.location.href;
        if (websiteMatches(currentURL.toLowerCase())) {
            console.log('You are on the target website:', currentURL);
            addImageAndAnimate();
        }
    }

    // Execute the checkWebsite function when the page loads
    window.addEventListener('load', checkWebsite);
})();