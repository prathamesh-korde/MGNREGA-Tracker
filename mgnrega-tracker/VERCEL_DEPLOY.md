# 🚀 Deploy to Vercel - Quick Guide

## Method 1: Vercel Dashboard (Easiest - 2 Minutes)

### Step 1: Visit Vercel
1. Go to: **https://vercel.com/new**
2. Sign in with your GitHub account

### Step 2: Import Repository
1. Click: **Import Project**
2. Select: `prathamesh-korde/MGNREGA-Tracker`
3. Click: **Import**

### Step 3: Configure (Use Default Settings)
- **Framework Preset**: Other
- **Root Directory**: `./` (leave default)
- **Build Command**: Leave empty
- **Output Directory**: Leave empty

### Step 4: Deploy
1. Click: **Deploy**
2. Wait 2-3 minutes
3. Get your URL: `https://mgnrega-tracker-xxx.vercel.app`

---

## Method 2: Vercel CLI (For Developers)

### Step 1: Install Vercel CLI
```powershell
npm install -g vercel
```

### Step 2: Login to Vercel
```powershell
vercel login
```

### Step 3: Deploy
```powershell
cd mgnrega-tracker
vercel --prod
```

### Step 4: Follow Prompts
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? **mgnrega-tracker**
- In which directory is your code located? **./frontend**
- Want to override the settings? **N**

---

## ✅ After Deployment

### Your Live URLs:
- **Frontend**: `https://mgnrega-tracker.vercel.app`
- **Backend API**: `https://mgnrega-tracker.vercel.app/api/...`

### Test Your Deployment:
1. Visit: `https://mgnrega-tracker.vercel.app`
2. Test API: `https://mgnrega-tracker.vercel.app/api/location/states`

---

## 🎯 Vercel Benefits:
- ✅ **Instant Deploy**: Takes only 2-3 minutes
- ✅ **Free HTTPS**: Automatic SSL certificate
- ✅ **Auto-Deploy**: Updates when you push to GitHub
- ✅ **Global CDN**: Fast loading worldwide
- ✅ **Zero Config**: Works out of the box

---

## 🔧 Troubleshooting

### If Build Fails:
1. Check build logs in Vercel dashboard
2. Make sure `frontend/package.json` has build script
3. Try redeploying

### If API Doesn't Work:
1. Check `/api/health` endpoint
2. Verify `vercel.json` routes configuration
3. Check browser console for CORS errors

---

## 📝 Need Help?
- Vercel Docs: https://vercel.com/docs
- Support: https://vercel.com/support

**Ready to deploy!** 🚀
