# Video Walkthrough Script

## MGNREGA Performance Tracker - Loom Video Script (<2 minutes)

### Introduction (15 seconds)
"Hi! I'm presenting the MGNREGA Performance Tracker - a production-ready web application built with the MERN stack to make government employment scheme data accessible to rural Indians."

### Problem Statement (15 seconds)
"The Government's MGNREGA API data isn't accessible to common citizens, especially those with low literacy in rural areas. This app solves that with a bilingual, visual-first interface."

### Live Demo (30 seconds)
1. **Show Homepage**
   - "Users can either auto-detect their location or manually select their district"
   - Demonstrate location detection feature
   - Select Maharashtra → Pune

2. **Show Dashboard**
   - "The dashboard shows key metrics with icons and colors"
   - Point out bilingual labels
   - Show charts and visualizations
   - "Everything is designed for low-literacy users with visual indicators"

3. **Show Comparison**
   - "Users can compare all districts to understand relative performance"

### Architecture Overview (30 seconds)

**Show Code:**
1. **Backend (server.js)**
   - "Express server with MongoDB caching"
   - "Key feature: Even if government API fails, we serve cached data"
   - Show retry logic in mgnregaService.js

2. **Database (models)**
   - "MongoDB stores district data with 24-hour cache"
   - Show DistrictPerformance model

3. **Frontend (Dashboard.js)**
   - "React with Recharts for visualizations"
   - "Bilingual interface, mobile-responsive"

### Technical Decisions (20 seconds)

**Show Deployment Files:**
1. "Caching layer handles API downtime - production-critical"
2. "PM2 for process management, Nginx for reverse proxy"
3. "Rate limiting and security with Helmet and Express Rate Limit"
4. "Docker setup included for easy deployment"

### Deployment (10 seconds)
- "Complete deployment guide included"
- Show DEPLOYMENT.md
- "Ready to deploy on any VPS with MongoDB, Node.js, and Nginx"
- Show docker-compose.yml for container deployment

### Conclusion (10 seconds)
"Built with accessibility in mind - serving 12.15 crore rural Indians. Thank you!"

---

## Recording Tips:

1. **Preparation:**
   - Have the app running locally
   - Have code editor open with key files
   - Have browser with multiple tabs ready

2. **Show in Order:**
   - Live application demo (30s)
   - Code walkthrough (40s)
   - Architecture diagram/deployment files (30s)
   - Key features summary (20s)

3. **Key Points to Emphasize:**
   - Production-ready features (caching, error handling)
   - Accessibility for rural users (bilingual, visual)
   - Scalability (PM2 cluster, Nginx, MongoDB indexing)
   - Bonus feature: Location detection

4. **Screen Recording Setup:**
   - Use Loom
   - Enable microphone
   - Record browser + VS Code side by side
   - Speak clearly and at moderate pace

---

## Key Files to Show in Video:

1. **Live App:**
   - Home page with location detection
   - Dashboard with charts
   - Compare page

2. **Backend Code:**
   - `backend/server.js` - Main server setup
   - `backend/services/mgnregaService.js` - Caching logic
   - `backend/models/DistrictPerformance.js` - Data model

3. **Frontend Code:**
   - `frontend/src/pages/Dashboard.js` - Main dashboard
   - `frontend/src/components/Header.js` - Bilingual header

4. **Deployment:**
   - `docker-compose.yml`
   - `DEPLOYMENT.md` (briefly)
   - `.env.example`

---

## Talking Points:

### Problem:
✓ MGNREGA serves 12.15 Cr people but data is not accessible
✓ Low literacy in rural areas
✓ Government API may have downtime

### Solution:
✓ Visual-first, bilingual interface
✓ Caching layer for reliability
✓ Location detection for ease of use
✓ Production-ready architecture

### Tech Highlights:
✓ MERN Stack (MongoDB, Express, React, Node.js)
✓ Data caching with MongoDB (24hr expiry)
✓ Retry logic (3 attempts)
✓ Rate limiting (100 req/15min)
✓ PM2 process management
✓ Nginx reverse proxy
✓ Docker containerization

### Deployment:
✓ VPS-ready with detailed guide
✓ Docker compose for easy setup
✓ SSL/HTTPS ready
✓ Scalable architecture
