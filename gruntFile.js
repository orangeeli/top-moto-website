((module)=>{
  "use strict";

  module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    // grunt.loadNpmTasks('grunt-contrib-sass');
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['sass']);
    grunt.registerTask('sass', ['sass']);
    grunt.registerTask('browserify', ['browserify']);

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      browserify: {
        bundle1: {
          src: 'js/app.js',
          dest: 'js/app-bundle.js'
        }
      },
      sass: {
        options: {
          sourceMap: true,
          outputStyle: 'compressed'
        },
        dist: {
          files: {
            'www/css/app.css': 'app/css/app.scss'
          }
        }
      }
      // ,
      // watch: {
      //   files: 'js/*',
      //   tasks: ['default']
      // }
    });
  };


})(module);

