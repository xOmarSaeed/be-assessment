const { customAlphabet } = require('nanoid');
const { encryptPassword, comparePasswords } = require('../../helpers/bcrypt');
const { addToDate, isDateInThePast } = require('../../helpers/date');
const { createToken } = require('../../helpers/jwt');
const { userToken } = require('../../helpers/tokens');
const { sendVerificationMail } = require('../../Services/Mail/mailService');
const { ErrorHandler } = require('../../utils/error');
const errors = require('../../utils/errors');
const respondWith = require('../../utils/response');
const usersService = require('./users.service');

const signUp = async (req, res, next) => {
  try {
    const userInfo = req.body;

    // check if he's registered before or not
    const isRegistered = await usersService.getUser(userInfo.email);
    if (isRegistered) {
      throw new ErrorHandler(errors.ALREADY_EXIST, 409);
    }

    // hash the user's password
    const hashedPassword = await encryptPassword(userInfo.password);
    userInfo.password = hashedPassword;

    // adding user's verification code
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nanoid = customAlphabet(alphabet, 6);
    const verificationCode = nanoid();
    userInfo.verificationCode = verificationCode;

    // Setting verification code lifetime in hours
    const verificationCodeLifeTime = 24;
    userInfo.codeExpiryDate = addToDate(new Date(), verificationCodeLifeTime, 'hours');

    // register the user
    const user = await usersService.addUser(userInfo);

    // Send verification mail to the user
    await sendVerificationMail(user, verificationCodeLifeTime);

    return respondWith(
      201,
      {},
      "You've been registered successfully, please check your mail to verify your account!",
      true,
      res
    );
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const user = await usersService.getUser(userInfo.email);

    if (!user) {
      throw new ErrorHandler(errors.NOT_FOUND, 401);
    }

    const isCorrectPassword = await comparePasswords(userInfo.password, user.password);
    if (!isCorrectPassword) {
      throw new ErrorHandler(errors.NOT_AUTHENTICATED, 401);
    }

    if (!user.isVerified) {
      throw new ErrorHandler(errors.NOT_VERIFIED, 403);
    }

    // Generate user's jwt token
    const token = createToken(userToken(user._id, user.email));
    return respondWith(200, { token }, 'Logged in successfully. Welcome!', true, res);
  } catch (err) {
    next(err);
  }
};

const verify = async (req, res, next) => {
  try {
    const userInfo = req.query;
    console.log(userInfo.verificationCode);
    const user = await usersService.getUserByCode(userInfo.verificationCode);
    if (!user) {
      throw new ErrorHandler(errors.NOT_FOUND, 401);
    }

    if (user.isVerified) {
      throw new ErrorHandler(errors.ALREADY_VERIFIED, 200);
    }

    const isCodeExpired = isDateInThePast(user.codeExpiryDate);
    if (isCodeExpired) throw new ErrorHandler(errors.EXPIRED_CODE, 410);

    await usersService.verify(user._id);

    return respondWith(200, {}, 'Your account has been verified successfully!', true, res);
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, signIn, verify };
