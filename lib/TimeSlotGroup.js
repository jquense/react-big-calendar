'use strict'

exports.__esModule = true

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

var _classnames = require('classnames')

var _classnames2 = _interopRequireDefault(_classnames)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _BackgroundWrapper = require('./BackgroundWrapper')

var _BackgroundWrapper2 = _interopRequireDefault(_BackgroundWrapper)

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

var TimeSlotGroup = (function(_Component) {
  _inherits(TimeSlotGroup, _Component)

  function TimeSlotGroup() {
    _classCallCheck(this, TimeSlotGroup)

    return _possibleConstructorReturn(this, _Component.apply(this, arguments))
  }

  TimeSlotGroup.prototype.render = function render() {
    var _props = this.props,
      renderSlot = _props.renderSlot,
      resource = _props.resource,
      group = _props.group,
      getters = _props.getters,
      _props$components = _props.components
    _props$components = _props$components === undefined ? {} : _props$components
    var _props$components$tim = _props$components.timeSlotWrapper,
      Wrapper =
        _props$components$tim === undefined
          ? _BackgroundWrapper2.default
          : _props$components$tim

    return _react2.default.createElement(
      'div',
      { className: 'rbc-timeslot-group' },
      group.map(function(value, idx) {
        var slotProps = getters ? getters.slotProp(value) : {}
        return _react2.default.createElement(
          Wrapper,
          { key: idx, value: value, resource: resource },
          _react2.default.createElement(
            'div',
            _extends({}, slotProps, {
              className: (0, _classnames2.default)(
                'rbc-time-slot',
                slotProps.className
              ),
            }),
            renderSlot && renderSlot(value, idx)
          )
        )
      })
    )
  }

  return TimeSlotGroup
})(_react.Component)

TimeSlotGroup.propTypes = {
  renderSlot: _propTypes2.default.func,
  group: _propTypes2.default.array.isRequired,
  resource: _propTypes2.default.any,
  components: _propTypes2.default.object,
  getters: _propTypes2.default.object,
}
exports.default = TimeSlotGroup
module.exports = exports['default']
