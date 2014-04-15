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
  var app = {
    controllers: {
      test: function () {},
    }
  };
  loading(path.join(__dirname, 'fixtures', 'services'))
    .concat(path.join(__dirname, 'fixtures', 'overwrite_services'))
    .into(app, 'services');
  loading(path.join(__dirname, 'fixtures', 'models')).into(app, 'models');
  loading(path.join(__dirname, 'fixtures', 'controllers')).into(app, 'controllers');

  it('should auto load services to app', function (done) {
    app.should.have.property('services');
    app.services.should.have.keys('foo', 'userProfile', 'fooBarHello', 'fooService');

    done = pedding(2, done);
    app.services.foo.get(function (err, v) {
      should.not.exist(err);
      v.should.equal('overwrite bar');
      done();
    });
    app.services.userProfile.getByName('mk2', function (err, user) {
      should.not.exist(err);
      user.should.eql({name: 'mk2'});
      done();
    });
  });

  it('should load controllers to app', function (done) {
    app.controllers.should.have.keys('home', 'test');
    app.controllers.home.should.have.keys('index', 'init', '__loadingInited');

    app.controllers.home.index({query: {uid: 'mk2'}}, {
      end: function (body) {
        body.should.equal('hello mk2');
        done();
      }
    });
  });
});
