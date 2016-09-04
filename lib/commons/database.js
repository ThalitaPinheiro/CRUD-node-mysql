'use strict';

var ROOT_PATH = process.cwd();

var mysql = require('mysql');
var config = require('./config');
var logger = require(ROOT_PATH + '/lib/commons/logger');

var connection = mysql.createConnection(config.get('mysql'));
var mysqlConnection = {};
var conn;

function connect (callback){
  connection.connect(function(err) {
    logger.info('Database trying to connect at mysql');
    if (err) {
      logger.error('Database failed to connect at %s - ', err.message);
      return callback(err);
    }
    logger.info('connected as id ' + connection.threadId);
    conn = connection;
    callback(null, connection);
  });
}

mysqlConnection.getConnection = function(callback){
  if(conn){
    return callback(null, conn);
  } else {
    return connect(callback);
  }
}

mysqlConnection.disconnect = function(callback){
  connection.end(function(err) {
    logger.debug('Database trying to disconnect');
    if (err) {
      logger.error('Error on closing database');
    } else {
      logger.info('Database disconnected');
    }
    callback(err);
  });
}


module.exports = mysqlConnection;
