/**!
 * loading - test/fixtures/services/userProfile.js
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

module.exports = function (app) {
  return {
    getByName: function (name, callback) {
      setTimeout(function () {
        callback(null, {name: name});
      }, 1);
    }
  };
};
