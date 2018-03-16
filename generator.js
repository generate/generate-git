'use strict';

const fs = require('fs');
const path = require('path');
const Enquirer = require('enquirer');
const isValid = require('is-valid-app');
const camelcase = require('camel-case');
const firstCommit = require('gfc');
const clone = require('gh-clone');

module.exports = function(app, base) {
  if (!isValid(app, 'generate-git')) return;

  /**
   * Initialize prompts
   */

  const enquirer = new Enquirer();
  enquirer.register('confirm', require('prompt-confirm'));
  enquirer.question('clone', { message: 'Which repo would you like to clone (owner/name)?' });
  enquirer.question('first-commit', { message: 'Want to do first git commit?', type: 'confirm' });

  /**
   * Initialize a git repository, including `git add` and first commit.
   *
   * ```sh
   * $ gen git
   * ```
   * @name default
   * @api public
   */

  app.task('default', { silent: true }, ['first-commit']);

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

    firstCommit(app.cwd, function(err) {
      if (err && !/Command failed/.test(err.message)) {
        cb(err);
      } else {
        !app.option('silent') && app.log.success('first commit');
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
    const opts = Object.assign({}, app.options);

    // if defined on options, clone now
    if (opts.clone) {
      opts.repo = opts.clone;
      clone(opts, cb);
      return;
    }

    // prompt the user for repo to clone
    enquirer.ask('clone').then(function(answer) {
      if (answer.clone) {
        opts.repo = answer.clone;
        app.log.info('cloning', opts.repo);
        clone(opts, cb);
      } else {
        cb();
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
    enquirer.ask(name).then(answer => {
      if (answer[this.name]) {
        app.build(this.name.replace('prompt-', ''), cb);
      } else {
        cb();
      }
    });
  });
};
