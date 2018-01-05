var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, '../test/visual-test.js'),

  output: {
    path: path.join(__dirname, '../test/'),
    filename: 'bundle.js',
  },

  resolve: {
    alias: {
      'react-big-calendar': path.join(__dirname, '..', 'src'),
    },
    extensions: ['', '.js', '.jsx'],
  },

  plugins: [new HtmlWebpackPlugin({ filename: 'visual-test.html' })],

  module: {
    loaders: [
      { test: /\.gif$/, loader: 'url-loader?mimetype=image/png' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader',
        exclude: /node_modules/,
      },
      { test: /\.md/, loader: 'babel!markdown-jsx-loader' },
      { test: /\.js/, loaders: ['babel'], exclude: /node_modules/ },
      {
        test: /\.js/,
        loaders: ['babel'],
        include: path.join(__dirname, '..', 'src'),
      },
    ],
  },
}
