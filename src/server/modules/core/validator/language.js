'use strict'
/**
 * Module validator
 */

/**
 * Dependencies
 */
const config = require('../config');
const utils = require('../utils');

const messages = {
  'pt-BR': {
    any: {
        unknown: 'não permitido',
        invalid: 'valor informado não é válido',
        empty: 'valor nulo não permitido',
        required: 'é obrigatório',
        allowOnly: 'deve ser um dos {{0}}',
        default: 'emitiu um erro ao executar o método padrão'
    },
    alternatives: {
      base: 'não corresponde a nenhuma das alternativas permitidas'
    },
    array: {
        base: 'deve ser um array',
        includes: 'a posição {{0}}, não corresponde a nenhum dos tipos permitidos',
        includesSingle: 'valor único "{{0}}" não corresponde a nenhum dos tipos permitidos',
        includesOne: 'a posição {{0}} falhou, motivo: {{1}}',
        includesOneSingle: 'valor unico "{{0}}" falhou, motivo: {{1}}',
        includesRequiredUnknowns: 'não contém {{0}} o valor obrigatório',
        includesRequiredKnowns: 'não contém {{0}}',
        includesRequiredBoth: 'não contém {{0}} ee {{1}} ambos obrigatórios',
        excludes: 'a posição {{0}} contém um valor removido',
        excludesSingle: 'valor único "{{0}}" contém um valor removido',
        min: 'deve conter pelo menos {{0}} itens',
        max: 'deve conter menos ou igual a {{0}} itens',
        length: 'deve conter {{0}} itens',
        ordered: 'a posição {{0}} falhou, motivo: {{1}}',
        orderedLength: 'a posição {{0}} falha, motivo: array deve conter no máximo {{1}} itens',
        sparse: 'não deve ser uma matriz esparsa',
        unique: 'posição {{0}} contém um valor duplicado'
    },
    boolean: {
        base: 'deve ser um boolean'
    },
    binary: {
        base: 'deve ser um buffer ou uma string',
        min: 'deve conter pelo menos {{0}} bytes',
        max: 'deve conter menos ou igual a {{0}} bytes',
        length: 'deve conter {{0}} bytes'
    },
    date: {
        base: 'deve ser um número de milissegundos ou sequência de data válida',
        format: 'deve ser uma sequência de caracteres com um dos seguintes formatos {{0}}',
        strict: 'deve ser uma data válida',
        min: 'deve ser maior ou igual a "{{0}}"',
        max: 'deve ser menor ou igual a "{{0}}"',
        isoDate: 'deve ser uma data ISO 8601 válida',
        timestamp: {
            javascript: 'deve ser um intervalo válido ou número de milissegundos',
            unix: 'deve ser um intervalo válido ou número de segundos'
        },
        ref: 'referência "{{0}}" não é uma data'
    },
    'function': {
        base: 'deve ser uma função',
        arity: 'deve ter uma aridade de {{0}}',
        minArity: 'deve ter uma aridade maior ou igual a {{0}}',
        maxArity: 'deve ter uma aridade menor ou igual a {{0}}',
        ref: 'must be a Joi reference'
    },
    lazy: {
        base: '!!schema error: lazy schema must be set',
        schema: '!!schema error: lazy schema function must return a schema'
    },
    object: {
        base: 'deve ser um objeto',
        child: '{{0}} "{{1}}" falhou, motivo {{2}}',
        min: 'deve conter pelo menos {{0}} filhos',
        max: 'deve conter menos ou igual a {{0}} filhos',
        length: 'deve conter {{0}} filhos',
        allowUnknown: '{{0}} "{{1}}" não é permitido',
        with: 'falta de par requerido "{{0}}"',
        without: 'conflito com pares proibido  "{{0}}"',
        missing: 'deve conter ao menos 1 de {{0}}',
        xor: 'contém um conflito entre pares exclusivos {{0}}',
        or: 'deve conter ao menos 1 de {{0}}',
        and: 'contém {{0}} sem o par requerido {{1}}',
        nand: '{{0}} "{{1}}" não deve existir simultaneamente com {{2}}',
        assert: '{{0}} "{{1}}" validação falhou, motivo: "{{2}}" falhou para {{3}}',
        rename: {
            multiple: 'não pode renomear o filho "{{0}}", motivo: múltiplas renomeações são desativadas e outra chave já foi renomeada para "{{1}}"',
            override: 'não pode renomear o filho "{{0}}", motivo: a substituição está desativada e o "{{1}}" existe'
        },
        type: 'must be an instance of "{{0}}"',
        schema: 'must be a Joi instance'
    },
    number: {
        base: 'deve ser um número',
        min: 'deve ser maior ou igual a {{0}}',
        max: 'deve ser menor ou igual a {{0}}',
        less: 'deve ser menor que {{0}}',
        greater: 'deve ser maior que {{0}}',
        float: 'deve ser float ou double',
        integer: 'deve ser integer',
        negative: 'deve ser menor que zero',
        positive: 'deve ser maior que zero',
        precision: 'deve conter no máximo {{0}} casas decimais',
        ref: 'references "{{0}}" which is not a number',
        multiple: 'deve ser multiplo de {{0}}'
    },
    string: {
        base: 'deve ser uma string',
        min: 'deve ter no mínimo {{0}} caracteres',
        max: 'deve ter {{0}} caracteres ou menos',
        length: 'deve ter {{0}} caracteres',
        alphanum: 'deve conter apenas caracteres alfanuméricos',
        token: 'deve conter caracteres alfanuméricos e underline',
        regex: {
            base: 'o valor "{{0}}" não corresponde ao padrão: {{1}}',
            name: 'o valor "{{0}}" falhou, motivo: não corresponde ao padrão {{1}}',
            invert: {
                base: 'o valor "{{0}}" corresponde ao padrão invertido: {{1}}',
                name: 'o valor "{{0}}" corresponde ao padrão invertido: {{1}}'
            }
        },
        email: 'deve ser um e-mail válido',
        uri: 'deve ser uma url válida',
        uriRelativeOnly: 'deve conter uma url relativa',
        uriCustomScheme: 'deve conter uma url no padrão: {{0}}',
        isoDate: 'dever ser uma data ISO 8601 válida',
        guid: 'deve ser um GUID válido',
        hex: 'deve conter somente caracteres hexadecimais',
        base64: 'deve ser uma string base64 válida',
        hostname: 'deve ser um nome de hospedágem válida',
        lowercase: 'deve conter somente caracteres minusculos',
        uppercase: 'deve conter somente caracteres maiusculos',
        trim: 'não deve conter espaço no início e no fim',
        creditCard: 'deve ser um número de cartão de crédito válido',
        ref: 'references "{{0}}" which is not a number',
        ip: 'must be a valid ip address with a {{0}} CIDR',
        ipVersion: 'must be a valid ip address of one of the following versions {{0}} with a {{1}} CIDR'
    }
  },
  'en-US': {
    any: {
        unknown: 'is not allowed',
        invalid: 'contains an invalid value',
        empty: 'is not allowed to be empty',
        required: 'is required',
        allowOnly: 'must be one of {{0}}',
        default: 'threw an error when running default method'
    },
    alternatives: {
        base: 'not matching any of the allowed alternatives'
    },
    array: {
        base: 'must be an array',
        includes: 'at position {{0}} does not match any of the allowed types',
        includesSingle: 'single value of "{{0}}" does not match any of the allowed types',
        includesOne: 'at position {{0}} fails because {{1}}',
        includesOneSingle: 'single value of "{{0}}" fails because {{1}}',
        includesRequiredUnknowns: 'does not contain {{0}} required value(s)',
        includesRequiredKnowns: 'does not contain {{0}}',
        includesRequiredBoth: 'does not contain {{0}} and {{1}} other required value(s)',
        excludes: 'at position {{0}} contains an excluded value',
        excludesSingle: 'single value of "{{0}}" contains an excluded value',
        min: 'must contain at least {{0}} items',
        max: 'must contain less than or equal to {{0}} items',
        length: 'must contain {{0}} items',
        ordered: 'at position {{0}} fails because {{1}}',
        orderedLength: 'at position {{0}} fails because array must contain at most {{1}} items',
        sparse: 'must not be a sparse array',
        unique: 'position {{0}} contains a duplicate value'
    },
    boolean: {
        base: 'must be a boolean'
    },
    binary: {
        base: 'must be a buffer or a string',
        min: 'must be at least {{0}} bytes',
        max: 'must be less than or equal to {{0}} bytes',
        length: 'must be {{0}} bytes'
    },
    date: {
        base: 'must be a number of milliseconds or valid date string',
        format: 'must be a string with one of the following formats {{0}}',
        strict: 'must be a valid date',
        min: 'must be larger than or equal to "{{0}}"',
        max: 'must be less than or equal to "{{0}}"',
        isoDate: 'must be a valid ISO 8601 date',
        timestamp: {
            javascript: 'must be a valid timestamp or number of milliseconds',
            unix: 'must be a valid timestamp or number of seconds'
        },
        ref: 'references "{{0}}" which is not a date'
    },
    'function': {
        base: 'must be a Function',
        arity: 'must have an arity of {{0}}',
        minArity: 'must have an arity greater or equal to {{0}}',
        maxArity: 'must have an arity lesser or equal to {{0}}',
        ref: 'must be a Joi reference'
    },
    lazy: {
        base: '!!schema error: lazy schema must be set',
        schema: '!!schema error: lazy schema function must return a schema'
    },
    object: {
        base: 'must be an object',
        child: '{{0}} "{{1}}" fails because {{2}}',
        min: 'must have at least {{0}} children',
        max: 'must have less than or equal to {{0}} children',
        length: 'must have {{0}} children',
        allowUnknown: '{{0}} "{{1}}" is not allowed',
        with: 'missing required peer "{{0}}"',
        without: 'conflict with forbidden peer "{{0}}"',
        missing: 'must contain at least one of {{0}}',
        xor: 'contains a conflict between exclusive peers {{0}}',
        or: 'must contain at least one of {{0}}',
        and: 'contains {{0}} without its required peers {{1}}',
        nand: '{{0}} "{{1}}" must not exist simultaneously with {{2}}',
        assert: '{{0}} "{{1}}" validation failed because "{{2}}" failed to {{3}}',
        rename: {
            multiple: 'cannot rename child "{{0}}" because multiple renames are disabled and another key was already renamed to "{{1}}"',
            override: 'cannot rename child "{{0}}" because override is disabled and target "{{1}}" exists'
        },
        type: 'must be an instance of "{{0}}"',
        schema: 'must be a Joi instance'
    },
    number: {
        base: 'must be a number',
        min: 'must be larger than or equal to {{0}}',
        max: 'must be less than or equal to {{0}}',
        less: 'must be less than {{0}}',
        greater: 'must be greater than {{0}}',
        float: 'must be a float or double',
        integer: 'must be an integer',
        negative: 'must be a negative number',
        positive: 'must be a positive number',
        precision: 'must have no more than {{0}} decimal places',
        ref: 'references "{{0}}" which is not a number',
        multiple: 'must be a multiple of {{0}}'
    },
    string: {
        base: 'must be a string',
        min: 'length must be at least {{0}} characters long',
        max: 'length must be less than or equal to {{0}} characters long',
        length: 'length must be {{0}} characters long',
        alphanum: 'must only contain alpha-numeric characters',
        token: 'must only contain alpha-numeric and underscore characters',
        regex: {
            base: 'with value "{{0}}" fails to match the required pattern: {{1}}',
            name: 'with value "{{0}}" fails to match the {{1}} pattern',
            invert: {
                base: 'with value "{{0}}" matches the inverted pattern: {{1}}',
                name: 'with value "{{0}}" matches the inverted {{1}} pattern'
            }
        },
        email: 'must be a valid email',
        uri: 'must be a valid uri',
        uriRelativeOnly: 'must be a valid relative uri',
        uriCustomScheme: 'must be a valid uri with a scheme matching the {{0}} pattern',
        isoDate: 'must be a valid ISO 8601 date',
        guid: 'must be a valid GUID',
        hex: 'must only contain hexadecimal characters',
        base64: 'must be a valid base64 string',
        hostname: 'must be a valid hostname',
        lowercase: 'must only contain lowercase characters',
        uppercase: 'must only contain uppercase characters',
        trim: 'must not have leading or trailing whitespace',
        creditCard: 'must be a credit card',
        ref: 'references "{{0}}" which is not a number',
        ip: 'must be a valid ip address with a {{0}} CIDR',
        ipVersion: 'must be a valid ip address of one of the following versions {{0}} with a {{1}} CIDR'
    }
  }
}

/**
 * Translate joi messages
 * @param  {Object} err joi error object
 * @return {String}     message
 */
function getLocaleErrorMessage(err) {
  if (err.type) {
    let key = err.type.split('.');

    return getValue(key[0], key[1], err.message);
  }

  return err.message;
}

/**
 * Replace values in message
 * @param  {String} group   group of message type
 * @param  {String} key     key of message error
 * @param  {String} message message error
 * @return {String}         message
 */
function getValue(group, key, message) {
  let msg = messages[config.getLocale()][group][key];
  if (msg) {
    let pos = message.split(' ');

    if ((group === 'any') && (key === 'allowOnly')) {
      msg = msg.replace('{{0}}', pos[5]);
    }
    else if (group === 'array') {
      if (key === 'includes') {
        msg = msg.replace('{{0}}', pos[3]);
      }
      else if (key === 'includesSingle') {
        msg = msg.replace('{{0}}', pos[4]);
      }
      else if (key === 'includesOne') {
        msg = msg.replace('{{0}}', pos[3]);
      }
      else if (key === 'includesOneSingle') {
        msg = msg.replace('{{0}}', pos[4]);
      }
      else if (key === 'includesRequiredUnknowns') {
        msg = msg.replace('{{0}}', pos[4]);
      }
      else if (key === 'includesRequiredKnowns') {
        msg = msg.replace('{{0}}', pos[4]);
      }
      else if (key === 'includesRequiredBoth') {
        msg = msg.replace('{{0}}', pos[4])
                 .replace('{{1}}', pos[6]);
      }
      else if (key === 'excludes') {
        msg = msg.replace('{{0}}', pos[3]);
      }
      else if (key === 'excludesSingle') {
        msg = msg.replace('{{0}}', pos[4]);
      }
      else if (key === 'min') {
        msg = msg.replace('{{0}}', pos[5]);
      }
      else if (key === 'max') {
        msg = msg.replace('{{0}}', pos[8]);
      }
      else if (key === 'length') {
        msg = msg.replace('{{0}}', pos[3]);
      }
      else if (key === 'ordered') {
        msg = msg.replace('{{0}}', pos[3])
                 .replace('{{1}}', pos[6]);
      }
      else if (key === 'orderedLength') {
        msg = msg.replace('{{0}}', pos[3])
                 .replace('{{1}}', pos[11]);
      }
      else if (key === 'unique') {
        msg = msg.replace('{{0}}', pos[2]);
      }
    }
    else if (group === 'binary') {
      if (key === 'min') {
        msg = msg.replace('{{0}}', pos[5]);
      }
      else if (key === 'max') {
        msg = msg.replace('{{0}}', pos[8]);
      }
      else if (key === 'length') {
        msg = msg.replace('{{0}}', pos[3]);
      }
    }
    else if (group === 'date') {
      if (key === 'format') {
        msg = msg.replace('{{0}}', pos[11]);
      }
      else if (key === 'min') {
        msg = msg.replace('{{0}}', pos[8]);
      }
      else if (key === 'max') {
        msg = msg.replace('{{0}}', pos[8]);
      }
    }
    else if (group === 'object') {
      if (key === 'child') {
        msg = msg.replace('{{0}}', pos[1])
                 .replace('{{1}}', pos[2])
                 .replace('{{2}}', pos[5]);
      }
      else if (key === 'min') {
        msg = msg.replace('{{0}}', pos[5]);
      }
      else if (key === 'max') {
        msg = msg.replace('{{0}}', pos[8]);
      }
      else if (key === 'length') {
        msg = msg.replace('{{0}}', pos[3]);
      }
      else if (key === 'allowUnknown') {
        msg = msg.replace('{{0}}', pos[1])
                 .replace('{{1}}', pos[2]);
      }
      else if (key === 'with') {
        msg = msg.replace('{{0}}', pos[4]);
      }
      else if (key === 'without') {
        msg = msg.replace('{{0}}', pos[5]);
      }
      else if (key === 'missing') {
        msg = msg.replace('{{0}}', pos[7]);
      }
      else if (key === 'xor') {
        msg = msg.replace('{{0}}', pos[7]);
      }
      else if (key === 'or') {
        msg = msg.replace('{{0}}', pos[7]);
      }
      else if (key === 'and') {
        msg = msg.replace('{{0}}', pos[2])
                 .replace('{{1}}', pos[7]);
      }
      else if (key === 'nand') {
        msg = msg.replace('{{0}}', pos[3])
                 .replace('{{1}}', pos[7])
                 .replace('{{2}}', pos[7]);
      }
      else if (key === 'assert') {
        msg = msg.replace('{{0}}', pos[1])
                 .replace('{{1}}', pos[2])
                 .replace('{{2}}', pos[6])
                 .replace('{{3}}', pos[9]);
      }
      else if (key === 'type') {
        msg = msg.replace('{{0}}', pos[6]);
      }
    }
    else if (group === 'number') {
      if (key === 'min') {
        msg = msg.replace('{{0}}', pos[8]);
      }
      else if (key === 'max') {
        msg = msg.replace('{{0}}', pos[8]);
      }
      else if (key === 'less') {
        msg = msg.replace('{{0}}', pos[5]);
      }
      else if (key === 'greater') {
        msg = msg.replace('{{0}}', pos[5]);
      }
      else if (key === 'precision') {
        msg = msg.replace('{{0}}', pos[6]);
      }
      else if (key === 'ref') {
        msg = msg.replace('{{0}}', pos[2]);
      }
      else if (key === 'multiple') {
        msg = msg.replace('{{0}}', pos[6]);
      }
    }
    else if (group === 'string')   {
      if (key === 'min') {
        msg = msg.replace('{{0}}', pos[6]);
      }
      else if (key === 'max') {
        msg = msg.replace('{{0}}', pos[9]);
      }
      else if (key === 'length') {
        msg = msg.replace('{{0}}', pos[4]);
      }
    }
    pos = null;
  }
  else
    msg = message;

  return msg;
}

module.exports = {
  getLocaleErrorMessage: getLocaleErrorMessage
};
