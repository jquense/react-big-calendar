'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _accessors = require('./utils/accessors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EventCell = _react2.default.createClass({
  displayName: 'EventCell',
  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var event = _props.event;
    var selected = _props.selected;
    var eventPropGetter = _props.eventPropGetter;
    var startAccessor = _props.startAccessor;
    var endAccessor = _props.endAccessor;
    var titleAccessor = _props.titleAccessor;
    var slotStart = _props.slotStart;
    var slotEnd = _props.slotEnd;
    var onSelect = _props.onSelect;
    var component = _props.component;

    var props = _objectWithoutProperties(_props, ['className', 'event', 'selected', 'eventPropGetter', 'startAccessor', 'endAccessor', 'titleAccessor', 'slotStart', 'slotEnd', 'onSelect', 'component']);

    var Component = component;

    var title = (0, _accessors.accessor)(event, titleAccessor),
        end = (0, _accessors.accessor)(event, endAccessor),
        start = (0, _accessors.accessor)(event, startAccessor),
        isAllDay = (0, _accessors.accessor)(event, props.allDayAccessor),
        continuesPrior = _dates2.default.lt(start, slotStart, 'day'),
        continuesAfter = _dates2.default.gt(end, slotEnd, 'day');

    if (eventPropGetter) {
      var _eventPropGetter = eventPropGetter(event, start, end, selected);

      var style = _eventPropGetter.style;
      var xClassName = _eventPropGetter.className;
    }

    return _react2.default.createElement(
      'div',
      _extends({}, props, {
        style: _extends({}, props.style, style),
        className: (0, _classnames2.default)('rbc-event', className, xClassName, {
          'rbc-selected': selected,
          'rbc-event-allday': isAllDay || _dates2.default.diff(start, _dates2.default.ceil(end, 'day'), 'day') > 1,
          'rbc-event-continues-prior': continuesPrior,
          'rbc-event-continues-after': continuesAfter
        }),
        onClick: function onClick() {
          return onSelect(event);
        }
      }),
      _react2.default.createElement(
        'div',
        { className: 'rbc-event-content', title: title },
        Component ? _react2.default.createElement(Component, { event: event, title: title }) : title
      )
    );
  }
});

exports.default = EventCell;
module.exports = exports['default'];