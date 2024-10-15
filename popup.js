document.addEventListener('DOMContentLoaded', () => {
  // Load last analysis result
  chrome.storage.local.get('lastAnalysis', (data) => {
    if (data.lastAnalysis) {
      updateResult(data.lastAnalysis.sentiment, data.lastAnalysis.confidence);
    }
  });

  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateSentiment') {
      if (request.error) {
        updateError(request.error);
      } else {
        updateResult(request.sentiment, request.confidence);
      }
    }
  });

  // Analyze entire page
  document.getElementById('analyzePage').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'analyzePage'});
    });
  });

  // Reset functionality
  document.getElementById('resetButton').addEventListener('click', () => {
    resetAnalysis();
  });
});

function updateResult(sentiment, confidence) {
  const resultDiv = document.getElementById('result');
  const sentimentIcon = getSentimentIcon(sentiment);
  resultDiv.innerHTML = `${sentimentIcon} Sentiment: ${sentiment}<br>Confidence: ${confidence}`;
  resultDiv.style.color = getSentimentColor(sentiment);
  resultDiv.style.backgroundColor = getSentimentBackgroundColor(sentiment);
}

function updateError(errorMessage) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `❌ ${errorMessage}`;
  resultDiv.style.color = 'white';
  resultDiv.style.backgroundColor = '#ff4444';
}

function getSentimentIcon(sentiment) {
  switch(sentiment.toLowerCase()) {
    case 'positive': return '\u{1F60A}'; // 😊
    case 'negative': return '\u{1F61E}'; // 😞
    default: return '\u{1F610}'; // 😐
  }
}

function getSentimentColor(sentiment) {
  switch(sentiment.toLowerCase()) {
    case 'positive': return '#006400';
    case 'negative': return '#8b0000';
    default: return '#333';
  }
}

function getSentimentBackgroundColor(sentiment) {
  switch(sentiment.toLowerCase()) {
    case 'positive': return '#e6ffe6';
    case 'negative': return '#ffe6e6';
    default: return '#e8e8e8';
  }
}

function resetAnalysis() {
  // Clear the stored analysis
  chrome.storage.local.remove('lastAnalysis', () => {
    // Reset the display
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Select text and use the context menu to analyze sentiment.';
    resultDiv.style.color = '#333';
    resultDiv.style.backgroundColor = '#e8e8e8';
  });
}
