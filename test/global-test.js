'use strict';

var ROOT_PATH = process.cwd();

var config = require(ROOT_PATH + '/lib/commons/config');
config.set('logging:console:silent', true);

var async = require('async');
var db = require(ROOT_PATH + '/lib/commons/database');


before(function(done) {
  db.getConnection(function(err, conn){
    conn.query('CREATE DATABASE IF NOT EXISTS ' + config.get('mysql:database') + ';' ,
      conn.query('CREATE TABLE  IF NOT EXISTS clients (id INT NOT NULL AUTO_INCREMENT, ' +
                 'email VARCHAR(80) NOT NULL, cpf VARCHAR(15) NOT NULL, ' +
                 'rg VARCHAR(15) NOT NULL, nascimento DATE NOT NULL, ' +
                 'foto BLOB, telefone VARCHAR(15) NOT NULL, ' +
                 'PRIMARY KEY(id), UNIQUE INDEX (cpf));',
        conn.query('CREATE TABLE  IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT, ' +
                   'email VARCHAR(80) NOT NULL, username VARCHAR(20) NOT NULL, ' +
                   'password VARCHAR(20) NOT NULL, profile ENUM(\'super\', \'admin\', \'normal\'), ' +
                   'PRIMARY KEY (id), UNIQUE INDEX (username));', done)));
  });
});

after(function(done) {
  async.waterfall([
    function(callbackDrop) {
      // db.getConnection(function(err, conn){
        // conn.query('DROP DATABASE ' + config.get('mysql:database') + ';');
        callbackDrop();
      // });
    },
    function(callbackClose) {
      db.disconnect(callbackClose);
    }
  ], done);
});
