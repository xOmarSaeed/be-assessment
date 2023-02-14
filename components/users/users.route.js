const express = require('express');
const validateSchema = require('../../middlewares/validateSchema');
const usersSchema = require('./users.validation');
const usersController = require('./users.controller');

const router = express.Router();

router.post('/signup', validateSchema(usersSchema.signUp, 'body'), usersController.signUp);
router.post('/signin', validateSchema(usersSchema.signIn, 'body'), usersController.signIn);
router.post('/verify', validateSchema(usersSchema.verify, 'query'), usersController.verify);

module.exports = router;
