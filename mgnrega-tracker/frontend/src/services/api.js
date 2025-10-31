import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Location API
export const locationAPI = {
  getStates: () => api.get('/location/states'),
  getDistricts: (stateCode) => api.get(`/location/districts/${stateCode}`),
  detectLocation: (latitude, longitude) => 
    api.post('/location/detect', { latitude, longitude }),
  searchDistricts: (query) => api.get(`/location/search?q=${query}`),
};

// Performance API
export const performanceAPI = {
  getDistrictPerformance: (stateCode, districtCode, financialYear, month) =>
    api.get(`/performance/district/${stateCode}/${districtCode}`, {
      params: { financialYear, month },
    }),
  getHistoricalData: (stateCode, districtCode, limit = 12) =>
    api.get(`/performance/historical/${stateCode}/${districtCode}`, {
      params: { limit },
    }),
  getComparativeData: (stateCode, financialYear, month) =>
    api.get(`/performance/comparative/${stateCode}`, {
      params: { financialYear, month },
    }),
  getAnalytics: (stateCode, districtCode) =>
    api.get(`/performance/analytics/${stateCode}/${districtCode}`),
};

export default api;
