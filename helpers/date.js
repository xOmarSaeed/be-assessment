const addToDate = (date, value, unit) => {
  const dateCopy = new Date(date); // To avoid modifying the passed Date and create a pure function

  if (unit === 'year' || unit === 'years') {
    dateCopy.setFullYear(dateCopy.getFullYear() + value);
  } else if (unit === 'hour' || unit === 'hours') {
    dateCopy.setHours(dateCopy.getHours() + value);
  } else if (unit === 'minute' || unit === 'minutes') {
    dateCopy.setMinutes(dateCopy.getMinutes() + value);
  } else if (unit === 'second' || unit === 'seconds') {
    dateCopy.setSeconds(dateCopy.getSeconds() + value);
  }

  return dateCopy;
};

const isDateInThePast = (date) => {
  const today = new Date().toISOString();
  return date.toISOString() < today;
};

module.exports = {
  addToDate,
  isDateInThePast,
};
