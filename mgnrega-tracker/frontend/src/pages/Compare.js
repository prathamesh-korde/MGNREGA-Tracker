import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { performanceAPI } from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { FaHome, FaArrowRight } from 'react-icons/fa';
import './Compare.css';

function Compare() {
  const { stateCode } = useParams();
  const [compareData, setCompareData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompareData();
  }, [stateCode]);

  const fetchCompareData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await performanceAPI.getComparativeData(
        stateCode,
        '2024-25',
        'October'
      );

      setCompareData(response.data.data || []);
    } catch (err) {
      console.error('Error fetching comparative data:', err);
      setError('डेटा लोड करने में त्रुटि / Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (!num || num === undefined || num === null) return '0';
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    return num.toLocaleString('en-IN');
  };

  if (loading) {
    return (
      <div className="compare-loading">
        <div className="spinner"></div>
        <p>डेटा लोड हो रहा है... / Loading data...</p>
      </div>
    );
  }

  if (error || !compareData.length) {
    return (
      <div className="compare-error">
        <p>{error || 'No data available'}</p>
        <Link to="/" className="back-button">
          <FaHome /> घर वापस जाएं / Go Back Home
        </Link>
      </div>
    );
  }

  // Prepare chart data with safety checks
  const employmentCompare = compareData.map(d => ({
    name: d?.districtName?.substring(0, 10) || 'Unknown',
    'रोजगार / Employment': d?.employmentProvided || 0,
  }));

  const budgetCompare = compareData.map(d => ({
    name: d?.districtName?.substring(0, 10) || 'Unknown',
    'उपयोग % / Utilization %': d?.utilizationPercentage || 0,
  }));

  const personDaysCompare = compareData.map(d => ({
    name: d?.districtName?.substring(0, 10) || 'Unknown',
    'व्यक्ति-दिन / Person Days': d?.personDaysGenerated || 0,
  }));

  return (
    <div className="compare">
      <div className="compare-header">
        <Link to="/" className="breadcrumb">
          <FaHome /> होम / Home
        </Link>
        <h2>
          <span className="hindi">जिला तुलना</span>
          <span className="english">District Comparison - {compareData[0]?.stateName}</span>
        </h2>
      </div>

      {/* Comparison Table */}
      <div className="comparison-table-wrapper">
        <h3>
          <span className="hindi">सभी जिलों का प्रदर्शन</span>
          <span className="english">All Districts Performance</span>
        </h3>
        <div className="table-scroll">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>जिला / District</th>
                <th>सक्रिय जॉब कार्ड / Active Cards</th>
                <th>रोजगार / Employment</th>
                <th>व्यक्ति-दिन / Person Days</th>
                <th>बजट उपयोग / Budget Util. %</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {compareData.map((district, index) => (
                <tr key={index}>
                  <td className="district-name">{district?.districtName || 'Unknown'}</td>
                  <td>{formatNumber(district?.activeJobCards)}</td>
                  <td>{formatNumber(district?.employmentProvided)}</td>
                  <td>{formatNumber(district?.personDaysGenerated)}</td>
                  <td>
                    <div className="progress-cell">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${district?.utilizationPercentage || 0}%`,
                            background: (district?.utilizationPercentage || 0) > 80 ? '#4CAF50' : 
                                       (district?.utilizationPercentage || 0) > 60 ? '#FF9800' : '#F44336'
                          }}
                        ></div>
                      </div>
                      <span>{district?.utilizationPercentage || 0}%</span>
                    </div>
                  </td>
                  <td>
                    <Link 
                      to={`/dashboard/${district?.stateCode || 'MH'}/${district?.districtCode || 'unknown'}`}
                      className="view-button"
                    >
                      विवरण / Details <FaArrowRight />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>
            <span className="hindi">रोजगार तुलना</span>
            <span className="english">Employment Comparison</span>
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={employmentCompare} margin={{ bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="रोजगार / Employment" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>
            <span className="hindi">बजट उपयोग तुलना</span>
            <span className="english">Budget Utilization Comparison</span>
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={budgetCompare} margin={{ bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="उपयोग % / Utilization %" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card full-width">
          <h3>
            <span className="hindi">व्यक्ति-दिन तुलना</span>
            <span className="english">Person Days Comparison</span>
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={personDaysCompare} margin={{ bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="व्यक्ति-दिन / Person Days" fill="#FF9800" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performers */}
      <div className="top-performers">
        <h3>🏆 शीर्ष प्रदर्शन करने वाले / Top Performers</h3>
        <div className="performers-grid">
          <div className="performer-card">
            <h4>सबसे अधिक रोजगार / Most Employment</h4>
            <p className="performer-name">
              {[...compareData].sort((a, b) => (b?.employmentProvided || 0) - (a?.employmentProvided || 0))[0]?.districtName || 'N/A'}
            </p>
            <p className="performer-value">
              {formatNumber([...compareData].sort((a, b) => (b?.employmentProvided || 0) - (a?.employmentProvided || 0))[0]?.employmentProvided)}
            </p>
          </div>

          <div className="performer-card">
            <h4>सर्वोत्तम बजट उपयोग / Best Budget Utilization</h4>
            <p className="performer-name">
              {[...compareData].sort((a, b) => (b?.utilizationPercentage || 0) - (a?.utilizationPercentage || 0))[0]?.districtName || 'N/A'}
            </p>
            <p className="performer-value">
              {[...compareData].sort((a, b) => (b?.utilizationPercentage || 0) - (a?.utilizationPercentage || 0))[0]?.utilizationPercentage || 0}%
            </p>
          </div>

          <div className="performer-card">
            <h4>सबसे अधिक व्यक्ति-दिन / Most Person Days</h4>
            <p className="performer-name">
              {[...compareData].sort((a, b) => (b?.personDaysGenerated || 0) - (a?.personDaysGenerated || 0))[0]?.districtName || 'N/A'}
            </p>
            <p className="performer-value">
              {formatNumber([...compareData].sort((a, b) => (b?.personDaysGenerated || 0) - (a?.personDaysGenerated || 0))[0]?.personDaysGenerated)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compare;
