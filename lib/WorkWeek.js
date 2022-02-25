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

var _Week = _interopRequireDefault(require('./Week'))

var _TimeGrid = _interopRequireDefault(require('./TimeGrid'))

var _excluded = ['date', 'localizer', 'min', 'max', 'scrollToTime']

function workWeekRange(date, options) {
  return _Week.default.range(date, options).filter(function(d) {
    return [6, 0].indexOf(d.getDay()) === -1
  })
}

var WorkWeek = /*#__PURE__*/ (function(_React$Component) {
  ;(0, _inheritsLoose2.default)(WorkWeek, _React$Component)

  function WorkWeek() {
    return _React$Component.apply(this, arguments) || this
  }

  var _proto = WorkWeek.prototype

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
    var range = workWeekRange(date, this.props)
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

  return WorkWeek
})(_react.default.Component)

WorkWeek.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        date: _propTypes.default.instanceOf(Date).isRequired,
        localizer: _propTypes.default.any,
        min: _propTypes.default.instanceOf(Date),
        max: _propTypes.default.instanceOf(Date),
        scrollToTime: _propTypes.default.instanceOf(Date),
      }
    : {}
WorkWeek.defaultProps = _TimeGrid.default.defaultProps
WorkWeek.range = workWeekRange
WorkWeek.navigate = _Week.default.navigate

WorkWeek.title = function(date, _ref) {
  var localizer = _ref.localizer

  var _workWeekRange = workWeekRange(date, {
      localizer: localizer,
    }),
    start = _workWeekRange[0],
    rest = _workWeekRange.slice(1)

  return localizer.format(
    {
      start: start,
      end: rest.pop(),
    },
    'dayRangeHeaderFormat'
  )
}

var _default = WorkWeek
exports.default = _default
module.exports = exports.default
