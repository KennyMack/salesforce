'use strict';
/**
 * Module token
 */


/**
 * Dependencies
 */
const core = require('../../core');
const jwt = require('jsonwebtoken');
const uid = require('uid-safe');
const certificates = core.certificates;

function getReqToken(req) {
  return req.headers['x-access-token'] || req.body.token || req.params.token || req.query.token;
}


function validateToken(token, pcert) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, pcert, { algorithms: ['RS256'] }, function(err, decoded) {
      if (err)
        reject({
          'err': 'Erro ao validar token.',
          'status': 401
        });
      else
        resolve(decoded);
    });
  });
}
