/*!
 * generate-git <https://github.com/jonschlinkert/generate-git>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var Emitter = require('component-emitter');
var utils = require('./utils');

/**
 * Expose `git`
 */

module.exports = function(cwd, options) {
  options = options || {};

  var repo = utils.gitty(cwd);
  var git = Emitter({});

  var msgs = options.msgs || {
    init: ['already exists.', 'initialized.']
  };

  git.init = function(cb) {
    var fp = path.resolve(cwd, '.git');

    fs.exists(fp, function(exists) {
      if (exists) {
        git.emit('exists', msgs.init[0]);
        return cb(null, 'exists');
      }

      repo.init(function(err) {
        if (err) return cb(err);

        git.emit('init', msgs.init[1]);
        cb();
      });
    });
  };

  git.commit = function(msg, cb) {
    files(cwd, function(err, files) {
      if (err) return cb(err);

      repo.add(files, function(err) {
        if (err) return cb(err);

        git.emit('add', files);
        repo.commit(msg, function(err) {
          if (err) return cb(err);

          git.emit('commit', msg);
          cb();
        });
      });
    });
  };

  git.quickstart = function(msg, cb) {
    if (typeof msg === 'function') {
      cb = msg;
      msg = 'first commit.';
    }

    git.init(function(err, status) {
      if (err) return cb(err);

      if (status === 'exists') {
        return cb();
      }

      git.commit(msg, function(err) {
        if (err) return cb(err);
        cb();
      });
    });
  };

  return git;
};

function files(dir, cb) {
  var ignore = utils.gitignore(path.join(dir, '.gitignore'));
  ignore.push('.DS_Store', '.git');
  var opts = { cwd: dir, ignore: ignore, dot: true };
  utils.glob('*', opts, function(err, files) {
    if (err) return cb(err);

    if (files.length === 0) {
      var heading = '# ' + path.basename(dir) + '\n\n';
      heading += '> Project description here!';
      return fs.writeFile('readme.md', heading, function(err) {
        if (err) return cb(err);

        return cb(null, ['readme.md']);
      });
    }

    cb(null, files);
  });
}
