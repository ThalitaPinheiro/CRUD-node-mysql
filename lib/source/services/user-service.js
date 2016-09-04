'use strict';

var BASE_DIR = ('../../../lib/');
var logger = require(BASE_DIR + 'commons/logger');

var userModel = require('../models').user;

function findByUsername(username, callback){
  userModel.findByUsername(username, function(err, user) {
    callback(err, user);
  });
}

module.exports = {
  findByUsername: findByUsername
};
