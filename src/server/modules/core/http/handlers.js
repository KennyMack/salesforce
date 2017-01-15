'use strict';
/**
 * Module http
 */

/**
 * Dependencies
 */
const mongoHandlers = require('../connection').handlers;
const httpStatus = require('./status').HTTP_STATUS;

/**
 * if has a array of errors in Object
 * @param  {Object}  err Error Object
 * @return {Boolean}     has error
 */
function hasErrorList(err) {
  return (Array.isArray(err.err)) && (err.err.length);
}

/**
 * Convert mongo error to http status error
 * @param  {Object} err mongo error object
 * @return {Number}     http status error converted
 */
function httpErrorStatus(err) {
  if (('code' in err && 'errmsg' in err) ||
      (err.name === 'ValidationError') ||
      (err.name === 'CastError') ||
      (hasErrorList(err))) {
    return httpStatus.HTTP_400_BAD_REQUEST;
  }

  return httpStatus.HTTP_200_OK;
}

/**
 * Normalize mongo error
 * @param  {Object} err error object
 * @return {Object}     return normalized error
 */
function normalizeError(value, err) {
  if ('code' in err && 'errmsg' in err) {
    switch (err.code) {
    case 11000:
      return mongoHandlers.E11000(value, err.errmsg);
    }
  }
  else if (err.name === 'ValidationError') {
    return mongoHandlers.validationError(value, err);
  }
  else if (err.name === 'CastError') {
    return mongoHandlers.castError(value, err);
  }


  return err;
}


/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  normalizeError: normalizeError,
  httpErrorStatus: httpErrorStatus
};
