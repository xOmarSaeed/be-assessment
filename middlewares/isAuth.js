const { decodeToken } = require('../helpers/jwt');
const { ErrorHandler } = require('../utils/error');
const errors = require('../utils/errors');

const isAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(req.headers.authorization);
    if (!authHeader) {
      throw new ErrorHandler(errors.TOKEN_NOT_AUTHENTICATED, 401);
    } else {
      const token = authHeader.split('Bearer ')[1] ?? authHeader;
      const decodedToken = decodeToken(token);
      req.requester = decodedToken;
      return next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = isAuth;
