# Installation Guide

## 📦 Install the Extension in 5 Minutes

### Step 1: Prepare the Files ✅
You should have these files in your `depop-helper` folder:
- ✅ manifest.json
- ✅ background.js
- ✅ content.js
- ✅ inject.js
- ✅ inject-dom.js
- ✅ api-finder.js
- ✅ popup.html
- ✅ popup.js
- ✅ icon.png
- ✅ README.md (and other docs)

---

### Step 2: Open Chrome Extensions Page

**Method 1:**
1. Click the 3 dots menu (⋮) in Chrome
2. Go to: **More tools** → **Extensions**

**Method 2:**
1. Type in address bar: `chrome://extensions/`
2. Press Enter

---

### Step 3: Enable Developer Mode

Look for the **"Developer mode"** toggle in the top-right corner:
```
┌─────────────────────────────────────────┐
│  Extensions                  🔧 Developer mode │
│                                     [ ON ]  │
└─────────────────────────────────────────┘
```

**Click it to turn ON** (it should be blue/enabled)

---

### Step 4: Load the Extension

Once Developer mode is ON, new buttons appear:

1. Click **"Load unpacked"**
2. Navigate to your project folder:
   ```
   C:\Users\User\git\Personal Projects\depop-helper
   ```
3. Select the folder
4. Click **"Select Folder"**

---

### Step 5: Verify Installation ✅

You should see your extension appear:

```
┌─────────────────────────────────────────────┐
│  🔄 Depop Auto Relist                    v1.0 │
│  ID: [some random string]                     │
│  Automatically relist your Depop items...     │
│                                               │
│  [Details]  [Remove]  [Errors (0)]  [Reload ↻] │
└─────────────────────────────────────────────┘
```

**Check for:**
- ✅ No errors shown
- ✅ Extension is enabled (toggle is ON/blue)
- ✅ Icon appears in your toolbar

---

### Step 6: Pin the Extension (Optional)

To keep the icon visible:

1. Click the **puzzle piece icon** 🧩 in Chrome toolbar
2. Find "Depop Auto Relist"
3. Click the **pin icon** 📌 next to it
4. Now it stays in your toolbar!

---

## 🧪 Test the Installation

### Option 1: Use the Test Page
1. Open `test.html` in Chrome
2. Click the test buttons
3. All tests should pass ✅

### Option 2: Test on Depop
1. Go to: `https://www.depop.com/kaivault27/selling/`
2. You should see a purple control panel appear
3. Click "Scan Products" - it should find your items

---

## ⚠️ Troubleshooting Installation

### "Manifest file is missing or unreadable"
**Fix:**
- Make sure you selected the correct folder
- The folder should contain `manifest.json` directly
- Don't select a parent folder or subfolder

### "Failed to load extension"
**Fix:**
- Check all files are present
- Verify `manifest.json` is valid (no syntax errors)
- Try reloading: click the reload icon ↻

### Extension loads but doesn't work
**Fix:**
1. Click **"Reload"** ↻ on the extension card
2. Close and reopen Chrome
3. Check Console (F12) for errors on Depop page
4. Make sure you're on depop.com

### No errors but panel doesn't appear
**Fix:**
1. Make sure you're on `depop.com`
2. Check bottom-right corner of page
3. Refresh the Depop page
4. Check if extension is enabled

---

## 🔄 Update the Extension

If you modify the code:

1. Go to `chrome://extensions/`
2. Find "Depop Auto Relist"
3. Click the **reload icon** ↻
4. Refresh any open Depop pages

---

## 🗑️ Uninstall (If Needed)

To remove the extension:

1. Go to `chrome://extensions/`
2. Find "Depop Auto Relist"
3. Click **"Remove"**
4. Confirm removal

---

## 📊 What Happens After Installation

### Automatically:
- ✅ Background service worker starts
- ✅ Content script loads on depop.com pages
- ✅ Extension icon appears in toolbar
- ✅ Settings are initialized

### When you visit Depop:
- ✅ Control panel appears on the page
- ✅ Extension is ready to scan products
- ✅ You can start using it immediately

---

## 🎯 First Time Usage

After installation:

1. **Go to your Depop selling page:**
   ```
   https://www.depop.com/kaivault27/selling/
   ```

2. **Look for the purple panel** (bottom-right corner)

3. **Configure settings:**
   - Delay: 5 seconds (safe default)
   - Max items: 5 (test with small batch)
   - Version: DOM (works immediately)

4. **Click "Scan Products"**
   - Should find your listings

5. **Click "Start Relist"**
   - Watch it work!

---

## 🎉 Installation Complete!

Your extension is now installed and ready to use.

**Next steps:**
- Read [QUICKSTART.md](QUICKSTART.md) for usage guide
- Open [test.html](test.html) to verify everything works
- Visit your Depop page to start relisting!

**Your Depop page:**
```
https://www.depop.com/kaivault27/selling/
```

**Happy relisting! 🚀**
