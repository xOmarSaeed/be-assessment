const Joi = require('joi');

const getReport = Joi.object({
  checkId: Joi.string().required(),
});

module.exports = { getReport };
