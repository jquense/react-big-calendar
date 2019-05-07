const { rules } = require('webpack-atoms')

const browsers = ['last 2 versions', 'ie >= 10']

module.exports = function({ config }) {
  config.module.rules.push(rules.js())
  config.module.rules.push(rules.fonts())
  config.module.rules.push(rules.images())
  config.module.rules.push(rules.css())
  config.module.rules.push(rules.less({ browsers }))

  return config
}
