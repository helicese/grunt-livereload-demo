# grunt-livereload-demo
a simple demo using grunt to enable livereload and jshint in the front-end

------
###plugins
* [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
  : establish a server to watch the changes
* [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
  : watch the changes and do tasks on changing
* [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
  : check the js files and detect the errors
* [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
  : compress the js files
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
* ```grunt``` : to run uglify
* ```grunt serve``` : to start the server and watch the files

###tips
  > This details really cost me a lot of time
  
* Do not registe Task for the loaded plugins, which will make it unusable
* in the path, there is no '/' at the beginning.
* to enable livereload, a [livereload plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) of the browser is needed and make sure it is switched on(the center circle of the icon be filled).

###references:
[http://www.gruntjs.net/](http://www.gruntjs.net/)

[http://bellyang.com/blog/post-606.html](http://bellyang.com/blog/post-606.html)

------
helicese@gmail.com
