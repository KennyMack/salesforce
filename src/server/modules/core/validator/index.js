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


const optionsJoi = {
  abortEarly: false,
  convert: true,
  allowUnknown: false,
  stripUnknown: true,
  noDefaults: false
};

const models = {
  stringField: stringField
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
        console.log(err.details[0].context);
        let lstErrors = [];
        let regField = new RegExp('((?!\").*(?=\"))');
        let regMsg = new RegExp('((\").*(\"))');

        for (var i = 0, l = err.details.length; i < l; i++) {
          let field = err.details[i].message.match(regField)[0];
          lstErrors.push({
            field: field,
            message: capfirst(validator.trim(messages.getLocaleErrorMessage(err.details[i]))) //err.details[i].message.replace(regMsg, '')))
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


function stringField(required) {
  let joi = Joi.string();
  if (required)
    joi = joi.required();

  return joi;
}

function nestedArray(required, schema) {
  let joi = Joi.array().items(schema);
  if (required)
    joi = joi.required().min(1);

  return joi;
}



const addressSchema = Joi.object({
  location: /*models.stringField(true, 'informe o endereço')*/ Joi.string().required().options({ language: { any: { empty: 'informe o endereço' } } })
});

const person = Joi.object({
  name: stringField(true), //Joi.string().required().options({ language: { any: { empty: 'informe o nome' } } }),
  address: nestedArray(true, addressSchema),
  pos: Joi.array().min(1).options({ language: { any: { min: 'Deve ser informado 1' } } })
  //Joi.array().items(addressSchema).required().options({ language: { any: { required: 'informe ao menos 1 endereço' } } })
});


var p = {
  'name': '',
  /*'address': [{
    'location': ''
  }]*/
  address: [],
  pos: []
};

validateSchema(p, person)
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log(err);
  })
