loading
=======

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/loading.svg?style=flat
[npm-url]: https://npmjs.org/package/loading
[travis-image]: https://img.shields.io/travis/node-modules/loading.svg?style=flat
[travis-url]: https://travis-ci.org/node-modules/loading
[coveralls-image]: https://img.shields.io/coveralls/node-modules/loading.svg?style=flat
[coveralls-url]: https://coveralls.io/r/node-modules/loading?branch=master
[david-image]: https://img.shields.io/david/node-modules/loading.svg?style=flat
[david-url]: https://david-dm.org/node-modules/loading
[snyk-image]: https://snyk.io/test/npm/loading/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/loading
[download-image]: https://img.shields.io/npm/dm/loading.svg?style=flat-square
[download-url]: https://npmjs.org/package/loading

loading dir files as module to an object.

## Install

```bash
$ npm install loading
```

## Module loading init rules

- `module.exports = function (app)` module as initialization function

- map `Pascal Case` modules -> `Lower Camel Case` such as `raw_modules` -> `rawModules`

- if `opt.lowercaseFirst = true` then map `SomeDir.SomeClass` -> `someDir.someClass`

## Usage

```js
var loading = require('loading');

var app = {};
// app.services.foo
loading('/services').concat('/overwrite_services').into(app, 'services');
loading('/models').into(app, 'models');
loading('/controllers').into(app, 'controllers');
console.log(app);

// /services/foo.js
exports.get = function (callback) {
  setTimeout(function () {
    callback(null, 'bar');
  }, 1);
};

// /services/userProfile.js
module.exports = function (app) {
  return {
    getByName: function (name, callback) {
      setTimeout(function () {
        callback(null, {name: name});
      }, 1);
    }
  };
};
```

## Options

```
var loading = require('loading');

loading(PATH,[{call:true}]).into(TARGET, FIELD, [filters])
```
- **call** type:[`object`]
  decide whether auto call the function when module.exports is a function, default: true .

- **filters** type:[`string array`]
  only inject the item in `filters` .

- **override** type:[`boolean`]
  decide whether override the property that is already exist,
  default: false

- **ignore** type:[`string function`]
  ignore file. If ignore is not null, ignore rule will be glob string `!ignore`.
  default: undefined

- **lowercaseFirst** type:[`boolean`]
  decide whether lowercase the first letter of property
  default: false
## License

MIT
