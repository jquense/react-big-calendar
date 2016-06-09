const path = require('path');
const Autoprefixer = require('less-plugin-autoprefix');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        include: [
          path.resolve(__dirname, '../')
        ]
      },
      {
        test: /\.less?$/,
        loader: 'style-loader!css-loader!less-loader',
        include: [
          path.resolve(__dirname, '../')
        ]
      },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  },

  lessLoader: {
    lessPlugins: [
      new Autoprefixer({
        browsers: ['last 2 versions', 'ie >= 10']
      })
    ]
  }
};
