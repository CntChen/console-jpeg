'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attachTo = exports.jpegStringify = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                   * @author CntChen
                                                                                                                                                                                                                                                   * @date   2016-09-01
                                                                                                                                                                                                                                                   */

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jpegJs = require('jpeg-js');

var _jpegJs2 = _interopRequireDefault(_jpegJs);

var _ansi256Colors = require('ansi-256-colors');

var _ansi256Colors2 = _interopRequireDefault(_ansi256Colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getcolorStr(rgbaBuffer, width, height) {
  if (rgbaBuffer.length != 4 * width * height) {
    throw new Error('image buffer length is not correct');
  }

  var colorStr = '';
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var color_r = Math.round(rgbaBuffer.readUInt8(4 * y * width + 4 * x + 0) * 5 / 255);
      var color_g = Math.round(rgbaBuffer.readUInt8(4 * y * width + 4 * x + 1) * 5 / 255);
      var color_b = Math.round(rgbaBuffer.readUInt8(4 * y * width + 4 * x + 2) * 5 / 255);
      var color_a = Math.round(rgbaBuffer.readUInt8(4 * y * width + 4 * x + 3) * 5 / 255);

      colorStr += _ansi256Colors2.default.fg.getRgb(color_r, color_g, color_b) + _ansi256Colors2.default.bg.getRgb(color_r, color_g, color_b) + ' ';
    }
    colorStr += '\n';
  }
  colorStr += _ansi256Colors2.default.reset;

  return colorStr;
}

function attachTo(_console) {
  if ((typeof _console === 'undefined' ? 'undefined' : _typeof(_console)) !== 'object' || typeof _console.log !== 'function') {
    throw new Error('input arguments error');
  }

  _console.jpeg = function (jpegImage) {
    var colorStr = jpegStringify(jpegImage);
    _console.log(colorStr);
  };
}

function jpegStringify(jpegImage) {
  console.log(typeof jpegImage === 'undefined' ? 'undefined' : _typeof(jpegImage));
  if (!(jpegImage instanceof Buffer)) {
    throw new Error('parameter shuold be Buffer');
  }

  var rawImageData = _jpegJs2.default.decode(jpegImage);
  var imageData = rawImageData.data;
  var imageWidht = rawImageData.width;
  var imageHeight = rawImageData.height;

  return getcolorStr(imageData, imageWidht, imageHeight);
}

exports.jpegStringify = jpegStringify;
exports.attachTo = attachTo;
exports.default = {
  jpegStringify: jpegStringify,
  attachTo: attachTo
};