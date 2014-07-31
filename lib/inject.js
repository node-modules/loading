'use strict';

module.exports = function inject(obj, properties, exports) {
  if (!properties || properties.length === 0) return;

  var property = properties.shift();

  if (properties.length === 0) {
    if (obj[property]) {
      throw new Error('can\'t overwrite property ' + property);
    }
    obj[property] = exports;
    return;
  }

  obj[property] || (obj[property] = {});
  inject(obj[property], properties, exports);
};
