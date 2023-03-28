const btn = document.querySelector('#convert-btn');
const select = document.querySelector('select');

btn.addEventListener('click', () => {
    const value = select.value;

    // convert chats  to markdown
    if (value === 'md') {
        // send message to content.js
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'CONVERT-MD' }, (response) => {
                const textarea = document.querySelector('textarea');
                const turndownService = new TurndownService();
                const markdown = turndownService.turndown(response.join('<br/><br/>'));
                textarea.value = markdown;
            });
        });
    } else if (value === 'html') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'CONVERT-HTML' }, (response) => {
                const textarea = document.querySelector('textarea');
                textarea.value = response;
            });
        });
    } else if (value === 'json') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'CONVERT-JSON' }, (response) => {
                const textarea = document.querySelector('textarea');
                textarea.value = response;
            });
        });
    }
})

const copyBtn = document.querySelector('#copy-btn');
copyBtn.addEventListener('click', () => {
    const textarea = document.querySelector('textarea');
    textarea.select();
    document.execCommand('copy');
})

const downloadBtn = document.querySelector('#download-btn');
downloadBtn.addEventListener('click', () => {
    const textarea = document.querySelector('textarea');
    const value = select.value;

    const element = document.createElement('a');
    const file = new Blob([textarea.value], { type: 'text/plain' });

    element.href = URL.createObjectURL(file);

    element.download = 'chats.' + value;
    element.click();
})