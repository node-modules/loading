'use strict';

var debug = require('debug')('loading:mods');
var fs = require('fs');
var path = require('path');
var glob = require('glob');

module.exports = function getMods(dirpath) {
  var mods = [];

  glob.sync('**/*.js', {cwd: dirpath}).forEach(function (name) {
    var fullpath = path.join(dirpath, name);
    if (!fs.statSync(fullpath).isFile()) {
      return;
    }

    /*
      a/b/c.js
      ->
      {
        fullpath: 'a/b/c.js',
        properties: ['a', 'b', 'c']
      }
    */
    var properties = name.replace('.js', '')
    .split('/')
    .map(function(property) {
      var reg = /^[a-z][a-z0-9_-]*$/ig;
      if (!reg.test(property)) {
        throw new Error(property + ' is not match ' + reg + ' in ' + name);
      }
      return property.replace(/[_-][a-z]/ig, function (s) {
        return s.substring(1).toUpperCase();
      });
    });

    mods.push({
      fullpath: fullpath,
      properties: properties
    });

    debug('load #%d module: %s as `%s`', mods.length, fullpath, properties.join('.'));
  });
  return mods;
};
