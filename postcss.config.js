const autoprefixer = require('autoprefixer')
module.exports = function (ctx) {
  return {
    plugins: [autoprefixer()],
  }
}
