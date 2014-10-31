/*
 * grunt-handlebars-layout
 * https://github.com/firstandthird/grunt-handlebars-layout
 *
 * Copyright (c) 2014 First + Third
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('handlebars_layout', 'Parse HTML files as Handlebars templates using Handlebars layout.', function() {
    var Handlebars = require('handlebars');

    require('handlebars-layouts')(Handlebars);

    var options = this.options({
      basePath: process.cwd(),
      helpers: [],
      partials: [],
      data: {}
    });

    // Normalizing basePath. Checking if it's correct and if it's not, falling
    // back to CWD again
    if (!grunt.file.isDir(options.basePath)) {
      grunt.log.writeln('Current basePath of "' + options.basePath + '" is not a dir. Falling back to CWD');
      options.basePath = process.cwd();
    }

    // Collecting partials
    if (options.partials.length) {
      var partials = grunt.file.expand({ filter: 'isFile' } ,options.partials);

      if (partials) {
        partials.forEach(function (partial) {
          var partialName = partial.replace(options.basePath, '').split('.').shift();
          grunt.verbose.writeln('Registering partial with name ' + partialName);
          Handlebars.registerPartial(
            partialName, grunt.file.read(partial));
        });
      }
    }

    // Reading data
    if (grunt.util.kindOf(options.data) === 'string') { // We assume it's a path
      var method = options.data.indexOf('.json') > -1 ? 'readJSON' : 'readYAML';

      try {
        if (grunt.file.exists(options.data)) {
          options.data = grunt.file[method](options.data);
        }
        else {
          throw new Error();
        }
      }
      catch (e){
        grunt.fatal('Couldn\'t find the specified file to parse data from');
      }
    }

    // Adding custom helpers
    if (options.helpers.length) {
      var helpers = grunt.file.expand({ filter: 'isFile' }, options.helpers);

      if (helpers) {
        helpers.forEach(function (helper) {
          var helperName = helper.split('/').pop().split('.').shift();

          Handlebars.registerHelper(helperName, require('../' + helper));
        });
      }
    }

    // Finally compiling
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return Handlebars.compile(grunt.file.read(filepath))(options.data);
      }).join(grunt.util.normalizelf('\n'));

      grunt.file.write(f.dest, src);

      grunt.log.ok('File "' + f.dest + '" created.');
    });
  });

};
