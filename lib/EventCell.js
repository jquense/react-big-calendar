'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _propTypes3 = require('./utils/propTypes');

var _accessors = require('./utils/accessors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  event: _propTypes2.default.object.isRequired,
  slotStart: _propTypes2.default.instanceOf(Date),
  slotEnd: _propTypes2.default.instanceOf(Date),

  selected: _propTypes2.default.bool,
  eventPropGetter: _propTypes2.default.func,
  titleAccessor: _propTypes3.accessor,
  allDayAccessor: _propTypes3.accessor,
  startAccessor: _propTypes3.accessor,
  endAccessor: _propTypes3.accessor,

  eventComponent: _propTypes3.elementType,
  eventWrapperComponent: _propTypes3.elementType.isRequired,
  onSelect: _propTypes2.default.func
};

var EventCell = function (_React$Component) {
  _inherits(EventCell, _React$Component);

  function EventCell() {
    _classCallCheck(this, EventCell);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  EventCell.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        event = _props.event,
        selected = _props.selected,
        eventPropGetter = _props.eventPropGetter,
        startAccessor = _props.startAccessor,
        endAccessor = _props.endAccessor,
        titleAccessor = _props.titleAccessor,
        slotStart = _props.slotStart,
        slotEnd = _props.slotEnd,
        onSelect = _props.onSelect,
        Event = _props.eventComponent,
        EventWrapper = _props.eventWrapperComponent,
        props = _objectWithoutProperties(_props, ['className', 'event', 'selected', 'eventPropGetter', 'startAccessor', 'endAccessor', 'titleAccessor', 'slotStart', 'slotEnd', 'onSelect', 'eventComponent', 'eventWrapperComponent']);

    var title = (0, _accessors.accessor)(event, titleAccessor),
        end = (0, _accessors.accessor)(event, endAccessor),
        start = (0, _accessors.accessor)(event, startAccessor),
        isAllDay = (0, _accessors.accessor)(event, props.allDayAccessor),
        continuesPrior = _dates2.default.lt(start, slotStart, 'day'),
        continuesAfter = _dates2.default.gt(end, slotEnd, 'day');

    if (eventPropGetter) var _eventPropGetter = eventPropGetter(event, start, end, selected),
          style = _eventPropGetter.style,
          xClassName = _eventPropGetter.className;

    return _react2.default.createElement(
      EventWrapper,
      { event: event },
      _react2.default.createElement(
        'div',
        {
          style: _extends({}, props.style, style),
          className: (0, _classnames2.default)('rbc-event', className, xClassName, {
            'rbc-selected': selected,
            'rbc-event-allday': isAllDay || _dates2.default.diff(start, _dates2.default.ceil(end, 'day'), 'day') > 1,
            'rbc-event-continues-prior': continuesPrior,
            'rbc-event-continues-after': continuesAfter
          }),
          onClick: function onClick(e) {
            return onSelect(event, e);
          }
        },
        _react2.default.createElement(
          'div',
          { className: 'rbc-event-content', title: title },
          Event ? _react2.default.createElement(Event, { event: event, title: title }) : title
        )
      )
    );
  };

  return EventCell;
}(_react2.default.Component);

EventCell.propTypes = propTypes;

exports.default = EventCell;