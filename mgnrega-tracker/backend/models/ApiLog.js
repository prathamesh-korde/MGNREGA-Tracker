const mongoose = require('mongoose');

const apiLogSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  statusCode: {
    type: Number
  },
  responseTime: {
    type: Number
  },
  success: {
    type: Boolean,
    default: false
  },
  error: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Automatically delete logs older than 30 days
apiLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model('ApiLog', apiLogSchema);
