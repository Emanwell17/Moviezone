# 🚀 Quick Deployment Checklist

## Before Deploying

- [ ] Code is working locally (movies play successfully)
- [ ] Both servers running locally:
  - [ ] Backend: `http://localhost:5000` ✅
  - [ ] Frontend: `http://localhost:5173` ✅
- [ ] All changes committed to Git

## Deploy to Render

### Option 1: Using render.yaml (Recommended)

1. [ ] Push code to GitHub
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. [ ] Go to [Render Dashboard](https://dashboard.render.com/)

3. [ ] Click **"New +"** → **"Blueprint"**

4. [ ] Connect your GitHub repository

5. [ ] Render will automatically create 2 services from `render.yaml`:
   - `moviezone-api` (Backend)
   - `moviezone-frontend` (Frontend)

6. [ ] Wait for deployment (~8 minutes total)

7. [ ] Test your deployment:
   - [ ] Backend: `https://moviezone-api.onrender.com/`
   - [ ] Frontend: `https://moviezone-frontend.onrender.com/`
   - [ ] Try playing a movie

### Option 2: Manual Deployment

If Blueprint doesn't work, deploy manually:

#### Backend (moviezone-api)
1. [ ] New Web Service
2. [ ] Connect GitHub repo
3. [ ] Settings:
   - **Root Directory**: `moviebox-api1-main`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Environment Variables**:
     - `NODE_ENV=production`
     - `JWT_SECRET=<generate-random-string>`

#### Frontend (moviezone-frontend)
1. [ ] New Web Service
2. [ ] Connect GitHub repo
3. [ ] Settings:
   - **Root Directory**: `.` (root)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
   - **Environment Variables**:
     - `VITE_API_URL=https://moviezone-api.onrender.com/api`

## After Deployment

- [ ] Backend is live and responding
- [ ] Frontend is live and loading
- [ ] Movies are playing successfully
- [ ] No console errors in browser
- [ ] Test on mobile device

## Troubleshooting

### Backend not responding
- Check logs in Render dashboard
- Verify build completed successfully
- Test API endpoint: `https://moviezone-api.onrender.com/api/ping`

### Frontend shows errors
- Check browser console (F12)
- Verify `VITE_API_URL` is set correctly in Render
- Check if backend is responding

### Movies not playing
- Test sources endpoint: `https://moviezone-api.onrender.com/api/sources/8906247916759695608`
- Check if `streamUrl` is present in response
- Verify backend logs for streaming errors

### Free Tier Limitations
- Services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Consider upgrading to paid tier for production use

## Success Criteria

✅ Backend API responding at `https://moviezone-api.onrender.com/`
✅ Frontend loading at `https://moviezone-frontend.onrender.com/`
✅ Movies playing without errors
✅ All quality options working (360p, 480p, 720p, 1080p)
✅ Search and browse working
✅ No console errors

## Next Steps

- [ ] Set up custom domain
- [ ] Configure MongoDB for auth features (optional)
- [ ] Set up monitoring/alerts
- [ ] Configure CDN for better performance
