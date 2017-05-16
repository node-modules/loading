'use strict';

module.exports = function(path) {
  var obj = require(path);
  return isEsModule(obj) ? (hasExportDefault(obj) ? obj['default'] : obj) : obj;
}

function isEsModule(obj) {
  return obj && obj.__esModule;
}

function defined(obj, key) {
  return obj[key] !== undefined && obj[key] !== null;
}

function hasExportDefault(obj) {
  return defined(obj, 'default');
}

