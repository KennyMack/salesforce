'use strict'
/**
 * Module validator
 */

/**
 * Dependencies
 */
const config = require('../../config');


const messages = {
  'pt-BR': {
    any: {
        unknown: 'não permitido',
        invalid: 'valor informado não é válido',
        empty: 'valor nulo não permitido',
        required: 'é obrigatório',
        allowOnly: 'deve ser um dos {{valids}}',
        default: 'emitiu um erro ao executar o método padrão'
    },
    alternatives: {
      base: 'não corresponde a nenhuma das alternativas permitidas'
    },
    array: {
        base: 'deve ser um array',
        includes: 'a posição {{pos}}, não corresponde a nenhum dos tipos permitidos',
        includesSingle: 'valor único "{{!key}}" não corresponde a nenhum dos tipos permitidos',
        includesOne: 'a posição {{pos}} falhou, motivo: {{reason}}',
        includesOneSingle: 'valor unico "{{!key}}" falhou, motivo: {{reason}}',
        includesRequiredUnknowns: 'não contém {{unknownMisses}} o valor obrigatório',
        includesRequiredKnowns: 'não contém {{knownMisses}}',
        includesRequiredBoth: 'não contém {{knownMisses}} ee {{unknownMisses}} ambos obrigatórios',
        excludes: 'a posição {{pos}} contém um valor removido',
        excludesSingle: 'valor único "{{!key}}" contém um valor removido',
        min: 'deve conter pelo menos {{limit}} itens',
        max: 'deve conter menos ou igual a {{limit}} itens',
        length: 'deve conter {{limit}} itens',
        ordered: 'a posição {{pos}} falhou, motivo: {{reason}}',
        orderedLength: 'a posição {{pos}} falha, motivo: array deve conter no máximo {{limit}} itens',
        sparse: 'não deve ser uma matriz esparsa',
        unique: 'posição {{pos}} contém um valor duplicado'
    },
    boolean: {
        base: 'deve ser um boolean'
    },
    binary: {
        base: 'deve ser um buffer ou uma string',
        min: 'deve conter pelo menos {{limit}} bytes',
        max: 'deve conter menos ou igual a {{limit}} bytes',
        length: 'deve conter {{limit}} bytes'
    },
    date: {
        base: 'deve ser um número de milissegundos ou seqüência de data válida',
        format: 'deve ser uma seqüência de caracteres com um dos seguintes formatos {{format}}',
        strict: 'deve ser uma data válida',
        min: 'deve ser maior ou igual a "{{limit}}"',
        max: 'deve ser menor ou igual a "{{limit}}"',
        isoDate: 'deve ser uma data ISO 8601 válida',
        timestamp: {
            javascript: 'deve ser um intervalo válido ou número de milissegundos',
            unix: 'deve ser um intervalo válido ou número de segundos'
        },
        ref: 'referência "{{ref}}" não é uma data'
    },
    function: {
        base: 'deve ser uma função',
        arity: 'deve ter uma aridade de {{n}}',
        minArity: 'deve ter uma aridade maior ou igual a {{n}}',
        maxArity: 'deve ter uma aridade menor ou igual a {{n}}',
        ref: 'must be a Joi reference'
    },
    lazy: {
        base: '!!schema error: lazy schema must be set',
        schema: '!!schema error: lazy schema function must return a schema'
    },
    object: {
        base: 'deve ser um objeto',
        child: '!!child "{{!child}}" falhou, motivo {{reason}}',
        min: 'deve conter pelo menos {{limit}} filhos',
        max: 'deve conter menos ou igual a {{limit}} filhos',
        length: 'deve conter {{limit}} filhos',
        allowUnknown: '!!"{{!child}}" não é permitido',
        with: 'falta de par requerido "{{peer}}"',
        without: 'conflito com pares proibido  "{{peer}}"',
        missing: 'deve conter ao menos 1 de {{peers}}',
        xor: 'contém um conflito entre pares exclusivos {{peers}}',
        or: 'deve conter ao menos 1 de {{peers}}',
        and: 'contém {{present}} sem o par requerido {{missing}}',
        nand: '!!"{{main}}" não deve existir simultaneamente com {{peers}}',
        assert: '!!"{{ref}}" validação falhou, motivo: "{{ref}}" falhou para {{message}}',
        rename: {
            multiple: 'não pode renomear o filho "{{from}}", motivo: múltiplas renomeações são desativadas e outra chave já foi renomeada para "{{to}}"',
            override: 'não pode renomear o filho "{{from}}", motivo: a substituição está desativada e o "{{to}}" existe'
        },
        type: 'must be an instance of "{{type}}"',
        schema: 'must be a Joi instance'
    },
    number: {
        base: 'deve ser um número',
        min: 'deve ser maior ou igual a {{limit}}',
        max: 'deve ser menor ou igual a {{limit}}',
        less: 'deve ser menor que {{limit}}',
        greater: 'deve ser maior que {{limit}}',
        float: 'deve ser float ou double',
        integer: 'deve ser integer',
        negative: 'deve ser menor que zero',
        positive: 'deve ser maior que zero',
        precision: 'deve conter no máximo {{limit}} casas decimais',
        ref: 'references "{{ref}}" which is not a number',
        multiple: 'deve ser multiplo de {{multiple}}'
    },
    string: {
        base: 'deve ser uma string',
        min: 'deve ter no mínimo {{limit}} caracteres',
        max: 'deve ter no máximo {{limit}} ou menos caracteres',
        length: 'deve ter {{limit}} caracteres',
        alphanum: 'deve conter apenas caracteres alfanuméricos',
        token: 'deve conter caracteres alfanuméricos e underline',
        regex: {
            base: 'o valor "{{!value}}" não corresponde ao padrão: {{pattern}}',
            name: 'o valor "{{!value}}" falhou, motivo: não corresponde ao padrão {{name}}',
            invert: {
                base: 'o valor "{{!value}}" corresponde ao padrão invertido: {{pattern}}',
                name: 'o valor "{{!value}}" corresponde ao padrão invertido: {{name}}'
            }
        },
        email: 'deve ser um e-mail válido',
        uri: 'deve ser uma url válida',
        uriRelativeOnly: 'deve conter uma url relativa',
        uriCustomScheme: 'deve conter uma url no padrão: {{scheme}}',
        isoDate: 'dever ser uma data ISO 8601 válida',
        guid: 'deve ser um GUID válido',
        hex: 'deve conter somente caracteres hexadecimais',
        base64: 'deve ser uma string base64 válida',
        hostname: 'deve ser um nome de hospedágem válida',
        lowercase: 'deve conter somente caracteres minusculos',
        uppercase: 'deve conter somente caracteres maiusculos',
        trim: 'não deve conter espaço no início e no fim',
        creditCard: 'deve ser um número de cartão de crédito válido',
        ref: 'references "{{ref}}" which is not a number',
        ip: 'must be a valid ip address with a {{cidr}} CIDR',
        ipVersion: 'must be a valid ip address of one of the following versions {{version}} with a {{cidr}} CIDR'
    }
  },
  'en-US': {
    any: {
        unknown: 'is not allowed',
        invalid: 'contains an invalid value',
        empty: 'is not allowed to be empty',
        required: 'is required',
        allowOnly: 'must be one of {{valids}}',
        default: 'threw an error when running default method'
    },
    alternatives: {
        base: 'not matching any of the allowed alternatives'
    },
    array: {
        base: 'must be an array',
        includes: 'at position {{pos}} does not match any of the allowed types',
        includesSingle: 'single value of "{{!key}}" does not match any of the allowed types',
        includesOne: 'at position {{pos}} fails because {{reason}}',
        includesOneSingle: 'single value of "{{!key}}" fails because {{reason}}',
        includesRequiredUnknowns: 'does not contain {{unknownMisses}} required value(s)',
        includesRequiredKnowns: 'does not contain {{knownMisses}}',
        includesRequiredBoth: 'does not contain {{knownMisses}} and {{unknownMisses}} other required value(s)',
        excludes: 'at position {{pos}} contains an excluded value',
        excludesSingle: 'single value of "{{!key}}" contains an excluded value',
        min: 'must contain at least {{limit}} items',
        max: 'must contain less than or equal to {{limit}} items',
        length: 'must contain {{limit}} items',
        ordered: 'at position {{pos}} fails because {{reason}}',
        orderedLength: 'at position {{pos}} fails because array must contain at most {{limit}} items',
        sparse: 'must not be a sparse array',
        unique: 'position {{pos}} contains a duplicate value'
    },
    boolean: {
        base: 'must be a boolean'
    },
    binary: {
        base: 'must be a buffer or a string',
        min: 'must be at least {{limit}} bytes',
        max: 'must be less than or equal to {{limit}} bytes',
        length: 'must be {{limit}} bytes'
    },
    date: {
        base: 'must be a number of milliseconds or valid date string',
        format: 'must be a string with one of the following formats {{format}}',
        strict: 'must be a valid date',
        min: 'must be larger than or equal to "{{limit}}"',
        max: 'must be less than or equal to "{{limit}}"',
        isoDate: 'must be a valid ISO 8601 date',
        timestamp: {
            javascript: 'must be a valid timestamp or number of milliseconds',
            unix: 'must be a valid timestamp or number of seconds'
        },
        ref: 'references "{{ref}}" which is not a date'
    },
    function: {
        base: 'must be a Function',
        arity: 'must have an arity of {{n}}',
        minArity: 'must have an arity greater or equal to {{n}}',
        maxArity: 'must have an arity lesser or equal to {{n}}',
        ref: 'must be a Joi reference'
    },
    lazy: {
        base: '!!schema error: lazy schema must be set',
        schema: '!!schema error: lazy schema function must return a schema'
    },
    object: {
        base: 'must be an object',
        child: '!!child "{{!child}}" fails because {{reason}}',
        min: 'must have at least {{limit}} children',
        max: 'must have less than or equal to {{limit}} children',
        length: 'must have {{limit}} children',
        allowUnknown: '!!"{{!child}}" is not allowed',
        with: 'missing required peer "{{peer}}"',
        without: 'conflict with forbidden peer "{{peer}}"',
        missing: 'must contain at least one of {{peers}}',
        xor: 'contains a conflict between exclusive peers {{peers}}',
        or: 'must contain at least one of {{peers}}',
        and: 'contains {{present}} without its required peers {{missing}}',
        nand: '!!"{{main}}" must not exist simultaneously with {{peers}}',
        assert: '!!"{{ref}}" validation failed because "{{ref}}" failed to {{message}}',
        rename: {
            multiple: 'cannot rename child "{{from}}" because multiple renames are disabled and another key was already renamed to "{{to}}"',
            override: 'cannot rename child "{{from}}" because override is disabled and target "{{to}}" exists'
        },
        type: 'must be an instance of "{{type}}"',
        schema: 'must be a Joi instance'
    },
    number: {
        base: 'must be a number',
        min: 'must be larger than or equal to {{limit}}',
        max: 'must be less than or equal to {{limit}}',
        less: 'must be less than {{limit}}',
        greater: 'must be greater than {{limit}}',
        float: 'must be a float or double',
        integer: 'must be an integer',
        negative: 'must be a negative number',
        positive: 'must be a positive number',
        precision: 'must have no more than {{limit}} decimal places',
        ref: 'references "{{ref}}" which is not a number',
        multiple: 'must be a multiple of {{multiple}}'
    },
    string: {
        base: 'must be a string',
        min: 'length must be at least {{limit}} characters long',
        max: 'length must be less than or equal to {{limit}} characters long',
        length: 'length must be {{limit}} characters long',
        alphanum: 'must only contain alpha-numeric characters',
        token: 'must only contain alpha-numeric and underscore characters',
        regex: {
            base: 'with value "{{!value}}" fails to match the required pattern: {{pattern}}',
            name: 'with value "{{!value}}" fails to match the {{name}} pattern',
            invert: {
                base: 'with value "{{!value}}" matches the inverted pattern: {{pattern}}',
                name: 'with value "{{!value}}" matches the inverted {{name}} pattern'
            }
        },
        email: 'must be a valid email',
        uri: 'must be a valid uri',
        uriRelativeOnly: 'must be a valid relative uri',
        uriCustomScheme: 'must be a valid uri with a scheme matching the {{scheme}} pattern',
        isoDate: 'must be a valid ISO 8601 date',
        guid: 'must be a valid GUID',
        hex: 'must only contain hexadecimal characters',
        base64: 'must be a valid base64 string',
        hostname: 'must be a valid hostname',
        lowercase: 'must only contain lowercase characters',
        uppercase: 'must only contain uppercase characters',
        trim: 'must not have leading or trailing whitespace',
        creditCard: 'must be a credit card',
        ref: 'references "{{ref}}" which is not a number',
        ip: 'must be a valid ip address with a {{cidr}} CIDR',
        ipVersion: 'must be a valid ip address of one of the following versions {{version}} with a {{cidr}} CIDR'
    }
  }
}

function getLocaleErrorMessage(err ) {
  if (err.type) {
    let key = err.type.split('.');
    let msg = messages[config.getLocale()][key[0]][key[1]];
    if (msg)
      return msg;

  }

  return err.message;
}

module.exports = {
  getLocaleErrorMessage: getLocaleErrorMessage
};
