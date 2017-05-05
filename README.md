<p align="center">

<a href="https://github.com/generate/generate">
<img height="150" width="150" src="https://raw.githubusercontent.com/generate/generate/master/docs/logo.png">
</a>
</p>

Generator for initializing a git repository and adding first commit.

# generate-git

[![NPM version](https://img.shields.io/npm/v/generate-git.svg?style=flat)](https://www.npmjs.com/package/generate-git) [![NPM monthly downloads](https://img.shields.io/npm/dm/generate-git.svg?style=flat)](https://npmjs.org/package/generate-git) [![Build Status](https://img.shields.io/travis/generate/generate-git.svg?style=flat)](https://travis-ci.org/generate/generate-git)

![generate-git demo](https://raw.githubusercontent.com/generate/generate-git/master/docs/demo.gif)

## Getting started

### Install

**Installing the CLI**

To run the `readme` generator from the command line, you'll need to install [Generate](https://github.com/generate/generate) globally first. You can do that now with the following command:

```sh
$ npm install --global generate
```

This adds the `gen` command to your system path, allowing it to be run from any directory.

**Install generate-git**

Install this module with the following command:

```sh
$ npm install --global generate-git
```

### CLI

Run this generator's `default` [task](https://github.com/generate/generate/blob/master/docs/tasks.md#default) with the following command:

```sh
$ gen readme
```

**What will happen?**

Running `$ gen git` will run this generator's `default` task, which initializes a new git repository, git adds the files, and does a first commit with the message `first commit`.

When [generate](https://github.com/generate/generate) is installed globally, you can run this generator with the `$ gen readme` command, or use in your own generator as a plugin or sub-generator to make it a continuous part of the build workflow when scaffolding out a new project.

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

## Tasks

### [default](generator.js#L38)

Initialize a git repository, including `git add` and first commit.

**Example**

```sh
$ gen git
```

### [first-commit](generator.js#L51)

Alias for the default task, to provide a semantic task name when using this generator as a plugin or sub-generator.

**Example**

```sh
$ gen git:first-commit
```

### [clone](generator.js#L80)

Alias for the default task, to provide a semantic task name when using this generator as a plugin or sub-generator.

**Example**

```sh
$ gen git:clone
$ gen git:git-clone # aliased for API usage
```

### [updater:prompt-git](generator.js#L111)

Prompts the user to confirm if they'd like to initialize a git repository with first [first-commit](#first-commit).

**Example**

```sh
$ gen updater:prompt-git
```

## Next steps

### Running unit tests

It's never too early to begin running unit tests. When you're ready to get started, the following command will ensure the project's dependencies are installed then run all of the unit tests:

```sh
$ npm install && test
```

### Publishing your generator

If you're tests are passing and you're ready to publish your generator to [npm](https://www.npmjs.com), you can do that now with the following command:

**Are you sure you're ready?!**

Let's go!

```sh
$ npm publish
```

## About

### What is "Generate"?

Generate is a command line tool and developer framework for scaffolding out new GitHub projects using [generators](https://github.com/generate/generate/blob/master/docs/generators.md) and [tasks](https://github.com/generate/generate/blob/master/docs/tasks.md).

Answers to prompts and the user's environment can be used to determine the templates, directories, files and contents to build. Support for [gulp](http://gulpjs.com), [base](https://github.com/node-base/base) and [assemble](https://github.com/assemble/assemble) plugins, and much more.

**For more information**:

* Visit the [generate project](https://github.com/generate/generate/)
* Visit the [generate documentation](https://github.com/generate/generate/blob/master/docs/)
* Find [generators on npm](https://www.npmjs.com/browse/keyword/generate-generator) (help us [author generators](https://github.com/generate/generate/blob/master/docs/micro-generators.md))

### Related projects

* [generate-license](https://www.npmjs.com/package/generate-license): Generate a license file for a GitHub project. | [homepage](https://github.com/generate/generate-license "Generate a license file for a GitHub project.")
* [generate-mocha](https://www.npmjs.com/package/generate-mocha): Generate mocha test files. | [homepage](https://github.com/generate/generate-mocha "Generate mocha test files.")
* [generate](https://www.npmjs.com/package/generate): Command line tool and developer framework for scaffolding out new GitHub projects. Generate offers the… [more](https://github.com/generate/generate) | [homepage](https://github.com/generate/generate "Command line tool and developer framework for scaffolding out new GitHub projects. Generate offers the robustness and configurability of Yeoman, the expressiveness and simplicity of Slush, and more powerful flow control and composability than either.")

### Community

Are you using [Generate](https://github.com/generate/generate) in your project? Have you published a [generator](https://github.com/generate/generate/blob/master/docs/generators.md) and want to share your project with the world?

Here are some suggestions!

* If you get like Generate and want to tweet about it, please feel free to mention `@generatejs` or use the `#generatejs` hashtag
* Show your love by starring [Generate](https://github.com/generate/generate) and `generate-git`
* Get implementation help on [StackOverflow](http://stackoverflow.com/questions/tagged/generate) (please use the `generatejs` tag in questions)
* **Gitter** Discuss Generate with us on [Gitter](https://gitter.im/generate/generate)
* If you publish an generator, thank you! To make your project as discoverable as possible, please add the keyword `generategenerator` to package.json.

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on May 05, 2017._