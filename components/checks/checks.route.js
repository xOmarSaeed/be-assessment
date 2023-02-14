const express = require('express');
const isAuth = require('../../middlewares/isAuth');
const validateSchema = require('../../middlewares/validateSchema');

const router = express.Router();

router.post('/', isAuth, (req, res) => res.json('Made a check for you!'));

module.exports = router;
