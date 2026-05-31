const path = require('path')
module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    //'@storybook/addon-jest', // TODO: try this out
    {
      name: `@storybook/preset-scss`,
      options: {
        rule: {
          test: /(?<!\.module).s[ca]ss$/,
        },
      },
    },
    // module
    {
      name: `@storybook/preset-scss`,
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
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.devtool = 'inline-source-map'

    config.entry.unshift(
      path.resolve(__dirname, '../stories/resources/main.scss')
    )

    // Aliases the src to the package name, so that 'example' scripting reads right
    config.resolve.alias['react-big-calendar'] = path.resolve(
      __dirname,
      '../src'
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
