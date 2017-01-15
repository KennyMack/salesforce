'use strict';
/**
 * Module connection
 */

/**
 * Dependencies
 */
const validator = require('../validator');

/**
 * Erro e11000 message
 * @param  {Object} value   value evaluated
 * @param  {Object} message mongo error
 * @return {Object}          converted mongo error
 */
function E11000(value, message) {
  let reValue = /((\").*(?=\"))/;
  let reIndex = /((index\:).*(?=key\:))/;

  let column = reIndex.exec(message)[0].split(' ')[1];
  column = column.substring(0, column.length -2);

  let msg = 'Valor: \"' + reValue.exec(message)[0].substring(1) + '\", deve ser único.';

  return validator.invalidResult(value, [ validator.createErrItem(column, msg) ]);
}

/**
 * Validation error in mongo
 * @param  {Object} value   value evaluated
 * @param  {Object} message mongo error
 * @return {Object}         converted mongo Error
 */
function validationError(value, message) {
  let lstErrors = [];
  Object.keys(message.errors).map(function (key) {
    lstErrors.push(validator.createErrItem(key, 'Valor informado não é válido'));
  });

  return validator.invalidResult(value, lstErrors);
}

/**
 * Cast error in mongo
 * @param  {Object} value   value evaluated
 * @param  {Object} message mongo error
 * @return {Object}         converted mongo Error
 */
function castError(value, message) {
  return validator.invalidResult(value,
    [ validator.createErrItem(message.path, 'Valor informado nao é válido') ]);
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  E11000: E11000,
  validationError: validationError,
  castError: castError
};
