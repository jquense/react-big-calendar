var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../examples/App.js'),
    path.join(__dirname, '../examples/index.html')
  ],
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
    publicPath: '/static'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: {
      'react-big-calendar': path.join(__dirname, '..', 'src')
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
      { test: /\.(html|png)$/, loader: "file?name=[path][name].[ext]&context=./examples" },
      { test: /\.js/, loaders: ['babel'], exclude: /node_modules/},
      { test: /\.js/, loaders: ['babel'], include: path.join(__dirname, '..', 'src')}
    ]
  },

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
};
