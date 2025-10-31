const mongoose = require('mongoose');

const districtMasterSchema = new mongoose.Schema({
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
    unique: true,
    index: true
  },
  districtName: {
    type: String,
    required: true
  },
  
  // Geographical data for location detection
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  
  // Metadata
  isActive: {
    type: Boolean,
    default: true
  },
  lastSynced: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

districtMasterSchema.index({ districtName: 'text', stateName: 'text' });

module.exports = mongoose.model('DistrictMaster', districtMasterSchema);
