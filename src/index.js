/**
 * @author CntChen
 * @date   2016-09-01
 */

import fs from 'fs';
import jpegReader from 'jpeg-js';
import colors from 'ansi-256-colors';

function getcolorStr(rgbaBuffer, width, height) {
  if (rgbaBuffer.length != 4 * width * height) {
    throw new Error('image buffer length is not correct');
  }

  // https://github.com/aantthony/console-png/blob/master/index.js
  const CHAR_HALF_BLOCK = String.fromCharCode(9604);

  let colorStr = '';
  for (let y = 0; y < height - 1; y = y + 2) {
    if (colorStr) colorStr += colors.reset + '\n';
    for (let x = 0; x < width; x++) {
      let color_r_1 = Math.round(rgbaBuffer.readUInt8(4 * y * width + 4 * x + 0) * 5 / 255);
      let color_g_1 = Math.round(rgbaBuffer.readUInt8(4 * y * width + 4 * x + 1) * 5 / 255);
      let color_b_1 = Math.round(rgbaBuffer.readUInt8(4 * y * width + 4 * x + 2) * 5 / 255);
      let color_a_1 = Math.round(rgbaBuffer.readUInt8(4 * y * width + 4 * x + 3) * 5 / 255);

      let color_r_2 = Math.round(rgbaBuffer.readUInt8(4 * (y + 1) * width + 4 * x + 0) * 5 / 255);
      let color_g_2 = Math.round(rgbaBuffer.readUInt8(4 * (y + 1) * width + 4 * x + 1) * 5 / 255);
      let color_b_2 = Math.round(rgbaBuffer.readUInt8(4 * (y + 1) * width + 4 * x + 2) * 5 / 255);
      let color_a_2 = Math.round(rgbaBuffer.readUInt8(4 * (y + 1) * width + 4 * x + 3) * 5 / 255);

      colorStr += colors.bg.getRgb(color_r_1, color_g_1, color_b_1)
                  + colors.fg.getRgb(color_r_2, color_g_2, color_b_2) + CHAR_HALF_BLOCK;
    }
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
  };
}

function jpegStringify(jpegImage) {
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