/**!
 * loading - test/loading.test.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
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
  var app = {
    controllers: {
      test: function () {},
    }
  };

  loading(path.join(__dirname, 'fixtures', 'services'))
    .concat(path.join(__dirname, 'fixtures', 'overwrite_services'))
    .into(app, 'services');
  loading(path.join(__dirname, 'fixtures', 'models')).into(app, 'models');

  it('should auto load services to app', function (done) {
    app.should.have.property('services');
    app.services.should.have.keys(
      'foo',
      'userProfile',
      'fooBarHello',
      'fooService'
    );

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

  it('should only run home.init once even has multiple loading', function () {
    loading(path.join(__dirname, 'fixtures', 'controllers'))
      .into(app, 'controllers');
    app.controllers.home.initTimes.should.equal(1);

    // make sure home.init run once
    loading(path.join(__dirname, 'fixtures', 'controllers'))
      .into(app, 'controllers2');
    app.controllers2.home.initTimes.should.equal(1);
  });

  it('should load controllers to app and auto load extra', function (done) {
    app.controllers.should.have.keys(
      'home',
      'test',
      'extra',
      'extraWithExtra',
      'duplicateExtraConfig'
    );

    app.controllers.should.not.have.keys('notAnExtra');
    app.controllers.duplicateExtraConfig.should.have.keys('extra');
    app.controllers.home.should.have.keys(
      'index',
      'init',
      '__loadingInited',
      'extra',
      'initTimes'
    );

    app.controllers.home.index({query: {uid: 'mk2'}}, {
      end: function (body) {
        body.should.equal('hello mk2');
        done();
      }
    });
  });

  it('should auto load extra to app.controllers', function () {
    app.controllers.extra.should.have.keys(
      'index',
      'getLoadTimes',
      'loadTimes'
    );

    app.controllers.extra.index.should.have.keys(
      'test',
      'init',
      '__loadingInited',
      'app'
    );

    app.controllers.extra.getLoadTimes.should.be.type('function');
    app.controllers.extra.index.app.should.be.exactly(app);
    app.controllers.extra.index.test(function (path, config) {
      path.should.equal('controllers/extra/index.js');
      config.should.equal('controllers/home.js:exports.extra');
    });
  });

  it('should auto load extraWithExtra to app.controllers', function () {
    app.controllers.extraWithExtra.should.have.keys('index', 'a', 'b');
    app.controllers.extraWithExtra.index.should.have.keys('test', 'extra');
    app.controllers.extraWithExtra.index.test(function (path, config) {
      path.should.equal('controllers/extraWithExtra/index.js');
      config.should.equal('controllers/home.js:exports.extra');
    });
  });

  it('should auto load a to app.controllers.extraWithExtra', function () {
    app.controllers.extraWithExtra.a.should.have.keys('index');
    app.controllers.extraWithExtra.a.index.should.have.keys(
      'test',
      'init',
      '__loadingInited',
      'app'
    );
    app.controllers.extraWithExtra.a.index.test(function (path, config) {
      path.should.equal('controllers/extraWithExtra/a/index.js');
      config.should.equal('controllers/extraWithExtra/index.js:exports.extra');
    });
  });

  it('should auto load b to app.controllers.extraWithExtra', function () {
    app.controllers.extraWithExtra.b.should.have.keys('index');
    app.controllers.extraWithExtra.b.index.should.have.keys('test');
    app.controllers.extraWithExtra.b.index.test(function (path, config) {
      path.should.equal('controllers/extraWithExtra/b/index.js');
      config.should.equal('controllers/extraWithExtra/index.js:exports.extra');
    });
  });

  it('should pass the original target to `exports.init` or `module.exports` when automatic loading extra', function () {
    app.controllers.extraWithExtra.a.index.app.should.be.exactly(app);
  });

  it('should load extra once in one `into` call even has multiple same `exports.extra` config', function () {
    // multiple same `exports.extra` config would not lead duplicate loading.
    app.controllers.extra.loadTimes.should.be.exactly(2);
  });
});
