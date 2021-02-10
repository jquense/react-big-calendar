'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _clsx = _interopRequireDefault(require('clsx'))

var _react = _interopRequireDefault(require('react'))

var _EventRowMixin = _interopRequireDefault(require('./EventRowMixin'))

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\EventRow.js'

class EventRow extends _react.default.Component {
  render() {
    var {
      segments,
      slotMetrics: { slots },
      className,
    } = this.props
    var lastEnd = 1
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: (0, _clsx.default)(className, 'rbc-row'),
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17,
          columnNumber: 7,
        },
      },
      segments.reduce((row, _ref, li) => {
        var { event, left, right, span } = _ref
        var key = '_lvl_' + li
        var gap = left - lastEnd

        var content = _EventRowMixin.default.renderEvent(this.props, event)

        if (gap)
          row.push(_EventRowMixin.default.renderSpan(slots, gap, key + '_gap'))
        row.push(_EventRowMixin.default.renderSpan(slots, span, key, content))
        lastEnd = right + 1
        return row
      }, [])
    )
  }
}

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
module.exports = exports.default
