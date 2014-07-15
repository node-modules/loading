/**!
 * loading - test/fixtures/controllers/home.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

exports.initTimes = 0;

var models;
exports.init = function (app) {
  models = app.models;
  exports.initTimes++;
};

exports.index = function (req, res, next) {
  models.user.getProfile(req.query.uid, function (err, user) {
    if (err) {
      return next(err);
    }
    res.end('hello ' + user.name);
  });
};

exports.extra = ['extra', 'extraWithExtra'];
