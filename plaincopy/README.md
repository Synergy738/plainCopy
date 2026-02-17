# PlainCopy Chrome Extension

A simple Chrome extension that allows you to copy selected text as plain text without any formatting.

## Features

- **Context Menu**: Right-click on selected text and choose "Copy as Plain Text" from the context menu
- **Popup Button**: Click the extension icon and use the "Copy Selection as Plain Text" button
- **Plain Text Only**: Removes all formatting (bold, italic, colors, etc.) when copying

## Installation

1. Open your Chromium-based browser (Chrome, Edge, Opera GX, Brave, Vivaldi)
2. Navigate to `chrome://extensions/` (or `edge://extensions/` for Edge, etc.)
3. Enable "Developer mode" (toggle in the top right)
4. Click "Load unpacked"
5. Select the `plaincopy` folder
6. The extension is now installed!

## Usage

### Method 1: Context Menu
1. Select any text on a webpage
2. Right-click on the selected text
3. Choose "Copy as Plain Text" from the context menu
4. The text is now copied to your clipboard without formatting

### Method 2: Popup Button
1. Select any text on a webpage
2. Click the PlainCopy extension icon in your browser toolbar
3. Click the "Copy Selection as Plain Text" button
4. A confirmation alert will show the copied text

## Browser Compatibility

This extension works with all Chromium-based browsers:
- Google Chrome
- Microsoft Edge
- Opera GX
- Brave
- Vivaldi
- And other Chromium-based browsers

## Technical Details

- **Manifest Version**: 3
- **Permissions**: clipboardWrite, clipboardRead, contextMenus, scripting, activeTab, tabs
- **Service Worker**: Uses background.js as a service worker for context menu functionality

## Icons

The extension includes placeholder icons. For production use, you should replace the icon files in the `icons` folder with proper 16x16, 48x48, and 128x128 pixel PNG images. You can use the `icons/generate-icons.html` file to generate simple placeholder icons.

## License

Free to use and modify.
