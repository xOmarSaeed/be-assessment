const Joi = require('joi');

const getReport = Joi.object({
  checkId: Joi.string().required(),
});

const getReportsByTag = Joi.object({
  tag: Joi.string().required(),
});

module.exports = { getReport, getReportsByTag };
