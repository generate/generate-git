'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var generate = require('generate');
var del = require('delete');
var generator = require('./');
var app;

var cwd = path.resolve.bind(path, __dirname, 'actual');

function exists(name, cb) {
  var filepath = cwd(name);

  return function(err) {
    if (err) return cb(err);

    fs.stat(filepath, function(err, stat) {
      console.log(err);
      assert(stat);
      del(path.dirname(filepath), cb);
    });
  }
}

describe('generate-git', function() {
  beforeEach(function() {
    app = generate({cli: true, silent: true});
    app.cwd = cwd();
    console.log(cwd())
    app.option('dest', cwd());
    app.option('askWhen', 'not-answered');
    app.data('author.name', 'Jon Schlinkert');
  });

  describe('plugin', function() {
    it('should only register the plugin once', function(cb) {
      var count = 0;
      app.on('plugin', function(name) {
        if (name === 'generate-git') {
          count++;
        }
      });
      app.use(generator);
      app.use(generator);
      app.use(generator);
      assert.equal(count, 1);
      cb();
    });
  });

  describe('generator', function() {
    it('should work as a plugin', function() {
      app.use(generator);
      assert(app.tasks.hasOwnProperty('default'));
      assert(app.tasks.hasOwnProperty('first-commit'));
      assert(app.tasks.hasOwnProperty('fc'));
    });

    it('should work as a generator', function(cb) {
      app.register('git', generator);
      app.generate('git', exists('.git', cb));
    });

    it('should run the `default` task', function(cb) {
      app.register('git', generator);
      app.generate('git:default', exists('.git', cb));
    });

    it('should run the `fc` task', function(cb) {
      app.register('git', generator);
      app.generate('git:fc', exists('.git', cb));
    });
  });
});
