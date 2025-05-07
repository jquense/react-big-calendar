import path from 'path'
import * as url from 'url'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import clear from 'rollup-plugin-clear'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'

import { readFileSync } from 'fs'
const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf-8')
)

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

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
    external: [...Object.keys(globals), /@babel\/runtime/],
    plugins: [
      clear({ targets: ['./dist', './lib'], watch: true }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        preventAssignment: true,
      }),
      nodeResolve(),
      commonjs(commonjsOptions),
      json(),
      babel(babelOptions),
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
    external: [...Object.keys(globals), /@babel\/runtime/],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
      nodeResolve(),
      commonjs(commonjsOptions),
      json(),
      babel(babelOptions),
      terser(),
    ],
  },

  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
      interop: 'auto',
    },
    external: (id) => !id.startsWith('.') && !id.startsWith('/'),
    plugins: [
      nodeResolve(),
      commonjs(commonjsOptions),
      json(),
      babel({
        ...babelOptions,
        configFile: path.join(__dirname, 'babel.config.esm.js'),
      }),
    ],
  },

  // TypeScript declarations build
  {
    input: './src/types/index.d.ts',
    output: {
      file: 'dist/types/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
]
