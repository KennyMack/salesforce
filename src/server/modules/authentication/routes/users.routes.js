'use strict';
/**
 * Module authentication
 */

/**
 * Dependencies
 */
const usersModel = require('../model/users.model');

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express) {
  let router = express.Router();

  router.get('/', get);
  router.post('/', post);

  return router;
};

/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 * @param  {Function} next next operation
 */
function get(req, res, next) {
  usersModel.list()
    .then(function (result) {
      res.json({
        ok: true,
        result: result
      });
    })
    .catch(function (err) {
      res.json({
        ok: false,
        result: err
      });
    });
};

/**
 * Method Post in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 * @param  {Function} next next operation
 */
function post(req, res, next) {

  let user = {
    username: req.body.username || '',
    email: req.body.email || '',
    password: req.body.password || '',
    last_login: req.body.last_login || '',
    checksum: req.body.checksum || ''
  }

  usersModel.validateCreate(user)
    .then(function (result) {
      return usersModel.insert(result.value);
    })
    .then(function (result) {
      res.json({
        ok: true,
        result: result
      });
    })
    .catch(function (err) {
      res.json({
        ok: false,
        result: err
      });
    })



}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;
