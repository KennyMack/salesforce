'use strict';
/**
 * Module enterprise
 */


/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 * @param  {Function} next next operation
 */
function get(req, res) {
  res.json({
    'name': 'name'
  });
}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express, auth) {
  let routes = express.Router();

  routes.get('/', auth, get);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;
