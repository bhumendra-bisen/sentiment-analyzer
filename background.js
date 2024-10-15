// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "analyzeSentiment",
    title: "Analyze Sentiment",
    contexts: ["selection"]
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "analyzeSentiment") {
    analyzeSentiment(info.selectionText, tab.id);
  }
});

async function analyzeSentiment(text, tabId) {
  const API_URL = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";
  const API_TOKEN = "XXXXXXXXXXXXXXXXXXX"; // Replace with your actual token

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: text })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    const sentiment = result[0][0].label;
    const confidence = result[0][0].score;

    // Send result to popup
    chrome.runtime.sendMessage({
      action: 'updateSentiment',
      sentiment: sentiment,
      confidence: confidence.toFixed(2)
    });

    // Store result
    chrome.storage.local.set({ lastAnalysis: { text, sentiment, confidence: confidence.toFixed(2) } });
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    chrome.runtime.sendMessage({
      action: 'updateSentiment',
      error: "Failed to analyze sentiment. Please try again."
    });
  }
}
