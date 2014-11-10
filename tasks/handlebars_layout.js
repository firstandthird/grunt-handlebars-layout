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

    var getFileName = function (filePath) {
      return filePath.split('/').pop().split('.').shift();
    };

    var readAndParseFile = function (filePath) {
      var method = filePath.indexOf('.json') > -1 ? 'readJSON' : 'readYAML';
      var result = {};

      if (grunt.file.exists(filePath)) {
        result = grunt.file[method](filePath);
      }

      return result;
    };

    var HandlebarsData = {};

    // Normalizing basePath. Checking if it's correct and if it's not, falling
    // back to CWD again
    if (!grunt.file.isDir(options.basePath)) {
      grunt.log.writeln('Current basePath of "' + options.basePath + '" is not a dir. Falling back to CWD');
      options.basePath = process.cwd();
    }

    // Collecting partials
    if (options.partials.length) {
      var partials = grunt.file.expand({ filter: 'isFile' } ,options.partials);

      if (partials.length) {
        partials.forEach(function (partial) {
          var partialName = partial.replace(options.basePath, '').split('.').shift();
          grunt.verbose.writeln('Registering partial with name ' + partialName);
          Handlebars.registerPartial(
            partialName, grunt.file.read(partial));
        });
      }
    }

    // Reading data
    if (Array.isArray(options.data) || grunt.util.kindOf(options.data) === 'string') {
      var dataFiles = grunt.file.expand({ filter: 'isFile' }, options.data);
      
      if (dataFiles.length) {
        if (dataFiles.length > 1) {
          dataFiles.forEach(function(file){
            HandlebarsData[getFileName(file)] = readAndParseFile(file);
          });
        }
        else {
          HandlebarsData = readAndParseFile(dataFiles[0]);
        }
      }
    }
    else if (options.data) {
      HandlebarsData = options.data;
    }

    // Adding custom helpers
    if (options.helpers.length) {
      var helpers = grunt.file.expand({ filter: 'isFile' }, options.helpers);

      if (helpers.length) {
        helpers.forEach(function (helper) {
          Handlebars.registerHelper(getFileName(helper), require('../' + helper));
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
        return Handlebars.compile(grunt.file.read(filepath))(HandlebarsData);
      }).join(grunt.util.normalizelf('\n'));

      grunt.file.write(f.dest, src);

      grunt.log.ok('File "' + f.dest + '" created.');
    });
  });

};
