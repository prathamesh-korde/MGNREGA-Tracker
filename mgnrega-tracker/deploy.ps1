# MGNREGA Tracker - Quick Deploy Script
Write-Host "🚀 MGNREGA Tracker - Quick Deploy" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "   Install from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit
}

# Initialize git if needed
if (-not (Test-Path .git)) {
    Write-Host ""
    Write-Host "📝 Initializing git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit - MGNREGA Tracker"
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "📤 DEPLOYMENT OPTIONS:" -ForegroundColor Cyan
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "Option 1: Render.com (Recommended - FREE)" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "1. Create GitHub repository:" -ForegroundColor White
Write-Host "   https://github.com/new" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Push your code:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/mgnrega-tracker.git" -ForegroundColor Yellow
Write-Host "   git branch -M main" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Deploy:" -ForegroundColor White
Write-Host "   • Visit: https://dashboard.render.com" -ForegroundColor Cyan
Write-Host "   • Click: New + → Blueprint" -ForegroundColor White
Write-Host "   • Connect your GitHub repo" -ForegroundColor White
Write-Host "   • Click: Apply" -ForegroundColor White
Write-Host ""
Write-Host "4. Your live URL:" -ForegroundColor White
Write-Host "   https://mgnrega-frontend.onrender.com" -ForegroundColor Green
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "Option 2: Vercel (Fastest - FREE)" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "1. Install Vercel CLI:" -ForegroundColor White
Write-Host "   npm install -g vercel" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Deploy:" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Yellow
Write-Host "   vercel --prod" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Your live URL:" -ForegroundColor White
Write-Host "   https://mgnrega-tracker.vercel.app" -ForegroundColor Green
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "Option 3: Netlify (Easy - FREE)" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "1. Build frontend:" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Yellow
Write-Host "   npm run build" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Deploy:" -ForegroundColor White
Write-Host "   • Visit: https://app.netlify.com/drop" -ForegroundColor Cyan
Write-Host "   • Drag & drop the 'build' folder" -ForegroundColor White
Write-Host ""
Write-Host "3. Your live URL:" -ForegroundColor White
Write-Host "   https://mgnrega-tracker.netlify.app" -ForegroundColor Green
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "💡 Recommendation: Use Render.com (Option 1)" -ForegroundColor Cyan
Write-Host "   ✅ Deploys both frontend & backend" -ForegroundColor Green
Write-Host "   ✅ Free HTTPS certificate" -ForegroundColor Green
Write-Host "   ✅ Auto-deploys on git push" -ForegroundColor Green
Write-Host "   ✅ No credit card required" -ForegroundColor Green
Write-Host ""

$choice = Read-Host "Would you like to open GitHub to create a repo? (Y/N)"
if ($choice -eq 'Y' -or $choice -eq 'y') {
    Start-Process "https://github.com/new"
}

Write-Host ""
Write-Host "✨ Happy Deploying!" -ForegroundColor Cyan
