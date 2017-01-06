'use strict';
/**
 * Module validator
 */

/**
 * Dependencies
 */
const Joi = require('joi');
const validator = require('validator');


const optionsJoi = {
  abortEarly: false,
  convert: true,
  allowUnknown: false,
  stripUnknown: true,
  noDefaults: false
};

const model = {
  string: stringField
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
        console.log(err);
        let lstErrors = [];
        let regField = new RegExp('((?!\").*(?=\"))');
        let regMsg = new RegExp('((\").*(\"))');

        for (var i = 0, l = err.details.length; i < l; i++) {
          let field = err.details[i].message.match(regField)[0];
          lstErrors.push({
            field: field,
            message: capfirst(validator.trim(err.details[i].message.replace(regMsg, '')))
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


function stringField(required, message) {
  let joi = Joi.string();
  if (required)
    joi = joi.required();

  if (message) {
    joi = joi.options({
      language: {
        any: {
          empty: message
        }
      }
    });
  }

  return joi;
}

function nestedArray(required, schema, message) {
  let joi = Joi.array().items(schema);
  if (required)
    joi = joi.required();

  if (message) {
    joi = joi.options({
      language: {
        any: {
          required: message
        }
      }
    });
  }

  return joi;
}



const addressSchema = Joi.object({
  location: stringField(true, 'informe o endereço') //Joi.string().required().options({ language: { any: { empty: 'informe o endereço' } } })
})

const person = Joi.object({
  name: stringField(true, 'informe o nome'), //Joi.string().required().options({ language: { any: { empty: 'informe o nome' } } }),
  address: nestedArray(true, addressSchema, 'informe ao menos 1 endereço')
  //Joi.array().items(addressSchema).required().options({ language: { any: { required: 'informe ao menos 1 endereço' } } })
});


var p = {
  'name': 'a',
  'address': [/*{
    'location': ''
  }*/]
};

validateSchema(p, person)
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log(err);
  })
