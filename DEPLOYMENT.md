# MovieZone - Using Deployed API

## Current Configuration

✅ **API URL**: `https://moviezone-api.onrender.com/api`
✅ **Hardcoded** in `src/api.js` - No environment variables needed
✅ **Direct CDN URLs** - Using `directUrl` from API (proxy is broken)

## What's Working

- ✅ Trending movies
- ✅ Search functionality
- ✅ Movie information
- ✅ Video sources (360p, 480p, 720p, 1080p)
- ✅ Direct streaming from CDN
- ⚠️ API streaming proxy (broken - returns 500)

## Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   ```
   http://localhost:5173
   ```

## Production Build

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Test production build locally**
   ```bash
   npm start
   # Opens on http://localhost:3000
   ```

## Deploy to Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Web Service on Render**
   - Go to https://dashboard.render.com/
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Settings:
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `node server.js`
     - **Environment Variables**: None needed (API URL is hardcoded)

3. **Wait for deployment** (~5 minutes)

4. **Test your site**
   - Visit your Render URL
   - Try playing a movie

## Known Issues

### Streaming Proxy Broken
The API at `https://moviezone-api.onrender.com` has a broken streaming proxy (`/api/stream/` endpoint returns 500).

**Workaround**: We're using `directUrl` from the API response, which points directly to the CDN. This may have limitations:
- Some CDNs may block direct browser access
- No custom headers can be added
- CORS issues possible

**Solution**: Deploy your own API server with working streaming proxy (see `moviebox-api1-main/` folder).

## Testing

Run integration tests:
```bash
node test_stream.js
```

Expected results:
- ✅ 6/8 tests passing
- ❌ Stream URL test (API proxy broken)
- ❌ Download URL test (API proxy broken)

## Troubleshooting

### Movies not playing
1. Open browser console (F12)
2. Check for CORS errors
3. Check for 403 Forbidden errors (CDN blocking)
4. Try different quality options

### API not responding
- Check if API is up: https://moviezone-api.onrender.com/api/ping
- Free tier services sleep after 15 minutes
- First request takes ~30 seconds to wake up

## Alternative: Deploy Your Own API

If streaming doesn't work with the current API, deploy your own:

1. **Deploy backend from `moviebox-api1-main/`**
   - Create new Web Service on Render
   - Root Directory: `moviebox-api1-main`
   - Build: `npm install`
   - Start: `node index.js`

2. **Update frontend API URL**
   - Edit `src/api.js`
   - Change API_URL to your new backend URL

3. **Redeploy frontend**

---

**Current Status**: Using `https://moviezone-api.onrender.com/api` with direct CDN URLs
