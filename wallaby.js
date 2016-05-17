module.exports = function (wallaby) {
  const load = require;

  return {
    files: [
      { pattern: 'src/**/*.test.jsx', ignore: true },
      'src/**/components/*.jsx'
    ],
    tests: [
      'src/**/*.test.jsx'
    ],
    compilers: {
       '**/*.js*': wallaby.compilers.babel({
         babel: load('babel-core'),
         presets: ['es2015', 'stage-2', 'react']
       })
    },
    env: {
      type: 'node'
    },
    testFramework: 'mocha',
    setup: function() {
      const fool = require
      const jsdom = fool('jsdom').jsdom;

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
      const propagateToGlobal = (window) => {
        for (var key in window) {
          if (!window.hasOwnProperty(key)) continue
          if (key in global) continue

          global[key] = window[key]
        }
      }

// setup the simplest document possible
      const doc = jsdom('')
      const win = doc.defaultView
      global.document = doc
      global.window = win

      propagateToGlobal(win)
    }
  };
};
