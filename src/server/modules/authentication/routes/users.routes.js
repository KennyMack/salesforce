'use strict';
/**
 * Module authentication
 */

/**
 * Dependencies
 */
const core = require('../../core');
const usersModel = require('../model/users.model');
const http = core.http;
const utils = core.utils;
const renderError = core.connection.handlers.renderHttpError;

/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function get(req, res) {
  let pageNum = utils.normalizeNumber(req.query.page || 0, 1);
  usersModel.list(pageNum)
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, err);
    });
}

/**
 * Method Get in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function getById(req, res) {
  let id = req.params.id;

  usersModel.validateId(id)
    .then(usersModel.findById)
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, err);
    });
}

/**
 * Method Post in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function post(req, res) {

  let user = {
    username: req.body.username || '',
    email: req.body.email || '',
    password: req.body.password || '',
    last_login: req.body.last_login || '',
    checksum: req.body.checksum || ''
  };

  usersModel.validateCreate(user)
    .then(function (result) {
      return usersModel.insert(result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, err);
    });
}

/**
 * Method Put in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function put(req, res) {

  let user = {
    _id: req.body._id || '',
    username: req.body.username || '',
    email: req.body.email || '',
    password: req.body.password || '',
    last_login: req.body.last_login || '',
    checksum: req.body.checksum || ''
  };

  /*usersModel.validateId(user._id)
    .then(function (id) {
      user._id = id;
      return*/
  usersModel.validateUpdate(user)/*;
    })*/
    .then(function (ruser) {
      return usersModel.update(user._id, user);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, err);
    });
}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express) {
  let routes = express.Router();

  routes.get('/', get);
  routes.get('/:id', getById);
  routes.post('/', post);
  routes.put('/', put);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;
