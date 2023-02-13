const respondWith = (statusCode, data, message, success, res) => {
  res.status(statusCode).json({
    data,
    message,
    success,
  });
};

module.exports = respondWith;
