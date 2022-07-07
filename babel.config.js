module.exports = function (api) {
  //api.cache(false)

  const isCJSBuild = process.env.RBC_CJS_BUILD === 'true'
  const isESMBuild = process.env.RBC_ESM_BUILD === 'true'
  const optionalPlugins = []

  if (isESMBuild) {
    optionalPlugins.push([
      'babel-plugin-transform-rename-import',
      {
        replacements: [{ original: 'lodash', replacement: 'lodash-es' }],
      },
    ])
  }

  const config = {
    presets: [
      [
        '@babel/preset-env',
        {
          ...(api.env('test') && {
            targets: {
              node: 'current',
            },
          }),
        },
      ],
      // FIXME: Passing `useESModules` to babel-preset-react-app is an
      // undocumented feature. Should be avoided. This option is also deprecated
      // according to
      // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
      [
        'react-app',
        {
          useESModules: !isCJSBuild,
          absoluteRuntime: false,
        },
      ],
    ],
    plugins: [
      ['@babel/plugin-transform-runtime'],
      ['transform-react-remove-prop-types', { mode: 'wrap' }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
      ...optionalPlugins,
    ],
  }

  return config
}
