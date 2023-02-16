const { CronJob } = require('cron');
const cron = require('node-cron');

const reportsServices = require('../components/reports/reports.services');
const { axiosURLCheck } = require('./axiosService');

const cronJobsList = [];

// make a cron job that updates the report with every poll request
const pollRequestCronJob = async (check) => {
  const job = await cron.schedule(`*/${check.interval} * * * *`, async () => {
    const response = await axiosURLCheck(check);
    const report = await reportsServices.getReport(check._id);

    const log = {
      timeStamp: new Date().toISOString(),
      status: response.status,
      message: response.statusText,
      responseTime: response.duration,
    };
    // console.log(report._id.toString());
    const updatedHistory = reportsServices.updateReportHistory(report.history, log);
    const updatedUpTime = response.status === 200 ? report.uptime + check.interval * 60 : report.uptime;
    const updatedDownTime = response.status === 200 ? report.downtime : report.downtime + check.interval * 60;
    const updatedAvgResponseTime = reportsServices.calculateReportAvgResponseTime(report.history);

    const updatedReportInfo = {
      checkId: check._id,
      status: response.status,
      availability: updatedUpTime / (updatedUpTime + updatedDownTime),
      outages: response.status === 200 ? report.outages : report.outages + 1,
      downtime: updatedDownTime,
      uptime: updatedUpTime,
      avgResponseTime: updatedAvgResponseTime,
      history: updatedHistory,
    };

    const newReport = await reportsServices.updateReport(report._id.toString(), updatedReportInfo);
    console.log(newReport);
  });
  cronJobsList[check._id] = job;
};

const endCronJob = async (checkId) => {
  cronJobsList[checkId].stop();
  delete cronJobsList[checkId];
};

module.exports = { pollRequestCronJob, endCronJob };
