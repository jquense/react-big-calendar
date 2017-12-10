const path = require('path');
const Autoprefixer = require('less-plugin-autoprefix');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        include: [
          path.resolve(__dirname, '../')
        ]
      },
      {
        test: /\.less?$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              plugins: [
                new Autoprefixer({
                  browsers: ['last 2 versions', 'ie >= 10']
                })
              ]
            },
          }
        ],
        include: [
          path.resolve(__dirname, '../')
        ]
      },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};
