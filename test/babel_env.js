require('babel-core/register')({
  presets: ['es2015-node5', 'stage-0', 'stage-3']
});
require('babel-polyfill');

require('./test_module.js');