'use strict';

var debug = require('debug')('generate:git');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('base-questions', 'questions');
require('base-task-prompts', 'prompts');
require('camel-case', 'camelcase');
require('gitty');
require('is-registered');
require('is-valid-instance');
require('log-utils', 'log');
require('mkdirp');
require = fn;

/**
 * Returns true if the generator is registered already
 */

utils.isValid = function(app) {
  if (!utils.isValidInstance(app)) {
    return false;
  }
  if (utils.isRegistered(app, 'generate-git')) {
    return false;
  }
  debug('initializing <%s>, from <%s>', __filename, module.parent.id);
  return true;
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
