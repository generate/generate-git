'use strict';

var path = require('path');
var utils = require('./utils');

module.exports = function(app, base) {
  if (!utils.isValid(app, 'generate-git')) return;

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
   * @name gitattributes
   * @api public
   */

  app.use(require('generate-gitattributes'));

  /**
   * Generate a `.gitignore` file. You can override the default template by adding
   * a custom template at the following path: `~/templates/_gitignore` (in user home).
   *
   * ```sh
   * $ gen git:gitignore
   * ```
   * @name gitignore
   * @api public
   */

  app.use(require('generate-gitignore'));

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

  app.task('first-commit', function(next) {
    if (utils.exists(path.resolve(app.cwd, '.git'))) {
      app.log.warn('.git exists, skipping');
      next();
      return;
    }

    utils.firstCommit(app.cwd, 'first commit', function(err) {
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
   * @name prompt-git
   * @api public
   */

  app.confirm('git', 'Want to initialize a git repository?');
  app.task('prompt-git', {silent: true}, prompts.confirm('git', ['first-commit']));
};
