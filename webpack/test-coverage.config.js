import path from 'path';
import testConfig from './test.config';

const paths = {
  SRC: path.resolve('src'),
  TEST: path.resolve('test')
};

export default {
  ...testConfig,

  module: {
    loaders: [
      {
        test: /\.js/,
        include: [paths.SRC, paths.TEST],
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ],
    preLoaders: [
      {
        test: /\.js/,
        loader: 'isparta',
        include: paths.SRC,
        exclude: /node_modules/
      }
    ]
  }
};
