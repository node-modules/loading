/**!
 * loading - test/fixtures/models/user.js
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

var services;
exports.init = function (app) {
  services = app.services;
};

exports.getProfile = function (userId, callback) {
  services.userProfile.getByName(userId, callback);
};
