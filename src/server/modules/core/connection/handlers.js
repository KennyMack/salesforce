'use strict';
/**
 * Module connection
 */

/**
 * Dependencies
 */
const http = require('../http');
const httpStatus = http.HTTP_STATUS;
const response = http;

/**
 * Erro e11000 message
 * @param {ObjectId} message mongo error
 * @return {Object}          converted mongo error
 */
function E11000(message) {
  let ret = {};
  let column = '';
  let reValue = /((\").*(?=\"))/;
  let reIndex = /((index\:).*(?=key\:))/;

  column = reIndex.exec(message)[0].split(' ')[1];
  column = column.substring(0, column.length -2);

  ret[column] = 'Valor: \"' + reValue.exec(message)[0].substring(1) + '\", deve ser único.';

  return ret;
}

/**
 * Normalize mongo error
 * @param  {Object} err error object
 * @return {Object}     return normalized error
 */
function normalizeError(err) {
  if ('code' in err && 'errmsg' in err) {
    switch (err.code) {
    case 11000:
      return E11000(err.errmsg);
    default:
      return err.errmsg;
    }
  }
  return err;
}

/**
 * Convert mongo error to http status error
 * @param  {Object} err mongo error object
 * @return {Number}     http status error converted
 */
function httpErrorStatus(err) {
  if (('code' in err && 'errmsg' in err) ||
      (err.name === 'ValidationError') ||
      (err.err.length))
    return httpStatus.HTTP_400_BAD_REQUEST;
  

  return httpStatus.HTTP_200_OK;
}



/**
 * render mongo error
 * @param  {Object} res response object
 * @param  {Object} err mongo error
 * @return {Object}     response error object
 */
function renderHttpError(res, err) {
  return response.render(res, normalizeError(err), httpErrorStatus(err));
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  normalizeError: normalizeError,
  httpErrorStatus: httpErrorStatus,
  renderHttpError: renderHttpError
};
