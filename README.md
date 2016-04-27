## CLI

Run the `git` generator from the command line:

```sh
$ gen git
```

## Tasks

### [first-commit](generator.js#L21)
Initialize a git repository, including `git add` and first commit.

**Example**

```sh
$ gen git:fc
# or
$ gen git:first-commit
```

### [git](generator.js#L43)
Prompt the user to initialize a git repository and create a first commit. Runs the [first-commit](#first-commit) task.

**Example**

```sh
$ gen node:prompt-git
```

### [default](generator.js#L58)
Alias for the `first-commit` task to allow running the generator with the following command (using aliases like this makes it easy for other generators to call a specific task on this generator):

**Example**

```sh
$ gen git
```

## API

Install locally with the following command: `npm install generate-git --save`.

Then use in your project:

```js
var git = require('generate-git');
```

**Use as a plugin**

In your [generate][] project:

```js
var generate = require('generate');
var app = generate();

app.use(git());
```

**Use as a generator plugin**

In your [generate][] generator:

```js
module.exports = function(app) {
  app.use(git());
};
```

**Use as a sub-generator**

In your [generate][] generator:

```js
module.exports = function(app) {
  // name the sub-generator whatever you want
  app.register('foo', require('generate-git'));
};
```
