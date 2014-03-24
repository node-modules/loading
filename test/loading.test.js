/**!
 * loading - test/loading.test.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

"use strict";

/**
 * Module dependencies.
 */

var should = require('should');
var pedding = require('pedding');
var path = require('path');
var loading = require('../');

describe('loading.test.js', function () {
  it('should auto load services to app', function (done) {
    var app = {};
    loading(path.join(__dirname, 'fixtures', 'services')).into(app, 'services');
    app.should.have.property('services');
    app.services.should.have.keys('foo', 'uesrProfile');

    done = pedding(2, done);
    app.services.foo.get(function (err, v) {
      should.not.exist(err);
      v.should.equal('bar');
      done();
    });
    app.services.userProfile.getByName('mk2', function (err, user) {
      should.not.exist(err);
      user.should.eql({name: 'mk2'});
      done();
    });
  });
});
