'use strict';
/**
 * Module enterprise
 */


/**
 * Dependencies
 */
const core = require('../../core');
const db = core.connection;
const date = core.date;

/**
 * Enterprise Schema Definition
 * @type {Schema}
 */
const enterpriseSchema = new db.mongoose.Schema({
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
  title: {
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
module.exports.enterpriseSchema = enterpriseSchema;
