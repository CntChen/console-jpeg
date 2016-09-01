## console-jpeg
Print JPEG images to terminal output

## demo
![demo result](https://github.com/CntChen/console-jpeg/blob/master/doc/test_result.jpeg)

## Usage
* install
```
npm install console-jpeg
```

* import
```
var consoleJpeg = require('console-jpeg'); 
```

* attach to console
```
var image = require('fs').readFileSync(__dirname + '/nodejs-green.jpeg');
consoleJpeg.attachTo(console);
console.jpeg(image);
```

* jpegStringiy
```
var image = require('fs').readFileSync(__dirname + '/nodejs-green.jpeg');
console.log(consoleJpeg.jpegStringify(image));
```

## Thanks
* inspired by [console-png][console-png]
* pure javascript jepg decode by [jpeg-js][jpeg-js]
* colorful console use [ansi-256-colors][ansi-256-colors]


[References]:References
[console-png]:https://github.com/aantthony/console-png
[jpeg-js]:https://github.com/eugeneware/jpeg-js
[ansi-256-colors]:https://github.com/jbnicolai/ansi-256-colors

## END