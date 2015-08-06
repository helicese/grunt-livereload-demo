# grunt-livereload-demo
a simple demo using grunt to enable livereload and jshint in the front-end

###plugins
* [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
  : establish a server to watch the changes
* [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
  : watch the changes and do tasks on changing
* [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
  : check the js files and detect the errors
* [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
  : compress the js files
* [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
: compress the css files
* [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks)
  : one line(```require('load-grunt-tasks')(grunt);```)the load all the tasks

###instructions
first get the code and install the plugins:
```
  git clone https://github.com/helicese/grunt-livereload-demo
  cd grunt-livereload-demo
  npm install
```
then:
* ```grunt```: to start the server and run the watch task
* ```grunt cssmin```: compress the css file
* ```grunt uglify```: compress the js file

###tips
  > This details really cost me a lot of time
  
* Do not registe Task for the loaded plugins, which will make it unusable
* in the path, there is no '/' at the beginning.
* to enable livereload, a [livereload plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) of the browser is needed and make sure it is switched on(the center circle of the icon be filled).

###references:
[http://www.gruntjs.net/](http://www.gruntjs.net/)

[http://bellyang.com/blog/post-606.html](http://bellyang.com/blog/post-606.html)

------
# grunt使用心得
##Reference
* [grunt系列博客](http://www.cnblogs.com/tarol/category/643890.html)： 非常详细～
* [grunt之connect,watch](http://www.cnblogs.com/tarol/p/4242360.html)
* [grunt之watch续](http://www.cnblogs.com/tarol/p/4253787.html)

##files：
+ 三种格式：
```
//第一种，文件数组格式，满足所有要求；
//对应多个src-dest文件映射，也可添加额外的属性值
files: [
        {src: ['src/bb.js', 'src/bbb.js'], dest: 'dest/b/', nonull: true},
        {src: ['src/bb1.js', 'src/bbb1.js'], dest: 'dest/b1/', filter: 'isFile'},
      ],
      
//第二种，文件对象格式，无法设置其他参数
//属性名就是目标文件，源文件就是它的值(源文件列表则使用数组格式声明)
files : {
    'dest/hello.js' ： ['src/*.js']
}

//第三种，简洁格式，只能设置单个任务，可添加额外属性，
//连file属性名都不用写，直接dest和src
dest : 'dest/hello.js',
src : ['src/*.js']
```

+ 通配符：
    + \*：匹配任意数量的字符，不包括/。
    + ?：匹配单个字符，不包括/。
    + **：匹配任意数量的字符，包括/。
    + {}：允许使用逗号分隔的列表，表示“or”（或）关系。
    + !：用于模式的开头，表示只返回不匹配的情况。
+ 动态构建文件对象：
```
    files: [
        {
          expand: true,     // Enable dynamic expansion.
          cwd: 'lib/',      // Src matches are relative to this path.
          src: ['**/*.js'], // Actual pattern(s) to match.
          dest: 'build/',   // Destination path prefix.
          ext: '.min.js',   // Dest filepaths will have this extension.
          extDot: 'first'   // Extensions in filenames begin after the first dot
        },
      ], 
```

##[grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
> Run this task with the ```grunt connect``` command.

> Note that this server only runs as long as grunt is running. Once grunt's tasks have completed, the web server stops. This behavior can be changed with the *keepalive* option, and can be enabled ad-hoc by running the task like ```grunt connect:keepalive```.

> This task was designed to be used in conjunction with another task that is run immediately afterwards, like the *grunt-contrib-qunit plugin* ```qunit``` task.

* 功能：搭建一个本地connect服务器，使得livereload时并不需要借用其他工具来搭建服务器；
* opinions:
    * hostname: 默认'0.0.0.0',只要能和本机ping通都能访问,设定为'localhost'则只有本机能够访问
    * base: 静态服务器文件根目录,支持String, Array, Object;
    * keepalive: 默认为false,结果是运行结果服务器开启之后瞬间就关闭了(用于测试),将此opinion设置为true能让服务器一直运行下去,要注意keepalive会阻塞接下来的grunt任务,要谨慎使用;
    * livereload: 依赖于浏览器的livereload插件,只有和watch配合使用才有效果
* Tips：
    * 根目录中有index.html时,访问服务器会直接链接到index.html,若没有index.html,则看到的是根目录下的目录结构(connect做得比较细腻的部分)
    * base的value为数组时,数组内为多个目录,若都有index.html,则文件索引为前面的文件夹优先级更高,若没index.html则文件夹索引为后面的文件夹优先级更高
    * 实现livereload时,keepalive应设置为false,由于watch的存在,grunt会一直处于执行状态,所以服务器不会终止,而keepalive若为true,则connect会一直阻塞,watch不会执行,livereload失败.
我的配置：
```
    connect: {
      options: {
        open: true,//let the browser run automatically
        port: 8000,
        hostname: 'localhost',//only this machine can access to the server
        livereload: 35729//the port for the watch task
      },
      server: {
        options: {
          //base define the root directory of the server, default to be the root where Gruntfile.js exists.
          base: [
            'views' //the base path
          ]
        }
      }
    },
```

##[grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
+ 功能： 监控文件变化，做出相关反应；
+ opinions：
    * spawn: 链接里讲的很详细，不过我觉得没什么必要，直接设置成false就好；
> 如果你的Gruntfile.js中读取了输入命令的部分值并保存为变量，请将此option设置为false，不然watch启动的task中将读取不到这些变量。

* 我的配置：
```
    watch:{
      javascript: {
        files: ['views/js/*.js', 'views/css/*.css','views/main.html'],
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
```
* 说明：这个plugin有两个task，javascript负责监控js文件变化并调用jshint工具来检测语法，gruntfile负责监测Gruntfile.js的变化，在变化后重启grunt任务。

##[grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
功能： 检测javascript语法～
这个插件算是jshint工具的一个分支吧，很多内容可以参考[jsHint](http://jshint.com/)官网,[这里](https://github.com/jshint/jshint/blob/master/examples/.jshintrc)包含了常用的配置清单，可以根据这里的内容来配置出属于自己的jshint。
我的配置：
```
jshint:{
  opinions:{
    eqeqeq: true, //要用严格相等运算符取代相等运算符
    trailing: true, //行尾不得有多余的空格
  },
  src: ['views/js/*.js','*.js']
}
```

##[grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
功能：压缩，合并css代码
我的配置：
```
cssmin:{
    minify: {
        expand: true,
        cwd: 'views/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'views/dest/css/',
        ext: '.min.css'
    },
}
```

##[grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
功能：压缩javascript文件
我的配置：
```
uglify: {
  options: {
     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
  },
  build: {
    expand: true,
    cwd: 'views/js',
    src: ['*.js', '!*.min.js'],
    dest: 'views/dest/js',
    ext: '.min.js'
  }
},
```
---
- 李辉   
- helicese@gmail.com
- 热爱学习的前端小兵,欢迎交流讨论
- 2015.8.7
