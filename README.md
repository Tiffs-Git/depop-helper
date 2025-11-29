# Depop Listing Refresher

A Chrome extension that automatically refreshes your Depop listings to boost visibility and sales.

## 🚀 Quick Start

### Installation

1. **Clone or download** this repository
2. **Copy config file**: 
   ```bash
   copy config.example.js config.js
   ```
3. **Get your Depop token**:
   - Go to [depop.com](https://depop.com) and log in
   - Open DevTools (F12)
   - Go to **Application** tab → **Cookies** → `depop.com`
   - Find and copy the `access_token` value
4. **Edit config.js**:
   - Replace `YOUR_DEPOP_TOKEN_HERE` with your token
   - Replace `your_username_here` with your Depop username
5. **Load extension in Chrome**:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the extension folder
6. **Navigate to your Depop selling page**:
   - Go to `https://www.depop.com/sellinghub/selling/active/`
   - The control panel will appear in the bottom-right corner

## How It Works

This extension refreshes your listings by:

1. **📖 Fetching** - Gets all your current listings via Depop's API
2. **🔄 Updating** - Sends an update request for each listing (which refreshes the timestamp)
3. **✅ Done** - Listings move to the top of search results!

**No deletion involved** - Your likes, comments, and listing history are preserved!

## Features

- ✅ Refreshes all listings automatically
- ✅ Configurable delay between items (1-60 seconds)
- ✅ Sorts by oldest first (recommended)
- ✅ Draggable control panel
- ✅ Real-time progress tracking
- ✅ Success/error counting
- ✅ Pause/stop functionality

## Usage

1. **Go to your Depop selling page**: `https://www.depop.com/sellinghub/selling/active/`
2. **Look for the control panel** in the bottom-right corner (you can drag it around)
3. **Set your delay** (recommended: 3-5 seconds between items)
4. **Click "Start Refreshing"**
5. **Wait for completion** - The panel shows progress and results

## Best Practices

1. **Use reasonable delays** - 3-5 seconds between items is safer
2. **Refresh regularly** - Daily or every few days to maintain visibility
3. **Sort by oldest first** - The extension automatically does this to refresh stale items first
4. **Monitor the first run** - Watch to ensure everything works correctly

## Troubleshooting

### "No products found"
- Ensure you're on the selling page: `depop.com/sellinghub/selling/active/`
- Make sure you have active listings
- Check that you're logged in

### Extension panel doesn't appear
- Reload the extension in `chrome://extensions/` (click the refresh icon)
- Refresh the Depop page
- Check console (F12) for errors
- Verify config.js has your token

### "Failed to fetch listings" or update errors
- You might be rate-limited - wait a few minutes
- Check your internet connection
- Verify your token is still valid (re-login to Depop if needed)

### Config errors
- Make sure you created config.js from config.example.js
- Verify your token is correct (no extra spaces)
- Check that config.js is in the extension folder

## Technical Details

### How Refreshing Works

The extension uses Depop's own API to update each listing:
1. Fetches all listings: `GET /api/v1/shop/products/`
2. For each listing:
   - Gets details: `GET /presentation/api/v1/products/by-slug/{slug}/edit-listing/`
   - Updates it: `PUT /api/v2/products/{slug}/`
3. The PUT request updates the listing's timestamp, pushing it to the top

### Security

- Your token and username are stored in `config.js` (gitignored)
- No data is sent to any third-party servers
- All API calls go directly to Depop
- Extension runs entirely in your browser

### Files Structure
```
depop-helper/
├── manifest.json       # Extension configuration
├── background.js       # Service worker
├── content.js         # Loads config and inject script
├── inject.js          # Main refreshing logic
├── config.js          # Your token/username (NOT in git)
├── config.example.js  # Template for config.js
├── popup.html         # Extension popup UI
├── popup.js           # Popup logic
├── icon.png           # Extension icon
└── README.md          # This file
```

## Updating Your Token

If your token expires or you need to update it:

1. Log in to Depop
2. Open DevTools (F12) → Application → Cookies → `depop.com`
3. Copy new `access_token` value
4. Update `config.js` with the new token
5. Reload extension and refresh Depop page

## Disclaimer

This extension is provided "as-is" without any warranties. Use at your own risk. The author is not responsible for:
- Account bans or suspensions
- Any issues that may arise from using this tool

Always ensure you're complying with Depop's Terms of Service. This tool simply automates what you can already do manually through Depop's interface.

**Remember:** Use this tool responsibly and in compliance with Depop's policies.
