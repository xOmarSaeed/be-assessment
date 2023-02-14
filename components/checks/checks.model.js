const mongoose = require('mongoose');

const checksSchema = new mongoose.Schema({
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  url: { type: String, required: true },
  protocol: { type: String, enum: ['HTTP', 'HTTPS', 'TCP'], required: true },
  path: { type: String, default: '/' },
  port: { type: Number, default: '' },
  webhook: { type: String, default: '' },
  // The timeout of the polling request (in secs)
  timeout: { type: Number, default: 5 },
  // The time interval for polling requests (in mins)
  interval: { type: Number, default: 10 },
  // The threshold of failed requests that will create an alert
  threshold: { type: Number, default: 1 },
  authentication: { type: Object, default: null },
  httpHeaders: { type: Object, default: null },
  assert: { type: Object, default: null },
  tags: { type: [String], default: [] },
  ignoreSSL: { type: Boolean, default: false },
});

const Checks = mongoose.model('Checks', checksSchema);

module.exports = Checks;
