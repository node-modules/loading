/**!
 * loading - test/fixtures/controllers/extra/index.js
 *
 * Copyright(c) Janus-Z and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   Janus-Z <Janus.zheng@gmail.com> (https://github.com/janus-z)
 */

'use strict';

exports.test = function (loadedBy) {
  loadedBy('controllers/extra/index.js', 'controllers/home.js:exports.extra');
};
