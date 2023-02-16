const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  checkId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Check', required: true },
  status: {
    type: Number,
    default: 0,
    required: true,
  },
  availability: {
    type: Number,
    default: 0,
    required: true,
  },
  outages: {
    type: Number,
    default: 0,
  },
  downtime: { type: Number, default: 0 },
  uptime: { type: Number, default: 0 },
  avgResponseTime: { type: Number, default: 0 },
  history: {
    type: [Object],
    default: [],
  },
});

const Report = mongoose.model('Reports', reportSchema);

module.exports = Report;
