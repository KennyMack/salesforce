'use strict';
/**
 * Module authentication
 */


/**
 * Dependencies
 */
import core from '../core';
const date = core.date;
const db = core.connection;

/**
 * Article Schema Definition
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
  create_at: {
    type: Date,
    required: true,
    default: date.getDateTimeNow()
  },
  modified_at: {
    type: Date,
    required: true,
    default: date.getCurrentDateTime()
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  checksum: {
    type: String,
    required: true
  }
});

/**
 * Module Export
 * @type {Object}
 */
module.exports.usersSchema = usersSchema;
