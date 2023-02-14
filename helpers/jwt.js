const jwt = require('jsonwebtoken');
const config = require('config');
const { ErrorHandler } = require('../utils/error');

const createToken = (payload) => {
  try {
    const token = jwt.sign(payload, config.get('jwt.secret'), { expiresIn: config.get('jwt.expiresIn') });
    return token;
  } catch (err) {
    throw new ErrorHandler(err, 401);
  }
};

const decodeToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, config.get('jwt.secret'));
    return decodedToken;
  } catch (err) {
    throw new ErrorHandler(err, 401);
  }
};

module.exports = {
  createToken,
  decodeToken,
};
