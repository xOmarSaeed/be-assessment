const reportsModel = require('./reports.model');

const getReport = async (checkId) => {
  const report = await reportsModel.findOne({ checkId });
  return report;
};
const createReport = async (reportInfo) => {
  const report = await reportsModel.create(reportInfo);
  return report;
};

const deleteReport = async (checkId) => {
  const deleteResult = await reportsModel.deleteOne({ checkId });
  return deleteResult;
};

module.exports = { getReport, createReport, deleteReport };
