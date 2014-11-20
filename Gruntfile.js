/*
 * Generated on 2014-11-14
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 *
 * Template adapted to generate Hipster's main page.
 * Pablo Rodríguez Mier.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    // Assemble task
    assemble: {
      // Target pages
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    // Copy task for the different libraries used within the webpage
    copy: {
      bootstrap: {
        expand: true,
        cwd: 'bower_components/bootstrap/dist/',
        src: '**',
        dest: '<%= config.dist %>/assets/'
      },
      theme: {
        expand: true,
        cwd: 'src/assets/',
        src: '**',
        dest: '<%= config.dist %>/assets/css/'
      },
      fontawesome: {
        files: [{
          expand: true,
          cwd: 'bower_components/fontawesome/css',
          src: 'font-awesome.min.css',
          dest: '<%= config.dist %>/assets/css'
        },
        {
          expand: true,
          cwd: 'bower_components/fontawesome',
          src: 'fonts/*',
          dest: '<%= config.dist %>/assets/'
        }]
      },
      jquery: {
        expand: true,
        cwd: 'bower_components/jquery/dist',
        src: '**',
        dest: '<%= config.dist %>/assets/js'
      },
      libs: {
        expand: true,
        cwd: 'src/lib/',
        src: '**/*.js',
        dest: '<%= config.dist %>/assets/js/custom'
      }
    },

    // Combine and reduce all the css under assets/css into style.min.css
    cssmin: {
      combine: {
          src: ['<%= config.dist %>/assets/css/custom/**/*.css', '!<%= config.dist %>/assets/css/custom/**/*.min.css'],
          dest: '<%= config.dist %>/assets/css/custom/style.min.css'
      }
    },

    // Replace in all html files the css styles used in dev by the new style.min.css
    processhtml: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/',
          src: ['**/*.html'],
          dest: '<%= config.dist %>/',
          ext: '.html'
        }]
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= config.dist %>/assets/js/custom/helpers.min.js': ['<%= config.dist %>/assets/js/custom/*.js']
        }
      }
    },

    modernizr: {
      dist: {
        devFile : '<%= config.dist %>/assets/js/custom/modernizr/modernizr-dev.js',
        outputFile : '<%= config.dist %>/assets/js/custom/modernizr/modernizr-custom.js',

        extra: {
          shiv: true,
          printshiv: false,
          load: true,
          mq: false,
          cssclasses: true
        },

        extensibility : {
          addtest : false,
          prefixed : false,
          teststyles : false,
          testprops : false,
          testallprops : false,
          hasevents : false,
          prefixes : false,
          domprefixes : false,
          cssclassprefix: ""
        },

        files : {
          src: [
            "*[^(g|G)runt(file)?].{js,css,scss,sass}",
            "**[^node_modules]/**/*.{js,css,scss,sass}",
            "!lib/cache/**/*",
            "!lib/gruntifier.js",
            "!**/modernizr-dev.js"
          ]
        },
        uglify : true,
        parseFiles : true,
        matchCommunityTests : false
      }

    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml,css,js}']

  });

  grunt.loadNpmTasks('assemble');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-processhtml');


  // Minify CSS files and javascript helper files and replace
  // urls with grunt-processhtml
  grunt.registerTask('optimize', [
    'cssmin',
    'uglify',
    'modernizr',
    'processhtml'
  ]);

  grunt.registerTask('server', [
    'build',
    'optimize',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
