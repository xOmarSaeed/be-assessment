const checksModel = require('./checks.model');

const createCheck = async (checkInfo) => {
  const check = await checksModel.create(checkInfo);
  return check;
};

const getCheck = async (checkId) => {
  const check = await checksModel.findById(checkId);
  return check;
};

const getCheckByUrl = async (url, createdBy) => {
  const check = await checksModel.findOne({ url, createdBy });
  return check;
};

const getChecksByTag = async (tag, createdBy) => {
  const checks = await checksModel.find({ createdBy, tags: tag });
  return checks;
};

const getAllChecks = async (createdBy, areGrouped) => {
  let checks = [];
  if (areGrouped) {
    checks = await checksModel
      .aggregate()
      .unwind('tags')
      .group({ _id: '$tags', data: { $push: '$$ROOT' } });
  } else {
    checks = await checksModel.find({ createdBy });
  }
  return checks;
};

const updateCheck = async (checkInfo) => {
  const check = await checksModel.updateOne({ _id: checkInfo.checkId }, checkInfo);
  return check;
};

const deleteCheck = async (checkId) => {
  const deleteResult = await checksModel.deleteOne({ _id: checkId });
  return deleteResult;
};

module.exports = {
  createCheck,
  getCheck,
  getCheckByUrl,
  getChecksByTag,
  getAllChecks,
  updateCheck,
  deleteCheck,
};
