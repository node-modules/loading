/**!
 * loading - lib/loading.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 *   Janus-Z <Janus.zheng@gmail.com> (https://github.com/janus-z)
 */

'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('loading');
var fs = require('fs');
var path = require('path');

function getMods(dirpath) {
  var mods = [];

  fs.readdirSync(dirpath).forEach(function (name) {
    // only accept alphabet start js file
    // ignore _foo, .foo
    if (!/^[a-z]/i.test(name) || path.extname(name) !== '.js') {
      return;
    }

    var fullpath = path.join(dirpath, name);
    if (!fs.statSync(fullpath).isFile()) {
      return;
    }

    var propertyName = name.split('.')[0];
    propertyName = propertyName.replace(/\_[a-z]/ig, function (s) {
      return s.substring(1).toUpperCase();
    });

    mods.push([propertyName, fullpath]);

    debug('load #%d module: %s as %s', mods.length, fullpath, propertyName);
  });

  return mods;
}

function Loader(dirpath) {
  if (!(this instanceof Loader)) {
    return new Loader(dirpath);
  }

  // original target
  this._target = null;
  this._mods = [];

  this.concat(dirpath);
}

var proto = Loader.prototype;

proto._load = function (target, field, mods) {
  var self = this;

  if (self._target === null) {
    return;
  }

  if (!target[field]) {
    target[field] = {};
  }

  var map = {};
  mods.forEach(function (item, index) {
    var name = item[0];
    var key = field + '.' + name;
    map[key] = item;
  });

  var index = 0;
  Object.keys(map).forEach(function (key) {
    var item = map[key];
    var name = item[0];
    var mod = require(item[1]);

    debug('loading #%d:%s into %s', index++, name, field);

    // init function detect first
    if (typeof mod.init === 'function') {
      if (!mod.__loadingInited) {
        mod.init(self._target);
        mod.__loadingInited = true;
      }

      target[field][name] = mod;
    } else if (typeof mod === 'function') {
      // function (target)
      target[field][name] = mod(self._target);
    } else {
      target[field][name] = mod;
    }

    // load extra mods
    if (Array.isArray(mod.extra)) {
      var base = path.dirname(item[1]);

      // change current target to field object
      target = target[field];

      mod.extra.forEach(function (extra) {
        // avoid duplicating
        if (target[extra] !== undefined) {
          return;
        }

        // load extra
        self._load(target, extra, getMods(path.join(base, extra)));
      });
    }
  });
};

proto.concat = function (dirpath) {
  this._mods = this._mods.concat(getMods(dirpath));
  debug('total %d', this._mods.length);
  return this;
};

proto.into = function (target, field) {
  this._target = target;
  this._load(target, field, this._mods);
  return target;
};

module.exports = Loader;
