
1.13.3 / 2017-05-16
===================

  * fix: remove interop-require from dependency (#33)

1.13.2 / 2017-04-25
===================

  * feat: ignore support array (#32)

1.13.1 / 2017-02-21
===================

  * fix: we should pass down isOverride parameter, when we call inject function recursively. (#31)

1.13.0 / 2016-07-18
==================

  * feat: set error file path into error message (#25)

1.12.1 / 2016-07-18
==================

  * fix: upgrade debug to fix security

1.12.0 / 2016-05-11
==================

  * feat: support es6-module (#22)

1.11.0 / 2016-05-04
===================

  * unnittest use Class, remove 0.12 travis support
  * add options.initializer function when inject

1.10.0 / 2015-11-10
==================

 * feat: es6 class should not be calling without 'new'

1.9.0 / 2015-11-09
==================

 * feat: support lowercase first letter (@atian25)

1.8.0 / 2015-07-29
==================

 * feat: init support  array

1.7.0 / 2015-06-26
==================

 * feat: add ignore support, fixes #15

1.6.0 / 2015-06-16
==================

  * chore: use pkg.files instead
  * feat: Add an option to override the property that is already exist

1.5.0 / 2015-04-26
==================

 * deps: upgrade debug to the latest

1.4.1 / 2014-12-14
==================

 * fix(inject): ignore undefined and null value

1.4.0 / 2014-11-20
==================

 * feat: support loads.into(obj, name, {filters: ['a', 'b']})

1.3.1 / 2014-09-29
==================

 * fix target missing on inject

1.3.0 / 2014-09-01
==================

 * set call option whether call the function when module.exports is a function

1.2.0 / 2014-08-23
==================

 * support module.exports = function* () {}

1.1.0 / 2014-08-01
==================

 * `module.exports = function (app)` module as initialization function

1.0.0 / 2014-07-31
==================

 * move lib/loading.js > index.js
 * simplify implementation #5

0.3.0 / 2014-07-23
==================

 * add travis coverage
 * Pass the original target to extra

0.2.0 / 2014-07-14
==================

 * Add `exports.extra` option for loading extra modules (@Janus-Z)

0.1.0 / 2014-04-15
==================

 * later require, must do require action in into() method

0.0.4 / 2014-04-09
==================

 * load `foo-service.js` => `fooService` fix #2

0.0.3 / 2014-03-26
==================

 * only accept alphabet start js file. fixed #1

0.0.2 / 2014-03-25
==================

  * add initialization function support

0.0.1 / 2014-03-24
==================

  * improve coverage
  * add logo
  * first commit
