var https = require('https');
var consoleJpeg  = require('../dist/index.js');

const getImage = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let rawData = [];
      res.on('data', chunk => rawData.push(chunk));
      res.on('end', () => resolve(Buffer.concat(rawData)));
      res.on('error', err => reject(err));
    }).on('error', err => reject(err));
  });
};

getImage('https://raw.githubusercontent.com/CntChen/console-jpeg/master/test/nodejs-green.jpeg').then(image => {
  console.log(consoleJpeg.jpegStringify(image));
});

