'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _clsx = _interopRequireDefault(require('clsx'))

var _react = _interopRequireDefault(require('react'))

var _EventRowMixin = _interopRequireDefault(require('./EventRowMixin'))

var EventRow =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(EventRow, _React$Component)

    function EventRow() {
      return _React$Component.apply(this, arguments) || this
    }

    var _proto = EventRow.prototype

    _proto.render = function render() {
      var _this = this

      var _this$props = this.props,
        segments = _this$props.segments,
        slots = _this$props.slotMetrics.slots,
        className = _this$props.className
      var lastEnd = 1
      return _react.default.createElement(
        'div',
        {
          className: (0, _clsx.default)(className, 'rbc-row'),
        },
        segments.reduce(function(row, _ref, li) {
          var event = _ref.event,
            left = _ref.left,
            right = _ref.right,
            span = _ref.span
          var key = '_lvl_' + li
          var gap = left - lastEnd

          var content = _EventRowMixin.default.renderEvent(_this.props, event)

          if (gap)
            row.push(
              _EventRowMixin.default.renderSpan(slots, gap, key + '_gap')
            )
          row.push(_EventRowMixin.default.renderSpan(slots, span, key, content))
          lastEnd = right + 1
          return row
        }, [])
      )
    }

    return EventRow
  })(_react.default.Component)

EventRow.propTypes =
  process.env.NODE_ENV !== 'production'
    ? (0, _extends2.default)(
        {
          segments: _propTypes.default.array,
        },
        _EventRowMixin.default.propTypes
      )
    : {}
EventRow.defaultProps = (0, _extends2.default)(
  {},
  _EventRowMixin.default.defaultProps
)
var _default = EventRow
exports.default = _default
module.exports = exports['default']
