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

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _constants = require('./utils/constants')

var _TimeGrid = _interopRequireDefault(require('./TimeGrid'))

var _excluded = ['date', 'localizer', 'min', 'max', 'scrollToTime']

var Week = /*#__PURE__*/ (function(_React$Component) {
  ;(0, _inheritsLoose2.default)(Week, _React$Component)

  function Week() {
    return _React$Component.apply(this, arguments) || this
  }

  var _proto = Week.prototype

  _proto.render = function render() {
    /**
     * This allows us to default min, max, and scrollToTime
     * using our localizer. This is necessary until such time
     * as TimeGrid is converted to a functional component.
     */
    var _this$props = this.props,
      date = _this$props.date,
      localizer = _this$props.localizer,
      _this$props$min = _this$props.min,
      min =
        _this$props$min === void 0
          ? localizer.startOf(new Date(), 'day')
          : _this$props$min,
      _this$props$max = _this$props.max,
      max =
        _this$props$max === void 0
          ? localizer.endOf(new Date(), 'day')
          : _this$props$max,
      _this$props$scrollToT = _this$props.scrollToTime,
      scrollToTime =
        _this$props$scrollToT === void 0
          ? localizer.startOf(new Date(), 'day')
          : _this$props$scrollToT,
      props = (0, _objectWithoutPropertiesLoose2.default)(
        _this$props,
        _excluded
      )
    var range = Week.range(date, this.props)
    return /*#__PURE__*/ _react.default.createElement(
      _TimeGrid.default,
      (0, _extends2.default)({}, props, {
        range: range,
        eventOffset: 15,
        localizer: localizer,
        min: min,
        max: max,
        scrollToTime: scrollToTime,
      })
    )
  }

  return Week
})(_react.default.Component)

Week.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        date: _propTypes.default.instanceOf(Date).isRequired,
        localizer: _propTypes.default.any,
        min: _propTypes.default.instanceOf(Date),
        max: _propTypes.default.instanceOf(Date),
        scrollToTime: _propTypes.default.instanceOf(Date),
      }
    : {}
Week.defaultProps = _TimeGrid.default.defaultProps

Week.navigate = function(date, action, _ref) {
  var localizer = _ref.localizer

  switch (action) {
    case _constants.navigate.PREVIOUS:
      return localizer.add(date, -1, 'week')

    case _constants.navigate.NEXT:
      return localizer.add(date, 1, 'week')

    default:
      return date
  }
}

Week.range = function(date, _ref2) {
  var localizer = _ref2.localizer
  var firstOfWeek = localizer.startOfWeek()
  var start = localizer.startOf(date, 'week', firstOfWeek)
  var end = localizer.endOf(date, 'week', firstOfWeek)
  return localizer.range(start, end)
}

Week.title = function(date, _ref3) {
  var localizer = _ref3.localizer

  var _Week$range = Week.range(date, {
      localizer: localizer,
    }),
    start = _Week$range[0],
    rest = _Week$range.slice(1)

  return localizer.format(
    {
      start: start,
      end: rest.pop(),
    },
    'dayRangeHeaderFormat'
  )
}

var _default = Week
exports.default = _default
module.exports = exports.default
