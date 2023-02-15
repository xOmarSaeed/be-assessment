const { ErrorHandler } = require('../../utils/error');
const errors = require('../../utils/errors');
const respondWith = require('../../utils/response');
const checksServices = require('./checks.services');

const getCheck = async (req, res, next) => {
  try {
    const { checkId } = req.body;
    const check = await checksServices.getCheck(checkId);
    if (!check) {
      throw new ErrorHandler(errors.NOT_FOUND, 403);
    }
    if (check.createdBy.toString() !== req.requester.userId) {
      throw new ErrorHandler(errors.NOT_AUTHORIZED, 401);
    }
    return respondWith(200, check, 'Here is the check you asked for.', true, res);
  } catch (err) {
    next(err);
  }
};

const createCheck = async (req, res, next) => {
  try {
    const checkInfo = req.body;
    const isExists = await checksServices.getCheckByUrl(checkInfo.url, req.requester.userId);
    if (isExists) {
      throw new ErrorHandler(errors.CHECK_ALREADY_EXIST, 409);
    }

    // eslint-disable-next-line max-len
    const check = await checksServices.createCheck({ ...checkInfo, createdBy: req.requester.userId });
    // eslint-disable-next-line no-underscore-dangle
    return respondWith(201, {}, `Check No.: ${check._id} has been created successfully`, true, res);
  } catch (err) {
    next(err);
  }
};

const updateCheck = async (req, res, next) => {
  try {
    const checkInfo = req.body;

    const check = await checksServices.getCheck(checkInfo.checkId);
    if (!check) {
      throw new ErrorHandler(errors.NOT_FOUND, 403);
    }
    if (check.createdBy.toString() !== req.requester.userId) {
      throw new ErrorHandler(errors.NOT_AUTHORIZED, 401);
    }
    await checksServices.updateCheck(checkInfo);
    return respondWith(201, {}, 'Your check has been updated successfully', true, res);
  } catch (err) {
    next(err);
  }
};

const deleteCheck = async (req, res, next) => {
  try {
    const { checkId } = req.body;
    const check = await checksServices.getCheck(checkId);
    if (!check) {
      throw new ErrorHandler(erros.NOT_FOUND, 403);
    }
    if (check.createdBy.toString() !== req.requester.userId) {
      throw new ErrorHandler(errors.NOT_AUTHORIZED, 401);
    }
    await checksServices.deleteCheck(checkId);
    return respondWith(200, {}, 'Your check has been deleted successfully', true, res);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCheck,
  createCheck,
  updateCheck,
  deleteCheck,
};
