// you can use this file to add your custom webpack plugins, loaders and anything you like.
module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      {
        test: /\.(sass|less|css)$/,
        loaders: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
};
