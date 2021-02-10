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
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\Day.js'

class Day extends _react.default.Component {
  render() {
    var _this$props = this.props,
      { date } = _this$props,
      props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ['date'])
    var range = Day.range(date)
    return /*#__PURE__*/ _react.default.createElement(
      _TimeGrid.default,
      (0, _extends2.default)({}, props, {
        range: range,
        eventOffset: 10,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13,
          columnNumber: 12,
        },
      })
    )
  }
}

Day.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        date: _propTypes.default.instanceOf(Date).isRequired,
      }
    : {}

Day.range = date => {
  return [dates.startOf(date, 'day')]
}

Day.navigate = (date, action) => {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return dates.add(date, -1, 'day')

    case _constants.navigate.NEXT:
      return dates.add(date, 1, 'day')

    default:
      return date
  }
}

Day.title = (date, _ref) => {
  var { localizer } = _ref
  return localizer.format(date, 'dayHeaderFormat')
}

var _default = Day
exports.default = _default
module.exports = exports.default
