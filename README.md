# 🎬 MovieZone - Streaming Platform

A modern movie and TV series streaming platform with real-time content from MovieBox API.

## ✨ Features

- 🎥 Stream movies and TV series in multiple qualities (360p - 1080p)
- 🔍 Search and browse trending content
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with smooth animations
- 💾 Download movies in multiple qualities
- 👤 User authentication and premium features
- 🎯 Genre-based browsing
- ⚡ Fast streaming with HLS support

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MOVIEZONE
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd moviebox-api1-main && npm install && cd ..
   ```

3. **Start the backend API**
   ```bash
   cd moviebox-api1-main
   npm start
   # Runs on http://localhost:5000
   ```

4. **Start the frontend** (in a new terminal)
   ```bash
   npm run dev
   # Runs on http://localhost:5173
   ```

5. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 🌐 Deploy to Render

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Blueprint"
4. Connect your repository
5. Render will auto-deploy both services from `render.yaml`

## 📁 Project Structure

```
MOVIEZONE/
├── src/                    # Frontend React app
│   ├── api.js             # API client
│   ├── Player.jsx         # Video player component
│   ├── Home.jsx           # Home page
│   └── ...
├── moviebox-api1-main/    # Backend API server
│   ├── index.js           # Express server
│   ├── db.js              # MongoDB models
│   └── package.json
├── public/                # Static assets
├── server.js              # Production server
├── render.yaml            # Render deployment config
└── package.json           # Frontend dependencies
```

## 🔧 Configuration

### Environment Variables

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (moviebox-api1-main/.env)**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/moviezone  # Optional
JWT_SECRET=your-secret-key                      # Optional
```

## 🧪 Testing

Run streaming tests:
```bash
node test_stream.js
```

Expected output:
```
✅ GET /api/trending
✅ GET /api/search/avatar
✅ GET /api/info/...
✅ GET /api/sources/...
✅ Stream URL (360p)
✅ Download URL reachable
🎉 All tests passed!
```

## 📚 API Endpoints

- `GET /api/trending` - Get trending movies
- `GET /api/search/:query` - Search movies
- `GET /api/info/:movieId` - Get movie details
- `GET /api/sources/:movieId` - Get streaming sources
- `GET /api/stream/:movieId` - Stream video (proxy)
- `GET /api/download` - Download video (proxy)

## 🛠️ Tech Stack

**Frontend:**
- React 19
- React Router
- Vite
- Lucide Icons
- HLS.js for video streaming

**Backend:**
- Node.js + Express
- Axios for API requests
- MongoDB (optional, for auth)
- JWT authentication

## 📝 License

This project is for educational purposes only.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ by MovieZone Team
