(() => {
    console.log('Content script is running!');
    const chatGPTTextArea = document.getElementById('prompt-textarea');

    chrome.runtime.sendMessage({ type: 'fromContentScript', data: 'Hello from content script!' });

    function enableGPTButton(sendButtonRef) {
        if (sendButtonRef) {
            sendButtonRef.disabled = false;
            sendButtonRef.removeAttribute('disabled');
        } else {
            console.log('fun:enableGPTButton - Invalid reference.')
        }
    }

    function clickGPTButton(sendButtonRef) {
        sendButtonRef.click();
    }

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('>> new message on contentscript', message)
        if (message.type === 'ALL_GREEN') {
            console.log('I am on the CHATGPT page!');
            chrome.runtime.sendMessage({ type: 'onChatGPTPage', data: 'Hello from content script!' });
        }
        else if (message.type === 'micButtonClickedonGPTPage') {
            chatGPTTextArea.value = ' Ayo!!!';
            chatGPTTextArea.dispatchEvent(new Event('input', { bubbles: true }));
            let sendButtonElement = chatGPTTextArea.nextElementSibling;
            setTimeout(() => {
                enableGPTButton(sendButtonElement);
                clickGPTButton(sendButtonElement);
            }, 1000);
        }
        else {
            chrome.runtime.sendMessage({ type: 'onAnotherPage', data: 'Hello from content script!' });
        }
    });
})();