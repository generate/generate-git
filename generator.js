'use strict';

var utils = require('./utils');
var gitty = require('./');

module.exports = function(app, base, env) {
  app.task('default', function(cb) {
    gitInit(cb);
  });
};

function gitInit(cb) {
  var questions = new utils.Questions();
  questions.set('init', {
    message: 'Do you want to initialize a git repository?'
  });

  questions.ask('init', function(err, answer) {
    if (err) return cb(err);

    if (!truthy(answer.init)) {
      console.log(utils.chalk.cyan('skipping git init'));
      return cb();
    }
    init(cb);
  });
}

function init(cb) {
  var git = gitty(process.cwd());

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

function truthy(val) {
  return /^(y|yes|ok|true)$/i.test(String(val));
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
