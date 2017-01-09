'use strict';
/**
 * Module utils
 */

/**
 * Dependencies
 */
const validator = require('../validator');
const checkField = validator.validator;

/**
 * Check if value is in array
 * @param  {value}  value value to be checked
 * @param  {Array}  array array to be checked
 * @return {Boolean}       result
 */
function isIn(value, array) {
  if (Array.isArray(array)) {
    for (var i = 0, l = array.length; i < l; i++) {
      if (array[i] === value) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Nomalize number, return default in
 * case number can't be converted
 * @param  {Number} num number to be converted
 * @param  {Number} def number default
 * @return {Number}     number normalized
 */
function normalizeNumber(num, def) {
  let ret = num.toString() || def;
  if (checkField.isInt(ret.toString() ))//, { gt: 0 }))
    return parseInt(ret);
  else if (def)
    return normalizeNumber(def);

  return 1;
}

/**
 * Check if value is between
 * @return {Boolean}       return boolean
 */
function betweenII(value, a, b) {
  return (value >= a && value <= b);
}

/**
 * Check if value is between
 * @return {Boolean}       return boolean
 */
function betweenEI(value, a, b) {
  return (value > a && value <= b);
}

/**
 * Check if value is between
 * @return {Boolean}       return boolean
 */
function betweenIE(value, a, b) {
  return (value >= a && value < b);
}

/**
 * Check if value is between
 * @return {Boolean}       return boolean
 */
function betweenEE(value, a, b) {
  return (value > a && value < b);
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  isIn: isIn,
  normalizeNumber: normalizeNumber,
  betweenII: betweenII,
  betweenEI: betweenEI,
  betweenIE: betweenIE,
  betweenEE: betweenEE
};
