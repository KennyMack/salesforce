'use strict';
/**
 * Module enterprise
 */

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express, auth) {
  let router = express.Router();

  router.get('/', auth, get);

  return router;
};

/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 * @param  {Function} next next operation
 */
function get(req, res, next) {
  res.json({
    'name': 'name'
  });
};

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;
