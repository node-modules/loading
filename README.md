loading
=======

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]
[![David][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/loading.svg?style=flat
[npm-url]: https://npmjs.org/package/loading
[travis-image]: https://img.shields.io/travis/node-modules/loading.svg?style=flat
[travis-url]: https://travis-ci.org/node-modules/loading
[coveralls-image]: https://img.shields.io/coveralls/node-modules/loading.svg?style=flat
[coveralls-url]: https://coveralls.io/r/node-modules/loading?branch=master
[gittip-image]: https://img.shields.io/gittip/fengmk2.svg?style=flat
[gittip-url]: https://www.gittip.com/fengmk2/
[david-image]: https://img.shields.io/david/node-modules/loading.svg?style=flat
[david-url]: https://david-dm.org/node-modules/loading
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/loading.svg?style=flat-square
[download-url]: https://npmjs.org/package/loading


![logo](https://raw.github.com/node-modules/loading/master/logo.png)

loading dir files as module to an object.

## Install

```bash
$ npm install loading
```

## Module loading init rules

-* `module.exports = function (app)` module as initialization function

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

## License

(The MIT License)

Copyright (c) 2014 fengmk2 &lt;fengmk2@gmail.com&gt; and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
