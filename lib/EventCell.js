'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _clsx = _interopRequireDefault(require('clsx'))

var dates = _interopRequireWildcard(require('./utils/dates'))

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\EventCell.js'

class EventCell extends _react.default.Component {
  render() {
    var _this$props = this.props,
      {
        style,
        className,
        event,
        selected,
        isAllDay,
        onSelect,
        onDoubleClick: _onDoubleClick,
        onKeyPress: _onKeyPress,
        localizer,
        continuesPrior,
        continuesAfter,
        accessors,
        getters,
        children,
        components: { event: Event, eventWrapper: EventWrapper },
        slotStart,
        slotEnd,
      } = _this$props,
      props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, [
        'style',
        'className',
        'event',
        'selected',
        'isAllDay',
        'onSelect',
        'onDoubleClick',
        'onKeyPress',
        'localizer',
        'continuesPrior',
        'continuesAfter',
        'accessors',
        'getters',
        'children',
        'components',
        'slotStart',
        'slotEnd',
      ])
    delete props.resizable
    var title = accessors.title(event)
    var tooltip = accessors.tooltip(event)
    var end = accessors.end(event)
    var start = accessors.start(event)
    var allDay = accessors.allDay(event)
    var showAsAllDay =
      isAllDay || allDay || dates.diff(start, dates.ceil(end, 'day'), 'day') > 1
    var userProps = getters.eventProp(event, start, end, selected)

    var content = /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: 'rbc-event-content',
        title: tooltip || undefined,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42,
          columnNumber: 7,
        },
      },
      Event
        ? /*#__PURE__*/ _react.default.createElement(Event, {
            event: event,
            continuesPrior: continuesPrior,
            continuesAfter: continuesAfter,
            title: title,
            isAllDay: allDay,
            localizer: localizer,
            slotStart: slotStart,
            slotEnd: slotEnd,
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 44,
              columnNumber: 11,
            },
          })
        : title
    )

    return /*#__PURE__*/ _react.default.createElement(
      EventWrapper,
      (0, _extends2.default)({}, this.props, {
        type: 'date',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61,
          columnNumber: 7,
        },
      }),
      /*#__PURE__*/ _react.default.createElement(
        'div',
        (0, _extends2.default)({}, props, {
          tabIndex: 0,
          style: (0, _extends2.default)({}, userProps.style, style),
          className: (0, _clsx.default)(
            'rbc-event',
            className,
            userProps.className,
            {
              'rbc-selected': selected,
              'rbc-event-allday': showAsAllDay,
              'rbc-event-continues-prior': continuesPrior,
              'rbc-event-continues-after': continuesAfter,
            }
          ),
          onClick: e => onSelect && onSelect(event, e),
          onDoubleClick: e => _onDoubleClick && _onDoubleClick(event, e),
          onKeyPress: e => _onKeyPress && _onKeyPress(event, e),
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 62,
            columnNumber: 9,
          },
        }),
        typeof children === 'function' ? children(content) : content
      )
    )
  }
}

EventCell.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        event: _propTypes.default.object.isRequired,
        slotStart: _propTypes.default.instanceOf(Date),
        slotEnd: _propTypes.default.instanceOf(Date),
        resizable: _propTypes.default.bool,
        selected: _propTypes.default.bool,
        isAllDay: _propTypes.default.bool,
        continuesPrior: _propTypes.default.bool,
        continuesAfter: _propTypes.default.bool,
        accessors: _propTypes.default.object.isRequired,
        components: _propTypes.default.object.isRequired,
        getters: _propTypes.default.object.isRequired,
        localizer: _propTypes.default.object,
        onSelect: _propTypes.default.func,
        onDoubleClick: _propTypes.default.func,
        onKeyPress: _propTypes.default.func,
      }
    : {}
var _default = EventCell
exports.default = _default
module.exports = exports.default
