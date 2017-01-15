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
    default: date.getDateUTC()
  },
  modified_at: {
    type: Date,
    required: true,
    default: date.getDateUTC()
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  is_staff: {
    type: Boolean,
    required: true,
    default: false
  },
  checksum: {
    type: String,
    required: true,
    default: '-'
  }
});

usersSchema.plugin(db.mongoosePaginate);

/**
 * Users Schema create validation
 * @type {Object}
 */
const usersCreateSchema = schema({
  username: models.stringField(true).min(5).max(30),
  email: models.stringField(true).email(),
  password: models.stringField(true).min(8),
  passwordbis: models.stringField(true).min(8)
});

/**
 * Users Schema update validation
 * @type {Object}
 */
const usersUpdateSchema = schema({
  _id: models.stringField(true),
  password: models.stringField(true)
});

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  usersSchema: usersSchema,
  usersCreateSchema: usersCreateSchema,
  usersUpdateSchema: usersUpdateSchema
};
