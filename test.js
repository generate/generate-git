'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var generate = require('generate');
var del = require('delete');
var generator = require('./');
var app;

var actual = path.resolve.bind(path, __dirname, 'actual');

function exists(name, cb) {
  var filepath = actual(name);

  return function(err) {
    if (err) return cb(err);

    fs.stat(filepath, function(err, stat) {
      if (err) return cb(err);
      del(path.dirname(filepath), cb);
    });
  }
}

describe('generate-git', function() {
  beforeEach(function() {
    app = generate({cli: true, silent: true});
    app.data('author.name', 'Jon Schlinkert');
    app.option('prompt', false);
    app.option('check-directory', false);
    app.option('askWhen', 'not-answered');
    app.option('dest', actual());
    app.option('overwrite', function(file) {
      return /actual/.test(file.path);
    });
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
    });

    it('should work as a generator', function(cb) {
      app.register('git', generator);
      app.generate('git', exists('.git', cb));
    });

    it('should run the `default` task', function(cb) {
      app.register('git', generator);
      app.generate('git:default', exists('.git', cb));
    });

    it('should run the `first-commit` task', function(cb) {
      app.register('git', generator);
      app.generate('git:first-commit', exists('.git', cb));
    });
  });
});
