'use strict';
/**
 * Module Date
 */

/**
 * Dependencies
 */
const moment = require('moment');
const config = require('../config');

const MONTHS = {
  JANUARY: function() {
    return 0;
  }(),
  FEBRUARY: function() {
    return 1;
  }(),
  MARCH: function() {
    return 2;
  }(),
  APRIL: function() {
    return 3;
  }(),
  MAY: function() {
    return 4;
  }(),
  JUNE: function() {
    return 5;
  }(),
  JULY: function() {
    return 6;
  }(),
  AUGUST: function() {
    return 7;
  }(),
  SEPTEMBER: function() {
    return 8;
  }(),
  OCTOBER: function() {
    return 9;
  }(),
  NOVEMBER: function() {
    return 10;
  }(),
  DECEMBER: function() {
    return 11;
  }()
};


/**
 * return actual Date Time
 * @return {DateTime} actual Date Time
 */
function getDateTimeNow() {
  return moment().format(config.getDateTimeFormat());
}

/**
 * return actual Date
 * @return {DateTime} actual Date
 */
function getDateNow() {
  return moment().format(config.getDateFormat());
}

function isNumber(pnum) {
  return (!isNaN(parseFloat(pnum)) && isFinite(pnum));
}

/**
 * Format date String, in case no format suplied
 * will return in format defined in .env file
 * @param  {String} date   date valueOf
 * @param  {String} format Optional Date Format
 * @return {Date}        Date Formated
 */
function formatDate(date, format) {
  if (!format)
    format = config.getDateTimeFormat();

  if (isNumber(date))
    date = new Date(date);

  return moment(date, 'DD/MM/YYYY').format(format);
}

/**
 * return actual Date Time in utc
 * @return {DateTime} actual Date Time
 */
function getDateUTC() {
  return moment.utc().valueOf();
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  getDateNow: getDateNow,
  getDateTimeNow: getDateTimeNow,
  getDateUTC: getDateUTC,
  formatDate: formatDate,
  MONTHS: MONTHS
};
