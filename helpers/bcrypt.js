const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePasswords = async (password, hashedPassword) => {
  const isTheSamePassword = await bcrypt.compare(password, hashedPassword);
  return isTheSamePassword;
};

module.exports = { encryptPassword, comparePasswords };
