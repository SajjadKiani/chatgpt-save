chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("chat.openai.com")) {
  
      chrome.tabs.sendMessage(tabId, {
        type: "LOAD",
      });
    }
});