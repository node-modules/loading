/**!
 * loading - test/fixtures/controllers/extra/home.js
 *
 * Copyright(c) Janus-Z and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   Janus-Z <Janus.zheng@gmail.com> (https://github.com/janus-z)
 */

'use strict';

module.exports = function (app) {
  var loadTimes = app.controllers.extra.loadTimes;

  // if loadTimes is undefied, assign 1 to it
  app.controllers.extra.loadTimes = loadTimes = loadTimes + 1 || 1;

  return function () {
    return loadTimes;
  };
};
