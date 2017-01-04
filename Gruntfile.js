'use strict';

module.exports = function(grunt) {
  var appcfg = {
    app: __dirname,
    src: 'src',
    build: 'build'
  };


  var file = {
    appcfg: appcfg,
    // Clean Files to build
    clean: {
      api: {
        files: [{
          dot: true,
          src: [
            '<%= appcfg.build %>/server/{,*/}*',
            '!<%= appcfg.build %>/.git{,*/}*'
          ]
        }]
      },
      client: {
        files: [{
          dot: true,
          src: [
            '<%= appcfg.build %>/client/{,*/}*',
            '!<%= appcfg.build %>/.git{,*/}*'
          ]
        }]
      }
    },
    // Copy Files to build
    copy: {
      api: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appcfg.src %>',
          dest: '<%= appcfg.build %>',
          src: [
            'server/*.js',
            'server/modules/**',
            'server/bin/www',
            'server/{,*/}*.js',
            'server/.env'
          ]
        }]
      },
      client: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appcfg.src %>',
          dest: '<%= appcfg.build %>',
          src: [
            'client/*.html',
            'client/{,*/}*.html'
          ]
        }]
      }
    },
    // inject dependencies into index.html
    wiredep: {
      target: {
        src: [
          '<%= appcfg.build %>/client/index.html'
        ]
      }
    },
    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= appcfg.src %>/server/{,*/}*.js',
          '<%= appcfg.src %>/client/{,*/}*.js'
        ]
      },
      api: {
        src: [
          '<%= appcfg.src %>/server/{,*/}*.js'
        ]
      },
      client: {
        src: [
          '<%= appcfg.src %>/client/{,*/}*.js'
        ]
      },
    },
    // code style
    eslint: {
      options: {
        configFile: '.eslintrc.yml'
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= appcfg.src %>/server/{,*/}*.js',
          '<%= appcfg.src %>/client/{,*/}*.js'
        ]
      },
      api: {
        src: [
          '<%= appcfg.src %>/server/{,*/}*.js'
        ]
      },
      client: {
        src: [
          '<%= appcfg.src %>/client/{,*/}*.js'
        ]
      },
    }
  };

  grunt.initConfig(file);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('api', [
    'jshint:api',
    'eslint:api',
    'clean:api',
    'copy:api'
  ]);

  grunt.registerTask('client', [
    'jshint:client',
    'eslint:client',
    'clean:client',
    'copy:client',
    'wiredep'
  ]);

  grunt.registerTask('check', [
    'jshint:all',
    'eslint:all'
  ]);

  grunt.registerTask('build', [
    'api',
    'client'
  ]);

};
