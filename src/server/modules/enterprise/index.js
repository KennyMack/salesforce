'use strict';
/**
 * Module enterprise
 */

/**
 * Create instance to Enterprise Module
 * @param  {Object} app     Express App instance
 * @param  {Object} express Express
 * @param  {String} url     Path url which module will work
 */
module.exports = function (app, express, url, auth) {

  app.use(url, require('./routes/enterprise.routes.js')(express, auth));
};
