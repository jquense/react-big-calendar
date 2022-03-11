module.exports = function (api) {
  //api.cache(false)

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
      'react-app',
    ],
    plugins: [
      ['@babel/plugin-transform-runtime'],
      ['transform-react-remove-prop-types', { mode: 'wrap' }],
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
    ],
    env: {
      esm: {
        presets: ['@babel/preset-env', 'react-app'],
        plugins: [
          [
            'babel-plugin-transform-rename-import',
            {
              replacements: [{ original: 'lodash', replacement: 'lodash-es' }],
            },
          ],
        ],
      },
    },
  }

  return config
}
