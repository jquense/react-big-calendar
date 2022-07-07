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

    return config
  },
}
