/**
 * Had to pull babel config out of the package.json, to properly
 * build with the MaskedInput control updates
 * @param {*} api
 */
module.exports = function (api) {
  api.cache(false)

  const config = {
    presets: ['jason'],
    plugins: [['transform-react-remove-prop-types', { mode: 'wrap' }]],
    env: {
      esm: {
        presets: [['jason', { modules: false }]],
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
