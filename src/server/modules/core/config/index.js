'use strict';
/**
 * Module Config
 */


/**
 * Dependencies
 */
const fs = require('fs');

/**
 * return default port
 * @return {number} Port number
 */
function getPort() {
  let port = process.env.PORT || 3000;

  if (isNaN(port))
    return 3000;

  return port;
}

/**
 * return mongo url
 * @return {String} Path to Mongo
 */
function getDbUrl() {
  return process.env.MONGO_DB || 'mongodb://localhost:27017/salesforce';
}

/**
 * return default date format
 * @return {String} Date Format
 */
function getDateFormat() {
  return process.env.DATE_FORMAT || 'DD/MM/YYYY';
}

/**
 * return default date time format
 * @return {String} DateTime format
 */
function getDateTimeFormat() {
  return process.env.DATE_TIME_FORMAT || 'DD/MM/YYYY HH:mm:ss';
}

/**
 * return secret key
 * @return {String} Secret Key
 */
function getSecret() {
  return process.env.SECRET || '123456';
}

/**
 * return locale
 * @return {String} locale
 */
function getLocale() {
  return process.env.LOCALE || 'pt-BR';
}

/**
 * max size of page
 * @return {Number} max page
 */
function getPageMaxSize() {
  return process.env.PAGE_MAX_SIZE || 100;
}

/**
 * default page size
 * @return {Number} default page size
 */
function getPageSize() {
  return process.env.PAGE_SIZE || 10;
}

/**
 * load env vars
 * @return {Promise} Resolve/Reject
 */
function loadEnv() {
  return new Promise(function(resolve, reject) {
    let path = require('path');
    let local = path.dirname(module.parent.filename);
    local = path.resolve(path.join(local, '../../../'));
    fs.readFile(local + '/.env', 'utf-8', function(err, data) {
      if (err)
        reject(err);
      else {
        let rows = data.split(/\r?\n/);

        for (let i = 0, len = rows.length; i < len; i++) {
          let keyValue = rows[i].split('=');
          process.env[keyValue[0]] = keyValue[1];
        }

        resolve('Variáveis de ambiente carregadas.');
      }
    });
  });
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  loadEnv: loadEnv,
  getPort: getPort,
  getDbUrl: getDbUrl,
  getDateFormat: getDateFormat,
  getDateTimeFormat: getDateTimeFormat,
  getSecret: getSecret,
  getLocale: getLocale,
  getPageMaxSize: getPageMaxSize,
  getPageSize: getPageSize
};
