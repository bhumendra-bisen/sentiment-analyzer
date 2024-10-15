chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzePage') {
    const pageText = document.body.innerText;
    chrome.runtime.sendMessage({
      action: 'analyzePageSentiment',
      text: pageText
    });
  }
});
