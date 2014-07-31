'use strict';

require('should');
var inject = require('../lib/inject');

describe('inject.test.js', function () {

  it('should inject properties', function() {
    var obj = {}, mod = {};
    inject(obj, ['a', 'b', 'c'], mod);
    obj.a.b.c.should.equal(mod);
  });

  it('should return when properties is []', function() {
    var obj = {};
    inject(obj, [], 1);
    Object.keys(obj).should.eql([]);
  });

  it('should return when properties is null', function() {
    var obj = {};
    inject(obj, null, 1);
    Object.keys(obj).should.eql([]);
  });
});
