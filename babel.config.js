module.exports = function (api) {
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
      [
        '@babel/preset-react',
        {
          development: api.env('development') || api.env('test'),
          runtime: 'classic',
        },
      ],
    ],
    plugins: [
      ['@babel/plugin-transform-runtime'],
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }],
      ['transform-react-remove-prop-types', { mode: 'wrap' }],
      ...optionalPlugins,
    ],
  }

  return config
}
