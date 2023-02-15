const Joi = require('joi');

const createCheck = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().uri().required(),
  protocol: Joi.string().valid('HTTP', 'HTTPS', 'TCP').required(),
  path: Joi.string().optional(),
  port: Joi.number().optional(),
  webhook: Joi.string().optional(),
  timeout: Joi.number().optional(),
  interval: Joi.number().optional(),
  threshold: Joi.number().optional(),
  authentication: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).optional(),
  httpHeaders: Joi.object().optional(),
  assert: Joi.object({
    statusCode: Joi.number().required(),
  }).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  ignoreSSL: Joi.boolean().required(),
});

const updateCheck = Joi.object({
  checkId: Joi.string().required(),
  name: Joi.string().optional(),
  url: Joi.string().uri().optional(),
  protocol: Joi.string().valid('HTTP', 'HTTPS', 'TCP').optional(),
  path: Joi.string().optional(),
  port: Joi.string().optional(),
  webhook: Joi.string().optional(),
  timeout: Joi.number().optional(),
  interval: Joi.number().optional(),
  threshold: Joi.number().optional(),
  authentication: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).optional(),
  httpHeaders: Joi.object().optional(),
  assert: Joi.object({
    statusCode: Joi.number().required(),
  }).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

const accessCheck = Joi.object({
  checkId: Joi.string().required(),
});

module.exports = {
  createCheck,
  updateCheck,
  accessCheck,
};
