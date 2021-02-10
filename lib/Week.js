'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

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

var dates = _interopRequireWildcard(require('./utils/dates'))

var _constants = require('./utils/constants')

var _TimeGrid = _interopRequireDefault(require('./TimeGrid'))

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\Week.js'

class Week extends _react.default.Component {
  render() {
    var _this$props = this.props,
      { date } = _this$props,
      props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ['date'])
    var range = Week.range(date, this.props)
    return /*#__PURE__*/ _react.default.createElement(
      _TimeGrid.default,
      (0, _extends2.default)({}, props, {
        range: range,
        eventOffset: 15,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12,
          columnNumber: 12,
        },
      })
    )
  }
}

Week.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        date: _propTypes.default.instanceOf(Date).isRequired,
      }
    : {}
Week.defaultProps = _TimeGrid.default.defaultProps

Week.navigate = (date, action) => {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return dates.add(date, -1, 'week')

    case _constants.navigate.NEXT:
      return dates.add(date, 1, 'week')

    default:
      return date
  }
}

Week.range = (date, _ref) => {
  var { localizer } = _ref
  var firstOfWeek = localizer.startOfWeek()
  var start = dates.startOf(date, 'week', firstOfWeek)
  var end = dates.endOf(date, 'week', firstOfWeek)
  return dates.range(start, end)
}

Week.title = (date, _ref2) => {
  var { localizer } = _ref2
  var [start, ...rest] = Week.range(date, {
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

var _default = Week
exports.default = _default
module.exports = exports.default
