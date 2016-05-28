'use strict';

var utils = require('./utils');

module.exports = function(app, base) {
  if (!utils.isValid(app)) return;
  app.use(utils.questions());

  /**
   * Register `base-task-prompts`
   */

  var prompts = utils.prompts(app);

  /**
   * Initialize a git repository, including `git add` and first commit.
   *
   * ```sh
   * $ gen git:first-commit
   * ```
   * @name first-commit
   * @api public
   */

  app.task('first-commit', function(cb) {
    app.option(base.options);
    var cwd = app.options.dest || base.cwd;
    utils.firstCommit(cwd, 'first commit', function(err) {
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
