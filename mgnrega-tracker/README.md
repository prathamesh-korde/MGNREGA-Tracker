# MGNREGA Performance Tracker

A production-ready web application built with MERN stack to make MGNREGA performance data accessible to rural Indian citizens.

## 🎯 Project Overview

This application provides an easy-to-understand interface for viewing MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act) performance data at the district level. It's designed specifically for low-literacy rural populations with:

- **Bilingual Interface** (Hindi + English)
- **Visual Data Representation** (Charts, graphs, color-coded metrics)
- **Automatic Location Detection** (Bonus feature)
- **Historical Performance Tracking**
- **District Comparison Tools**

## 🏗️ Architecture

### Frontend
- **React.js** - Component-based UI
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Axios** - API communication
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database for caching
- **Mongoose** - ODM
- **Winston** - Logging
- **Helmet** - Security headers
- **Express Rate Limit** - API protection

## 🚀 Key Features

### 1. **Robust Data Caching**
- All API data cached in MongoDB (24-hour default expiry)
- Application works even when government API is down
- Automatic fallback to stale data when fresh data unavailable

### 2. **Intelligent API Handling**
- Retry logic (3 attempts with exponential backoff)
- Timeout handling (10 seconds default)
- API call logging for monitoring
- Rate limiting protection (100 req/15 min per IP)

### 3. **User-Friendly Design**
- Large, clear typography for low-literacy users
- Color-coded performance indicators
- Icon-based navigation
- Simple language explanations
- Dark mode support

### 4. **Location Detection** (Bonus)
- Geolocation API integration
- Automatic district detection from coordinates
- Graceful fallback to manual selection

### 5. **Comprehensive Analytics**
- Current performance metrics
- Historical trends (12 months)
- District-wise comparisons
- Budget utilization tracking
- Employment generation metrics

## 📊 Data Source

Data is sourced from the Government of India Open API:
https://www.data.gov.in/catalog/mahatma-gandhi-national-rural-employment-guarantee-act-mgnrega

**Note:** For this demonstration, sample data for Maharashtra state is included. In production, integrate with the actual API endpoint.

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Git

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/mgnrega_tracker
# NODE_ENV=development

# Seed database with sample data
npm run seed

# Start development server
npm run dev

# Or start production server
npm start
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
# REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm start

# Build for production
npm run build
```

## 🚢 Production Deployment

### Option 1: VPS/VM Deployment (Recommended)

#### 1. Server Setup (Ubuntu/Debian)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

#### 2. Deploy Backend

```bash
cd /var/www/mgnrega-tracker/backend

# Install dependencies
npm install --production

# Create .env file
nano .env
# Set NODE_ENV=production

# Seed database
npm run seed

# Start with PM2
pm2 start server.js --name mgnrega-backend
pm2 save
pm2 startup
```

#### 3. Build & Deploy Frontend

```bash
cd /var/www/mgnrega-tracker/frontend

# Build production bundle
npm run build

# Copy build to Nginx
sudo cp -r build/* /var/www/html/mgnrega/
```

#### 4. Configure Nginx

Create `/etc/nginx/sites-available/mgnrega`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /var/www/html/mgnrega;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/mgnrega /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Option 2: Docker Deployment

```bash
# Create docker-compose.yml
version: '3.8'
services:
  mongodb:
    image: mongo:6
    volumes:
      - mongodb_data:/data/db
    
  backend:
    build: ./backend
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/mgnrega_tracker
      - NODE_ENV=production
    depends_on:
      - mongodb
    
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:

# Deploy
docker-compose up -d
```

## 📱 API Endpoints

### Location APIs
- `GET /api/location/states` - Get all states
- `GET /api/location/districts/:stateCode` - Get districts by state
- `POST /api/location/detect` - Detect district from coordinates
- `GET /api/location/search?q=query` - Search districts

### Performance APIs
- `GET /api/performance/:stateCode/:districtCode` - Get current performance
- `GET /api/performance/:stateCode/:districtCode/history` - Get historical data
- `GET /api/performance/compare/:stateCode` - Get comparative data

## 🎨 Design Decisions

### 1. **Low-Literacy UI**
- Large fonts and icons
- Bilingual labels (Hindi + English)
- Color-coded indicators (Green = Good, Red = Needs Attention)
- Visual charts instead of tables
- Minimal text, maximum visuals

### 2. **Production Readiness**
- **Caching**: MongoDB caching layer prevents dependency on external API
- **Error Handling**: Comprehensive error handling with graceful fallbacks
- **Logging**: Winston logger for monitoring and debugging
- **Security**: Helmet, CORS, rate limiting
- **Performance**: Compression, optimized queries, CDN-ready

### 3. **Scalability**
- Stateless backend (can be horizontally scaled)
- Database indexing for fast queries
- PM2 cluster mode support
- Nginx load balancing ready

## 📊 Sample Data

The application includes sample data for 15 districts in Maharashtra:
- Mumbai, Pune, Nagpur, Nashik, Aurangabad, Thane, Solapur, Ahmednagar, Kolhapur, Amravati, Sangli, Jalgaon, Satara, Akola, Latur

Each district has:
- 12 months of current year data (2024-25)
- 12 months of previous year data (2023-24)

## 🔒 Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting (100 requests/15 min)
- Input validation
- MongoDB injection prevention
- XSS protection

## 📈 Monitoring

- API call logging in database
- Winston file logging (error.log, combined.log)
- PM2 monitoring (CPU, memory, uptime)

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mgnrega_tracker
NODE_ENV=development
MGNREGA_API_BASE_URL=https://www.data.gov.in/api
CACHE_DURATION_HOURS=24
API_RETRY_ATTEMPTS=3
API_TIMEOUT_MS=10000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎥 Video Walkthrough

[Create a Loom video covering]:
1. Project overview and features
2. Code architecture walkthrough
3. Database schema explanation
4. Key design decisions
5. Production deployment setup
6. Live demo of the application

## 🚀 Live Demo

**Hosted URL:** [Your VPS IP or Domain]

Example: http://your-vps-ip:80

## 👨‍💻 Developer

Built with ❤️ for rural India

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- Data source: Government of India (data.gov.in)
- MGNREGA scheme information: Ministry of Rural Development
- Icons: React Icons
- Charts: Recharts library
