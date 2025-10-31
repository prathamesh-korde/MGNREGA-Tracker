const express = require('express');
const router = express.Router();
const mgnregaService = require('../services/mgnregaService');
const logger = require('../config/logger');

/**
 * @route   GET /api/performance/:stateCode/:districtCode
 * @desc    Get current performance data for a district
 * @access  Public
 */
router.get('/:stateCode/:districtCode', async (req, res) => {
  try {
    const { stateCode, districtCode } = req.params;
    const { financialYear, month } = req.query;

    // Use current financial year and month if not provided
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });
    const currentFY = financialYear || '2024-25';
    const currentMonthParam = month || currentMonth;

    const data = await mgnregaService.getDistrictPerformance(
      stateCode,
      districtCode,
      currentFY,
      currentMonthParam
    );

    res.json({
      success: true,
      data
    });
  } catch (error) {
    logger.error('Error fetching district performance:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching performance data',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/performance/:stateCode/:districtCode/history
 * @desc    Get historical performance data
 * @access  Public
 */
router.get('/:stateCode/:districtCode/history', async (req, res) => {
  try {
    const { stateCode, districtCode } = req.params;
    const { limit } = req.query;

    const data = await mgnregaService.getHistoricalData(
      stateCode,
      districtCode,
      parseInt(limit) || 12
    );

    res.json({
      success: true,
      data
    });
  } catch (error) {
    logger.error('Error fetching historical data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching historical data',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/performance/compare/:stateCode
 * @desc    Get comparative data for all districts in a state
 * @access  Public
 */
router.get('/compare/:stateCode', async (req, res) => {
  try {
    const { stateCode } = req.params;
    const { financialYear, month } = req.query;

    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });
    const currentFY = financialYear || '2024-25';
    const currentMonthParam = month || currentMonth;

    const data = await mgnregaService.getComparativeData(
      stateCode,
      currentFY,
      currentMonthParam
    );

    res.json({
      success: true,
      data
    });
  } catch (error) {
    logger.error('Error fetching comparative data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching comparative data',
      error: error.message
    });
  }
});

module.exports = router;
