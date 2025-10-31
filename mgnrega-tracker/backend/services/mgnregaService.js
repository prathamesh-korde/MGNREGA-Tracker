const axios = require('axios');
const DistrictPerformance = require('../models/DistrictPerformance');
const ApiLog = require('../models/ApiLog');
const logger = require('../config/logger');

class MGNREGAService {
  constructor() {
    this.baseURL = process.env.MGNREGA_API_BASE_URL;
    this.retryAttempts = parseInt(process.env.API_RETRY_ATTEMPTS) || 3;
    this.timeout = parseInt(process.env.API_TIMEOUT_MS) || 10000;
    this.cacheDuration = parseInt(process.env.CACHE_DURATION_HOURS) || 24;
  }

  /**
   * Fetch data from external API with retry logic
   */
  async fetchFromAPI(url, retries = this.retryAttempts) {
    const startTime = Date.now();
    
    try {
      const response = await axios.get(url, {
        timeout: this.timeout,
        headers: {
          'User-Agent': 'MGNREGA-Tracker/1.0'
        }
      });

      const responseTime = Date.now() - startTime;
      
      // Log successful API call
      await this.logAPICall(url, 'GET', response.status, responseTime, true);
      
      return response.data;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      if (retries > 0) {
        logger.warn(`API call failed, retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        return this.fetchFromAPI(url, retries - 1);
      }

      // Log failed API call
      await this.logAPICall(
        url, 
        'GET', 
        error.response?.status || 0, 
        responseTime, 
        false, 
        error.message
      );
      
      throw error;
    }
  }

  /**
   * Log API calls for monitoring
   */
  async logAPICall(endpoint, method, statusCode, responseTime, success, error = null) {
    try {
      await ApiLog.create({
        endpoint,
        method,
        statusCode,
        responseTime,
        success,
        error
      });
    } catch (err) {
      logger.error('Error logging API call:', err);
    }
  }

  /**
   * Get district performance data with caching
   */
  async getDistrictPerformance(stateCode, districtCode, financialYear, month) {
    try {
      // First, check cache
      const cachedData = await this.getCachedData(stateCode, districtCode, financialYear, month);
      
      if (cachedData) {
        logger.info('Returning cached data');
        return cachedData;
      }

      // If not in cache, fetch from API
      logger.info('Fetching fresh data from API');
      const apiData = await this.fetchDistrictDataFromAPI(stateCode, districtCode, financialYear, month);
      
      // Save to cache
      await this.cacheData(apiData);
      
      return apiData;
    } catch (error) {
      logger.error('Error in getDistrictPerformance:', error);
      
      // Fallback to any cached data (even if expired)
      const fallbackData = await DistrictPerformance.findOne({
        stateCode,
        districtCode,
        financialYear,
        month
      }).sort({ lastUpdated: -1 });

      if (fallbackData) {
        logger.warn('Returning stale cached data due to API failure');
        return fallbackData;
      }

      throw new Error('Unable to fetch data from API and no cached data available');
    }
  }

  /**
   * Check if cached data is still valid
   */
  async getCachedData(stateCode, districtCode, financialYear, month) {
    const cacheExpiry = new Date();
    cacheExpiry.setHours(cacheExpiry.getHours() - this.cacheDuration);

    return await DistrictPerformance.findOne({
      stateCode,
      districtCode,
      financialYear,
      month,
      lastUpdated: { $gte: cacheExpiry }
    });
  }

  /**
   * Fetch district data from external API
   * Note: This is a placeholder. You'll need to adapt this based on the actual API structure
   */
  async fetchDistrictDataFromAPI(stateCode, districtCode, financialYear, month) {
    // Since the actual API endpoint structure isn't provided, this is a mock implementation
    // You'll need to update this with the real API endpoint
    
    // Example URL structure (update based on actual API):
    // const url = `${this.baseURL}/resource/mgnrega-performance?state=${stateCode}&district=${districtCode}&year=${financialYear}&month=${month}`;
    
    // For demonstration, returning realistic mock data
    // In production, uncomment the API call:
    // const data = await this.fetchFromAPI(url);
    
    // Get district name from code
    const districtNames = {
      'MH01': 'Mumbai', 'MH02': 'Mumbai Suburban', 'MH03': 'Thane', 'MH04': 'Raigad',
      'MH05': 'Pune', 'MH06': 'Nashik', 'MH07': 'Ahmednagar', 'MH08': 'Solapur',
      'MH09': 'Satara', 'MH10': 'Kolhapur', 'MH11': 'Sangli', 'MH12': 'Sindhudurg',
      'MH13': 'Ratnagiri', 'MH14': 'Nagpur', 'MH15': 'Wardha', 'MH16': 'Chandrapur',
      'MH17': 'Gadchiroli', 'MH18': 'Bhandara', 'MH19': 'Gondia', 'MH20': 'Amravati',
      'MH21': 'Akola', 'MH22': 'Yavatmal', 'MH23': 'Buldhana', 'MH24': 'Washim',
      'MH25': 'Hingoli', 'MH26': 'Parbhani', 'MH27': 'Jalna', 'MH28': 'Aurangabad',
      'MH29': 'Nanded', 'MH30': 'Latur', 'MH31': 'Osmanabad', 'MH32': 'Beed',
      'MH33': 'Dhule', 'MH34': 'Jalgaon', 'MH35': 'Nandurbar', 'MH36': 'Palghar'
    };

    const districtName = districtNames[districtCode] || 'Unknown District';
    
    // Generate realistic varying data based on district code
    const seed = parseInt(districtCode.replace('MH', '')) || 1;
    const totalJobCards = 50000 + (seed * 2000) + Math.floor(Math.random() * 10000);
    const activeJobCards = Math.floor(totalJobCards * (0.4 + Math.random() * 0.2));
    const employmentProvided = Math.floor(activeJobCards * (0.7 + Math.random() * 0.2));
    const avgDays = 30 + Math.floor(Math.random() * 40);
    const personDaysGenerated = employmentProvided * avgDays;
    const workCompleted = 200 + Math.floor(seed * 10) + Math.floor(Math.random() * 100);
    const workInProgress = 100 + Math.floor(seed * 5) + Math.floor(Math.random() * 50);
    const budgetAllocated = (200000000 + seed * 10000000) + Math.floor(Math.random() * 50000000);
    const utilizationPct = 60 + Math.floor(Math.random() * 30);
    const budgetUtilized = Math.floor(budgetAllocated * (utilizationPct / 100));
    const wagesPaid = Math.floor(budgetUtilized * 0.7);
    const materialCost = budgetUtilized - wagesPaid;

    const mockData = {
      stateCode,
      districtCode,
      financialYear,
      month,
      stateName: 'Maharashtra',
      districtName,
      totalJobCards,
      activeJobCards,
      employmentProvided,
      personDaysGenerated,
      averageDaysPerHousehold: avgDays,
      workCompleted,
      workInProgress,
      budgetAllocated,
      budgetUtilized,
      utilizationPercentage: utilizationPct,
      wagesPaid,
      materialCost,
      lastUpdated: new Date(),
      dataSource: 'data.gov.in',
      isCached: false
    };

    return mockData;
  }

  /**
   * Cache data in database
   */
  async cacheData(data) {
    try {
      await DistrictPerformance.findOneAndUpdate(
        {
          stateCode: data.stateCode,
          districtCode: data.districtCode,
          financialYear: data.financialYear,
          month: data.month
        },
        {
          ...data,
          lastUpdated: new Date(),
          isCached: true
        },
        {
          upsert: true,
          new: true
        }
      );
      
      logger.info('Data cached successfully');
    } catch (error) {
      logger.error('Error caching data:', error);
      throw error;
    }
  }

  /**
   * Get historical performance data
   */
  async getHistoricalData(stateCode, districtCode, limit = 12) {
    try {
      return await DistrictPerformance.find({
        stateCode,
        districtCode
      })
      .sort({ financialYear: -1, month: -1 })
      .limit(limit);
    } catch (error) {
      logger.error('Error fetching historical data:', error);
      throw error;
    }
  }

  /**
   * Get comparative data for multiple districts
   */
  async getComparativeData(stateCode, financialYear, month) {
    try {
      return await DistrictPerformance.find({
        stateCode,
        financialYear,
        month
      }).sort({ districtName: 1 });
    } catch (error) {
      logger.error('Error fetching comparative data:', error);
      throw error;
    }
  }
}

module.exports = new MGNREGAService();
