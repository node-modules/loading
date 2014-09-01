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
    app.services.should.have.keys('dir', 'foo', 'fooBarHello', 'fooService', 'hyphenDir', 'underscoreDir', 'userProfile');
    app.services.fooService.should.have.keys('a');

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

  it('should not overwrite property', function() {
    var app = {
      services: {
        foo: {}
      }
    };
    (function() {
      loading(path.join(__dirname, 'fixtures', 'services')).into(app, 'services');
    }).should.throw('can\'t overwrite property foo');
  });

  it('should not overwrite property from loading', function() {
    var app = {};
    (function() {
      loading(path.join(__dirname, 'fixtures', 'services'))
        .concat(path.join(__dirname, 'fixtures', 'overwrite_services'))
        .into(app, 'services');
    }).should.throw('can\'t overwrite property foo');
  });

  it('should just return when no target', function() {
    loading(path.join(__dirname, 'fixtures', 'services')).into();
  });

  it('should loading without call function', function() {
    var app = {};
    loading(path.join(__dirname, 'fixtures', 'services'), {call: false})
      .into(app, 'services');
    app.services.fooService().should.eql({a: 1});
  });
});
