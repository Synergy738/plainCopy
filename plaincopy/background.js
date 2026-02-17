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
 * Copies text to clipboard as plain text (removes all formatting)
 * @param {string} text - The text to copy
 */
async function copyPlainText(text) {
  try {
    // Use the Clipboard API to write plain text
    await navigator.clipboard.writeText(text);
    
    // Optional: Show a notification (requires "notifications" permission)
    // For now, we'll just log success
    console.log("Text copied as plain text:", text);
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
