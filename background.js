// Background service worker
console.log("Depop Auto-Relist background service worker initialized");

chrome.runtime.onInstalled.addListener(() => {
    console.log("Depop Auto-Relist extension installed");

    // Set default settings - DOM version by default
    chrome.storage.sync.get(['delay', 'limit', 'sortOrder', 'useApiVersion'], (result) => {
        const defaults = {};

        if (!result.delay) defaults.delay = 5;
        if (!result.limit) defaults.limit = 10;
        if (!result.sortOrder) defaults.sortOrder = 'oldest';
        if (result.useApiVersion === undefined) defaults.useApiVersion = false; // DOM version by default

        if (Object.keys(defaults).length > 0) {
            chrome.storage.sync.set(defaults);
        }
    });
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateStatus') {
        // Broadcast status updates to all listening popups
        chrome.runtime.sendMessage(message);
    }
    return true;
});
