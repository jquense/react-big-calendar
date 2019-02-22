const { rules, loaders, plugins, stats } = require('webpack-atoms')

const browsers = ['last 2 versions', 'ie >= 10']

module.exports = function(config) {
  return {
    ...config,
    module: {
      rules: [
        rules.js(),
        rules.fonts(),
        rules.images(),
        rules.css(),
        rules.less({ browsers }),
        // When you want to test SASS, comment out the LESS 'rule'
        // and enable the SASS 'rule'
        //rules.sass({ browsers }),
      ],
    },
    plugins: [...config.plugins],
  }
}
