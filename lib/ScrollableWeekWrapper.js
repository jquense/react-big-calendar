'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _react = _interopRequireDefault(require('react'))

var ScrollableWeekWrapper = function ScrollableWeekWrapper(_ref) {
  var children = _ref.children
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: 'rbc-row-content-scroll-container',
    },
    children
  )
}

var _default = ScrollableWeekWrapper
exports.default = _default
module.exports = exports.default
