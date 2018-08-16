'use strict'

exports.__esModule = true

var _classnames = require('classnames')

var _classnames2 = _interopRequireDefault(_classnames)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _TimeSlots = require('./utils/TimeSlots')

var TimeSlotUtils = _interopRequireWildcard(_TimeSlots)

var _TimeSlotGroup = require('./TimeSlotGroup')

var _TimeSlotGroup2 = _interopRequireDefault(_TimeSlotGroup)

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj
  } else {
    var newObj = {}
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key]
      }
    }
    newObj.default = obj
    return newObj
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var TimeGutter = (function(_Component) {
  _inherits(TimeGutter, _Component)

  function TimeGutter() {
    _classCallCheck(this, TimeGutter)

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    var _this = _possibleConstructorReturn(
      this,
      _Component.call.apply(_Component, [this].concat(args))
    )

    _this.renderSlot = function(value, idx) {
      if (idx !== 0) return null
      var _this$props = _this.props,
        localizer = _this$props.localizer,
        getNow = _this$props.getNow

      var isNow = _this.slotMetrics.dateIsInGroup(getNow(), idx)
      return _react2.default.createElement(
        'span',
        {
          className: (0, _classnames2.default)('rbc-label', isNow && 'rbc-now'),
        },
        localizer.format(value, 'timeGutterFormat')
      )
    }

    var _this$props2 = _this.props,
      min = _this$props2.min,
      max = _this$props2.max,
      timeslots = _this$props2.timeslots,
      step = _this$props2.step

    _this.slotMetrics = TimeSlotUtils.getSlotMetrics({
      min: min,
      max: max,
      timeslots: timeslots,
      step: step,
    })
    return _this
  }

  TimeGutter.prototype.componentWillReceiveProps = function componentWillReceiveProps(
    nextProps
  ) {
    var min = nextProps.min,
      max = nextProps.max,
      timeslots = nextProps.timeslots,
      step = nextProps.step

    this.slotMetrics = this.slotMetrics.update({
      min: min,
      max: max,
      timeslots: timeslots,
      step: step,
    })
  }

  TimeGutter.prototype.render = function render() {
    var _this2 = this

    var _props = this.props,
      resource = _props.resource,
      components = _props.components

    return _react2.default.createElement(
      'div',
      { className: 'rbc-time-gutter rbc-time-column' },
      this.slotMetrics.groups.map(function(grp, idx) {
        return _react2.default.createElement(_TimeSlotGroup2.default, {
          key: idx,
          group: grp,
          resource: resource,
          components: components,
          renderSlot: _this2.renderSlot,
        })
      })
    )
  }

  return TimeGutter
})(_react.Component)

TimeGutter.propTypes = {
  min: _propTypes2.default.instanceOf(Date).isRequired,
  max: _propTypes2.default.instanceOf(Date).isRequired,
  timeslots: _propTypes2.default.number.isRequired,
  step: _propTypes2.default.number.isRequired,
  getNow: _propTypes2.default.func.isRequired,
  components: _propTypes2.default.object.isRequired,

  localizer: _propTypes2.default.object.isRequired,
  resource: _propTypes2.default.string,
}
exports.default = TimeGutter
module.exports = exports['default']
