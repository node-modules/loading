'use strict';
const path = require('path');
const interopRequire = require('../lib/interop-require');
require('should');

function fixture(f) {
  return path.join(__dirname, './fixtures/interop_require', f);
}

describe('interop_require.test.js', function() {

  describe('when request esmodule with default', function() {
    it('should return module directly', function() {
      const esmoduleWithDefault = fixture('esmodule_default');
      const mod = interopRequire(esmoduleWithDefault);
      mod.name.should.equal('Hello');
      new mod().world().should.equal('hello world');
    });
  });

  describe('when request esmodule without default', function() {
    it('should return origin module', function() {
      const esmoduleWithoutDefault = fixture('esmodule_no_default');
      const mod = interopRequire(esmoduleWithoutDefault);
      mod.hello.name.should.equal('hello');
      mod.hello().should.equal('world');
    });
  });

  describe('when request common module', function() {
    it('should return default as property', function() {
      const commonModuleWithDefault = fixture('common_export_default');
      const mod = interopRequire(commonModuleWithDefault);
      mod.default.name.should.equal('hello');
      mod.default().should.equal('world');
    });

    it('should return module', function() {
      const commonModuleWithoutDefault = fixture('common_no_default');
      const mod = interopRequire(commonModuleWithoutDefault);
      mod.hello.name.should.equal('hello');
      mod.hello().should.equal('world');
    });
  });
});
