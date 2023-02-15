const express = require('express');
const isAuth = require('../../middlewares/isAuth');
const granted = require('../../middlewares/granted');
const validateSchema = require('../../middlewares/validateSchema');
const reportsSchema = require('./reports.validation');
const reportsController = require('./reports.controller');

const router = express.Router();
router.get(
  '/',
  isAuth,
  granted(['User']),
  validateSchema(reportsSchema.getReport, 'body'),
  reportsController.getReport
);

router.get(
  '/getByTag',
  isAuth,
  granted(['User']),
  validateSchema(reportsSchema.getReportsByTag, 'body'),
  reportsController.getReportsByTag
);
module.exports = router;
