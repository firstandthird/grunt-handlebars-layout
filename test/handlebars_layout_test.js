'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.handlebars_layout = {
  yaml: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/yaml');
    var expected = grunt.file.read('test/expected/yaml');
    test.equal(actual, expected, 'Should be able to parse data from YAML');

    test.done();
  },
  json: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/json');
    var expected = grunt.file.read('test/expected/json');
    test.equal(actual, expected, 'Should be able to parse data from JSON');

    test.done();
  },

  data: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/data');
    var expected = grunt.file.read('test/expected/data');
    test.equal(actual, expected, 'Should be able to parse data from a custom object');

    test.done();
  },
};
