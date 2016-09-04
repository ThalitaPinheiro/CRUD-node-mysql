'use strict';

var BASE_DIR = process.cwd();
var database = require(BASE_DIR + '/lib/commons/database');


function findByUsername(username, callback){
  database.getConnection( function(err, conn){
    conn.query('SELECT * FROM users WHERE username = \'' + username + '\';', callback);
  });
}

module.exports = {
  findByUsername: findByUsername
};
