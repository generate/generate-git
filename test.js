'use strict';

require('mocha');
var assert = require('assert');
var generateGit = require('./');

describe('generate-git', function() {
  it('should export a function', function() {
    assert.equal(typeof generateGit, 'function');
  });
});
