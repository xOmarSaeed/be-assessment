const Joi = require('joi');

const signUp = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const signIn = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const verify = Joi.object({
  verificationCode: Joi.string().required(),
});
module.exports = {
  signUp,
  signIn,
  verify,
};
