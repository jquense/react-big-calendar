const path = require('path')
module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-jest',
    '@storybook/preset-scss',
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

    return config
  },
}
