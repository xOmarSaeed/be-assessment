const usersModel = require('./users.model');

const getUser = async (email) => {
  const user = await usersModel.findOne({ email });
  return user;
};

const addUser = async (userInfo) => {
  const user = await usersModel.create(userInfo);
  return user;
};

const getUserByCode = async (verificationCode) => {
  const user = await usersModel.findOne({ verificationCode });
  console.log(user);
  return user;
};

const verify = async (userId) => {
  const user = await usersModel.updateOne({ _id: userId }, { isVerified: true });
  return user;
};

module.exports = {
  getUser,
  addUser,
  getUserByCode,
  verify,
};
