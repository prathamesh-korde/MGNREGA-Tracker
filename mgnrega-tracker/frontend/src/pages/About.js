import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaGithub, FaLinkedin } from 'react-icons/fa';
import './About.css';

function About() {
  return (
    <div className="about">
      <div className="about-header">
        <Link to="/" className="breadcrumb">
          <FaHome /> होम / Home
        </Link>
        <h2>
          <span className="hindi">परियोजना के बारे में</span>
          <span className="english">About This Project</span>
        </h2>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h3>🎯 उद्देश्य / Purpose</h3>
          <p className="hindi">
            यह वेब एप्लिकेशन ग्रामीण भारत के नागरिकों को मनरेगा योजना के प्रदर्शन को सरल और समझने योग्य तरीके से देखने में मदद करता है।
          </p>
          <p className="english">
            This web application helps rural Indian citizens understand MGNREGA scheme performance in their district in a simple and accessible manner.
          </p>
        </section>

        <section className="about-section">
          <h3>📊 मनरेगा के बारे में / About MGNREGA</h3>
          <div className="info-grid">
            <div className="info-item">
              <h4>क्या है मनरेगा? / What is MGNREGA?</h4>
              <p>
                महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (MGNREGA) भारत की सबसे बड़ी रोजगार गारंटी योजना है। 
                यह ग्रामीण परिवारों को एक वित्तीय वर्ष में कम से कम 100 दिनों की रोजगार गारंटी प्रदान करती है।
              </p>
            </div>
            <div className="info-item">
              <h4>मुख्य लाभ / Key Benefits</h4>
              <ul>
                <li>✓ 100 दिनों की रोजगार गारंटी / 100 days employment guarantee</li>
                <li>✓ न्यूनतम मजदूरी का भुगतान / Minimum wage payment</li>
                <li>✓ ग्रामीण बुनियादी ढांचे का विकास / Rural infrastructure development</li>
                <li>✓ सामाजिक समावेश / Social inclusion</li>
              </ul>
            </div>
            <div className="info-item">
              <h4>2025 में प्रभाव / Impact in 2025</h4>
              <p>
                <strong>12.15 करोड़</strong> ग्रामीण भारतीयों ने इस योजना का लाभ उठाया है।
                यह दुनिया की सबसे बड़ी कल्याणकारी योजनाओं में से एक है।
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h3>🛠️ तकनीकी विवरण / Technical Details</h3>
          <div className="tech-stack">
            <div className="tech-category">
              <h4>Frontend</h4>
              <ul>
                <li>React.js</li>
                <li>React Router</li>
                <li>Recharts (Visualizations)</li>
                <li>Axios (API calls)</li>
              </ul>
            </div>
            <div className="tech-category">
              <h4>Backend</h4>
              <ul>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>MongoDB (Database)</li>
                <li>Mongoose (ODM)</li>
              </ul>
            </div>
            <div className="tech-category">
              <h4>Production Features</h4>
              <ul>
                <li>Data caching for reliability</li>
                <li>Rate limiting</li>
                <li>Error handling & logging</li>
                <li>Responsive design</li>
                <li>Location detection</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h3>🌟 मुख्य विशेषताएं / Key Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h4>स्वचालित स्थान पता लगाना</h4>
              <p>Automatic location detection to find your district</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h4>सरल दृश्य</h4>
              <p>Easy-to-understand charts and graphs for low-literacy users</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h4>ऐतिहासिक डेटा</h4>
              <p>View past performance and trends</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚖️</div>
              <h4>जिला तुलना</h4>
              <p>Compare performance across districts</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💾</div>
              <h4>डेटा कैशिंग</h4>
              <p>Works even when government API is down</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h4>द्विभाषी</h4>
              <p>Hindi + English for better accessibility</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h3>🏗️ आर्किटेक्चर निर्णय / Architecture Decisions</h3>
          <div className="architecture-info">
            <div className="arch-item">
              <h4>1. MongoDB Caching Layer</h4>
              <p>
                All API data is cached in MongoDB with configurable expiry (default 24 hours). 
                This ensures the application remains functional even if data.gov.in API is down or rate-limited.
              </p>
            </div>
            <div className="arch-item">
              <h4>2. Retry Logic</h4>
              <p>
                Automatic retry mechanism (3 attempts) for failed API calls with exponential backoff.
              </p>
            </div>
            <div className="arch-item">
              <h4>3. API Logging</h4>
              <p>
                All API calls are logged with status codes and response times for monitoring and debugging.
              </p>
            </div>
            <div className="arch-item">
              <h4>4. Rate Limiting</h4>
              <p>
                Express rate limiter protects the backend from abuse (100 requests per 15 minutes per IP).
              </p>
            </div>
            <div className="arch-item">
              <h4>5. Responsive UI</h4>
              <p>
                Mobile-first design with large touch targets and simple language for rural users.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h3>🚀 डिप्लॉयमेंट / Deployment</h3>
          <div className="deployment-info">
            <p>
              This application is designed to be deployed on a VPS/VM with the following setup:
            </p>
            <ul>
              <li><strong>Frontend:</strong> Served via Nginx</li>
              <li><strong>Backend:</strong> Node.js application managed by PM2</li>
              <li><strong>Database:</strong> MongoDB (local or cloud)</li>
              <li><strong>Reverse Proxy:</strong> Nginx for SSL termination and load balancing</li>
            </ul>
          </div>
        </section>

        <section className="about-section">
          <h3>📝 डेटा स्रोत / Data Source</h3>
          <p>
            All data is sourced from the official Government of India Open API:
            <br />
            <a 
              href="https://www.data.gov.in/catalog/mahatma-gandhi-national-rural-employment-guarantee-act-mgnrega" 
              target="_blank" 
              rel="noopener noreferrer"
              className="data-link"
            >
              data.gov.in - MGNREGA Performance Data
            </a>
          </p>
          <p className="note">
            Note: For this demonstration, sample data for Maharashtra state is used. 
            In production, real API integration would be implemented based on the actual API structure.
          </p>
        </section>

        <section className="about-section contact-section">
          <h3>👨‍💻 डेवलपर / Developer</h3>
          <p>Built with ❤️ for rural India</p>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </section>

        <div className="back-to-home">
          <Link to="/" className="home-button">
            <FaHome /> वापस होम पेज पर जाएं / Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
