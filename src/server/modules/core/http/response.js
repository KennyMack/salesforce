'use strict';
/**
 * Module http
 */

/**
 * Dependencies
 */
const httpStatus = require('./status');
const statusCode = httpStatus.HTTP_STATUS;
const httpHandlers = require('./handlers');

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
 * render response error
 * @param  {Object} res response object
 * @param  {Object} value value error
 * @param  {Object} err mongo error
 * @return {Object}     response error object
 */
function renderHttpError(res, value, err) {
  return render(res, httpHandlers.normalizeError(value, err), httpHandlers.httpErrorStatus(err));
}


/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  isSuccess: isSuccess,
  render: render,
  renderError: renderHttpError
};
