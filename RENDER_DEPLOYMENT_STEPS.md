# 🚀 Deploy MovieZone to Render - Step by Step

## Current Status
✅ Streaming works locally on `http://localhost:5173`
✅ Backend API running on `http://localhost:5000`
✅ All tests passing (8/8)

## What You Need to Do

### Step 1: Commit and Push to GitHub

```bash
# Add all changes
git add .

# Commit with a message
git commit -m "Fix streaming - ready for production deployment"

# Push to GitHub
git push origin main
```

### Step 2: Deploy on Render

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com/
   - Sign in with your GitHub account

2. **Create New Blueprint**
   - Click the **"New +"** button (top right)
   - Select **"Blueprint"**
   
3. **Connect Repository**
   - Select your GitHub repository
   - Render will detect `render.yaml` automatically
   
4. **Review Services**
   Render will show 2 services to be created:
   
   **Service 1: moviezone-api (Backend)**
   - Type: Web Service
   - Root Directory: `moviebox-api1-main`
   - Build: `npm install`
   - Start: `node index.js`
   - Environment Variables:
     - `NODE_ENV=production` ✅ (auto-set)
     - `JWT_SECRET` ✅ (auto-generated)
     - `MONGO_URI` ⚠️ (optional - leave empty for now)
   
   **Service 2: moviezone-frontend (Frontend)**
   - Type: Web Service
   - Build: `npm install && npm run build`
   - Start: `node server.js`
   - Environment Variables:
     - `VITE_API_URL=https://moviezone-api.onrender.com/api` ✅ (auto-set)
     - `VITE_PAYSTACK_KEY` ⚠️ (optional - for payments)

5. **Click "Apply"**
   - Render will start deploying both services
   - This takes about 8-10 minutes

### Step 3: Monitor Deployment

**Backend Deployment (moviezone-api)**
- Watch the logs in real-time
- Look for: `MovieBox API Server running on http://0.0.0.0:5000`
- Status should change to **"Live"** (green)

**Frontend Deployment (moviezone-frontend)**
- Waits for backend to finish first
- Watch the build logs
- Look for: `Frontend serving on port 3000`
- Status should change to **"Live"** (green)

### Step 4: Test Your Deployment

1. **Test Backend API**
   ```
   Visit: https://moviezone-api.onrender.com/
   ```
   You should see the API documentation page.

2. **Test API Endpoints**
   ```
   Visit: https://moviezone-api.onrender.com/api/ping
   ```
   Should return: `{"status":"success","message":"Pong!"}`

3. **Test Streaming Sources**
   ```
   Visit: https://moviezone-api.onrender.com/api/sources/8906247916759695608
   ```
   Should return JSON with video sources.

4. **Test Frontend**
   ```
   Visit: https://moviezone-frontend.onrender.com/
   ```
   - Homepage should load
   - Movies should be visible
   - Click on a movie and try to play it
   - Video should stream successfully!

### Step 5: Verify Everything Works

Open your browser console (F12) and check:
- ✅ No CORS errors
- ✅ No 404 errors
- ✅ Movies load and play
- ✅ All quality options work (360p, 480p, 720p, 1080p)

## Troubleshooting

### Issue: Backend shows "Deploy failed"
**Solution:**
- Check the logs for errors
- Common issue: Missing dependencies
- Fix: Make sure `moviebox-api1-main/package.json` has all dependencies
- Redeploy: Click "Manual Deploy" → "Deploy latest commit"

### Issue: Frontend shows "Deploy failed"
**Solution:**
- Check if backend is deployed first
- Verify `VITE_API_URL` is set correctly
- Check build logs for errors

### Issue: Movies not playing
**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Verify API URL: Should be `https://moviezone-api.onrender.com/api`
4. Test backend directly: `https://moviezone-api.onrender.com/api/sources/8906247916759695608`
5. Check backend logs in Render dashboard

### Issue: "Service Unavailable" or slow loading
**Cause:** Free tier services sleep after 15 minutes of inactivity
**Solution:** 
- First request takes ~30 seconds to wake up
- This is normal for free tier
- Upgrade to paid tier for always-on service

## Important Notes

⚠️ **Free Tier Limitations:**
- Services sleep after 15 minutes of inactivity
- 750 hours/month of runtime per service
- Slower performance than paid tiers

✅ **What Works Without MongoDB:**
- Movie browsing and streaming
- Search functionality
- Trending content
- All video features

❌ **What Requires MongoDB:**
- User authentication
- Premium subscriptions
- Admin panel
- User favorites/watchlist

## Your Production URLs

After successful deployment:
- **Backend API**: `https://moviezone-api.onrender.com`
- **Frontend**: `https://moviezone-frontend.onrender.com`

## Next Steps (Optional)

1. **Add Custom Domain**
   - Go to frontend service settings
   - Add your custom domain
   - Update DNS records

2. **Set Up MongoDB** (for auth features)
   - Create free cluster on MongoDB Atlas
   - Get connection string
   - Add to backend environment variables

3. **Monitor Performance**
   - Check Render dashboard regularly
   - Monitor error logs
   - Set up uptime monitoring

## Need Help?

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide
- Review [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) for checklist
- Check Render documentation: https://render.com/docs

---

**Ready to deploy?** Follow the steps above and your MovieZone will be live in ~10 minutes! 🎉
