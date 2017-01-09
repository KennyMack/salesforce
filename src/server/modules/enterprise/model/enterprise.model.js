'use strict';
/**
 * Module enterprise
 */


/**
 * Dependencies
 */
const core = require('../../core');
const enterpriseSchema = require('../config/enterpriseSchema');
const db = core.connection;
const config = core.config;
const enterpriseModel = db.database.model('enterprise', enterpriseSchema);

/**
 * Change modified_at field before save
 * @param  {model}   model Model which has to be updated
 * @param  {Function} next  next operation save/update
 */
function preUpdate(model, next) {
  model.modified_at = config.getDateTimeNow();

  next();
}

/**
 * Exec before save
 */
enterpriseSchema.pre('save', function (next) {
  preUpdate(this, next);
});

/**
 * Exec before update
 */
enterpriseSchema.pre('update', function (next) {
  preUpdate(this._update.$set, next);
});

/**
 * Insert in DB
 * @param  {Object} enterprise Enterprise object
 * @return {Promise}        Resolve/Reject
 */
function insert(enterprise) {
  return new enterpriseModel(enterprise)
    .save();
}

/**
 * Update in DB
 * @param  {ObjectId} id id which has to be updated
 * @param  {Object} enterprise Enterprise object
 * @return {Promise}        Resolve/Reject
 */
function update(id, enterprise) {
  let query = {
    _id: db.getObjectId(id)
  };
  let opt = {
    upsert: false,
    new: true
  };

  return enterpriseModel
    .findOneAndUpdate(query, enterprise, opt)
    .exec();
}

/**
 * Delete in DB
 * @param  {ObjectId} id id which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(id) {
  return enterpriseModel.findByIdAndRemove(id)
    .exec();
}

/**
 * List all register in DB
 * @return {Promise} Resolve/Reject
 */
function list() {
  return enterpriseModel.find()
    .exec();
}

/**
 * List the record in the DB that has the specified ObjectId
 * @param  {ObjectId} id id which has to be listed
 * @return {Promise} Resolve/Reject
 */
function findById(id) {
  return enterpriseModel.findById(id)
    .exec();
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  insert: insert,
  update: update,
  remove: remove,
  list: list,
  findById: findById
};
