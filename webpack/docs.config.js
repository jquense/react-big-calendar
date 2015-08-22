var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: path.join(__dirname, '../examples/App.js'),

  output: {
    path: path.join(__dirname, '../examples/'),
    filename: 'static/bundle.js',
    publicPath: '/static/'
  },

  resolve: {
    alias: {
      'react-big-calendar': path.join(__dirname, '..', 'src')
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  module: {
    loaders: [
      { test: /\.less/, loader: 'style-loader!css-loader!less-loader', exclude: /node_modules/ },
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }
    ]
  }
};
