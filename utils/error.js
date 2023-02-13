const respondWith = require('./response');

class ErrorHandler extends Error {
  constructor(name, message, statusCode) {
    super(name, message);
    this.statusCode = statusCode;
  }
}

const handleError = (err, res) => {
  const { message, statusCode = 500 } = err;
  respondWith(statusCode, {}, message, false, res);
};

module.exports = {
  ErrorHandler,
  handleError,
};
