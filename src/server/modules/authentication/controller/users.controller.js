'use strict';
/**
 * Module authentication
 */

/**
 * Dependencies
 */
const core = require('../../core');
const validator = core.validator;

/**
 * validate if password and passwordbis are equal
 * @param  {Object} user user object
 * @return {Promise}      Resolve/Reject
 */
function validatePassword(user) {
  return new Promise(function (resolve, reject) {
    
    if (user.password === user.passwordbis)
      resolve(user);
    else {
      let lstErrors = [];
      lstErrors.push(validator.createErrItem('password', 'Senhas devem ser iguais'));
      lstErrors.push(validator.createErrItem('passwordbis', 'Senhas devem ser iguais'));

      reject(validator.invalidResult(user, lstErrors));
    }

  });
}


/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  validatePassword: validatePassword
};
