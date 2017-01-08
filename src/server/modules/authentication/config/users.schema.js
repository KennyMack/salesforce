'use strict';
/**
 * Module authentication
 */


/**
 * Dependencies
 */
const core = require('../../core');
const date = core.date;
const db = core.connection;
const models = core.validator.models;
const schema = core.validator.schema;

/**
 * Users Schema Definition
 * @type {Schema}
 */
const usersSchema = new db.mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  last_login: {
    type: Date
  },
  create_at: {
    type: Date,
    required: true,
    default: date.getDateTimeNow()
  },
  modified_at: {
    type: Date,
    required: true,
    default: date.getDateTimeNow()
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  checksum: {
    type: String,
    required: true
  }
});

/**
 * Users Schema create validation
 * @type {Object}
 */
const usersCreateSchema = schema({
  username: models.stringField(true),
  email: models.stringField(true).email(),
  password: models.stringField(true),
  last_login: models.dateField(true),
  checksum: models.stringField(true)
});

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  usersSchema: usersSchema,
  usersCreateSchema: usersCreateSchema
};
