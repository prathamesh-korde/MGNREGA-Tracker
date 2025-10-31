import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { performanceAPI } from '../services/api';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  FaBriefcase, FaUsers, FaRupeeSign, FaTasks, FaChartLine, FaHome, FaExchangeAlt 
} from 'react-icons/fa';
import './Dashboard.css';

const COLORS = ['#4CAF50', '#FF9800', '#2196F3', '#F44336'];

function Dashboard() {
  const { stateCode, districtCode } = useParams();
  const [currentData, setCurrentData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [stateCode, districtCode]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch current data
      const currentResponse = await performanceAPI.getDistrictPerformance(
        stateCode, 
        districtCode,
        '2024-25',
        'October'
      );

      // Fetch historical data
      const historicalResponse = await performanceAPI.getHistoricalData(
        stateCode,
        districtCode,
        12
      );

      setCurrentData(currentResponse.data.data);
      setHistoricalData(historicalResponse.data.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('डेटा लोड करने में त्रुटि / Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (num) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const formatNumber = (num) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(2)} L`;
    return num.toLocaleString('en-IN');
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>डेटा लोड हो रहा है... / Loading data...</p>
      </div>
    );
  }

  if (error || !currentData) {
    return (
      <div className="dashboard-error">
        <p>{error || 'No data available'}</p>
        <Link to="/" className="back-button">
          <FaHome /> घर वापस जाएं / Go Back Home
        </Link>
      </div>
    );
  }

  // Prepare chart data
  const budgetData = [
    { name: 'आवंटित / Allocated', value: currentData.budgetAllocated },
    { name: 'उपयोग / Utilized', value: currentData.budgetUtilized },
    { name: 'शेष / Remaining', value: currentData.budgetAllocated - currentData.budgetUtilized }
  ];

  const workData = [
    { name: 'पूर्ण / Completed', value: currentData.workCompleted },
    { name: 'प्रगति में / In Progress', value: currentData.workInProgress }
  ];

  const trendData = historicalData.slice(0, 6).reverse().map(item => ({
    month: item.month.substring(0, 3),
    'रोजगार / Employment': item.employmentProvided,
    'व्यक्ति-दिन / Person Days': item.personDaysGenerated / 10000,
  }));

  const utilizationTrend = historicalData.slice(0, 6).reverse().map(item => ({
    month: item.month.substring(0, 3),
    'उपयोग % / Utilization %': item.utilizationPercentage,
  }));

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="breadcrumb">
          <Link to="/">
            <FaHome /> होम / Home
          </Link>
          <span>/</span>
          <span>{currentData.districtName}, {currentData.stateName}</span>
        </div>
        <h2>
          <span className="hindi">{currentData.districtName} का प्रदर्शन</span>
          <span className="english">{currentData.districtName} Performance Dashboard</span>
        </h2>
        <Link to={`/compare/${stateCode}`} className="compare-button">
          <FaExchangeAlt /> तुलना करें / Compare Districts
        </Link>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card green">
          <div className="metric-icon">
            <FaUsers />
          </div>
          <div className="metric-content">
            <h3>
              <span className="hindi">सक्रिय जॉब कार्ड</span>
              <span className="english">Active Job Cards</span>
            </h3>
            <div className="metric-value">{formatNumber(currentData.activeJobCards)}</div>
            <div className="metric-detail">
              कुल / Total: {formatNumber(currentData.totalJobCards)}
            </div>
          </div>
        </div>

        <div className="metric-card orange">
          <div className="metric-icon">
            <FaBriefcase />
          </div>
          <div className="metric-content">
            <h3>
              <span className="hindi">रोजगार प्रदान</span>
              <span className="english">Employment Provided</span>
            </h3>
            <div className="metric-value">{formatNumber(currentData.employmentProvided)}</div>
            <div className="metric-detail">
              औसत दिन / Avg Days: {currentData.averageDaysPerHousehold}
            </div>
          </div>
        </div>

        <div className="metric-card blue">
          <div className="metric-icon">
            <FaChartLine />
          </div>
          <div className="metric-content">
            <h3>
              <span className="hindi">व्यक्ति-दिन उत्पन्न</span>
              <span className="english">Person Days Generated</span>
            </h3>
            <div className="metric-value">{formatNumber(currentData.personDaysGenerated)}</div>
          </div>
        </div>

        <div className="metric-card purple">
          <div className="metric-icon">
            <FaRupeeSign />
          </div>
          <div className="metric-content">
            <h3>
              <span className="hindi">बजट उपयोग</span>
              <span className="english">Budget Utilization</span>
            </h3>
            <div className="metric-value">{currentData.utilizationPercentage}%</div>
            <div className="metric-detail">
              {formatCurrency(currentData.budgetUtilized)} / {formatCurrency(currentData.budgetAllocated)}
            </div>
          </div>
        </div>

        <div className="metric-card red">
          <div className="metric-icon">
            <FaTasks />
          </div>
          <div className="metric-content">
            <h3>
              <span className="hindi">कार्य पूर्ण</span>
              <span className="english">Works Completed</span>
            </h3>
            <div className="metric-value">{currentData.workCompleted}</div>
            <div className="metric-detail">
              प्रगति में / In Progress: {currentData.workInProgress}
            </div>
          </div>
        </div>

        <div className="metric-card teal">
          <div className="metric-icon">
            <FaRupeeSign />
          </div>
          <div className="metric-content">
            <h3>
              <span className="hindi">मजदूरी भुगतान</span>
              <span className="english">Wages Paid</span>
            </h3>
            <div className="metric-value">{formatCurrency(currentData.wagesPaid)}</div>
            <div className="metric-detail">
              सामग्री / Material: {formatCurrency(currentData.materialCost)}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>
            <span className="hindi">बजट विवरण</span>
            <span className="english">Budget Overview</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>
            <span className="hindi">कार्य स्थिति</span>
            <span className="english">Work Status</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card full-width">
          <h3>
            <span className="hindi">रोजगार प्रवृत्ति (पिछले 6 महीने)</span>
            <span className="english">Employment Trend (Last 6 Months)</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="रोजगार / Employment" 
                stroke="#4CAF50" 
                strokeWidth={2}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="व्यक्ति-दिन / Person Days" 
                stroke="#FF9800" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card full-width">
          <h3>
            <span className="hindi">बजट उपयोग प्रवृत्ति</span>
            <span className="english">Budget Utilization Trend</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={utilizationTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="उपयोग % / Utilization %" 
                stroke="#2196F3" 
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Information Box */}
      <div className="info-box">
        <h3>ℹ️ जानकारी / Information</h3>
        <ul>
          <li>
            <strong className="hindi">जॉब कार्ड:</strong>
            <span className="english">Job Card:</span>
            <span> वह दस्तावेज जो परिवार को 100 दिनों के रोजगार की गारंटी देता है</span>
          </li>
          <li>
            <strong className="hindi">व्यक्ति-दिन:</strong>
            <span className="english">Person Days:</span>
            <span> एक व्यक्ति द्वारा काम किए गए दिनों की कुल संख्या</span>
          </li>
          <li>
            <strong className="hindi">बजट उपयोग:</strong>
            <span className="english">Budget Utilization:</span>
            <span> आवंटित बजट का कितना प्रतिशत खर्च किया गया</span>
          </li>
          <li>
            <strong>डेटा स्रोत / Data Source:</strong>
            <span> data.gov.in API (अंतिम अपडेट: {new Date(currentData.lastUpdated).toLocaleDateString('hi-IN')})</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
