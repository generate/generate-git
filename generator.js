'use strict';

var utils = require('./utils');

module.exports = function(app, base) {
  if (utils.isRegistered(app, 'git')) return;
  var prompts = utils.prompts(app);

  if (typeof app.ask === 'undefined') {
    throw new Error('expected the base-questions plugin to be registered');
  }

  /**
   * Initialize a git repository, including `git add` and first commit.
   *
   * ```sh
   * $ gen git:fc
   * # or
   * $ gen git:first-commit
   * ```
   * @name first-commit
   * @api public
   */

  app.task('first-commit', { silent: true }, ['fc']);
  app.task('fc', function(cb) {
    app.option(base.options);
    var dest = app.option('dest') || app.cwd;
    utils.firstCommit(dest, 'first commit', function(err) {
      if (err && !/Command failed/.test(err.message)) {
        cb(err);
      } else {
        cb();
      }
    });
  });

  /**
   * Prompt the user to initialize a git repository and create a first commit.
   * Runs the [first-commit](#first-commit) task.
   *
   * ```sh
   * $ gen node:prompt-git
   * ```
   * @name git
   * @api public
   */

  app.confirm('git', 'Want to initialize a git repository?');
  app.task('prompt-git', prompts.confirm('git', ['first-commit']));

  /**
   * Alias for the `first-commit` task to allow running the generator
   * with the following command (using aliases like this makes it easy for
   * other generators to call a specific task on this generator):
   *
   * ```sh
   * $ gen git
   * ```
   * @name default
   * @api public
   */

  app.task('default', ['first-commit']);
};
