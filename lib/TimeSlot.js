'use strict'

exports.__esModule = true

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _classnames = require('classnames')

var _classnames2 = _interopRequireDefault(_classnames)

var _propTypes3 = require('./utils/propTypes')

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

var TimeSlot = (function(_Component) {
  _inherits(TimeSlot, _Component)

  function TimeSlot() {
    _classCallCheck(this, TimeSlot)

    return _possibleConstructorReturn(this, _Component.apply(this, arguments))
  }

  TimeSlot.prototype.render = function render() {
    var _props = this.props,
      value = _props.value,
      slotPropGetter = _props.slotPropGetter,
      resource = _props.resource

    var Wrapper = this.props.dayWrapperComponent

    var _ref = (slotPropGetter && slotPropGetter(value)) || {},
      className = _ref.className,
      style = _ref.style

    return _react2.default.createElement(
      Wrapper,
      { value: value, resource: resource },
      _react2.default.createElement(
        'div',
        {
          style: style,
          className: (0, _classnames2.default)(
            'rbc-time-slot',
            className,
            this.props.showLabel && 'rbc-label',
            this.props.isNow && 'rbc-now'
          ),
        },
        this.props.showLabel &&
          _react2.default.createElement('span', null, this.props.content)
      )
    )
  }

  return TimeSlot
})(_react.Component)

TimeSlot.propTypes = {
  dayWrapperComponent: _propTypes3.elementType,
  value: _propTypes2.default.instanceOf(Date).isRequired,
  isNow: _propTypes2.default.bool,
  showLabel: _propTypes2.default.bool,
  content: _propTypes2.default.string,
  culture: _propTypes2.default.string,
  slotPropGetter: _propTypes2.default.func,
  resource: _propTypes2.default.string,
}
TimeSlot.defaultProps = {
  isNow: false,
  showLabel: false,
  content: '',
}
exports.default = TimeSlot
module.exports = exports['default']
