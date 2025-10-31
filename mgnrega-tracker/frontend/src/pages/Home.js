import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { locationAPI } from '../services/api';
import { FaMapMarkerAlt, FaSearch, FaArrowRight } from 'react-icons/fa';
import './Home.css';

function Home() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [loading, setLoading] = useState(false);
  const [locationDetecting, setLocationDetecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      setLoading(true);
      const response = await locationAPI.getStates();
      console.log('States response:', response.data);
      setStates(response.data.data || []);
      
      // Auto-select Maharashtra if it's the only state
      if (response.data.data && response.data.data.length === 1) {
        const state = response.data.data[0];
        setSelectedState(state.code);
        fetchDistrictsForState(state.code);
      }
    } catch (error) {
      console.error('Error fetching states:', error);
      alert('Error loading states. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDistrictsForState = async (stateCode) => {
    try {
      setLoading(true);
      const response = await locationAPI.getDistricts(stateCode);
      console.log('Districts response:', response.data);
      setDistricts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching districts:', error);
      alert('Error loading districts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = async (e) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
    setSelectedDistrict('');

    if (stateCode) {
      fetchDistrictsForState(stateCode);
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedState && selectedDistrict) {
      navigate(`/dashboard/${selectedState}/${selectedDistrict}`);
    }
  };

  const detectLocation = () => {
    setLocationDetecting(true);
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            console.log('Detected coordinates:', latitude, longitude);
            
            const response = await locationAPI.detectLocation(latitude, longitude);
            console.log('Location detection response:', response.data);
            
            if (response.data.detected && response.data.data) {
              const district = response.data.data;
              alert(`स्थान मिल गया! जिला: ${district.districtName}\nLocation detected! District: ${district.districtName}\n\nRedirecting to dashboard...`);
              navigate(`/dashboard/${district.stateCode}/${district.districtCode}`);
            } else {
              alert('क्षमा करें, आपके स्थान के आधार पर जिला नहीं मिला। कृपया मैन्युअल रूप से चुनें।\n\nSorry, could not detect your district within 100km. Please select manually.');
            }
          } catch (error) {
            console.error('Error detecting location:', error);
            alert(`स्थान का पता लगाने में त्रुटि। कृपया मैन्युअल रूप से चुनें।\n\nError detecting location: ${error.message}\nPlease select manually.`);
          } finally {
            setLocationDetecting(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          let message = 'कृपया स्थान की अनुमति दें या मैन्युअल रूप से चुनें।\n\nPlease allow location access or select manually.';
          
          if (error.code === 1) {
            message = 'स्थान की अनुमति अस्वीकृत। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।\n\nLocation permission denied. Please enable in browser settings.';
          } else if (error.code === 2) {
            message = 'स्थान उपलब्ध नहीं है। कृपया मैन्युअल रूप से चुनें।\n\nLocation unavailable. Please select manually.';
          } else if (error.code === 3) {
            message = 'स्थान का समय समाप्त हो गया। कृपया पुनः प्रयास करें।\n\nLocation timeout. Please try again.';
          }
          
          alert(message);
          setLocationDetecting(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert('आपका ब्राउज़र स्थान का समर्थन नहीं करता।\n\nYour browser does not support location detection.');
      setLocationDetecting(false);
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">
            <span className="hindi">अपने जिले का मनरेगा प्रदर्शन देखें</span>
            <span className="english">Track MGNREGA Performance in Your District</span>
          </h2>
          <p className="hero-subtitle">
            <span className="hindi">महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी योजना की जानकारी</span>
            <span className="english">Understand how the rural employment scheme is performing</span>
          </p>

          <div className="selection-card">
            <button 
              onClick={detectLocation} 
              className="location-button"
              disabled={locationDetecting}
            >
              <FaMapMarkerAlt />
              <span>
                {locationDetecting ? (
                  <>
                    <span className="hindi">स्थान का पता लगा रहे हैं...</span>
                    <span className="english">Detecting location...</span>
                  </>
                ) : (
                  <>
                    <span className="hindi">मेरा स्थान खोजें</span>
                    <span className="english">Detect My Location</span>
                  </>
                )}
              </span>
            </button>

            <div className="divider">
              <span className="hindi">या</span>
              <span className="english">OR</span>
            </div>

            <form onSubmit={handleSubmit} className="selection-form">
              <div className="form-group">
                <label>
                  <span className="hindi">राज्य चुनें</span>
                  <span className="english">Select State</span>
                </label>
                <select 
                  value={selectedState} 
                  onChange={handleStateChange}
                  disabled={loading}
                  required
                >
                  <option value="">
                    {loading ? 'Loading...' : '-- राज्य चुनें / Select State --'}
                  </option>
                  {states.map((state, index) => (
                    <option key={index} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  <span className="hindi">जिला चुनें</span>
                  <span className="english">Select District</span>
                </label>
                <select 
                  value={selectedDistrict} 
                  onChange={handleDistrictChange}
                  disabled={!selectedState || loading}
                  required
                >
                  <option value="">
                    {!selectedState 
                      ? 'पहले राज्य चुनें / Select state first' 
                      : loading 
                      ? 'Loading...' 
                      : '-- जिला चुनें / Select District --'}
                  </option>
                  {districts.map((district) => (
                    <option 
                      key={district.districtCode} 
                      value={district.districtCode}
                    >
                      {district.districtName}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={!selectedState || !selectedDistrict}
              >
                <FaSearch />
                <span>
                  <span className="hindi">प्रदर्शन देखें</span>
                  <span className="english">View Performance</span>
                </span>
                <FaArrowRight />
              </button>
            </form>
          </div>

          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">👥</div>
              <h3>12.15 करोड़ लोग</h3>
              <p>12.15 Crore Beneficiaries (2025)</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💰</div>
              <h3>रोजगार गारंटी</h3>
              <p>Employment Guarantee Scheme</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📊</div>
              <h3>पारदर्शी डेटा</h3>
              <p>Transparent Performance Data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
