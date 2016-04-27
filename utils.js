'use strict';

var debug = require('debug')('generate:git');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('base-task-prompts', 'prompts');
require('camel-case', 'camelcase');
require('gitty');
require('log-utils', 'log');
require = fn;

/**
 * Returns true if the generator is registered already
 */

utils.isRegistered = function(app, name) {
  if (!app.isApp && !app.isGenerator) {
    return true;
  }
  if (app.isRegistered('generate-' + name)) {
    return true;
  }
  debug('initializing <%s>, from <%s>', __filename, module.parent.id);
};

/**
 * Add a first commit to a git repository
 */

utils.firstCommit = function(cwd, msg, cb) {
  if (typeof cwd === 'function') {
    cb = cwd;
    msg = 'first commit';
    cwd = process.cwd();
  }

  if (typeof msg === 'function') {
    cb = msg;
    msg = 'first commit';
  }

  if (typeof cb !== 'function') {
    throw new TypeError('expected a callback function');
  }

  var git = utils.gitty(cwd);

  git.init(function(err) {
    if (err) return cb(err);

    git.add(['.'], function(err, files) {
      if (err) return cb(err);

      git.commit(msg, cb);
    });
  });
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
