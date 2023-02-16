const axios = require('axios');
const { ErrorHandler } = require('../utils/error');

const axiosConfigurations = () => {
  axios.interceptors.request.use(
    (req) => {
      req.metadata = req.metadata || {};
      req.metadata = { reqStartTime: new Date().getTime() };
      return req;
    },
    (err) => {
      throw new ErrorHandler(err, 400);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      res.config.metadata.reqEndTime = new Date().getTime();
      res.duration = res.config.metadata.reqEndTime - res.config.metadata.reqStartTime;
      // res.config.metadata.status = res.status;
      return res;
    },
    (res) => {
      res.config.metadata.reqEndTime = new Date().getTime();
      res.duration = res.config.metadata.reqEndTime - res.config.metadata.reqStartTime;
      // res.metadata.status = res.status;
      throw res;
    }
  );
};

const axiosURLCheck = async (check) => {
  axiosConfigurations();
  try {
    const response = await axios.get(check.url, {
      timeout: check.timeout * 1000,
      auth: {
        username: check.authentication.username,
        password: check.authentication.password,
      },
      headers: check.httpHeaders,
    });
    console.log(`${response.duration}ms`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { axiosConfigurations, axiosURLCheck };
