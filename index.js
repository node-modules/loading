/**!
 * loading - index.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 *   Janus-Z <Janus.zheng@gmail.com> (https://github.com/janus-z)
 *   popomore <sakura9515@gmail.com>
 *   fangk <kai.fangk@gmail.com>
 */

'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('loading');
var interopRequire = require('./lib/interop-require');
var getMods = require('./lib/mods');
var inject = require('./lib/inject');
var is = require('is-type-of');

function Loader(dirpath, opt) {
  if (!(this instanceof Loader)) {
    return new Loader(dirpath, opt);
  }
  this.opt = opt || {};
  // whether call the function when module.exports is a function, default: true
  this.opt.call = this.opt.call !== false;
  this.opt.override = this.opt.override === true;
  this.opt.lowercaseFirst = this.opt.lowercaseFirst === true;
  this._mods = [];

  if (Array.isArray(dirpath)) {
    for (var i = 0, l = dirpath.length; i < l; i++) {
      this.concat(dirpath[i]);
    }
  } else {
    this.concat(dirpath);
  }
}

var proto = Loader.prototype;

proto._load = function (target, field, options) {
  var filters = options && options.filters;
  var initializer;
  if (options && options.initializer && is.function(options.initializer)) {
    // initializer only support function;
    initializer = options.initializer;
  }
  var mods = this._mods;
  var isCall = this.opt.call;
  var isOverride = this.opt.override;

  if (!target) {
    return;
  }

  if (!target[field]) {
    target[field] = {};
  }

  mods.forEach(function (item, index) {
    var properties = item.properties;
    if (filters && filters.length > 0 && filters.indexOf(properties[0]) === -1) {
      // only require matched item
      return;
    }

    var names = properties.join('.');
    var mod;
    try {
      mod = interopRequire(item.fullpath);
    } catch (err) {
      err.message = '[loading] load file: ' + item.fullpath + ', error: ' + err.message;
      throw err;
    }
    // if exist initializer function, run it;
    if (initializer) {
      mod = initializer(mod);
    }
    inject(target[field], properties, mod, target, isCall, isOverride);
    debug('loading #%d:%s into %s', index++, names, field);
  });
};

proto.concat = function (dirpath) {
  this._mods = this._mods.concat(getMods(dirpath, this.opt));
  debug('total %d', this._mods.length);
  return this;
};

// load `field` into `target`
proto.into = function (target, field, options) {
  this._load(target, field, options);
  return target;
};

module.exports = Loader;
