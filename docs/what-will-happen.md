**What will happen?**

Running `$ gen git` will run this generator's `default` task, which initializes a new git repository, git adds the files, and does a first commit with the message `first commit`.

When [generate][] is installed globally, you can run this generator with the `$ gen {%= alias %}` command, or use in your own generator as a plugin or sub-generator to make it a continuous part of the build workflow when scaffolding out a new project.
