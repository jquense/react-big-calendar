'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _propTypes = _interopRequireDefault(require('prop-types'))
var _react = _interopRequireDefault(require('react'))
var DateHeader = function DateHeader(_ref) {
  var label = _ref.label,
    drilldownView = _ref.drilldownView,
    onDrillDown = _ref.onDrillDown
  if (!drilldownView) {
    return /*#__PURE__*/ _react.default.createElement('span', null, label)
  }
  return /*#__PURE__*/ _react.default.createElement(
    'button',
    {
      type: 'button',
      className: 'rbc-button-link',
      onClick: onDrillDown,
      role: 'cell',
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
var _default = (exports.default = DateHeader)
