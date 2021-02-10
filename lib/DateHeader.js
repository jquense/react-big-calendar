'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\DateHeader.js'

var DateHeader = _ref => {
  var { label, drilldownView, onDrillDown } = _ref

  if (!drilldownView) {
    return /*#__PURE__*/ _react.default.createElement(
      'span',
      {
        __self: void 0,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 6,
          columnNumber: 12,
        },
      },
      label
    )
  }

  return /*#__PURE__*/ _react.default.createElement(
    'a',
    {
      href: '#',
      onClick: onDrillDown,
      __self: void 0,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 5,
      },
    },
    label
  )
}

DateHeader.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        label: _propTypes.default.node,
        date: _propTypes.default.instanceOf(Date),
        drilldownView: _propTypes.default.string,
        onDrillDown: _propTypes.default.func,
        isOffRange: _propTypes.default.bool,
      }
    : {}
var _default = DateHeader
exports.default = _default
module.exports = exports.default
