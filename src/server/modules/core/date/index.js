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

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  getDateNow: getDateNow,
  getDateTimeNow: getDateTimeNow
};
