const typescript = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');

const pkg = require('./package.json');

const banner =
  `/** @license num-to-korean v${pkg.version}\n` +
  `* https://github.com/huskyhoochu/num-to-korean\n` +
  `* (c) 2020-${new Date().getFullYear()} Seung Hyung Soo\n` +
  `* This source code is licensed under the MIT license found in the\n` +
  `* LICENSE file in the root directory of this source tree.\n` +
  '*/\n';

module.exports = {
  input: 'src/num-to-korean.ts',
  output: [
    {
      file: 'dist/num-to-korean.js',
      name: 'numToKorean',
      format: 'umd',
      exports: 'named',
      banner,
    },
    {
      file: 'dist/num-to-korean.min.js',
      name: 'numToKorean',
      format: 'umd',
      exports: 'named',
      banner,
      plugins: [terser()],
    },
    {
      file: 'dist/num-to-korean.cjs.js',
      name: 'numToKorean',
      format: 'cjs',
      exports: 'named',
      banner,
    },
  ],
  plugins: [typescript({ tsconfig: './tsconfig.json' })],
};
