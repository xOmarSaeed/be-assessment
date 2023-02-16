const reportsModel = require('./reports.model');

const getReport = async (checkId) => {
  const report = await reportsModel.findOne({ checkId });
  return report;
};

const getReports = async (checksIds) => {
  const reports = await reportsModel.find({ checkId: { $in: checksIds } });
  return reports;
};

const createReport = async (reportInfo) => {
  const report = await reportsModel.create(reportInfo);
  return report;
};

const deleteReport = async (checkId) => {
  const deleteResult = await reportsModel.deleteOne({ checkId });
  return deleteResult;
};

module.exports = {
  getReport,
  getReports,
  createReport,
  deleteReport,
};
