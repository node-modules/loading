/**!
 * loading - test/loading.test.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 *   popomore <sakura9515@gmail.com>
 */

'use strict';

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

    app.services.dir.service.should.have.keys('load', 'app');
    app.services.dir.service.load.should.equal(true);
    app.services.dir.service.app.should.equal(app);
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

  it('should overwrite property from loading', function() {
    var app = {};
    loading(path.join(__dirname, 'fixtures', 'services'), {override: true})
      .concat(path.join(__dirname, 'fixtures', 'overwrite_services'))
      .into(app, 'services');
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

  describe('into() with options.filters', function () {
    it('should only load property match the filers', function () {
      var app = {};
      var fixtures = path.join(__dirname, 'fixtures', 'middlewares');
      var defaultMiddlewares = path.join(fixtures, 'default');
      var appMiddlewares = path.join(fixtures, 'app');
      var loads = loading(defaultMiddlewares, {call: false});
      loads.concat(appMiddlewares);
      loads.into(app, 'middlewares', {
        filters: ['m1', 'm2', 'dm1', 'dm2']
      });
      app.middlewares.should.have.keys('m1', 'm2', 'dm1', 'dm2');
    });
  });
});
