import moment from 'moment';

import WeekDay from '../constants/WeekDay';

/**
 * Parse javascript date object into formatted date string
 * @param {Date} date - the date object
 * @return {string} - the formatted date string ('YYYY-MM-DD')
 */
export const dateObjectToMonthDateString = (date) => {
  if (date instanceof Date) {
    const dayString = WeekDay[date.getDay()];
    return `${`00${date.getMonth() + 1}`.slice(
      -2,
    )}/${`00${date.getDate()}`.slice(-2)}（${dayString}）`;
  }
  return '';
};

/**
 * Parse javascript date object into formatted date string
 * @param {Date} date - the date object
 * @return {string} - the formatted date string ('YYYY-MM-DD')
 */
export const dateObjectToDateString = (date) => {
  if (date instanceof Date) {
    return `${date.getFullYear()}-${`00${date.getMonth() + 1}`.slice(
      -2,
    )}-${`00${date.getDate()}`.slice(-2)}`;
  }
  return '';
};

/**
 * Parse javascript date object into formatted Chinese date string
 * @param {Date} date - the date object
 * @return {string} - the formatted Chinese date string ('YY-MM-DD')
 */
export const dateObjectToChineseDateString = (date) => {
  if (date instanceof Date) {
    return `${date.getFullYear() - 1911}-${`00${date.getMonth() + 1}`.slice(
      -2,
    )}-${`00${date.getDate()}`.slice(-2)}`;
  }
  return '';
};

/**
 * Parse javascript date object into formatted datetime string
 * @param {Date} date - the date object
 * @return {string} - the formatted datetime string ('YYYY-MM-DDTHH:mm:ssZ')
 */
export const dateObjectToDateTimeStringWithTimezone = (date) => {
  if (date instanceof Date) {
    // return `${date.getUTCFullYear()}-${`00${date.getUTCMonth() + 1}`.slice(
    //   -2,
    // )}-${`00${date.getUTCDate()}`.slice(-2)}T00:00:00Z`;

    return `${date.getFullYear()}-${`00${date.getMonth() + 1}`.slice(
      -2,
    )}-${`00${date.getDate()}`.slice(-2)}T${`00${date.getHours()}`.slice(
      -2,
    )}:${`00${date.getMinutes()}`.slice(
      -2,
    )}:${`00${date.getSeconds()}`.slice(-2)}Z`;
  }
  return '';
};

/**
 * Parse javascript date object into formatted datetime string
 * @param {Date} date - the date object
 * @return {string} - the formatted datetime string ('YYYY-MM-DDTHH:mm:ssZ')
 */
export const dateObjectToUTCDateTimeStringWithTimezone = (date) => {
  if (date instanceof Date) {
    return `${date.getUTCFullYear()}-${`00${date.getUTCMonth() + 1}`.slice(
      -2,
    )}-${`00${date.getUTCDate()}`.slice(-2)}T${`00${date.getUTCHours()}`.slice(
      -2,
    )}:${`00${date.getUTCMinutes()}`.slice(
      -2,
    )}:${`00${date.getUTCSeconds()}`.slice(-2)}Z`;
  }
  return '';
};

/**
 * Parse javascript date object into formatted datetime string
 * @param {Date} date - the date object
 * @return {string} - the formatted datetime string ('YYYY-MM-DD HH:mm:ss')
 */
export const dateObjectToDateTimeString = (date) => {
  if (date instanceof Date) {
    return `${date.getFullYear()}-${`00${date.getMonth() + 1}`.slice(
      -2,
    )}-${`00${date.getDate()}`.slice(-2)} ${`00${date.getHours()}`.slice(
      -2,
    )}:${`00${date.getMinutes()}`.slice(-2)}:${`00${date.getSeconds()}`.slice(
      -2,
    )}`;
  }
  return '';
};

/**
 * Parse javascript date object into formatted UTC datetime string
 * @param {Date} date - the date object
 * @return {string} - the formatted UTC datetime string ('YYYY-MM-DD HH:mm:ss')
 */
export const dateObjectToUTCDateTimeString = (date) => {
  if (date instanceof Date) {
    return `${date.getUTCFullYear()}-${`00${date.getUTCMonth() + 1}`.slice(
      -2,
    )}-${`00${date.getUTCDate()}`.slice(-2)} ${`00${date.getUTCHours()}`.slice(
      -2,
    )}:${`00${date.getUTCMinutes()}`.slice(
      -2,
    )}:${`00${date.getUTCSeconds()}`.slice(-2)}`;
  }
  return '';
};

/**
 * Parse javascript date object into formatted datetime string
 * @param {Date} date - the date object
 * @return {string} - the formatted datetime string ('YYYY-MM-DD HH:mm')
 */
export const dateObjectToDateTimeMinuteString = (date) => {
  if (date instanceof Date) {
    return `${date.getFullYear()}-${`00${date.getMonth() + 1}`.slice(
        -2,
    )}-${`00${date.getDate()}`.slice(-2)} ${`00${date.getHours()}`.slice(
        -2,
    )}:${`00${date.getMinutes()}`.slice(-2)}`;
  }
  return '';
};

/**
 * Parse javascript date object into formatted time string
 * @param {Date} date - the date object
 * @return {string} - the formatted time string ('HH:mm:ss')
 */
export const dateObjectToTimeString = (date) => {
  if (date instanceof Date) {
    return `${`00${date.getHours()}`.slice(
      -2,
    )}:${`00${date.getMinutes()}`.slice(-2)}`;
  }
  return '';
};

/**
 * Parse javascript date object into formatted time string
 * @param {Date} date - the date object
 * @return {string} - the formatted time string ('HH:mm:ss')
 */
export const dateObjectToUTCTimeString = (date) => {
  if (date instanceof Date) {
    return `${`00${date.getUTCHours()}`.slice(
      -2,
    )}:${`00${date.getUTCMinutes()}`.slice(-2)}`;
  }
  return '';
};

/**
 * Parse timespan string to javascript date object
 * @param {string} timespan - the timespan string
 * @return {Date} - the date object
 */
export const timespanToDateObject = (timespan) => {
  const duration = moment.duration(timespan);
  // const timeTokens = timespan.split(/[A-Z]+/);
  const date = new Date();
  // date.setHours(timeTokens[1]);
  // if (timeTokens.length > 2) {
  //   date.setMinutes(timeTokens[2]);
  // }
  date.setHours(duration.hours());
  date.setMinutes(duration.minutes());
  date.setSeconds(0);
  return date;
};

/**
 * Parse timespan string to javascript UTC date object
 * @param {string} timespan - the timespan string
 * @return {Date} - the UTC date object
 */
export const timespanToUTCDateObject = (timespan) => {
  const duration = moment.duration(timespan);
  const date = new Date();
  date.setUTCHours(duration.hours());
  date.setUTCMinutes(duration.minutes());
  date.setUTCSeconds(0);
  return date;
};

/**
 * Parse time string to javascript UTC date object
 * @param {string} time - the time string ('HH:mm:ss')
 * @return {Date} - the UTC date object
 */
export const timeToUTCDateObject = (time) => {
  const timeTokens = time.split(':');
  const date = new Date();
  date.setUTCHours(timeTokens[0]);
  if (timeTokens.length > 1) {
    date.setUTCMinutes(timeTokens[1]);
  }
  date.setUTCSeconds(0);
  return date;
};

export default {};
