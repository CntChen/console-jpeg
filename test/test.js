import * as consoleJpeg from '../dist/index.js';

var image = require('fs').readFileSync(__dirname + '/nodejs-green.jpeg');

console.log('test attachTo');
consoleJpeg.attachTo(console);
console.jpeg(image);

console.log('test jpegStringify');
console.log(consoleJpeg.jpegStringify(image));