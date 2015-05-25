module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'demojs/test2.js',
        dest: 'build/test2.min.js'
      }
    },
    connect: {
      options: {
        port: 8000,
        hostname: 'localhost',
        //the port for the watch task
        livereload: 35729
      },
      server: {
        options: {
          open: true,//let the browser run automatically
          base: [
            'views' //the base path
          ]
        }
      }
    },
    jshint:{
      opinions:{
        eqeqeq: true,
        trailing: true,
      },
      src: 'demojs/*.js'
    },

    watch:{
      scripts: {
        files: ['demojs/*.js','views/*.html','views/*.css'],
        tasks: ['jshint'],
        options: {
          spawn: false,
          livereload: '<%= connect.options.livereload %>'
        },
      },
    },
  });

  // load all the tasks
  require('load-grunt-tasks')(grunt); 
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('serve', [ 'connect:server','watch']);
  // grunt.registerTask('jshint',['jshint']); !important(add this will make the task unusable)
  // grunt.registerTask('watch',['watch']);
  grunt.registerTask('console', 'a little trick',function(){
    console.log('something changed!');
  });

};
