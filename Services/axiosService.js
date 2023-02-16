const axios = require('axios');
const axiosRetry = require('axios-retry');
const { ErrorHandler } = require('../utils/error');

const axiosConfigurations = (client) => {
  client.interceptors.request.use(
    (req) => {
      req.metadata = req.metadata || {};
      req.metadata = { reqStartTime: new Date().getTime() };
      return req;
    },
    (err) => {
      throw new ErrorHandler(err, 400);
    }
  );

  client.interceptors.response.use(
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
  // instantiate an axios client and add configurations
  const client = await axios.create({
    baseURL: check.url,
    timeout: check.timeout * 1000,
    headers: check.httpHeaders,
    auth: {
      username: check.authentication.username,
      password: check.authentication.password,
    },
  });

  // adding interceptors to calculate response time
  axiosConfigurations(client);

  // set the axios retry to the defined check's threshold
  axiosRetry(client, { retries: check.threshold });

  try {
    const response = await client.get(check.url);
    return response;
  } catch (err) {
    return err;
  }
};

module.exports = { axiosConfigurations, axiosURLCheck };
