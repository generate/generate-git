# generate-git [![NPM version](https://img.shields.io/npm/v/generate-git.svg?style=flat)](https://www.npmjs.com/package/generate-git) [![NPM downloads](https://img.shields.io/npm/dm/generate-git.svg?style=flat)](https://npmjs.org/package/generate-git) [![Build Status](https://img.shields.io/travis/generate/generate-git.svg?style=flat)](https://travis-ci.org/generate/generate-git)

Generator for initializing a git repository and adding first commit.

## What is generate?

Generate is a command line tool and developer framework for scaffolding out new GitHub projects using [generators](https://github.com/generate/generate/blob/master/docs/){generators.md} and [tasks](https://github.com/generate/generate/blob/master/docs/){tasks.md}. Answers to prompts and the user's environment can be used to determine the templates, directories, files and contents to build. Support for [gulp](http://gulpjs.com), [base](https://github.com/node-base/base) and [assemble](https://github.com/assemble/assemble) plugins, and much more.

For more information about Generate:

* Visit the [generate project](https://github.com/generate/generate)
* Visit the [generate documentation](https://github.com/generate/generate/blob/master/docs/)
* Find [generators on npm](https://www.npmjs.com/browse/keyword/generate-generator) (help us [author generators](https://github.com/generate/generate/blob/master/docs/){micro-generators.md})

**Example**

Templates are [customizable](#customization) and can be overridden.

![generate-git demo](https://raw.githubusercontent.com/generate/generate-git/master/docs/demo.gif)

<br>
<br>

## What is "Generate"?

Generate is a command line tool and developer framework for scaffolding out new GitHub projects using [generators](https://github.com/generate/generate/blob/master/docs/){generators.md} and [tasks](https://github.com/generate/generate/blob/master/docs/){tasks.md}. Answers to prompts and the user's environment can be used to determine the templates, directories, files and contents to build. Support for [gulp](http://gulpjs.com), [base](https://github.com/node-base/base) and [assemble](https://github.com/assemble/assemble) plugins, and much more.

For more information about Generate:

* Visit the [generate project](https://github.com/generate/generate)
* Visit the [generate documentation](https://github.com/generate/generate/blob/master/docs/)
* Find [generators on npm](https://www.npmjs.com/browse/keyword/generate-generator) (help us [author generators](https://github.com/generate/generate/blob/master/docs/){micro-generators.md})

<br>
<br>

## Command line usage

### Install globally

**Installing the CLI**

To run the `git` generator from the command line, you'll need to install [generate](https://github.com/generate/generate) globally first. You can do that now with the following command:

```sh
$ npm install --global generate
```

This adds the `gen` command to your system path, allowing it to be run from any directory.

**Install generate-git**

You may now install this module with the following command:

```sh
$ npm install --global generate-git
```

### Running generate-git

You should now be able to run `generate-git` with the following command:

```sh
$ gen git
```

**What will happen?**

Running `$ gen git` will run this generator's `default` task, which initializes a new git repository, git adds the files, and does a first commit with the message `first commit`.

When [generate](https://github.com/generate/generate) is installed globally, you can run this generator with the `$ gen git` command, or use in your own generator as a plugin or sub-generator to make it a continuous part of the build workflow when scaffolding out a new project.

**What you should see in the terminal**

If completed successfully, you should see both `starting` and `finished` events in the terminal, like the following:

```sh
[00:44:21] starting ...
...
[00:44:22] finished ✔
```

If you do not see one or both of those events, please [let us know about it](../../issues).

### Help

To see a general help menu and available commands for Generate's CLI, run:

```sh
$ gen help
```

## Running multiple generators

[generate](https://github.com/generate/generate) supports running multiple generators at once. Here is an example of a generator that works well with `generate-git`.

### generate-dest

Run [generate-dest](https://github.com/generate/generate-dest) **before** this generator to prompt for the destination directory to use for generated files.

**Example**

![generate-git generate-dest example](https://raw.githubusercontent.com/generate/generate-git/master/docs/demo-dest.gif)

## API usage

Use `generate-git` as a [plugin](https://github.com/generate/generate/blob/master/docs/){plugins.md} in your own [generator](https://github.com/generate/generate/blob/master/docs/){generators.md}.

### Install locally

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save generate-git
```

### Register as a plugin

Inside your own [generator](https://github.com/generate/generate/blob/master/docs/){generators.md}:

```js
module.exports = function(app) {
  // register generate-git as a plugin to add the git
  // task to your own generator
  app.use(require('generate-git'));
};
```

### Run tasks

Programmatically run tasks from `generate-git`.

```js
module.exports = function(app) {
  // adds the `git` task to your generator
  app.use(require('generate-git'));

  // run the `git` task
  app.task('default', 'git');
};
```

Visit the [generator docs](https://github.com/generate/generate/blob/master/docs/){generators.md} to learn more about creating, installing, using and publishing generators.

<br>
<br>

## Customization

The following instructions can be used to override settings in `generate-git`. Visit the [Generate documentation](https://github.com/generate/generate/blob/master/docs/){overriding-defaults.md} to learn about other ways to override defaults.

### Destination directory

To customize the destination directory, install [generate-dest](https://github.com/generate/generate-dest) globally, then in the command line prefix `dest` before any other generator names.

For example, the following will prompt you for the destination path to use, then pass the result to `generate-git`:

```sh
$ gen dest git
```

### Overriding templates

You can override a template by adding a template of the same name to the `templates` directory in user home. For example, to override the `.gitattributes` template, add a template at the following path `~/generate/generate-git/templates/.gitattributes`, where `~/` is the user-home directory that `os.homedir()` resolves to on your system.

## CLI

**Help**

Get general help and a menu of available commands:

```sh
$ gen help
```

**Running the `git` generator**

Once both [generate](https://github.com/generate/generate) and `generate-git` are installed globally, you can run the generator with the following command:

```sh
$ gen git
```

If completed successfully, you should see both `starting` and `finished` events in the terminal, like the following:

```sh
[00:44:21] starting ...
...
[00:44:22] finished ✔
```

If you do not see one or both of those events, please [let us know about it](../../issues).

## API

### Install locally

If you want to use `generate-git` as a plugin or sub-generator to extend the features and settings in your own generator, you must first install it locally:

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save generate-git
```

### Use as a plugin

Use as a [plugin](https://github.com/generate/generate/blob/master/docs/plugins.md) if you want to extend your own generator with the features, settings and tasks of `generate-git`, as if they were created on your generator:

```js
module.exports = function(app) {
  app.use(require('generate-git'));
};
```

Visit Generate's [plugin docs](https://github.com/generate/generate/blob/master/docs/plugins.md) to learn more about plugins.

### Use as a sub-generator

Use as a [sub-generator](https://github.com/generate/generate/blob/master/docs/generators.md) if you want to add `generate-git` to a  _namespace_ in your generator:

```js
module.exports = function(app) {
  // register the generate-git with whatever name you want
  app.register('foo', require('generate-git'));
};
```

Visit Generate's [sub-generator docs](https://github.com/generate/generate/blob/master/docs/sub-generators.md) to learn more about sub-generators.

## Related projects

You might also be interested in these projects:

* [generate](https://www.npmjs.com/package/generate): Generate is a command line tool and developer framework for scaffolding out new GitHub projects… [more](https://github.com/generate/generate) | [homepage](https://github.com/generate/generate "Generate is a command line tool and developer framework for scaffolding out new GitHub projects. Generators are easy to create and combine. Answers to prompts and the user's environment can be used to determine the templates, directories, files and contents to build. Support for gulp, assemble and Base plugins.")
* [generate-license](https://www.npmjs.com/package/generate-license): Generate a license file for a GitHub project. | [homepage](https://github.com/generate/generate-license "Generate a license file for a GitHub project.")
* [generate-mocha](https://www.npmjs.com/package/generate-mocha): Generate mocha test files. | [homepage](https://github.com/generate/generate-mocha "Generate mocha test files.")

## Contributing

This document was generated by [verb-readme-generator](https://github.com/verbose/verb-readme-generator) (a [verb](https://github.com/verbose/verb) generator), please don't edit directly. Any changes to the readme must be made in [.verb.md](.verb.md). See [Building Docs](#building-docs).

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Or visit the [verb-readme-generator](https://github.com/verbose/verb-readme-generator) project to submit bug reports or pull requests for the readme layout template.

## Building docs

_(This document was generated by [verb-readme-generator](https://github.com/verbose/verb-readme-generator) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-readme-generator && verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/generate/generate-git/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on July 09, 2016._