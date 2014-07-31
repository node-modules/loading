/**!
 * loading - index.js
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
var getMods = require('./lib/mods');
var inject = require('./lib/inject');

function Loader(dirpath) {
  if (!(this instanceof Loader)) {
    return new Loader(dirpath);
  }
  this._mods = [];
  this.concat(dirpath);
}

var proto = Loader.prototype;

proto._load = function (target, field) {
  var mods = this._mods;
  var self = this;

  if (!target) {
    return;
  }

  if (!target[field]) {
    target[field] = {};
  }

  var map = {};
  mods.forEach(function (item, index) {
    var fullpath = item.fullpath;
    var properties = item.properties;
    var mod = require(fullpath);

    inject(target[field], properties, mod);
    debug('loading #%d:%s into %s', index++, properties.join('.'), field);
  });
};

proto.concat = function (dirpath) {
  this._mods = this._mods.concat(getMods(dirpath));
  debug('total %d', this._mods.length);
  return this;
};

// load `field` into `target`
proto.into = function (target, field) {
  this._load(target, field);
  return target;
};

module.exports = Loader;
