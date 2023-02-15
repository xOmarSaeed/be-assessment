const express = require('express');
const granted = require('../../middlewares/granted');
const isAuth = require('../../middlewares/isAuth');
const validateSchema = require('../../middlewares/validateSchema');
const checksSchema = require('./checks.validation');
const checksController = require('./checks.controller');

const router = express.Router();

router.get(
  '/',
  isAuth,
  granted(['User']),
  validateSchema(checksSchema.accessCheck, 'body'),
  checksController.getCheck
);

router.get(
  '/all',
  isAuth,
  granted(['User']),
  validateSchema(checksSchema.getAllChecks, 'body'),
  checksController.getAllChecks
);

router.post(
  '/',
  isAuth,
  granted(['User']),
  validateSchema(checksSchema.createCheck, 'body'),
  checksController.createCheck
);

router.put(
  '/',
  isAuth,
  granted(['User']),
  validateSchema(checksSchema.updateCheck, 'body'),
  checksController.updateCheck
);

router.delete(
  '/',
  isAuth,
  granted(['User']),
  validateSchema(checksSchema.accessCheck, 'body'),
  checksController.deleteCheck
);
module.exports = router;
