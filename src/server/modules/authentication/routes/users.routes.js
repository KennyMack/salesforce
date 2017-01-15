'use strict';
/**
 * Module authentication
 */

/**
 * Dependencies
 */
const core = require('../../core');
const usersModel = require('../model/users.model');
const usersCtrl = require('../controller/users.controller');
const http = core.http;
const utils = core.utils;
const renderError = core.http.renderError;//connection.handlers.renderHttpError;

/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function get(req, res) {
  let pageNum = utils.normalizeNumber(req.query.page || 1, 1);
  usersModel.list(pageNum)
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, {}, err);
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
      renderError(res, {}, err);
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
    passwordbis: req.body.passwordbis || ''
  };

  usersModel.validateCreate(user)
    .then(function (result) {
      return usersCtrl.validatePassword(result.value);
    })
    .then(function (result) {
      return usersModel.insert(result);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, user, err);
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
    password: req.body.password || '',
    last_login: req.body.last_login || ''
  };

  usersModel.validateUpdate(user)
    .then(function (ruser) {
      return usersModel.update(ruser._id, user);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, user, err);
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
