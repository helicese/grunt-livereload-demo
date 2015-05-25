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
        //声明给watch监听的端口
        livereload: 35729
      },
      server: {
        options: {
          open: true,//是否让浏览器自动开启
          base: [
            'views' //主目录
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

  // 加载所有任务
  require('load-grunt-tasks')(grunt); 
  // 默认被执行的任务列表。
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('serve', [ 'connect:server','watch']);
  // grunt.registerTask('jshint',['jshint']);
  // grunt.registerTask('watch',['watch']);
  grunt.registerTask('console', 'a little trick',function(){
    console.log('something changed!');
  });

};