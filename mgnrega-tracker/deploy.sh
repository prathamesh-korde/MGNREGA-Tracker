#!/bin/bash

echo "🚀 Quick Deploy to Render.com"
echo "=============================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📝 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - MGNREGA Tracker"
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "📤 Next Steps:"
echo ""
echo "1. Create a GitHub repository:"
echo "   Visit: https://github.com/new"
echo "   Name: mgnrega-tracker"
echo ""
echo "2. Push your code:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/mgnrega-tracker.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Render:"
echo "   Visit: https://dashboard.render.com"
echo "   Click: New + → Blueprint"
echo "   Connect your GitHub repo"
echo "   Click: Apply"
echo ""
echo "4. Your app will be live at:"
echo "   https://mgnrega-frontend.onrender.com"
echo ""
echo "✨ Done! Your app will be live in 10 minutes!"
