module.exports = function(grunt) {

  // Project configuration...
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    path: {
      jscwd: 'views/js/',
      csscwd: 'views/css/',
      destJs: 'views/dest/js/',
      destCss: 'views/dest/css/',
      src: 'views/',
      dest: 'views/dest/'
    },

    uglify: {
      options: {
         banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        expand: true,
        cwd: '<%= path.jscwd%>',
        src: ['*.js', '!*.min.js'],
        dest: '<%= path.destJs %>',
        ext: '.min.js'
      }
    },

    connect: {
      options: {
        debug: true,
        //open: true,//let the browser run automatically
        port: 8000,
        hostname: 'localhost',//only this machine can access to the server
        livereload: 35729//the port for the watch task
      },
      server: {
        options: {
          //base define the root directory of the server, default to be the root where Gruntfile.js exists.
          base: [
            '<%= path.src %>' //the base path
          ]
        }
      }
    },

    watch:{
      javascript: {
        files: ['<%= path.jscwd %>*.js', 'views/main.html','views/css/*.css'],
        tasks: ['jshint'],
        options: {
          spawn: false,//speed up the watch task
          livereload: '<%= connect.options.livereload %>'
        },
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint'],
        options: {
          reload: true,
          spawn: false
        },
      }
    },

    jshint:{
      opinions:{
        eqeqeq: true,  //要用严格相等运算符取代相等运算符
        trailing: true,  //行尾不得有多余的空格
      },
      src: ['<%= path.jscwd %>*.js', 'Gruntfile.js']
    },

    cssmin:{
      minify: {
        expand: true,
        cwd: '<%= path.csscwd %>',
        src: ['*.css', '!*.min.css'],
        dest: '<%= path.destCss %>',
        ext: '.min.css'
      },
    }

  });

  // load all the tasks
  require('load-grunt-tasks')(grunt);
  //grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', [ 'connect:server','watch']);
  grunt.registerTask('console', 'a little trick',function(){
    console.log('something changed!');
  });

};
