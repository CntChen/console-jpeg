/**
 * @author CntChen
 * @date   2016-09-01
 */

import fs from 'fs';
import jpegReader from 'jpeg-js';
import colors from 'ansi-256-colors';

function getcolorStr(rgbaBuffer, width, height){
  if(rgbaBuffer.length != 4 * width * height){
    throw new Error('image buffer length is not correct');
  }

  let colorStr = '';
  for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let color_r = Math.round(rgbaBuffer.readUInt8(4 * y * width + 4 * x + 0) * 5 / 255);
        let color_g = Math.round(rgbaBuffer.readUInt8(4 * y * width + 4 * x + 1) * 5 / 255);
        let color_b = Math.round(rgbaBuffer.readUInt8(4 * y * width + 4 * x + 2) * 5 / 255);
        let color_a = Math.round(rgbaBuffer.readUInt8(4 * y * width + 4 * x + 3) * 5 / 255);

        colorStr += colors.fg.getRgb(color_r,color_g,color_b) + colors.bg.getRgb(color_r,color_g,color_b) + ' ';
      }
      colorStr += '\n';
  }
  colorStr += colors.reset;

  return colorStr;
}

function attachTo(_console) {
  if (typeof _console !== 'object' || typeof _console.log !== 'function') {
    throw new Error('input arguments error');
  }

  _console.jpeg = (jpegImage) => {
    const colorStr = jpegStringify(jpegImage);
    _console.log(colorStr);
  };
}

function jpegStringify(jpegImage){
  console.log(typeof jpegImage);
  if (!(jpegImage instanceof Buffer)) {
    throw new Error('parameter shuold be Buffer');
  }

    const rawImageData = jpegReader.decode(jpegImage);
    const imageData = rawImageData.data;
    const imageWidht = rawImageData.width;
    const imageHeight = rawImageData.height;

    return getcolorStr(imageData, imageWidht, imageHeight);
}

export {
  jpegStringify,
  attachTo,
}

export default {
  jpegStringify,
  attachTo,
}