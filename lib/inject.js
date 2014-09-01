/**!
 * loading - lib/inject.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   popomore <sakura9515@gmail.com>
 */

'use strict';

var is = require('is-type-of');

module.exports = function inject(obj, properties, exports, target, isCall) {
  if (!properties || properties.length === 0) {
    return;
  }

  var property = properties.shift();

  if (properties.length === 0) {
    if (obj[property]) {
      throw new Error('can\'t overwrite property ' + property);
    }
    if (isCall && is.function(exports) && !is.generatorFunction(exports)) {
      obj[property] = exports(target);
    } else {
      obj[property] = exports;
    }
    return;
  }

  obj[property] || (obj[property] = {});
  inject(obj[property], properties, exports, isCall);
};
