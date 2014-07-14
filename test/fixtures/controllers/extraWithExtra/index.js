/**!
 * loading - test/fixtures/controllers/extraWithExtra/index.js
 *
 * Copyright(c) Janus-Z and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   Janus-Z <Janus.zheng@gmail.com> (https://github.com/janus-z)
 */

'use strict';

exports.extra = ['a', 'b', 'b'];
exports.test = function (loadedBy) {
  loadedBy(
    'controllers/extraWithExtra/index.js',
    'controllers/home.js:exports.extra'
  );
};
