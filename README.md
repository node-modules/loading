loading
=======

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]
[![David][david-image]][david-url]

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

![logo](https://raw.github.com/node-modules/loading/master/logo.png)

loading dir files as module to an object.

## Install

```bash
$ npm install loading
```

## Module loading init rules

* `exports.init(app)` initialization function
* `exports.extra = []` load extra modules, must be an array
* `module.exports = function (app)` module as initialization function
* no initialization function

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

// /models/user.js
var services;
exports.init = function (app) {
  services = app.services;
}

exports.getProfile = function (userId, callback) {
  services.userProfile.getByName(userId, callback);
};

// /controllers/home.js
var models;
exports.init = function (app) {
  models = app.models;
}

exports.index = function (req, res, next) {
  models.user.getProfile(req.query.uid, function (err, user) {
    res.end('hello ' + user.name);
  });
};

// will auto load '/controllers/extra' and '/controllers/extraWithExtra'
exports.extra = ['extra', 'extraWithExtra'];
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
