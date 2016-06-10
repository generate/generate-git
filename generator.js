'use strict';

var path = require('path');
var utils = require('./utils');

module.exports = function(app, base) {
  if (!utils.isValid(app, 'generate-git')) return;
  var cwd = path.resolve.bind(path, app.options.dest || app.cwd);

  /**
   * Load `base-task-prompts`
   */

  var prompts = utils.prompts(app);

  /**
   * Initialize a git repository, including `git add` and first commit.
   *
   * ```sh
   * $ gen git:first-commit
   * ```
   * @name git:first-commit
   * @api public
   */

  app.task('first-commit', function(next) {
    if (utils.exists(cwd('.git'))) {
      next();
      return;
    }

    utils.firstCommit(cwd(), 'first commit', function(err) {
      if (err && !/Command failed/.test(err.message)) {
        next(err);
      } else {
        next();
      }
    });
  });

  /**
   * Prompt the user to initialize a git repository and create a first commit,
   * conditionally runs the [first-commit](#first-commit) task if specified
   * by the user.
   *
   * ```sh
   * $ gen git:prompt-git
   * ```
   * @name git:prompt-git
   * @api public
   */

  app.confirm('git', 'Want to initialize a git repository?');
  app.task('prompt-git', prompts.confirm('git', ['first-commit']));

  /**
   * Alias for the `git:first-commit` task to allow running the generator
   * with the following command:
   *
   * ```sh
   * $ gen git
   * ```
   * @name default
   * @api public
   */

  app.task('default', ['first-commit']);
};
