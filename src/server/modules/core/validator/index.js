'use strict';
/**
 * Module validator
 */

/**
 * Dependencies
 */
const Joi = require('joi');
const validator = require('validator');
const messages = require('./language');
const utils = require('../utils');

const optionsJoi = {
  abortEarly: false,
  convert: true,
  allowUnknown: false,
  stripUnknown: true,
  noDefaults: false
};

const models = {
  stringField: stringField,
  booleanField: booleanField,
  dateField: dateField,
  nestedArray: nestedArray
};

/**
 * Validate object with Schema
 * @param  {Object} obj    Object to validate
 * @param  {Object} schema Schema definition
 * @return {Promise}        Resolve/Reject
 */
function validateSchema(obj, schema) {
  return new Promise(function (resolve, reject) {
    Joi.validate(obj, schema, optionsJoi, function (err, value) {
      if (err) {
        let lstErrors = [];
        let regField = new RegExp('((?!\").*(?=\"))');
        let regMsg = new RegExp('((\").*(\"))');

        for (let i = 0, l = err.details.length; i < l; i++) {
          let field = err.details[i].message.match(regField)[0];
          lstErrors.push({
            field: field,
            message: capfirst(validator.trim(messages.getLocaleErrorMessage(err.details[i])))
          });
        }
        reject({ value: value, err: lstErrors });
      }
      else
        resolve({ value: value });
    })
  });
}

/**
 * Upper Case first character
 * @param  {String} value String
 * @return {String}       String
 */
function capfirst(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Field String
 * @param  {Boolean} required is required
 * @return {Object}          joi instance
 */
function stringField(required) {
  let joi = Joi.string();
  if (required)
    joi = joi.required();

  return joi;
}

/**
 * Field Boolean
 * @param  {Boolean} required is required
 * @return {Object}          joi instance
 */
function booleanField(required) {
  let joi = Joi.boolean();
  if (required)
    joi = joi.required();

  return joi;
}

/**
 * Field Date
 * @param  {Boolean} required is required
 * @return {Object}          joi instance
 */
function dateField(required) {
  let joi = Joi.date();
  if (required)
    joi = joi.required();

  return joi;
}

/**
 * Field nested Array
 * @param  {Boolean} required is required
 * @return {Object}          joi instance
 */
function nestedArray(required, schema) {
  let joi = Joi.array().items(schema);
  if (required)
    joi = joi.required().min(1);

  return joi;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  models: models,
  capfirst: capfirst,
  validateSchema: validateSchema,
  validator: validator,
  schema: Joi.object
};
