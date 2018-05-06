const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../webpack/examples.config.es6')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  quiet: false,
  progress: true,
  stats: {
    colors: true,
  },
}).listen(config.port, 'localhost', function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Listening at localhost:' + config.port)
  }
})
