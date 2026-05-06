# 🚀 MovieZone - Quick Start Guide

## ✅ Setup Complete!

Your MovieZone app is now configured to use your deployed API at:
**`https://moviezone-api.onrender.com/api`**

## 🎯 What You Need to Do Now

### Step 1: Test Locally

```bash
# Make sure you're in the project directory
cd MOVIEZONE

# Start the development server
npm run dev
```

The app will open at: **`http://localhost:5173`**

### Step 2: Test Streaming

1. Open `http://localhost:5173` in your browser
2. Browse movies on the homepage
3. Click on any movie
4. Click the **Play** button
5. Check if the video plays

### Step 3: Check Browser Console

Press **F12** to open Developer Tools and check for:
- ✅ No errors = Streaming works!
- ❌ CORS errors = CDN blocking
- ❌ 403 Forbidden = CDN requires headers
- ❌ 404 errors = API issue

## 📊 Expected Behavior

### What Should Work:
- ✅ Homepage loads with movies
- ✅ Search functionality
- ✅ Movie details page
- ✅ Quality selection (360p, 480p, 720p, 1080p)
- ⚠️ Video playback (depends on CDN)

### Known Issues:
- ⚠️ API streaming proxy is broken (returns 500)
- ⚠️ Using direct CDN URLs as workaround
- ⚠️ CDN may block direct browser access

## 🔧 If Streaming Doesn't Work

### Option 1: Check the Error
1. Open browser console (F12)
2. Look for error messages
3. Common errors:
   - **403 Forbidden**: CDN blocking direct access
   - **CORS Error**: Cross-origin issue
   - **Network Error**: CDN unreachable

### Option 2: Try Different Quality
- Click the quality button (e.g., "480p")
- Try different qualities
- Some may work better than others

### Option 3: Deploy Your Own API
If direct CDN access doesn't work, you'll need to deploy the backend with working streaming proxy:

```bash
# The backend code is in moviebox-api1-main/
# Deploy it to Render as a separate service
# Then update src/api.js with your new API URL
```

## 📦 Deploy to Production

Once streaming works locally:

```bash
# Build the app
npm run build

# Test production build
npm start
# Opens on http://localhost:3000

# If it works, deploy to Render:
# 1. Push to GitHub
# 2. Create Web Service on Render
# 3. Build: npm install && npm run build
# 4. Start: node server.js
```

## 🧪 Run Tests

```bash
node test_stream.js
```

Expected: **6/8 tests passing** (streaming proxy tests will fail)

## 📝 Configuration Summary

| Setting | Value |
|---------|-------|
| API URL | `https://moviezone-api.onrender.com/api` |
| Streaming Method | Direct CDN URLs |
| Local Dev Port | 5173 |
| Production Port | 3000 |
| Environment Variables | None needed |

## 🎬 Current Status

✅ **API Connected**: Using your deployed API
✅ **Localhost Removed**: All references removed
✅ **Direct Streaming**: Using CDN URLs
✅ **Ready to Test**: Run `npm run dev`

## 🆘 Troubleshooting

### Movies not loading
- Check API: `https://moviezone-api.onrender.com/api/ping`
- Should return: `{"status":"success","message":"Pong!"}`

### Videos not playing
- Check browser console for errors
- Try different quality options
- Verify CDN URLs in Network tab (F12)

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Need Help?

1. Check `FINAL_SETUP.md` for detailed information
2. Check `DEPLOYMENT.md` for deployment guide
3. Review browser console errors
4. Test API endpoints directly

---

**Ready?** Run `npm run dev` and start testing! 🎉
