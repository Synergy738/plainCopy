/**
 * PlainCopy - Background Service Worker
 * Handles context menu creation and text copying functionality
 */

// Create context menu when extension is installed or enabled
chrome.runtime.onInstalled.addListener(() => {
  // Create the context menu item
  chrome.contextMenus.create({
    id: "copyPlainText",
    title: "Copy as Plain Text",
    contexts: ["selection"] // Only show when text is selected
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Only process if text is selected
  if (info.selectionText) {
    copyPlainText(info.selectionText);
  }
});

/**
 * Normalizes text to a single line (removes line breaks and extra spaces)
 * @param {string} text - The text to normalize
 * @returns {string} - Text with line breaks replaced by spaces, multiple spaces collapsed
 */
function normalizeToSingleLine(text) {
  return text.replace(/\r\n|\r|\n/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Copies text to clipboard as plain text (removes all formatting and line breaks)
 * @param {string} text - The text to copy
 */
async function copyPlainText(text) {
  try {
    const plainText = normalizeToSingleLine(text);
    // Use the Clipboard API to write plain text
    await navigator.clipboard.writeText(plainText);
    
    // Optional: Show a notification (requires "notifications" permission)
    // For now, we'll just log success
    console.log("Text copied as plain text:", plainText);
  } catch (error) {
    console.error("Error copying text:", error);
  }
}

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "copyPlainText") {
    copyPlainText(request.text).then(() => {
      sendResponse({ success: true });
    }).catch((error) => {
      sendResponse({ success: false, error: error.message });
    });
    return true; // Indicates we will send a response asynchronously
  }
});
