
export default {

  output: {
    pathinfo: true
  },

  module: {
    loaders: [
      { test: /\.js/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  },

  devtool: 'inline-source-map'
};
