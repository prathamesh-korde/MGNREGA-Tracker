# MGNREGA Tracker - Deployment Guide

This guide walks you through deploying the MGNREGA Performance Tracker on a VPS/VM.

## Prerequisites

- Ubuntu/Debian VPS (2GB RAM minimum recommended)
- SSH access to the server
- Domain name (optional, can use IP address)
- Basic Linux command line knowledge

## Deployment Steps

### Step 1: Server Preparation

```bash
# SSH into your server
ssh root@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Create application directory
sudo mkdir -p /var/www/mgnrega-tracker
cd /var/www/mgnrega-tracker
```

### Step 2: Install Node.js

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 3: Install MongoDB

```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install MongoDB
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

### Step 4: Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Allow firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

### Step 5: Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 6: Clone/Upload Your Project

```bash
# Option 1: Clone from Git (if you have a repository)
git clone https://github.com/your-username/mgnrega-tracker.git /var/www/mgnrega-tracker

# Option 2: Upload via SCP from your local machine
# On your local machine:
scp -r /path/to/mgnrega-tracker root@your-server-ip:/var/www/

# Set permissions
sudo chown -R $USER:$USER /var/www/mgnrega-tracker
```

### Step 7: Setup Backend

```bash
cd /var/www/mgnrega-tracker/backend

# Install dependencies
npm install --production

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mgnrega_tracker
NODE_ENV=production
MGNREGA_API_BASE_URL=https://www.data.gov.in/api
CACHE_DURATION_HOURS=24
API_RETRY_ATTEMPTS=3
API_TIMEOUT_MS=10000
EOF

# Create logs directory
mkdir -p logs

# Seed database with sample data
node scripts/seedData.js

# Start backend with PM2
pm2 start server.js --name mgnrega-backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the command output instructions
```

### Step 8: Build Frontend

```bash
cd /var/www/mgnrega-tracker/frontend

# Install dependencies
npm install

# Create .env file for production
cat > .env << EOF
REACT_APP_API_URL=/api
EOF

# Build production bundle
npm run build

# Copy build to Nginx directory
sudo mkdir -p /var/www/html/mgnrega
sudo cp -r build/* /var/www/html/mgnrega/
sudo chown -R www-data:www-data /var/www/html/mgnrega
```

### Step 9: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/mgnrega

# Paste the following configuration:
```

```nginx
server {
    listen 80;
    server_name your-domain.com;  # Change this or use server IP

    # Root directory
    root /var/www/html/mgnrega;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Frontend
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, must-revalidate";
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Health check
    location /health {
        proxy_pass http://localhost:5000/health;
        access_log off;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/mgnrega /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 10: Verify Deployment

```bash
# Check backend is running
pm2 status

# Check backend logs
pm2 logs mgnrega-backend

# Check Nginx status
sudo systemctl status nginx

# Test the application
curl http://localhost/
curl http://localhost/api/health
```

### Step 11: Access Your Application

Open your browser and navigate to:
- `http://your-server-ip` (if using IP)
- `http://your-domain.com` (if you configured a domain)

## Optional: Setup SSL with Let's Encrypt (Recommended for Production)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Certbot will automatically update Nginx configuration
# Test automatic renewal
sudo certbot renew --dry-run
```

## Monitoring & Maintenance

### View Application Logs

```bash
# PM2 logs
pm2 logs mgnrega-backend

# View specific logs
pm2 logs mgnrega-backend --lines 100

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Manage PM2 Process

```bash
# Restart backend
pm2 restart mgnrega-backend

# Stop backend
pm2 stop mgnrega-backend

# Start backend
pm2 start mgnrega-backend

# View process details
pm2 show mgnrega-backend

# Monitor resources
pm2 monit
```

### Update Application

```bash
# Pull latest changes (if using Git)
cd /var/www/mgnrega-tracker
git pull

# Update backend
cd backend
npm install --production
pm2 restart mgnrega-backend

# Update frontend
cd ../frontend
npm install
npm run build
sudo cp -r build/* /var/www/html/mgnrega/
sudo systemctl reload nginx
```

### Database Backup

```bash
# Create backup directory
mkdir -p /var/backups/mongodb

# Backup MongoDB
mongodump --db mgnrega_tracker --out /var/backups/mongodb/$(date +%Y%m%d)

# Restore from backup
mongorestore --db mgnrega_tracker /var/backups/mongodb/20241029/mgnrega_tracker
```

### Setup Automatic Backups (Cron Job)

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * mongodump --db mgnrega_tracker --out /var/backups/mongodb/$(date +\%Y\%m\%d) && find /var/backups/mongodb -type d -mtime +7 -exec rm -rf {} +
```

## Performance Optimization

### 1. Enable PM2 Cluster Mode

```bash
# Stop current process
pm2 delete mgnrega-backend

# Start in cluster mode (uses all CPU cores)
pm2 start server.js -i max --name mgnrega-backend

# Save configuration
pm2 save
```

### 2. Optimize MongoDB

```bash
# Connect to MongoDB
mongosh

# Create indexes (if not already created by application)
use mgnrega_tracker
db.districtperformances.createIndex({ stateCode: 1, districtCode: 1, financialYear: 1, month: 1 })
db.districtmasters.createIndex({ districtName: "text", stateName: "text" })
```

### 3. Setup Nginx Caching

Add to Nginx configuration:

```nginx
# Add inside http block of /etc/nginx/nginx.conf
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=100m inactive=60m;
```

## Troubleshooting

### Backend Not Starting

```bash
# Check logs
pm2 logs mgnrega-backend --err

# Check if port 5000 is in use
sudo netstat -tlnp | grep 5000

# Check MongoDB connection
mongosh --eval "db.adminCommand('ping')"
```

### Frontend Not Loading

```bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Verify files exist
ls -la /var/www/html/mgnrega/

# Check Nginx configuration
sudo nginx -t
```

### MongoDB Issues

```bash
# Check MongoDB status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

## Security Checklist

- [ ] Change default MongoDB port or restrict access
- [ ] Setup firewall rules (UFW)
- [ ] Enable SSL/HTTPS
- [ ] Regular security updates (`sudo apt update && sudo apt upgrade`)
- [ ] Setup fail2ban for SSH protection
- [ ] Use strong passwords
- [ ] Regular backups
- [ ] Monitor logs for suspicious activity

## Support

For issues or questions:
1. Check application logs
2. Review this deployment guide
3. Check the main README.md

## Quick Commands Reference

```bash
# Start everything
pm2 start mgnrega-backend
sudo systemctl start nginx mongod

# Stop everything
pm2 stop mgnrega-backend
sudo systemctl stop nginx

# Restart everything
pm2 restart mgnrega-backend
sudo systemctl restart nginx

# View status
pm2 status
sudo systemctl status nginx
sudo systemctl status mongod

# View logs
pm2 logs
sudo tail -f /var/log/nginx/error.log
```

---

**Congratulations!** Your MGNREGA Performance Tracker is now deployed and accessible to users.
