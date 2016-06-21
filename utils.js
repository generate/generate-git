'use strict';

var path = require('path');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('base-questions', 'questions');
require('base-task-prompts', 'prompts');
require('camel-case', 'camelcase');
require('fs-exists-sync', 'exists');
require('gitty');
require('is-valid-app', 'isValid');
require('log-utils', 'log');
require('mkdirp');
require = fn;


utils.renameKey = function(key, file) {
  var name = file ? file.stem : path.basename(key, path.extname(key));
  return name.slice(1);
};

/**
 * Add a first commit to a git repository
 */

utils.firstCommit = function(cwd, msg, cb) {
  if (typeof cwd === 'function') {
    cb = cwd;
    msg = 'first commit';
    cwd = null;
  }

  if (typeof msg === 'function') {
    cb = msg;
    msg = 'first commit';
  }

  if (typeof cb !== 'function') {
    throw new TypeError('expected a callback function');
  }

  cwd = cwd || process.cwd();
  utils.mkdirp(cwd, function(err) {
    if (err) return cb(err);

    var git = utils.gitty(cwd);

    git.init(function(err) {
      if (err) return cb(err);

      git.add(['.'], function(err, files) {
        if (err) return cb(err);

        git.commit(msg, cb);
      });
    });
  });
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
