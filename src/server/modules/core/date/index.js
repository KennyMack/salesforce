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

function formatDate(date) {
  if (isNumber(date))
    date = new Date(date);
  return moment(date, 'DD/MM/YYYY').format(config.getDateTimeFormat());
}

function getDateUTC() {
  return moment.utc().valueOf()
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  getDateNow: getDateNow,
  getDateTimeNow: getDateTimeNow
};
let date = getDateUTC();
console.log(formatDate(date));

console.log(getDateNow());
console.log(getDateTimeNow());
