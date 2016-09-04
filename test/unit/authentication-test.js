'use strict';

var BASE_DIR = process.cwd();
var request = require('supertest');
var rewire = require('rewire');
var assert = require('chai').assert;
var app = require(BASE_DIR + '/lib/application');

describe('authenticate-test.js', function() {
  it('Should return success on authentication', function(done) {
   request(app)
    .post('/clients')
    .set('Authorization', 'Basic dGhhbGl0YToxMjM0NTY3ODk=')
    .expect(401)
    .end(function(err, res) {
      assert.isNotOk(err);
      assert.isObject(res.body);
      assert.lengthOf(Object.keys(res.body), 0)
      done();
    });
  });
});
