'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends4 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _clsx = _interopRequireDefault(require('clsx'))

var _react = _interopRequireDefault(require('react'))

function stringifyPercent(v) {
  return typeof v === 'string' ? v : v + '%'
}
/* eslint-disable react/prop-types */

function TimeGridEvent(props) {
  var _extends2, _extends3

  var style = props.style,
    className = props.className,
    event = props.event,
    accessors = props.accessors,
    rtl = props.rtl,
    selected = props.selected,
    label = props.label,
    continuesEarlier = props.continuesEarlier,
    continuesLater = props.continuesLater,
    getters = props.getters,
    onClick = props.onClick,
    onDoubleClick = props.onDoubleClick,
    isBackgroundEvent = props.isBackgroundEvent,
    onKeyPress = props.onKeyPress,
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
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        key: '1',
        className: 'rbc-event-label',
      },
      label
    ),
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        key: '2',
        className: 'rbc-event-content',
      },
      Event
        ? /*#__PURE__*/ _react.default.createElement(Event, {
            event: event,
            title: title,
          })
        : title
    ),
  ]
  var eventStyle = isBackgroundEvent
    ? (0, _extends4.default)(
        {},
        userProps.style,
        ((_extends2 = {
          top: stringifyPercent(top),
          height: stringifyPercent(height),
          // Adding 10px to take events container right margin into account
          width: 'calc(' + width + ' + 10px)',
        }),
        (_extends2[rtl ? 'right' : 'left'] = stringifyPercent(
          Math.max(0, xOffset)
        )),
        _extends2)
      )
    : (0, _extends4.default)(
        {},
        userProps.style,
        ((_extends3 = {
          top: stringifyPercent(top),
          width: stringifyPercent(width),
          height: stringifyPercent(height),
        }),
        (_extends3[rtl ? 'right' : 'left'] = stringifyPercent(xOffset)),
        _extends3)
      )
  return /*#__PURE__*/ _react.default.createElement(
    EventWrapper,
    (0, _extends4.default)(
      {
        type: 'time',
      },
      props
    ),
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        onClick: onClick,
        onDoubleClick: onDoubleClick,
        style: eventStyle,
        onKeyPress: onKeyPress,
        title: tooltip
          ? (typeof label === 'string' ? label + ': ' : '') + tooltip
          : undefined,
        className: (0, _clsx.default)(
          isBackgroundEvent ? 'rbc-background-event' : 'rbc-event',
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

var _default = TimeGridEvent
exports.default = _default
module.exports = exports['default']
