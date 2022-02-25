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

var Day = /*#__PURE__*/ (function(_React$Component) {
  ;(0, _inheritsLoose2.default)(Day, _React$Component)

  function Day() {
    return _React$Component.apply(this, arguments) || this
  }

  var _proto = Day.prototype

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
    var range = Day.range(date, {
      localizer: localizer,
    })
    return /*#__PURE__*/ _react.default.createElement(
      _TimeGrid.default,
      (0, _extends2.default)({}, props, {
        range: range,
        eventOffset: 10,
        localizer: localizer,
        min: min,
        max: max,
        scrollToTime: scrollToTime,
      })
    )
  }

  return Day
})(_react.default.Component)

Day.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        date: _propTypes.default.instanceOf(Date).isRequired,
        localizer: _propTypes.default.any,
        min: _propTypes.default.instanceOf(Date),
        max: _propTypes.default.instanceOf(Date),
        scrollToTime: _propTypes.default.instanceOf(Date),
      }
    : {}

Day.range = function(date, _ref) {
  var localizer = _ref.localizer
  return [localizer.startOf(date, 'day')]
}

Day.navigate = function(date, action, _ref2) {
  var localizer = _ref2.localizer

  switch (action) {
    case _constants.navigate.PREVIOUS:
      return localizer.add(date, -1, 'day')

    case _constants.navigate.NEXT:
      return localizer.add(date, 1, 'day')

    default:
      return date
  }
}

Day.title = function(date, _ref3) {
  var localizer = _ref3.localizer
  return localizer.format(date, 'dayHeaderFormat')
}

var _default = Day
exports.default = _default
module.exports = exports.default
