'use strict'

exports.__esModule = true

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var DateHeader = function DateHeader(_ref) {
  var label = _ref.label,
    drilldownView = _ref.drilldownView,
    onDrillDown = _ref.onDrillDown

  if (!drilldownView) {
    return _react2.default.createElement('span', null, label)
  }

  return _react2.default.createElement(
    'a',
    { href: '#', onClick: onDrillDown },
    label
  )
}

DateHeader.propTypes = {
  label: _propTypes2.default.node,
  date: _propTypes2.default.instanceOf(Date),
  drilldownView: _propTypes2.default.string,
  onDrillDown: _propTypes2.default.func,
  isOffRange: _propTypes2.default.bool,
}

exports.default = DateHeader
module.exports = exports['default']
