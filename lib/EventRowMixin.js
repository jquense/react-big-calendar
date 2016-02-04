'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _EventCell = require('./EventCell');

var _EventCell2 = _interopRequireDefault(_EventCell);

var _domHelpersQueryHeight = require('dom-helpers/query/height');

var _domHelpersQueryHeight2 = _interopRequireDefault(_domHelpersQueryHeight);

var _utilsPropTypes = require('./utils/propTypes');

var _utilsEventLevels = require('./utils/eventLevels');

var _utilsSelection = require('./utils/selection');

exports['default'] = {
  propType: {
    slots: _react.PropTypes.number.isRequired,
    end: _react.PropTypes.instanceOf(Date),
    start: _react.PropTypes.instanceOf(Date),

    selected: _react.PropTypes.array,
    eventPropGetter: _react.PropTypes.func,
    titleAccessor: _utilsPropTypes.accessor,
    allDayAccessor: _utilsPropTypes.accessor,
    startAccessor: _utilsPropTypes.accessor,
    endAccessor: _utilsPropTypes.accessor,

    eventComponent: _utilsPropTypes.elementType,
    onSelect: _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      segments: [],
      selected: [],
      slots: 7
    };
  },

  renderEvent: function renderEvent(event) {
    var _props = this.props;
    var eventPropGetter = _props.eventPropGetter;
    var selected = _props.selected;
    var start = _props.start;
    var end = _props.end;
    var startAccessor = _props.startAccessor;
    var endAccessor = _props.endAccessor;
    var titleAccessor = _props.titleAccessor;
    var allDayAccessor = _props.allDayAccessor;
    var eventComponent = _props.eventComponent;
    var onSelect = _props.onSelect;

    return _react2['default'].createElement(_EventCell2['default'], {
      event: event,
      eventPropGetter: eventPropGetter,
      onSelect: onSelect,
      selected: _utilsSelection.isSelected(event, selected),
      startAccessor: startAccessor,
      endAccessor: endAccessor,
      titleAccessor: titleAccessor,
      allDayAccessor: allDayAccessor,
      slotStart: start,
      slotEnd: end,
      component: eventComponent
    });
  },

  renderSpan: function renderSpan(len, key) {
    var content = arguments.length <= 2 || arguments[2] === undefined ? ' ' : arguments[2];
    var slots = this.props.slots;

    return _react2['default'].createElement(
      'div',
      { key: key, className: 'rbc-row-segment', style: _utilsEventLevels.segStyle(Math.abs(len), slots) },
      content
    );
  },

  getRowHeight: function getRowHeight() {
    _domHelpersQueryHeight2['default'](_reactDom.findDOMNode(this));
  }
};
module.exports = exports['default'];