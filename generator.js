'use strict';

var utils = require('./utils');
var gitInit = require('./git');

module.exports = function(app) {
  app.task('git', function(cb) {
    firstCommit(cb);
  });

  app.task('ask', function(cb) {
    app.question('git', 'Do you want to create a git repository?', {
      type: 'confirm',
      save: false
    });

    app.ask('git', function(err, answers) {
      if (err) return cb(err);
      if (answers.git === true) {
        firstCommit(cb);
      } else {
        utils.log.info('skipping first commit');
        cb();
      }
    });
  });

  app.task('default', ['git']);
};

function firstCommit(cb) {
  var git = gitInit(process.cwd());

  git.on('exists', function(msg) {
    warn('.git/', utils.chalk.yellow(msg));
  });

  git.on('init', function(msg) {
    ok('.git/', msg);
  });

  git.on('add', function(files) {
    ok('added files:', '\n- ' + files.join('\n- '));
  });

  git.on('commit', function(data) {
    ok('commit message:', data);
  });

  git.quickstart(function(err, exists) {
    if (err) return cb(err);
    if (exists) {
      warn('already exists.');
    } else {
      ok('done!');
    }
    cb();
  });
}

function warn(msg) {
  var args = [].slice.call(arguments);
  args.unshift(' ' + utils.chalk.yellow(utils.warning) + ' ');
  return console.log.apply(console, args);
}

function ok(msg) {
  var args = [].slice.call(arguments);
  args.unshift(' ' + utils.chalk.green(utils.success) + ' ');
  return console.log.apply(console, args);
}
