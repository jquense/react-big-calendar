/* eslint no-var: 0, babel/object-shorthand: 0 */
require('babel/register');

var isCI = process.env.CONTINUOUS_INTEGRATION === 'true';
var reporters = ['mocha'];

module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: [
      'mocha',
      'sinon-chai'
    ],

    files: [
      'test/index.js'
    ],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack/test.config.es6.js'),

    webpackMiddleware: {
      noInfo: true
    },

    reporters: reporters,

    mochaReporter: {
      output: 'autowatch'
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: [ isCI ? 'ChromeTravisCI' : 'Chrome' ],

    customLaunchers: {
      ChromeTravisCI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    captureTimeout: 60000,
    browserNoActivityTimeout: 45000,

    singleRun: isCI
  });
};
