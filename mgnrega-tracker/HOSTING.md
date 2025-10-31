# MGNREGA Tracker - Deployment Guide

## 🚀 Quick Deploy to Render.com (FREE)

### Step 1: Prepare Your Code
```bash
cd c:\Users\Prathmesh\OneDrive\Desktop\pro\mgnrega-tracker
git init
git add .
git commit -m "Initial commit - MGNREGA Tracker"
```

### Step 2: Push to GitHub
1. Create a new repository on GitHub: https://github.com/new
2. Name it: `mgnrega-tracker`
3. Run these commands:
```bash
git remote add origin https://github.com/YOUR_USERNAME/mgnrega-tracker.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Render
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Blueprint"
4. Connect your GitHub repository
5. Render will auto-detect `render.yaml` and deploy both services
6. Wait 5-10 minutes for deployment
7. Your app will be live at: `https://mgnrega-frontend.onrender.com`

---

## 🌐 Alternative: Vercel (Frontend) + Render (Backend)

### Deploy Frontend to Vercel (FREE):
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

Your frontend will be at: `https://mgnrega-tracker.vercel.app`

### Deploy Backend to Render:
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `node simple-server.js`
7. Add environment variable: `PORT=3001`

---

## 🔧 Update Frontend API URL

After deploying backend, update this file:

**frontend/src/services/api.js**
```javascript
const API_BASE_URL = 'https://your-backend-url.onrender.com/api';
```

Then redeploy frontend.

---

## 📱 Your Public URLs:

After deployment you'll get:
- **Frontend**: https://mgnrega-tracker.vercel.app
- **Backend API**: https://mgnrega-backend.onrender.com
- **Health Check**: https://mgnrega-backend.onrender.com/health

---

## ⚡ Quick Deploy with Railway.app (Alternative)

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your mgnrega-tracker repo
5. Railway auto-detects and deploys both services
6. Get public URL in seconds!

---

## 🐳 Docker Deployment (For VPS)

If you have a VPS (DigitalOcean, AWS, Azure):

```bash
# Install Docker on your VPS
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Clone your repo
git clone https://github.com/YOUR_USERNAME/mgnrega-tracker.git
cd mgnrega-tracker

# Run with Docker Compose
docker-compose up -d

# Your app is live on your VPS IP!
```

Access at: `http://YOUR_VPS_IP:3000`

---

## 📝 Quick Start (Easiest Method)

**Use Render.com - It's the easiest!**

1. Push code to GitHub
2. Go to render.com
3. Click "New Blueprint"
4. Select your repo
5. Click "Apply"
6. Wait 10 minutes
7. Done! You'll get: `https://mgnrega-frontend.onrender.com`

**Free tier includes:**
- ✅ HTTPS automatically
- ✅ Custom domain support
- ✅ Automatic deployments
- ✅ No credit card required

---

## 🎯 Recommended: Render.com

**Why?**
- FREE tier available
- Automatic HTTPS
- Zero configuration
- Auto-deploys on git push
- Perfect for MERN stack

**Limitations:**
- Spins down after 15 min inactivity (takes 30s to wake up)
- Upgrade to $7/month for always-on

---

Need help? Just ask!
