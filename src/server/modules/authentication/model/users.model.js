'use strict';
/**
 * Module authentication
 */


/**
 * Dependencies
 */
const core = require('../../core');
const usersSchema = require('../config/users.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const crypto = core.crypto;
const validator = core.validator;
const checkField = core.validator.validator;
const usersModel = db.database.model('users', usersSchema.usersSchema);

/**
 * Change modified_at field before save
 * @param  {model}   model Model which has to be updated
 * @param  {Function} next  next operation save/update
 */
function preUpdate(model, next) {
  model.modified_at = date.getDateTimeNow();
  model.checksum = 'ooooo';
  crypto.encrypt(model.password)
    .then(function (hash) {
      model.password = hash;

      next();

    })
    .catch(function (err) {
      next(err);
    });
}

/**
 * Exec before save
 */
usersSchema.usersSchema.pre('save', function (next) {
  preUpdate(this, next);
});

/**
 * Exec before update
 */
usersSchema.usersSchema.pre('update', function (next) {
  preUpdate(this._update.$set, next);
});

/**
 * Insert in DB
 * @param  {Object} enterprise Enterprise object
 * @return {Promise}        Resolve/Reject
 */
function insert(user) {
  return new usersModel(user)
    .save();
}

/**
 * Update in DB
 * @param  {ObjectId} id id which has to be updated
 * @param  {Object} enterprise Enterprise object
 * @return {Promise}        Resolve/Reject
 */
function update(id, user) {
  let query = {
    _id: id
  };

  let opt = {
    upsert: false,
    new: true
  };

  return usersModel
    .findOneAndUpdate(query, user, opt)
    .exec();
}

/**
 * Delete in DB
 * @param  {ObjectId} id id which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(id) {
  return usersModel.findByIdAndRemove(id)
    .exec();
}

/**
 * List all register in DB
 * @return {Promise} Resolve/Reject
 */
function list(page) {
  let pageSize = parseInt(config.getPageSize());
  return usersModel.paginate(
    {
      active: true
    },
    {
      page: page,
      limit: pageSize,
      sort: {
        'create_at': 'descending'
      }
    });
}

/**
 * List the record in the DB that has the specified ObjectId
 * @param  {ObjectId} id id which has to be listed
 * @return {Promise} Resolve/Reject
 */
function findById(id) {
  return usersModel.findById(id)
    .exec();
}

/**
 * Validate create
 * @param  {Object} user user object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(user) {

  user.username = checkField.trim(checkField.escape(user.username));
  user.email = checkField.trim(checkField.escape(user.email));
  user.password = checkField.trim(checkField.escape(user.password));
  user.last_login = checkField.trim(checkField.escape(user.last_login));
  user.checksum = checkField.trim(checkField.escape(user.checksum));

  return validator.validateSchema(user, usersSchema.usersCreateSchema);
}

/**
 * Validate create
 * @param  {Object} user user object
 * @return {Promise}      Resolve/Reject
 */
function validateUpdate(user) {

  user.username = checkField.trim(checkField.escape(user.username));
  user.email = checkField.trim(checkField.escape(user.email));
  user.password = checkField.trim(checkField.escape(user.password));
  user.last_login = checkField.trim(checkField.escape(user.last_login));
  user.checksum = checkField.trim(checkField.escape(user.checksum));

  return validator.validateSchema(user, usersSchema.usersUpdateSchema);
}

function validateId(id) {
  return new Promise(function (resolve, reject) {
    id = checkField.trim(id);
    if (checkField.isMongoId(id))
      resolve(db.getObjectId(id));
    else
      reject(id);
  });
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  validateCreate: validateCreate,
  validateUpdate: validateUpdate,
  validateId: validateId,
  insert: insert,
  update: update,
  remove: remove,
  list: list,
  findById: findById
};
