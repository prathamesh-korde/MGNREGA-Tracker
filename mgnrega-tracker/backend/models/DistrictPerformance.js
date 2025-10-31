const mongoose = require('mongoose');

const districtPerformanceSchema = new mongoose.Schema({
  stateCode: {
    type: String,
    required: true,
    index: true
  },
  stateName: {
    type: String,
    required: true
  },
  districtCode: {
    type: String,
    required: true,
    index: true
  },
  districtName: {
    type: String,
    required: true,
    index: true
  },
  financialYear: {
    type: String,
    required: true,
    index: true
  },
  month: {
    type: String,
    required: true
  },
  
  // Performance Metrics
  totalJobCards: {
    type: Number,
    default: 0
  },
  activeJobCards: {
    type: Number,
    default: 0
  },
  employmentProvided: {
    type: Number,
    default: 0
  },
  personDaysGenerated: {
    type: Number,
    default: 0
  },
  averageDaysPerHousehold: {
    type: Number,
    default: 0
  },
  workCompleted: {
    type: Number,
    default: 0
  },
  workInProgress: {
    type: Number,
    default: 0
  },
  budgetAllocated: {
    type: Number,
    default: 0
  },
  budgetUtilized: {
    type: Number,
    default: 0
  },
  utilizationPercentage: {
    type: Number,
    default: 0
  },
  wagesPaid: {
    type: Number,
    default: 0
  },
  materialCost: {
    type: Number,
    default: 0
  },
  
  // Metadata
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  dataSource: {
    type: String,
    default: 'data.gov.in'
  },
  isCached: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
districtPerformanceSchema.index({ 
  stateCode: 1, 
  districtCode: 1, 
  financialYear: 1, 
  month: 1 
}, { unique: true });

// Index for location-based queries
districtPerformanceSchema.index({ districtName: 'text', stateName: 'text' });

module.exports = mongoose.model('DistrictPerformance', districtPerformanceSchema);
