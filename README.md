# grunt-handlebars-layout

> Parse HTML files as Handlebars templates using Handlebars layout.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-handlebars-layout --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-handlebars-layout');
```

## The "handlebars_layout" task

### Overview
In your project's Gruntfile, add a section named `handlebars_layout` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  handlebars_layout: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.basePath
Type: `String`
Default value: `process.cwd()`

Establish the base line for partials. For example, given this structure:

```
├── myproject
│   ├── partials
        └── layout.html
```

If your `Gruntfile` is along with `myproject` then a Partial will be 
registered with the following name: `myproject\partials\layout`. 

But if you want your partials to start from `partials` just provide a 
`basePath` of `myproject/partials` and a partial with just `layout` will be 
registered.

#### options.partials
Type: `String` or `Array`
Default value: `[]`

A string or an array of files (or globs) from which load partials

#### options.helpers
Type: `String` or `Array`
Default value: `[]`

A string or an array of files (or globs) from which load helpers

#### options.data
Type: `String`, `Object` or `Array`
Default value: `{}`

If you provide a String, it must be a path to a JSON or YAML file, from which
 load data to pass to Handlebars.
 
You can also pass a plain Object which will be used instead.

Finally, you can also pass an Array of paths which can include globs as well. Note that,
in the event of loading more than one data file, the data will be namespaced with the name of the file. For example. Given this two files being loaded, with the same data:

  `data/global.json`
  `data/mymodule.json`

  {
    'name' : 'My name'
  }
  
The data from `global` would be in `{{ global.name }}`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
