/*
 * grunt-handlebars-layout
 * https://github.com/firstandthird/grunt-handlebars-layout
 *
 * Copyright (c) 2014 Antonio Laguna
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    handlebars_layout: {
      options : {
        basePath: 'test/fixtures/',
        partials: [
          'test/fixtures/partials/*.html'
        ],
        helpers: 'test/fixtures/helpers/*.js'
      },

      yaml: {
        options: {
          data: 'test/fixtures/data/input.yaml'
        },
        files: {
          'tmp/yaml': 'test/fixtures/yaml.html'
        }
      },
      json: {
        options: {
          data: 'test/fixtures/data/input.json'
        },
        files: {
          'tmp/json': 'test/fixtures/json.html'
        }
      },
      data: {
        options: {
          data: {
            title: 'Data generated'
          }
        },
        files: {
          'tmp/data': 'test/fixtures/data.html'
        }
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['handlebars_layout', 'nodeunit', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
