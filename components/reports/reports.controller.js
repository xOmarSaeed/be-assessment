const { ErrorHandler } = require('../../utils/error');
const errors = require('../../utils/errors');
const respondWith = require('../../utils/response');
const reportsServices = require('./reports.services');
const checksServices = require('../checks/checks.services');

const getReport = async (req, res, next) => {
  try {
    const { checkId } = req.body;
    const { userId } = req.requester;
    const check = await checksServices.getCheck(checkId);
    if (!check) {
      throw new ErrorHandler(errors.NOT_FOUND, 403);
    }
    if (check.createdBy.toString() !== userId) {
      throw new ErrorHandler(errors.NOT_AUTHORIZED, 401);
    }

    const report = await reportsServices.getReport(checkId);
    return respondWith(201, report, 'Report retrieved successfully!', true, res);
  } catch (err) {
    next(err);
  }
};

module.exports = { getReport };
