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

module.exports = function inject(obj, properties, exports, target, isCall, isOverride) {
  if (!properties || properties.length === 0) {
    return;
  }

  var property = properties.shift();

  if (properties.length === 0) {
    if (!isOverride && obj[property]) {
      throw new Error('can\'t overwrite property ' + property);
    }
    // some restrictions:
    // 1. should be a function
    // 2. should not be a generator
    // 3. should not be an es6 class (cannot be invoked without 'new')
    // 4. isCall flag open
    if (isCall && is.function(exports) && !is.generatorFunction(exports) && !is.class(exports)) {
      var val = exports(target);
      if (val !== undefined && val !== null) {
        obj[property] = val;
      }
    } else {
      obj[property] = exports;
    }
    return;
  }

  obj[property] || (obj[property] = {});
  inject(obj[property], properties, exports, target, isCall, isOverride);
};
