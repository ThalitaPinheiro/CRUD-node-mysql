'use strict';
var express = require('express');
var router = new express.Router();

var auth = require('./auth');
var helloByName = require('./controllers/helloByName');

router.get('/', function(req, res) {
  res.status(200).send('Hello World!!!');
});

router.get('/name/:name', helloByName);

router.post('/clients', auth.get, function(req, res) {
  res.status(200).send('Hello World!!!');
});

module.exports = router;
