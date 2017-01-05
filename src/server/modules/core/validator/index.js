'use strict';
const schema = require('validate');


const optionsSchema = {
  typecast: true
};

function validateSchema(obj, schema) {
  return new Promise(function (resolve, reject) {
    let errors = schema.validate(obj, optionsSchema);
    if (errors.length) {
      let lstErrors = [];
      for (var i = 0, l = errors.length; i < l; i++) {
        lstErrors.push({
          field: errors[i].path,
          message: errors[i].message
        });
      }
      reject({ err: obj });
    }


  });
}

/**
 * Module Export
 * @type {Object}
 */
var obj = {
  validator: require('validator'),
  schema: schema
};


let user = obj.schema();

user
  .path('username')
  .type('string')
  .required()
  .match(/[a-z]{2,16}/)
  .message('Username must be 2-16 chars.');
user.path('password')
  .type('string')
  .required()
  .message('senha deve ser informada');
user.path('index')
  .type('number')
  .required()
  .message('deve ser um numero');
user.path('any')
  .type('string')
  .use(function(value) {
    return valida(value); // Using the validator module
  }, 'Somente arrays')
  .required();

function valida(value) {
  console.log(value);
  return Array.isArray(value);
}

var sc = {
  'username':'aa',
  'password':'asda',
  'hello': 'asas',
  'index': '1',
  'any': []
}
console.log(sc);
var errors = user.validate(sc, optionsSchema);
console.log(sc);

console.log(errors);
