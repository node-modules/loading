/**!
 * loading - lib/mods.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   popomore <sakura9515@gmail.com>
 */

'use strict';

var debug = require('debug')('loading:mods');
var fs = require('fs');
var path = require('path');
var globby = require('globby');

module.exports = function getMods(dirpath, opt) {
  var mods = [];
  var files = ['**/*.js'];
  opt = opt || {};
  var ignore = opt.ignore;
  var lowercaseFirst = opt.lowercaseFirst;

  if (typeof ignore === 'string') {
    files.push('!' + ignore);
  }

  if (Array.isArray(ignore)) {
    files = files.concat(ignore.map(path => {
      return '!'+ path;
    }));
  }

  globby.sync(files, {cwd: dirpath}).forEach(function (name) {
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
      var result = property.replace(/[_-][a-z]/ig, function (s) {
        return s.substring(1).toUpperCase();
      });

      if (lowercaseFirst) {
        result = result[0].toLowerCase() + result.substring(1);
      }
      return result;
    });

    mods.push({
      fullpath: fullpath,
      properties: properties
    });

    debug('load #%d module: %s as `%s`', mods.length, fullpath, properties.join('.'));
  });
  return mods;
};
