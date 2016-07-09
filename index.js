'use strict';

var path = require('path');
var utils = require('./utils');

module.exports = function(app, base) {
  if (!utils.isValid(app, 'generate-git')) return;

  /**
   * Plugins
   */

  app.use(require('generate-gitattributes'));
  app.use(require('generate-gitignore'));

  /**
   * Load `base-task-prompts`
   */

  var prompts = utils.prompts(app);

  /**
   * Generate a `.gitattributes` file. You can override the default template by adding
   * a custom template at the following path `~/templates/_gitattributes` (in user home).
   * See the [git documentation](https://git-scm.com/docs/gitattributes) for `.gitattributes` files.
   *
   * ```sh
   * $ gen git:gitattributes
   * ```
   * @name git:gitattributes
   * @api public
   */

  /**
   * Generate a `.gitignore` file. You can override the default template by adding
   * a custom template at the following path: `~/templates/_gitignore` (in user home).
   *
   * ```sh
   * $ gen git:gitignore
   * ```
   * @name git:gitignore
   * @api public
   */

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
    var dest = app.option('dest') || app.cwd;
    if (utils.exists(path.resolve(dest, '.git'))) {
      app.log.warn('.git exists, skipping');
      next();
      return;
    }

    utils.firstCommit(dest, 'first commit', function(err) {
      if (err && !/Command failed/.test(err.message)) {
        next(err);
      } else {
        app.log.success('first commit');
        next();
      }
    });
  });

  /**
   * Prompt the user to initialize a git repository and create a first commit,
   * runs the [first-commit](#first-commit) task if specified by the user.
   *
   * ```sh
   * $ gen git:prompt-git
   * ```
   * @name git:prompt-git
   * @api public
   */

  app.confirm('git', 'Want to initialize a git repository?');
  app.task('prompt-git', {silent: true}, prompts.confirm('git', ['first-commit']));

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

  app.task('default', {silent: true}, ['first-commit']);
};
