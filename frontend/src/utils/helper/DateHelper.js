import moment from 'moment';

const momentDate = (date) => {
  if (date === null || date === undefined) {
    return '';
  }
  // const utcDate = new Date(date);
  // return moment(date).format('YYYY-MM-DD');
  return moment(date).utc().toDate();
};

const momentDateString = (date, format) => {
  if (format === null || format === undefined) {
    format = 'YYYY-MM-DD'
  }

  if (date === null || date === undefined) {
    return '';
  }
  return moment(date).utc().format(format);
};

const safeNewDate = (date) => {
  if (date !== null && date !== undefined)
    return new Date(date.replace(/-/g, '/'));
  return '';
};

const addDays = (date, days) => moment(date).add(days, 'days').toDate();

const minuteDiff = (date1, date2) => Math.abs(date1 - date2) / 60000;

const changeDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date); // 将其转换为 Date 对象
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，所以需要加 1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

export default {
  momentDate,
  momentDateString,
  safeNewDate,
  addDays,
  minuteDiff,
  changeDate,
};
