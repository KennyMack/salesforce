'use strict';
/**
 * Module Connection
*/


/**
 * Dependencies
 */
const mongoose   = require('mongoose');
const config     = require('../config');

/**
 * Mongoose Config
 * @type {Promise}
 */
mongoose.Promise = global.Promise;

/**
 * Open Connection
 * @return {Promise} Resolve/Reject
 */
function open() {
  return new Promise(function (resolve, reject) {
    mongoose.connect(config.getDbUrl(), {})
      .then(function () {
        resolve(mongoose.connection);
      })
      .catch(function (err) {
        reject({
          errno: -1945,
          message: err.message
        });
      });
  });
}

/**
 * Convert String to Mongo ObjectId
 * @param  {String} id String to Convert
 * @return {ObjectId}    Object Id
 */
function getObjectId(id) {
  return mongoose.Types.ObjectId(id);
}

/**
 * Module Exports
 * @type {Object}
 */
module.exports = {
  mongoose: mongoose,
  types: mongoose.Schema.Types,
  open: open,
  database: mongoose.connection,
  getObjectId: getObjectId
};
