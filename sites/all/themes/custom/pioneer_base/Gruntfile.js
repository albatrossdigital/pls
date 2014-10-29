'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var globalConfig = {
    theme_css: 'css',
    theme_scss: 'sass',
    theme_compass: false,
    theme_dist: 'nested'
  };

  var sassFiles = {
    '<%= globalConfig.theme_css %>/ckeditor.css': '<%= globalConfig.theme_scss %>/ckeditor.<%= globalConfig.theme_scss %>',
    '<%= globalConfig.theme_css %>/pioneer-base.css': '<%= globalConfig.theme_scss %>/custom.<%= globalConfig.theme_scss %>',
    '<%= globalConfig.theme_css %>/custom-foundation.css': '<%= globalConfig.theme_scss %>/custom-foundation.<%= globalConfig.theme_scss %>',
    '<%= globalConfig.theme_css %>/custom-owwl.css': '<%= globalConfig.theme_scss %>/custom-owwl.<%= globalConfig.theme_scss %>',
    '<%= globalConfig.theme_css %>/ie.css': '<%= globalConfig.theme_scss %>/ie.<%= globalConfig.theme_scss %>',
    '<%= globalConfig.theme_css %>/ie10.css': '<%= globalConfig.theme_scss %>/ie10.<%= globalConfig.theme_scss %>'
  };

  grunt.initConfig({
    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('package.json'),

    'node-inspector': {
      dev: {}
    },

    // Lib-sass
    sass: {
      dev: {
        options: {
          outputStyle: 'nested', // expanded or nested or compact or compressed
          includePaths: ['<%= globalConfig.theme_scss %>'],
          imagePath: '../images/unminified'
        },
        files: sassFiles
      },
      dist: {
        options: {
          outputStyle: 'compressed', // expanded or nested or compact or compressed
          includePaths: ['<%= globalConfig.theme_scss %>'],
          imagePath: '../images'
        },
        files: sassFiles
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: ['<%= globalConfig.theme_scss %>/{,**/}*.s*ss'],
        tasks: ['sass:dev']
      },
      coffee: {
        files: ['js/{,**/}*.coffee'],
        tasks: ['coffee']
      },
      js: {
        files: [
          'js/{,**/}*.js',
          '!js/{,**/}*.min.js'
        ],
        tasks: [
          'jshint',
        ]
      },
      livereload: {
        files: ['js/{,**/}*.js', '<%= globalConfig.theme_css %>/{,**/}*.css', 'images/{,**/}.{jpg,gif,svg,jpeg,png}'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'js/{,**/}*.js',
        '!js/{,**/}*.min.js',
        '!js/{,**/}foundatio*.js',
        '!js/behavior/{,**/}*.js',
        '!js/foundation/{,**/}*.js',
        '!js/vendor/{,**/}*.js'
      ]
    },
    coffeelint: {
      all: ['js/{,*/}*.coffee']
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: 'js',
          src: '{,*/}*.coffee',
          dest: 'js',
          ext: '.js'
        }]
      }
    },
    imagemin: {
      options: {                      
        optimizationLevel: 3
      },
      dynamic: {                         
        files: [{
          expand: true,                  
          cwd: 'images/unminified/',     
          src: ['**/*.{jpg,gif,svg,jpeg,png}'],       
          dest: 'images/'                
        }]
      }
    },
    uglify: {
      foundation: {
        options: {
          preserveComments: 'some',
          mangle: false
        },
        files: [{
          expand: true,
          cwd: 'js/foundation',
          src: '**/*.js',
          dest: 'js/foundation',
          ext: '.min.js'
        }]
      }
    },
    stripmq: {
      options: {
        stripBase: true,
        minWidth: 40,
        maxWidth: 1280
      },
      files: {
        src: [
          'css/custom-foundation.css',
          'css/custom.css',
        ],
        dest: 'css/ie-mq.css'
      },
    }
  });

  // Runs sass, sets vars
  grunt.registerTask('compile-sass', ['sass:dist','stripmq', 'imagemin']);

  // Run watch at default settings
  grunt.registerTask('default', ['sass:dev','stripmq','watch']);

  // Run watch with options
  grunt.registerTask('build', ['compile-sass', 'uglify']);
}