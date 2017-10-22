
"use strict";

module.exports = function (grunt) {

  grunt.initConfig({

    "convert-svg-to-png": {
      fallback: {
        options: {
          size: {w: 64, h:64}
        },
        files: [{
          expand: true,
          cwd: "test/svg",
          src: ["**/*.svg"],
          dest: "dist/test/64x64"
        }]
      },
      retina: {
        options: {
          size: {w: 128, h: 128}
        },
        files: [{
          expand: true,
          cwd: "test/svg",
          src: ["**/*.svg"],
          dest: "dist/test/128x128"
        }]
      }
    },

    mochaTest: {
      test: {
        src: "test/*.js"
      }
    },

    clean: {
      test: ["dist/test"]
    }

  });

  grunt.loadTasks("tasks");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask("default", ["clean", "convert-svg-to-png", "mochaTest", "clean"]);

};
