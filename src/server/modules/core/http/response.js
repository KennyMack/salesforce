'use strict';
/**
 * Module http
 */

/**
 * Dependencies
 */
const httpStatus = require('./status');
const statusCode = httpStatus.HTTP_STATUS;

/**
 * check if code is a successfull
 * @param  {Number}  code http code
 * @return {Boolean}      return true if a success code
 */
function isSuccess(code) {
  if (httpStatus.isInformational(code))
    return true;
  else if (httpStatus.isSuccess(code))
    return true;
  else if (httpStatus.isRedirect(code))
    return true;
  else if (httpStatus.isClientError(code))
    return false;
  else if (httpStatus.isServerError(code))
    return false;

  return false;
}

/**
 * render resultData
 * @param  {Object} req          request object
 * @param  {Object} data         data object
 * @param  {Number} responseCode http code
 * @return {Object}              response object
 */
function render(res, data, responseCode) {
  let resultData = data || {};
  let code = responseCode || statusCode.HTTP_200_OK;

  return res.status(code)
            .json({
              status: code,
              success: isSuccess(code),
              data: resultData
            });
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  isSuccess: isSuccess,
  render: render
};
