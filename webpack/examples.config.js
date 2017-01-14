var path = require('path');
var webpack = require('webpack');
var Autoprefixer = require('less-plugin-autoprefix');

// be able to choose the port from the command line (1st argument or env var):
const port = Number(process.argv[2]) || Number(process.env.PORT) || 3000

module.exports = {
  devServer: {
    port
  },
  devtool: 'source-map',
  entry: path.join(__dirname, '../examples/App.js'),
  output: {
    path: path.join(__dirname, '../examples/'),
    filename: 'bundle.js',
    publicPath: '/examples'
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: {
      'react-big-calendar$': require.resolve(__dirname + '/../src/index.js'),
      'react-big-calendar/lib': path.join(__dirname, '..', 'src')
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.gif$/, loader: 'url-loader?mimetype=image/png' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.less/, loader: 'style-loader!css-loader!postcss-loader!less-loader', exclude: /node_modules/ },
      { test: /\.md/, loader: 'babel!markdown-jsx-loader'},
      { test: /\.js/, loaders: ['babel'], exclude: /node_modules/},
      { test: /\.js/, loaders: ['babel'], include: path.join(__dirname, '..', 'src')}
    ]
  },

  lessLoader: {
    lessPlugins: [
      new Autoprefixer({
        browsers: ['last 2 versions', "ie >= 10"]
      })
    ]
  }
};
