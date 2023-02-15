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

const getReportsByTag = async (req, res, next) => {
  try {
    const { tag } = req.body;
    const { userId } = req.requester;
    const checksId = (await checksServices.getChecksByTag(tag, userId)).map((check) => check._id);
    console.log(checksId);
    if (!checksId.length) {
      throw new ErrorHandler(errors.NOT_FOUND, 403);
    }
    const reports = await reportsServices.getReports(checksId);
    console.log(reports);
    return respondWith(201, reports, 'All your reports retrieved successfully!', true, res);
  } catch (err) {
    next(err);
  }
};

module.exports = { getReport, getReportsByTag };
