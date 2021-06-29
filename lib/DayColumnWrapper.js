'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _react = _interopRequireDefault(require('react'))

var DayColumnWrapper = function DayColumnWrapper(_ref) {
  var children = _ref.children,
    className = _ref.className,
    style = _ref.style
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: className,
      style: style,
    },
    children
  )
}

var _default = DayColumnWrapper
exports.default = _default
module.exports = exports['default']
