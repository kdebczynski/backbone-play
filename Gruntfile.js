module.exports = function(grunt) {
  var pkg;
  
  pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,
    
    jshint: {
      all: ['Gruntfile.js', 'src/app/*.js', 'src/app/**/*.js']
    },
    
    clean: ['build'],
    
    requirejs: {
      compile: {
        options: {
          mainConfigFile: 'src/app/main.js',
          baseUrl: "src/app",
          name: "main",
          out: 'build/app/main.js',
          include: ['../libs/require/require.min.js'],
          optimize: 'uglify'
        }
      }
    },
    
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/app/', src: ['templates/**'], dest: 'build/app/', dot: true},
          {expand: true, cwd: 'src/app/', src: ['index.html'], dest: 'build/app/'},
          {expand: true, cwd: 'src/app/', src: ['config.js'], dest: 'build/app/'},
          {expand: true, cwd: 'src/app/', src: ['images/**'], dest: 'build/app/'},
          {expand: true, cwd: 'src/app/', src: ['Collections/**'], dest: 'build/app/'},
          {expand: true, cwd: 'src/app/', src: ['Views/**'], dest: 'build/app/'},
          {expand: true, cwd: 'src/app/', src: ['Models/**'], dest: 'build/app/'},
          {expand: true, cwd: 'src/app/', src: ['core/**'], dest: 'build/app'}
        ],
      }
    },
    
    compass: {
      main: {
        options: {
          sassDir: 'src/app/css',
          cssDir: 'build/app/css',
          imagesDir: 'src/app/images'
        }
      }
    },
    
    watch: {
        files: ['src/app/core/**/*.js', 'src/app/**/*.js', 'src/app/css/**/*.scss', 'src/app/mock/**/*', 'src/app/templates/**/*'],
        tasks: ['build'],
        options : { nospawn : true, dot: true }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('devUpdate', ['devUpdate']);
  
  grunt.registerTask('build', [
    'jshint',
    'clean',
    'requirejs',
    'copy',
    'compass'
  ]);

};