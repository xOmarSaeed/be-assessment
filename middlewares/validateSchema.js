/* eslint-disable */
const { ErrorHandler } = require('../utils/error');

const validateSchema = (schema, property, abortEarly = false) => {
  return (req, res, next) => {
    if (!req[property]) {
      req[property] = {}; // if called with empty body, return the errors.
    }

    const { error } = schema.validate(req[property], {
      abortEarly,
    });

    if (!error) {
      next();
    } else {
      const { details } = error;
      const errors = details.map((detail) => detail.message);
      const err = new ErrorHandler(errors, 400);
      next(err);
    }
  };
};
module.exports = validateSchema;
