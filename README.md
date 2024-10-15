# Sentiment Analyzer Chrome Extension

## Overview
The Sentiment Analyzer is a Chrome extension that allows users to analyze the sentiment of selected text on any webpage. It uses the Hugging Face Inference API with the DistilBERT model fine-tuned for sentiment analysis to provide accurate sentiment predictions.

## Features
- Analyze sentiment of selected text via context menu
- Analyze sentiment of entire webpage
- Display sentiment result with confidence score
- User-friendly popup interface with color-coded results
- Reset functionality to clear previous analyses

## Installation
1. Clone this repository or download the source code.
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage
1. Select text on any webpage.
2. Right-click and choose "Analyze Sentiment" from the context menu.
3. View the sentiment analysis result in the popup.
4. Click the extension icon to open the popup and see the last analysis result.
5. Use the "Analyze Entire Page" button to analyze the sentiment of the whole webpage.
6. Use the "Reset" button to clear the previous analysis.

## Files
- `manifest.json`: Extension configuration
- `background.js`: Handles context menu creation and API requests
- `popup.html`: HTML structure for the extension popup
- `popup.js`: JavaScript for popup functionality
- `content.js`: Content script for page interaction
- `images/`: Directory containing extension icons

## API
This extension uses the Hugging Face Inference API with the DistilBERT model fine-tuned for sentiment analysis. You need to replace the `API_TOKEN` in `background.js` with your own Hugging Face API token.

## Development
To modify or extend the extension:
1. Edit the relevant files (`background.js`, `popup.js`, `popup.html`, etc.)
2. Save your changes
3. Go to `chrome://extensions/`
4. Click the refresh icon on the extension card to reload it

## Privacy
This extension sends selected text to the Hugging Face API for sentiment analysis. No personal data is collected or stored beyond the current browsing session.

## License
[MIT License](https://opensource.org/licenses/MIT)

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## Support
If you encounter any issues or have questions, please open an issue in the GitHub repository.
