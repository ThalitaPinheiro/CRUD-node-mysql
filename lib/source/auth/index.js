'use strict';

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var userService = require('../services').user;
var config = require('../../commons/config');

passport.use(
new BasicStrategy(function(username, password, done) {
    console.log(username, password);
    userService.findByUsername(username, function(err, user){
      if(err){
        return done(err, false);
      } else if(password === user.password ) {
        return done(null, true);
      } else {
        return done(null, false);
      }
  });
}));

module.exports.get = passport.authenticate('basic', {
  session: false
});

module.exports.isConfigAuthenticated = function(req, res, next) {
console.log(req.authorization);
  var authorization = req.get('authorization') || '';
console.log('authorization',authorization);
  var authorizationValues = authorization.split(' ');
console.log('authorizationValues',authorizationValues);
  var authorizationType = authorizationValues[0] || '';
console.log('authorizationType',authorizationType);

  var authorizationValue = authorizationValues[1] || '';
console.log('authorizationValue',authorizationValue);

  if (authorizationType.toLowerCase() === 'basic') {
    var basicValue = config.get('authentication:basic');
console.log('basicValue',basicValue);

    if (basicValue === authorizationValue) {
      next();
    } else {
      res.sendStatus(401);
    }
  }
};
