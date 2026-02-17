/**
 * PlainCopy - Popup Script
 * Handles the popup button click and copies selected text as plain text
 */

// Get the copy button element
const copyButton = document.getElementById('copyButton');

// Add click event listener to the button
copyButton.addEventListener('click', async () => {
  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Execute a content script to get the selected text
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getSelectedText
    });
    
    // Get the selected text from the results
    const selectedText = results[0]?.result || '';
    
    if (selectedText.trim() === '') {
      alert('No text selected. Please select some text on the page first.');
      return;
    }
    
    // Copy the text to clipboard as plain text
    await navigator.clipboard.writeText(selectedText);
    
    // Show confirmation alert
    alert('Text copied as plain text!\n\n' + 
          (selectedText.length > 50 
            ? selectedText.substring(0, 50) + '...' 
            : selectedText));
    
  } catch (error) {
    console.error('Error copying text:', error);
    alert('Error copying text. Please make sure you have selected text on the page.');
  }
});

/**
 * Function to get the currently selected text on the page
 * This function is injected into the page context
 * @returns {string} The selected text
 */
function getSelectedText() {
  // Get the selected text using window.getSelection()
  const selection = window.getSelection();
  return selection.toString();
}
