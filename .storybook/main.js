const path = require('path')

module.exports = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    {
      name: '@storybook/preset-scss',
      options: {
        rule: {
          test: /(?<!\.module).s[ca]ss$/,
        },
      },
    },
    {
      name: '@storybook/preset-scss',
      options: {
        rule: {
          test: /\.module\.s[ca]ss$/,
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    config.devtool = 'inline-source-map'

    config.module.rules.push({
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('babel-loader'),
        options: { configFile: path.resolve(__dirname, '../babel.config.js') },
      },
    })

    // Aliases the src to the package name, so that 'example' scripting reads right
    config.resolve.alias['react-big-calendar'] = path.resolve(
      __dirname,
      '../src'
    )

    // Globalize 1.x UMD bundle references 'cldr' (AMD name) while the npm package is 'cldrjs'
    config.resolve.alias['cldr'] = path.resolve(
      __dirname,
      '../node_modules/cldrjs/dist/cldr'
    )
    config.resolve.alias['cldr/event'] = path.resolve(
      __dirname,
      '../node_modules/cldrjs/dist/cldr/event'
    )
    config.resolve.alias['cldr/supplemental'] = path.resolve(
      __dirname,
      '../node_modules/cldrjs/dist/cldr/supplemental'
    )
    config.resolve.alias['cldr/unresolved'] = path.resolve(
      __dirname,
      '../node_modules/cldrjs/dist/cldr/unresolved'
    )

    // Instrument src/ with Istanbul when running under coverage mode.
    // Activate with: COVERAGE=true yarn storybook (or yarn playwright:coverage)
    if (process.env.COVERAGE === 'true') {
      config.module.rules.push({
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                'babel-plugin-istanbul',
                {
                  exclude: ['**/*.test.js', '**/__tests__/**'],
                },
              ],
            ],
          },
        },
        enforce: 'post',
      })
    }

    return config
  },
}
