/**!
 * loading - lib/loading.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

"use strict";

/**
 * Module dependencies.
 */

var debug = require('debug')('loading');
var fs = require('fs');
var path = require('path');

function Loader(dirpath) {
  if (!(this instanceof Loader)) {
    return new Loader(dirpath);
  }
  this._dirpath = dirpath;
  this._mods = [];
  this._require();
}

Loader.prototype._require = function () {
  var mods = this._mods;
  var dirpath = this._dirpath;
  fs.readdirSync(dirpath).forEach(function (name) {
    if (path.extname(name) !== '.js') {
      return;
    }
    var fullpath = path.join(dirpath, name);
    if (!fs.statSync(fullpath).isFile()) {
      return;
    }
    debug('load #%d module: %s', mods.length, fullpath);
    mods.push([name.split('.')[0], require(fullpath)]);
  });
  debug('total %d', mods.length);
};

Loader.prototype.into = function (target, field) {
  if (!target[field]) {
    target[field] = {};
  }
  this._mods.forEach(function (item, index) {
    var name = item[0];
    var mod = item[1];
    debug('loading #%d:%s into %s', index, name, field);
    if (typeof mod === 'function') {
      // function (target)
      target[field][name] = mod(target);
    } else if (typeof mod.init === 'function') {
      mod.init(target);
      delete mod.init; // only init once
      target[field][name] = mod;
    } else {
      target[field][name] = mod;
    }
  });
  return target;
};

module.exports = Loader;
