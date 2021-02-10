'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _Week = _interopRequireDefault(require('./Week'))

var _TimeGrid = _interopRequireDefault(require('./TimeGrid'))

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\WorkWeek.js'

function workWeekRange(date, options) {
  return _Week.default
    .range(date, options)
    .filter(d => [6, 0].indexOf(d.getDay()) === -1)
}

class WorkWeek extends _react.default.Component {
  render() {
    var _this$props = this.props,
      { date } = _this$props,
      props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ['date'])
    var range = workWeekRange(date, this.props)
    return /*#__PURE__*/ _react.default.createElement(
      _TimeGrid.default,
      (0, _extends2.default)({}, props, {
        range: range,
        eventOffset: 15,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18,
          columnNumber: 12,
        },
      })
    )
  }
}

WorkWeek.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        date: _propTypes.default.instanceOf(Date).isRequired,
      }
    : {}
WorkWeek.defaultProps = _TimeGrid.default.defaultProps
WorkWeek.range = workWeekRange
WorkWeek.navigate = _Week.default.navigate

WorkWeek.title = (date, _ref) => {
  var { localizer } = _ref
  var [start, ...rest] = workWeekRange(date, {
    localizer,
  })
  return localizer.format(
    {
      start,
      end: rest.pop(),
    },
    'dayRangeHeaderFormat'
  )
}

var _default = WorkWeek
exports.default = _default
module.exports = exports.default
