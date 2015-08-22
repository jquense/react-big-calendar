'use strict';

module.exports = function (config) {
  
  config.set({

    basePath: '',

    frameworks: ['mocha'],

    files: [
      './vendor/phantomjs-shim.js',
      './vendor/sinon-1.10.3.js',
      '__tests__/*.js*',
    ],

    reporters: ['progress'],

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,


    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS'], 

    preprocessors: {
      '__tests__/*.js*': ['webpack']
    },

    webpack: require('./tasks/webpack.configs').test,

    webpackServer: {
      noInfo: true
    },

    plugins: [
      require("karma-phantomjs-launcher"),
      require("karma-webpack"),
      require("karma-mocha")
    ]
  });
};