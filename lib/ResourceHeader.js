'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\ResourceHeader.js'

var ResourceHeader = _ref => {
  var { label } = _ref
  return /*#__PURE__*/ _react.default.createElement(
    _react.default.Fragment,
    {
      __self: void 0,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 5,
        columnNumber: 10,
      },
    },
    label
  )
}

ResourceHeader.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        label: _propTypes.default.node,
        index: _propTypes.default.number,
        resource: _propTypes.default.object,
      }
    : {}
var _default = ResourceHeader
exports.default = _default
module.exports = exports.default
