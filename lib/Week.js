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

var _dates = _interopRequireDefault(require('./utils/dates'))

var _constants = require('./utils/constants')

var _TimeGrid = _interopRequireDefault(require('./TimeGrid'))

var Week =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(Week, _React$Component)

    function Week() {
      return _React$Component.apply(this, arguments) || this
    }

    var _proto = Week.prototype

    _proto.render = function render() {
      var _this$props = this.props,
        date = _this$props.date,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, [
          'date',
        ])
      var range = Week.range(date, this.props)
      return _react.default.createElement(
        _TimeGrid.default,
        (0, _extends2.default)({}, props, {
          range: range,
          eventOffset: 15,
        })
      )
    }

    return Week
  })(_react.default.Component)

Week.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        date: _propTypes.default.instanceOf(Date).isRequired,
      }
    : {}
Week.defaultProps = _TimeGrid.default.defaultProps

Week.navigate = function(date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates.default.add(date, -1, 'week')

    case _constants.navigate.NEXT:
      return _dates.default.add(date, 1, 'week')

    default:
      return date
  }
}

Week.range = function(date, _ref) {
  var localizer = _ref.localizer
  var firstOfWeek = localizer.startOfWeek()

  var start = _dates.default.startOf(date, 'week', firstOfWeek)

  var end = _dates.default.endOf(date, 'week', firstOfWeek)

  return _dates.default.range(start, end)
}

Week.title = function(date, _ref2) {
  var localizer = _ref2.localizer

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
module.exports = exports['default']
