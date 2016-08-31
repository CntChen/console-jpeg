## console-jpeg
Print JPEG images to terminal output

## Usage
* attach to console
```
var image = require('fs').readFileSync(__dirname + '/nodejs-green.jpeg');
consoleJpeg.attachTo(console);
console.jpeg(image);
```

* jpegStringif
```
var image = require('fs').readFileSync(__dirname + '/nodejs-green.jpeg');
console.log(consoleJpeg.jpegStringify(image));
```

## Thanks 
* inspired by [console-png][console-png]
* pure javascript jepg decode by [jpeg-js][jpeg-js]
* colorful console use [ansi-256-colors][ansi-256-colors]

[console-png]:https://github.com/aantthony/console-png
[jpeg-js]:https://github.com/eugeneware/jpeg-js
[ansi-256-colors]:https://github.com/jbnicolai/ansi-256-colors

## END