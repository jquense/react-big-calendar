'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var containerStyles = {
  display: 'flex',
  flexDirection: 'column',
}
var textStyles = {
  margin: 0,
}

var ResourceHeader = function ResourceHeader(_ref) {
  var title = _ref.title,
    mins = _ref.mins
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      style: containerStyles,
    },
    /*#__PURE__*/ _react.default.createElement(
      'p',
      {
        style: textStyles,
      },
      title
    ),
    /*#__PURE__*/ _react.default.createElement(
      'p',
      {
        style: textStyles,
      },
      mins
    )
  )
}

ResourceHeader.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        title: _propTypes.default.node,
        mins: _propTypes.default.number,
        index: _propTypes.default.number,
        resource: _propTypes.default.object,
      }
    : {}
var _default = ResourceHeader
exports.default = _default
module.exports = exports.default
