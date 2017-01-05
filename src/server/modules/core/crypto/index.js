'use strict';
/**
 * Module crypto
 */

/**
 * Dependencies
 */
const bcrypt = require('bcrypt');
const saltRounds = 14;

/**
 * Encrypt string
 * @param  {String} input string which had to be encrypted
 * @return {Promise}       Resolve/Reject
 */
function encrypt(input) {
  return bcrypt.hash(input, saltRounds);

}

/**
 * Compare string with hash
 * @param  {String} input string which had to be compared
 * @param  {String} hash  Hash
 * @return {Promise}       Resolve/Reject
 */
function compare(input, hash) {
  return bcrypt.compare(input, hash);
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  encrypt: encrypt,
  compare: compare
};
