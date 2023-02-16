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

const updateReport = async (reportId, reportInfo) => {
  // console.log('Trying to update');
  // console.log(reportInfo);
  const report = await reportsModel.updateOne({ _id: reportId }, reportInfo);
  return report;
};

const deleteReport = async (checkId) => {
  const deleteResult = await reportsModel.deleteOne({ checkId });
  return deleteResult;
};

const calculateReportAvgResponseTime = (reportHistory) => {
  let summedResponseTime = 0;
  reportHistory.forEach((log) => {
    summedResponseTime += log.responseTime;
  });

  const avgResponseTime = summedResponseTime / reportHistory.length;
  return avgResponseTime;
};

const updateReportHistory = (history, log) => {
  history.push(log);
  return history;
};

module.exports = {
  getReport,
  getReports,
  createReport,
  updateReport,
  deleteReport,
  calculateReportAvgResponseTime,
  updateReportHistory,
};
