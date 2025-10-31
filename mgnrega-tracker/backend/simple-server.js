// Catch errors before they crash the process
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
});

const express = require('express');
const cors = require('cors');

console.log('Creating Express app...');
const app = express();

console.log('Adding middleware...');
app.use(cors());
app.use(express.json());

console.log('Adding routes...');
app.get('/health', (req, res) => {
  console.log('Health endpoint called');
  res.json({ status: 'OK', message: 'Simple server running!' });
});

app.get('/api/location/states', (req, res) => {
  console.log('States endpoint called');
  res.json({
    success: true,
    data: [{ name: 'Maharashtra', code: 'MH' }]
  });
});

app.get('/api/location/districts/:stateCode', (req, res) => {
  console.log('Districts endpoint called for:', req.params.stateCode);
  const districts = [
    { stateCode: 'MH', districtCode: 'MH01', districtName: 'Mumbai', latitude: 19.0760, longitude: 72.8777 },
    { stateCode: 'MH', districtCode: 'MH02', districtName: 'Mumbai Suburban', latitude: 19.1136, longitude: 72.9083 },
    { stateCode: 'MH', districtCode: 'MH03', districtName: 'Thane', latitude: 19.2183, longitude: 73.0978 },
    { stateCode: 'MH', districtCode: 'MH04', districtName: 'Raigad', latitude: 18.5204, longitude: 73.0167 },
    { stateCode: 'MH', districtCode: 'MH05', districtName: 'Pune', latitude: 18.5204, longitude: 73.8567 },
    { stateCode: 'MH', districtCode: 'MH06', districtName: 'Nashik', latitude: 20.0110, longitude: 73.7903 },
    { stateCode: 'MH', districtCode: 'MH07', districtName: 'Ahmednagar', latitude: 19.0948, longitude: 74.7480 },
    { stateCode: 'MH', districtCode: 'MH08', districtName: 'Solapur', latitude: 17.6599, longitude: 75.9064 },
    { stateCode: 'MH', districtCode: 'MH09', districtName: 'Satara', latitude: 17.6805, longitude: 74.0183 },
    { stateCode: 'MH', districtCode: 'MH10', districtName: 'Kolhapur', latitude: 16.7050, longitude: 74.2433 },
    { stateCode: 'MH', districtCode: 'MH11', districtName: 'Sangli', latitude: 16.8524, longitude: 74.5815 },
    { stateCode: 'MH', districtCode: 'MH12', districtName: 'Sindhudurg', latitude: 16.0213, longitude: 73.6784 },
    { stateCode: 'MH', districtCode: 'MH13', districtName: 'Ratnagiri', latitude: 16.9944, longitude: 73.3000 },
    { stateCode: 'MH', districtCode: 'MH14', districtName: 'Nagpur', latitude: 21.1458, longitude: 79.0882 },
    { stateCode: 'MH', districtCode: 'MH15', districtName: 'Wardha', latitude: 20.7453, longitude: 78.5977 },
    { stateCode: 'MH', districtCode: 'MH16', districtName: 'Chandrapur', latitude: 19.9615, longitude: 79.2961 },
    { stateCode: 'MH', districtCode: 'MH17', districtName: 'Gadchiroli', latitude: 20.1809, longitude: 80.0032 },
    { stateCode: 'MH', districtCode: 'MH18', districtName: 'Bhandara', latitude: 21.1704, longitude: 79.6522 },
    { stateCode: 'MH', districtCode: 'MH19', districtName: 'Gondia', latitude: 21.4557, longitude: 80.1943 },
    { stateCode: 'MH', districtCode: 'MH20', districtName: 'Amravati', latitude: 20.9374, longitude: 77.7796 },
    { stateCode: 'MH', districtCode: 'MH21', districtName: 'Akola', latitude: 20.7002, longitude: 77.0082 },
    { stateCode: 'MH', districtCode: 'MH22', districtName: 'Yavatmal', latitude: 20.3897, longitude: 78.1308 },
    { stateCode: 'MH', districtCode: 'MH23', districtName: 'Buldhana', latitude: 20.5311, longitude: 76.1873 },
    { stateCode: 'MH', districtCode: 'MH24', districtName: 'Washim', latitude: 20.1097, longitude: 77.1342 },
    { stateCode: 'MH', districtCode: 'MH25', districtName: 'Hingoli', latitude: 19.7165, longitude: 77.1481 },
    { stateCode: 'MH', districtCode: 'MH26', districtName: 'Parbhani', latitude: 19.2704, longitude: 76.7749 },
    { stateCode: 'MH', districtCode: 'MH27', districtName: 'Jalna', latitude: 19.8347, longitude: 75.8800 },
    { stateCode: 'MH', districtCode: 'MH28', districtName: 'Aurangabad', latitude: 19.8762, longitude: 75.3433 },
    { stateCode: 'MH', districtCode: 'MH29', districtName: 'Nanded', latitude: 19.1383, longitude: 77.3210 },
    { stateCode: 'MH', districtCode: 'MH30', districtName: 'Latur', latitude: 18.3984, longitude: 76.5604 },
    { stateCode: 'MH', districtCode: 'MH31', districtName: 'Osmanabad', latitude: 18.1774, longitude: 76.0372 },
    { stateCode: 'MH', districtCode: 'MH32', districtName: 'Beed', latitude: 18.9892, longitude: 75.7547 },
    { stateCode: 'MH', districtCode: 'MH33', districtName: 'Dhule', latitude: 20.9042, longitude: 74.7749 },
    { stateCode: 'MH', districtCode: 'MH34', districtName: 'Jalgaon', latitude: 21.0077, longitude: 75.5626 },
    { stateCode: 'MH', districtCode: 'MH35', districtName: 'Nandurbar', latitude: 21.3667, longitude: 74.2333 },
    { stateCode: 'MH', districtCode: 'MH36', districtName: 'Palghar', latitude: 19.6967, longitude: 72.7649 }
  ];
  res.json({ success: true, data: districts });
});

app.post('/api/location/detect', (req, res) => {
  console.log('Location detect called:', req.body);
  const { latitude, longitude } = req.body;
  
  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: 'Latitude and longitude are required'
    });
  }
  
  // All Maharashtra districts with coordinates
  const districts = [
    { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH01', districtName: 'Mumbai', latitude: 19.0760, longitude: 72.8777 },
    { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH02', districtName: 'Mumbai Suburban', latitude: 19.1136, longitude: 72.9083 },
    { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH03', districtName: 'Thane', latitude: 19.2183, longitude: 73.0978 },
    { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH04', districtName: 'Raigad', latitude: 18.5204, longitude: 73.0167 },
    { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH05', districtName: 'Pune', latitude: 18.5204, longitude: 73.8567 },
    { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH06', districtName: 'Nashik', latitude: 20.0110, longitude: 73.7903 },
    { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH07', districtName: 'Ahmednagar', latitude: 19.0948, longitude: 74.7480 },
    { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH08', districtName: 'Solapur', latitude: 17.6599, longitude: 75.9064 },
    { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH09', districtName: 'Satara', latitude: 17.6805, longitude: 74.0183 },
    { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH10', districtName: 'Kolhapur', latitude: 16.7050, longitude: 74.2433 },
    { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH14', districtName: 'Nagpur', latitude: 21.1458, longitude: 79.0882 }
  ];

  // Calculate distance using Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Find nearest district
  let nearestDistrict = null;
  let minDistance = Infinity;

  districts.forEach(district => {
    const distance = calculateDistance(latitude, longitude, district.latitude, district.longitude);
    if (distance < minDistance) {
      minDistance = distance;
      nearestDistrict = { ...district, distance: Math.round(distance * 10) / 10 };
    }
  });

  // Only return if within 100km
  if (nearestDistrict && minDistance < 100) {
    console.log(`Detected: ${nearestDistrict.districtName} (${nearestDistrict.distance}km away)`);
    res.json({
      success: true,
      detected: true,
      data: nearestDistrict
    });
  } else {
    console.log('No district within 100km');
    res.json({
      success: true,
      detected: false,
      message: 'No district found within 100km'
    });
  }
});

// Performance API endpoints
app.get('/api/performance/district/:stateCode/:districtCode', (req, res) => {
  console.log('Performance data requested for:', req.params);
  const { stateCode, districtCode } = req.params;
  const { financialYear = '2024-25', month = 'October' } = req.query;

  // Generate realistic data based on district
  const seed = parseInt(districtCode.replace(/\D/g, '')) || 1;
  const data = {
    stateCode,
    districtCode,
    financialYear,
    month,
    stateName: 'Maharashtra',
    districtName: getDistrictName(districtCode),
    totalJobCards: 50000 + (seed * 2000),
    activeJobCards: Math.floor((50000 + (seed * 2000)) * 0.5),
    employmentProvided: Math.floor((50000 + (seed * 2000)) * 0.35),
    personDaysGenerated: Math.floor((50000 + (seed * 2000)) * 0.35 * 45),
    averageDaysPerHousehold: 45 + Math.floor(seed * 2),
    workCompleted: 200 + (seed * 15),
    workInProgress: 100 + (seed * 8),
    budgetAllocated: (200000000 + seed * 15000000),
    budgetUtilized: Math.floor((200000000 + seed * 15000000) * 0.75),
    utilizationPercentage: 75,
    wagesPaid: Math.floor((200000000 + seed * 15000000) * 0.75 * 0.7),
    materialCost: Math.floor((200000000 + seed * 15000000) * 0.75 * 0.3),
    lastUpdated: new Date().toISOString(),
    dataSource: 'data.gov.in'
  };

  res.json({ success: true, data });
});

app.get('/api/performance/historical/:stateCode/:districtCode', (req, res) => {
  console.log('Historical data requested for:', req.params);
  const { stateCode, districtCode } = req.params;
  const { limit = 12 } = req.query;

  const months = ['October', 'September', 'August', 'July', 'June', 'May', 'April', 'March', 'February', 'January', 'December', 'November'];
  const seed = parseInt(districtCode.replace(/\D/g, '')) || 1;
  
  const historicalData = months.slice(0, limit).map((month, index) => ({
    month,
    financialYear: index < 7 ? '2024-25' : '2023-24',
    personDaysGenerated: Math.floor((50000 + (seed * 2000)) * 0.35 * (40 + Math.random() * 20)),
    budgetUtilized: Math.floor((200000000 + seed * 15000000) * (0.6 + Math.random() * 0.3)),
    utilizationPercentage: Math.floor(60 + Math.random() * 30),
    employmentProvided: Math.floor((50000 + (seed * 2000)) * (0.3 + Math.random() * 0.2))
  }));

  res.json({ success: true, data: historicalData.reverse() });
});

app.get('/api/performance/comparative/:stateCode', (req, res) => {
  console.log('Comparative data requested for state:', req.params.stateCode);
  const { financialYear = '2024-25', month = 'October' } = req.query;

  const districts = [
    { code: 'MH01', name: 'Mumbai' },
    { code: 'MH05', name: 'Pune' },
    { code: 'MH14', name: 'Nagpur' },
    { code: 'MH06', name: 'Nashik' },
    { code: 'MH03', name: 'Thane' },
    { code: 'MH10', name: 'Kolhapur' }
  ];

  const comparativeData = districts.map(district => {
    const seed = parseInt(district.code.replace(/\D/g, ''));
    return {
      districtCode: district.code,
      districtName: district.name,
      totalJobCards: 50000 + (seed * 2000),
      activeJobCards: Math.floor((50000 + (seed * 2000)) * 0.5),
      personDaysGenerated: Math.floor((50000 + (seed * 2000)) * 0.35 * 45),
      budgetUtilized: Math.floor((200000000 + seed * 15000000) * 0.75),
      utilizationPercentage: 65 + Math.floor(Math.random() * 25)
    };
  });

  res.json({ success: true, data: comparativeData });
});

app.get('/api/performance/analytics/:stateCode/:districtCode', (req, res) => {
  console.log('Analytics requested for:', req.params);
  const { stateCode, districtCode } = req.params;
  const seed = parseInt(districtCode.replace(/\D/g, '')) || 1;

  const analytics = {
    districtCode,
    districtName: getDistrictName(districtCode),
    performance: {
      rating: seed % 2 === 0 ? 'Good' : 'Average',
      score: 65 + (seed * 2),
      rank: seed,
      totalDistricts: 36
    },
    trends: {
      employmentTrend: seed % 3 === 0 ? 'increasing' : 'stable',
      budgetTrend: 'increasing',
      workCompletionRate: 70 + (seed * 2)
    },
    highlights: [
      `${50000 + (seed * 2000)} total job cards registered`,
      `₹${Math.floor((200000000 + seed * 15000000) / 10000000)}Cr budget allocated`,
      `${Math.floor((50000 + (seed * 2000)) * 0.35 * 45)} person-days generated`
    ]
  };

  res.json({ success: true, data: analytics });
});

function getDistrictName(code) {
  const names = {
    'MH01': 'Mumbai', 'MH02': 'Mumbai Suburban', 'MH03': 'Thane',
    'MH04': 'Raigad', 'MH05': 'Pune', 'MH06': 'Nashik',
    'MH07': 'Ahmednagar', 'MH08': 'Solapur', 'MH09': 'Satara',
    'MH10': 'Kolhapur', 'MH11': 'Sangli', 'MH12': 'Sindhudurg',
    'MH13': 'Ratnagiri', 'MH14': 'Nagpur', 'MH15': 'Wardha',
    'MH16': 'Chandrapur', 'MH17': 'Gadchiroli', 'MH18': 'Bhandara',
    'MH19': 'Gondia', 'MH20': 'Amravati', 'MH21': 'Akola',
    'MH22': 'Yavatmal', 'MH23': 'Buldhana', 'MH24': 'Washim',
    'MH25': 'Hingoli', 'MH26': 'Parbhani', 'MH27': 'Jalna',
    'MH28': 'Aurangabad', 'MH29': 'Nanded', 'MH30': 'Latur',
    'MH31': 'Osmanabad', 'MH32': 'Beed', 'MH33': 'Dhule',
    'MH34': 'Jalgaon', 'MH35': 'Nandurbar', 'MH36': 'Palghar'
  };
  return names[code] || 'Unknown District';
}

const PORT = process.env.PORT || 3001;
console.log(`Starting server on port ${PORT}...`);

try {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ Server successfully running on http://localhost:${PORT}`);
    console.log(`✓ Test it: http://localhost:${PORT}/health`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  server.on('error', (error) => {
    console.error('SERVER ERROR:', error);
  });
} catch (error) {
  console.error('FAILED TO START SERVER:', error);
}

console.log('Server setup complete, waiting for connections...');
