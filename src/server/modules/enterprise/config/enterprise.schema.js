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
  company_name: {
    type: String,
    required: true
  },
  trading_name: {
    type: String,
    required: true
  },
  active: {
    type: Number,
    required: true,
    default: 1
  },
  lastbuy: {
    type: Date,
    required: true
  },
  registry: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  /**
   * 0 - Client 1 - Supplier 2 - Shipping Company 3 - Representative 4 - Salesman 5 - Prospect
   */
  type: {
    type: Number,
    required: true,
    index: true,
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
