// Rollup plugins.
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss-modules'
import postcssImport from 'postcss-import'
import postcssSimpleVars from 'postcss-simple-vars'

import autoprefixer from 'autoprefixer'

const cssExportMap = {}

// shared modules for different envs
import external from './externalModules'
import cjsopts from './commonjs'

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
  external,
  plugins: [
    // scss({
    //   output: 'lib/app.css',
    // }),
    postcss({
      // preprocessor: (content, id) =>
      //   new Promise(_resolve => {
      //     const result = less.renderSync({ file: id })
      //     _resolve({ code: result.css.toString() })
      //   }),
      extensions: ['.css', '.less'],
      extract: true,
      postcssModulesOptions: {
        getJSON(id, exportTokens) {
          cssExportMap[id] = exportTokens
        },
      },
      plugins: [autoprefixer(), postcssImport(), postcssSimpleVars()],
      // Default false, when set to true it will also named export
      //  alongside default export your class names
      getExportNamed: false,
    }),
    resolve({
      browser: true,
      main: true,
      extensions: ['.js', '.jsx', '.json'],
    }),
    commonjs(cjsopts),
    buble({
      transforms: { dangerousTaggedTemplateString: true },
      objectAssign: 'Object.assign',
    }),
    globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
  ],
}
