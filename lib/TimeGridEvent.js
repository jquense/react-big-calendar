'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _clsx = _interopRequireDefault(require('clsx'))

var _react = _interopRequireDefault(require('react'))

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\TimeGridEvent.js'

function stringifyPercent(v) {
  return typeof v === 'string' ? v : v + '%'
}
/* eslint-disable react/prop-types */

function TimeGridEvent(props) {
  var {
    style,
    className,
    event,
    accessors,
    rtl,
    selected,
    label,
    continuesEarlier,
    continuesLater,
    getters,
    onClick,
    onDoubleClick,
    isBackgroundEvent,
    onKeyPress,
    components: { event: Event, eventWrapper: EventWrapper },
  } = props
  var title = accessors.title(event)
  var tooltip = accessors.tooltip(event)
  var end = accessors.end(event)
  var start = accessors.start(event)
  var userProps = getters.eventProp(event, start, end, selected)
  var { height, top, width, xOffset } = style
  var inner = [
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        key: '1',
        className: 'rbc-event-label',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36,
          columnNumber: 5,
        },
      },
      label
    ),
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        key: '2',
        className: 'rbc-event-content',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 5,
        },
      },
      Event
        ? /*#__PURE__*/ _react.default.createElement(Event, {
            event: event,
            title: title,
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 40,
              columnNumber: 16,
            },
          })
        : title
    ),
  ]
  var eventStyle = isBackgroundEvent
    ? (0, _extends2.default)({}, userProps.style, {
        top: stringifyPercent(top),
        height: stringifyPercent(height),
        // Adding 10px to take events container right margin into account
        width: 'calc(' + width + ' + 10px)',
        [rtl ? 'right' : 'left']: stringifyPercent(Math.max(0, xOffset)),
      })
    : (0, _extends2.default)({}, userProps.style, {
        top: stringifyPercent(top),
        width: stringifyPercent(width),
        height: stringifyPercent(height),
        [rtl ? 'right' : 'left']: stringifyPercent(xOffset),
      })
  return /*#__PURE__*/ _react.default.createElement(
    EventWrapper,
    (0, _extends2.default)(
      {
        type: 'time',
      },
      props,
      {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62,
          columnNumber: 5,
        },
      }
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
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63,
          columnNumber: 7,
        },
      },
      inner
    )
  )
}

var _default = TimeGridEvent
exports.default = _default
module.exports = exports.default
