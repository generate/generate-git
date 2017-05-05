'use strict';

var fs = require('fs');
var path = require('path');
var Enquirer = require('enquirer');
var extend = require('extend-shallow');
var utils = require('./utils');

module.exports = function(app, base) {
  if (!utils.isValid(app, 'generate-git')) return;

  /**
   * Initialize prompts
   */

  var enquirer = new Enquirer();
  enquirer.register('confirm', require('prompt-confirm'));

  enquirer.question('clone', {
    message: 'Which repo would you like to clone (owner/name)?',
  });

  enquirer.question('first-commit', {
    message: 'Want to do first git commit?',
    type: 'confirm'
  });

  /**
   * Initialize a git repository, including `git add` and first commit.
   *
   * ```sh
   * $ gen git
   * ```
   * @name default
   * @api public
   */

  app.task('default', {silent: true}, ['first-commit']);

  /**
   * Alias for the default task, to provide a semantic task name when using this
   * generator as a plugin or sub-generator.
   *
   * ```sh
   * $ gen git:first-commit
   * ```
   * @name first-commit
   * @api public
   */

  app.task('first-commit', function(cb) {
    if (fs.existsSync(path.resolve(app.cwd, '.git'))) {
      app.log.warn(`.git exists, skipping ${this.name} task`);
      cb();
      return;
    }

    utils.firstCommit(app.cwd, 'first commit', function(err) {
      if (err && !/Command failed/.test(err.message)) {
        cb(err);
      } else {
        app.log.success('first commit');
        cb();
      }
    });
  });

  /**
   * Alias for the default task, to provide a semantic task name when using this
   * generator as a plugin or sub-generator.
   *
   * ```sh
   * $ gen git:clone
   * $ gen git:git-clone # aliased for API usage
   * ```
   * @name clone
   * @api public
   */

  app.task('clone', ['prompt-clone']);
  app.task('prompt-clone', function(cb) {
    var opts = extend({}, app.options);
    if (opts.clone) {
      opts.repo = opts.clone;
      utils.clone(opts, cb);
      return;
    }

    return enquirer.ask('clone')
      .then(function(answer) {
        if (answer.clone) {
          opts.repo = answer.clone;
          app.log.info('cloning', opts.repo);
          utils.clone(opts, cb);
        }
      });

  });

  /**
   * Prompts the user to confirm if they'd like to initialize a git repository with
   * first [first-commit](#first-commit).
   *
   * ```sh
   * $ gen updater:prompt-git
   * ```
   * @name updater:prompt-git
   * @api public
   */

  app.task('prompt-first-commit', function(cb) {
    var name = this.name;
    return enquirer.ask(name)
      .then(function(answer) {
        if (answer[name]) {
          return app.build(name.replace('prompt-', ''), cb);
        }
      });
  });

};

