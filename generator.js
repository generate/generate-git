'use strict';

var utils = require('./utils');

module.exports = function(app) {
  var prompts = utils.prompts(app);

  app.task('git', function(cb) {
    utils.firstCommit(app.cwd, 'first commit', function(err) {
      if (err && !/Command failed/.test(err.message)) {
        cb(err);
      } else {
        cb();
      }
    });
  });

  app.confirm('git', 'Want to initialize a git repository?');
  app.task('ask', prompts.confirm('git', ['git']));
  app.task('default', ['git']);
};
