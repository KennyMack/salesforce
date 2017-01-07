'use strict';
/**
 * Module utils
 */

/**
 * Dependencies
 */


/**
 * Check if value is in array
 * @param  {value}  value value to be checked
 * @param  {Array}  array array to be checked
 * @return {Boolean}       result
 */
function isIn(value, array) {
  if (Array.isArray(array)) {
    for (var i = 0, l = array.length; i < l; i++) {
      if (array[i] == value) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  isIn: isIn
};
