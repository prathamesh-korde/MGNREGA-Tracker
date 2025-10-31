const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Test server running' });
});

app.get('/api/location/states', (req, res) => {
  res.json({
    success: true,
    data: [
      { name: 'Maharashtra', code: 'MH' }
    ]
  });
});

app.get('/api/location/districts/:stateCode', (req, res) => {
  const districts = [
    { stateCode: 'MH', districtCode: 'MH01', districtName: 'Mumbai' },
    { stateCode: 'MH', districtCode: 'MH05', districtName: 'Pune' },
    { stateCode: 'MH', districtCode: 'MH14', districtName: 'Nagpur' }
  ];
  res.json({ success: true, data: districts });
});

app.post('/api/location/detect', (req, res) => {
  const { latitude, longitude } = req.body;
  res.json({
    success: true,
    detected: true,
    data: {
      stateCode: 'MH',
      districtCode: 'MH05',
      districtName: 'Pune',
      latitude: 18.5204,
      longitude: 73.8567
    }
  });
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running on port ${PORT}`);
});
