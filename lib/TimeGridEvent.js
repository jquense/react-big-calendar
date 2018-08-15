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

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

/* eslint-disable react/prop-types */
function TimeGridEvent(props) {
  var _extends2

  var style = props.style,
    className = props.className,
    event = props.event,
    accessors = props.accessors,
    isRtl = props.isRtl,
    selected = props.selected,
    label = props.label,
    continuesEarlier = props.continuesEarlier,
    continuesLater = props.continuesLater,
    getters = props.getters,
    _props$components = props.components,
    Event = _props$components.event,
    EventWrapper = _props$components.eventWrapper

  var title = accessors.title(event)
  var tooltip = accessors.tooltip(event)
  var end = accessors.end(event)
  var start = accessors.start(event)

  var userProps = getters.eventProp(event, start, end, selected)

  var height = style.height,
    top = style.top,
    width = style.width,
    xOffset = style.xOffset

  var inner = [
    _react2.default.createElement(
      'div',
      { key: '1', className: 'rbc-event-label' },
      label
    ),
    _react2.default.createElement(
      'div',
      { key: '2', className: 'rbc-event-content' },
      Event
        ? _react2.default.createElement(Event, { event: event, title: title })
        : title
    ),
  ]

  return _react2.default.createElement(
    EventWrapper,
    _extends({ type: 'time' }, props),
    _react2.default.createElement(
      'div',
      {
        style: _extends(
          {},
          userProps.style,
          ((_extends2 = {
            top: top + '%',
            height: height + '%',
          }),
          (_extends2[isRtl ? 'right' : 'left'] = Math.max(0, xOffset) + '%'),
          (_extends2.width = width + '%'),
          _extends2)
        ),
        title: tooltip
          ? (typeof label === 'string' ? label + ': ' : '') + tooltip
          : undefined,
        className: (0, _classnames2.default)(
          'rbc-event',
          className,
          userProps.className,
          {
            'rbc-selected': selected,
            'rbc-event-continues-earlier': continuesEarlier,
            'rbc-event-continues-later': continuesLater,
          }
        ),
      },
      inner
    )
  )
}

exports.default = TimeGridEvent
module.exports = exports['default']
