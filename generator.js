'use strict';

var path = require('path');
var utils = require('./utils');

module.exports = function(app, base) {
  if (!utils.isValid(app, 'generate-git')) return;
  var templates = path.resolve.bind(path, __dirname, 'templates');

  /**
   * Load `base-task-prompts`
   */

  var prompts = utils.prompts(app);

  /**
   * Generate a `.gitattributes` file. You can override the default template by adding
   * a custom template at the following path `~/templates/_gitattributes` (in user home).
   *
   * ```sh
   * $ gen git:gitattributes
   * ```
   * @name git:gitattributes
   * @api public
   */

  app.task('gitattributes', function(cb) {
    var dest = app.option('dest') || app.cwd;
    app.template(templates('_gitattributes'));
    return app.toStream('templates', pickFile(app, '.gitattributes'))
      .pipe(app.conflicts(dest))
      .pipe(app.dest(dest));
  });

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

  app.task('gitignore', function(cb) {
    var dest = app.option('dest') || app.cwd;
    app.template(templates('_gitignore'));
    return app.toStream('templates', pickFile(app, '.gitignore'))
      .pipe(app.conflicts(dest))
      .pipe(app.dest(dest));
  });

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
      next();
      return;
    }

    utils.firstCommit(dest, 'first commit', function(err) {
      if (err && !/Command failed/.test(err.message)) {
        next(err);
      } else {
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

/**
 * Pick the file to render. If the user specifies a `--file`, use that,
 * otherwise use the default `$package.json` template
 */

function pickFile(app, fallback) {
  return function(key, file) {
    return file.stem === (app.option('file') || fallback);
  };
}
