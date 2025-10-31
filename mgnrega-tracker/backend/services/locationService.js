const DistrictMaster = require('../models/DistrictMaster');
const logger = require('../config/logger');

// Maharashtra districts with actual coordinates
const MAHARASHTRA_DISTRICTS = [
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
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH11', districtName: 'Sangli', latitude: 16.8524, longitude: 74.5815 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH12', districtName: 'Sindhudurg', latitude: 16.0213, longitude: 73.6784 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH13', districtName: 'Ratnagiri', latitude: 16.9944, longitude: 73.3000 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH14', districtName: 'Nagpur', latitude: 21.1458, longitude: 79.0882 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH15', districtName: 'Wardha', latitude: 20.7453, longitude: 78.5977 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH16', districtName: 'Chandrapur', latitude: 19.9615, longitude: 79.2961 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH17', districtName: 'Gadchiroli', latitude: 20.1809, longitude: 80.0032 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH18', districtName: 'Bhandara', latitude: 21.1704, longitude: 79.6522 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH19', districtName: 'Gondia', latitude: 21.4557, longitude: 80.1943 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH20', districtName: 'Amravati', latitude: 20.9374, longitude: 77.7796 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH21', districtName: 'Akola', latitude: 20.7002, longitude: 77.0082 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH22', districtName: 'Yavatmal', latitude: 20.3897, longitude: 78.1308 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH23', districtName: 'Buldhana', latitude: 20.5311, longitude: 76.1873 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH24', districtName: 'Washim', latitude: 20.1097, longitude: 77.1342 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH25', districtName: 'Hingoli', latitude: 19.7165, longitude: 77.1481 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH26', districtName: 'Parbhani', latitude: 19.2704, longitude: 76.7749 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH27', districtName: 'Jalna', latitude: 19.8347, longitude: 75.8800 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH28', districtName: 'Aurangabad', latitude: 19.8762, longitude: 75.3433 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH29', districtName: 'Nanded', latitude: 19.1383, longitude: 77.3210 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH30', districtName: 'Latur', latitude: 18.3984, longitude: 76.5604 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH31', districtName: 'Osmanabad', latitude: 18.1774, longitude: 76.0372 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH32', districtName: 'Beed', latitude: 18.9892, longitude: 75.7547 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH33', districtName: 'Dhule', latitude: 20.9042, longitude: 74.7749 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH34', districtName: 'Jalgaon', latitude: 21.0077, longitude: 75.5626 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH35', districtName: 'Nandurbar', latitude: 21.3667, longitude: 74.2333 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH36', districtName: 'Palghar', latitude: 19.6967, longitude: 72.7649 }
];

class LocationService {
  constructor() {
    this.inMemoryDistricts = MAHARASHTRA_DISTRICTS;
  }

  /**
   * Find district by coordinates (for location detection bonus feature)
   */
  async findDistrictByCoordinates(latitude, longitude) {
    try {
      // Try database first if available
      let districts = [];
      
      try {
        districts = await DistrictMaster.find({
          latitude: { $exists: true },
          longitude: { $exists: true }
        });
      } catch (dbError) {
        // Fallback to in-memory data if DB not available
        logger.warn('Using in-memory district data');
        districts = this.inMemoryDistricts;
      }

      let nearestDistrict = null;
      let minDistance = Infinity;

      districts.forEach(district => {
        const distance = this.calculateDistance(
          latitude, 
          longitude, 
          district.latitude, 
          district.longitude
        );

        if (distance < minDistance) {
          minDistance = distance;
          nearestDistrict = district;
        }
      });

      // Only return if within 100km
      if (nearestDistrict && minDistance < 100) {
        return {
          ...nearestDistrict,
          distance: Math.round(minDistance * 10) / 10 // Round to 1 decimal
        };
      }

      return null;
    } catch (error) {
      logger.error('Error finding district by coordinates:', error);
      throw error;
    }
  }

  /**
   * Calculate distance between two points using Haversine formula
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Search districts by name
   */
  async searchDistricts(query) {
    try {
      // Try database first
      try {
        return await DistrictMaster.find(
          { $text: { $search: query } },
          { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } });
      } catch (dbError) {
        // Fallback to in-memory search
        const lowerQuery = query.toLowerCase();
        return this.inMemoryDistricts.filter(d => 
          d.districtName.toLowerCase().includes(lowerQuery) ||
          d.stateName.toLowerCase().includes(lowerQuery)
        );
      }
    } catch (error) {
      logger.error('Error searching districts:', error);
      throw error;
    }
  }

  /**
   * Get all districts for a state
   */
  async getDistrictsByState(stateCode) {
    try {
      // Try database first
      try {
        return await DistrictMaster.find({ stateCode, isActive: true })
          .sort({ districtName: 1 });
      } catch (dbError) {
        // Fallback to in-memory data
        return this.inMemoryDistricts
          .filter(d => d.stateCode === stateCode)
          .sort((a, b) => a.districtName.localeCompare(b.districtName));
      }
    } catch (error) {
      logger.error('Error fetching districts by state:', error);
      throw error;
    }
  }

  /**
   * Get all states
   */
  async getAllStates() {
    try {
      // Try database first
      try {
        const states = await DistrictMaster.distinct('stateName');
        return states.map(name => ({ name, code: 'MH' }));
      } catch (dbError) {
        // Fallback to in-memory data
        return [{ name: 'Maharashtra', code: 'MH' }];
      }
    } catch (error) {
      logger.error('Error fetching states:', error);
      throw error;
    }
  }
}

module.exports = new LocationService();
