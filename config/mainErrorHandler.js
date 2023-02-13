const { handleError } = require('../utils/error');

const mainErrorHandler = (app) => {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    handleError(err, res);
  });
};

module.exports = mainErrorHandler;
