// Content script - loads scripts into page
console.log("Depop Auto-Relist content script loaded");

// Load config.js first (if it exists), then inject.js
function loadScript(src) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(src);
    (document.head || document.documentElement).appendChild(script);
}

// Try to load config.js (optional), then load inject.js
loadScript('config.js');
setTimeout(() => loadScript('inject.js'), 100); // Small delay to let config load first
