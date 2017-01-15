'use strict';
/**
 * Module http
 */

/**
 * Dependencies
 */
const httpStatus = require('./status');
const response = require('./response');

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  HTTP_STATUS: httpStatus.HTTP_STATUS,
  isInformational: httpStatus.isInformational,
  isSuccess: httpStatus.isSuccess,
  isRedirect: httpStatus.isRedirect,
  isClientError: httpStatus.isClientError,
  isServerError: httpStatus.isServerError,
  render: response.render,
  renderError: response.renderError,
  responseIsSuccess: response.isSuccess
};
