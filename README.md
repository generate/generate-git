# generate-git [![NPM version](https://img.shields.io/npm/v/generate-git.svg?style=flat)](https://www.npmjs.com/package/generate-git) [![NPM downloads](https://img.shields.io/npm/dm/generate-git.svg?style=flat)](https://npmjs.org/package/generate-git) [![Build Status](https://img.shields.io/travis/generate/generate-git.svg?style=flat)](https://travis-ci.org/generate/generate-git)

When scaffolding out a new project, this generator simply automates a `git` first commit, making it a continuous part of the build workflow.

Run this generator with the `gen git` command, or use in your own generator as a plugin or sub-generator.

## What is generate?

Generate is a new, open source developer framework for rapidly initializing and scaffolding out new code projects, offering an intuitive CLI, and a powerful and expressive API that makes it easy and enjoyable to use.

Visit the [getting started guide](https://github.com/generate/getting-started) or the [generate](https://github.com/generate/generate) project and documentation to learn more.

## Quickstart

### CLI usage

Install globally with [npm](https://www.npmjs.com/):

```sh
$ npm install --global generate-git
```

You should now be able to run this generator's [default task](#default) with the `gen git` command. See all avallable [tasks](#tasks)

### API usage

**Use as a plugin**

Extend your own generator with the settings and features of generate-git:

```js
module.exports = function(app) {
  app.use(require('generate-git'));
};
```

**Use as a sub-generator**

Add this generator to a namespace in your generator:

```js
module.exports = function(app) {
  // you can use any arbitrary name to register the generator
  app.register('git', require('generate-git'));
};
```

See the [API docs](#api) for more detailed examples and descriptions.

## CLI

**Installing the CLI**

To run the `git` generator from the command line, you'll need to install [generate](https://github.com/generate/generate) globally first. You can do that now with the following command:

```sh
$ npm i -g generate
```

This adds the `gen` command to your system path, allowing it to be run from any directory.

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

## Tasks

The following tasks are registered on the `git` generator.

#### [git:gitattributes](generator.js#L22)

Generate a `.gitattributes` file. You can override the default template by adding a custom template at the following path `~/templates/_gitattributes` (in user home).

**Example**

```sh
$ gen git:gitattributes
```

#### [git:gitignore](generator.js#L35)

Generate a `.gitignore` file. You can override the default template by adding a custom template at the following path: `~/templates/_gitignore` (in user home).

**Example**

```sh
$ gen git:gitignore
```

#### [git:first-commit](generator.js#L59)

Initialize a git repository, including `git add` and first commit.

**Example**

```sh
$ gen git:first-commit
```

#### [git:prompt-git](generator.js#L85)

Prompt the user to initialize a git repository and create a first commit, runs the [first-commit](#first-commit) task if specified by the user.

**Example**

```sh
$ gen git:prompt-git
```

#### [default](generator.js#L99)

Alias for the `git:first-commit` task to allow running the generator with the following command:

**Example**

```sh
$ gen git
```

## API

This updater can also be used as a node.js library in your own updater. To do so you must first install generate-git locally.

**Install**

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save generate-git
```

**Use as a plugin in your generator**

Use as a plugin if you want to extend your own generator with the features, settings and tasks of generate-git, as if they were created on your generator.

In your `generator.js`:

```js
module.exports = function(app) {
  app.use(require('generate-git'));

  // specify any tasks from generate-git. Example:
  app.task('default', ['git']);
};
```

**Use as a sub-generator**

Use as a sub-generator if you want expose the features, settings and tasks from generate-git on a _namespace_ in your generator.

In your `generator.js`:

```js
module.exports = function(app) {
  // register the generate-git generator (as a sub-generator with an arbitrary name)
  app.register('foo', require('generate-git'));

  app.task('minify', function(cb) {
    // minify some stuff
    cb();
  });

  // run the "default" task on generate-git (aliased as `foo`), 
  // then run the `minify` task defined in our generator
  app.task('default', function(cb) {
    app.generate(['foo:default', 'minify'], cb);
  });
};
```

Tasks from `generate-git` will be available on the `foo` namespace from the API and the command line. Continuing with the previous code example, to run the `default` task on `generate-git`, you would run `gen foo:default` (or just `gen foo` if `foo` does not conflict with an existing task on your generator).

To learn more about namespaces and sub-generators, and how they work, [visit the getting started guide](https://github.com/generate/getting-started).

## Related projects

You might also be interested in these projects:

* [generate](https://www.npmjs.com/package/generate): The Santa Claus machine for GitHub projects. Scaffolds out new projects, or creates any kind… [more](https://github.com/generate/generate) | [homepage](https://github.com/generate/generate "The Santa Claus machine for GitHub projects. Scaffolds out new projects, or creates any kind of required file or document from any given templates or source materials.")
* [generate-license](https://www.npmjs.com/package/generate-license): Generate a license file for a GitHub project. | [homepage](https://github.com/generate/generate-license "Generate a license file for a GitHub project.")
* [generate-mocha](https://www.npmjs.com/package/generate-mocha): Generate mocha test files. | [homepage](https://github.com/generate/generate-mocha "Generate mocha test files.")

## Contributing

This document was generated by [verb-readme-generator](https://github.com/verbose/verb-readme-generator) (a [verb](https://github.com/verbose/verb) generator), please don't edit directly. Any changes to the readme must be made in [.verb.md](.verb.md). See [Building Docs](#building-docs).

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new). Or visit the [verb-readme-generator](https://github.com/verbose/verb-readme-generator) project to submit bug reports or pull requests for the readme layout template.

## Building docs

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

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on June 21, 2016._