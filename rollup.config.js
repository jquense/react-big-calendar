import path from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import clear from 'rollup-plugin-clear'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const input = './src/index.js'
const name = 'ReactBigCalendar'

const babelOptions = {
  exclude: /node_modules/,
  babelHelpers: 'runtime',
}
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}

const commonjsOptions = {
  include: /node_modules/,
}

export default [
  {
    input,
    output: {
      file: './dist/react-big-calendar.js',
      format: 'umd',
      name,
      globals,
      interop: 'auto',
    },
    external: Object.keys(globals).push(/@babel\/runtime/),
    plugins: [
      // only use 'clear' on the first target
      clear({
        targets: ['./dist', './lib'],
        watch: true,
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        preventAssignment: true,
      }),
      nodeResolve(),
      commonjs(commonjsOptions),
      babel(babelOptions),
      sizeSnapshot(),
    ],
  },

  {
    input,
    output: {
      file: './dist/react-big-calendar.min.js',
      format: 'umd',
      name,
      globals,
      interop: 'auto',
    },
    external: Object.keys(globals).push(/@babel\/runtime/),
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
      nodeResolve(),
      commonjs(commonjsOptions),
      babel(babelOptions),
      terser(),
      sizeSnapshot(),
    ],
  },

  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
      interop: 'auto',
    },
    // prevent bundling all dependencies
    external: (id) => !id.startsWith('.') && !id.startsWith('/'),
    plugins: [
      babel({
        ...babelOptions,
        configFile: path.join(__dirname, 'babel.config.esm.js'),
      }),
      sizeSnapshot(),
    ],
  },
]
