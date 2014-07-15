/**!
 * loading - test/fixtures/controllers/extraWithExtra/a/index.js
 *
 * Copyright(c) Janus-Z and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   Janus-Z <Janus.zheng@gmail.com> (https://github.com/janus-z)
 */

'use strict';

exports.test = function (loadedBy) {
  loadedBy(
    'controllers/extraWithExtra/a/index.js',
    'controllers/extraWithExtra/index.js:exports.extra'
  );
};

exports.init = function (app) {
  exports.app = app;
};
