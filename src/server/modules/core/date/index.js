'use strict';
/**
 * Module Date
 */

/**
 * Dependencies
 */
const moment = require('moment');
const config = require('../config');

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
};

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

function getDateUTC() {
  return moment.utc().valueOf();
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  getDateNow: getDateNow,
  getDateTimeNow: getDateTimeNow
};
