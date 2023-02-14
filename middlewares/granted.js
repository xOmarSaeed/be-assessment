const { ErrorHandler } = require('../utils/error');
const errors = require('../utils/errors');

const granted = (allowedRoles) => (req, res, next) => {
  try {
    const requesterRole = req.requester.role;
    const isAllowed = allowedRoles.includes(requesterRole);
    if (!isAllowed) {
      throw new ErrorHandler(errors.NOT_AUTHORIZED, 401);
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = granted;
