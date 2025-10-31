const express = require('express');
const router = express.Router();
const locationService = require('../services/locationService');
const logger = require('../config/logger');

/**
 * @route   GET /api/location/states
 * @desc    Get all states
 * @access  Public
 */
router.get('/states', async (req, res) => {
  try {
    const states = await locationService.getAllStates();
    
    res.json({
      success: true,
      data: states
    });
  } catch (error) {
    logger.error('Error fetching states:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching states',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/location/districts/:stateCode
 * @desc    Get all districts for a state
 * @access  Public
 */
router.get('/districts/:stateCode', async (req, res) => {
  try {
    const { stateCode } = req.params;
    const districts = await locationService.getDistrictsByState(stateCode);
    
    res.json({
      success: true,
      data: districts
    });
  } catch (error) {
    logger.error('Error fetching districts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching districts',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/location/detect
 * @desc    Detect district from coordinates (BONUS FEATURE)
 * @access  Public
 */
router.post('/detect', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const district = await locationService.findDistrictByCoordinates(
      parseFloat(latitude),
      parseFloat(longitude)
    );

    if (!district) {
      return res.json({
        success: true,
        detected: false,
        message: 'No district found within range'
      });
    }

    res.json({
      success: true,
      detected: true,
      data: district
    });
  } catch (error) {
    logger.error('Error detecting location:', error);
    res.status(500).json({
      success: false,
      message: 'Error detecting location',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/location/search
 * @desc    Search districts by name
 * @access  Public
 */
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters'
      });
    }

    const districts = await locationService.searchDistricts(q);
    
    res.json({
      success: true,
      data: districts
    });
  } catch (error) {
    logger.error('Error searching districts:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching districts',
      error: error.message
    });
  }
});

module.exports = router;
