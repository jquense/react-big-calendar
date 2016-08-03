'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Selection = require('./Selection');

var _Selection2 = _interopRequireDefault(_Selection);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _selection = require('./utils/selection');

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _helpers = require('./utils/helpers');

var _propTypes = require('./utils/propTypes');

var _accessors = require('./utils/accessors');

var _TimeColumn = require('./TimeColumn');

var _TimeColumn2 = _interopRequireDefault(_TimeColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function snapToSlot(date, step) {
  var roundTo = 1000 * 60 * step;
  return new Date(Math.floor(date.getTime() / roundTo) * roundTo);
}

function positionFromDate(date, min) {
  return _dates2.default.diff(min, _dates2.default.merge(min, date), 'minutes');
}

function overlaps(event, events, _ref, last) {
  var startAccessor = _ref.startAccessor;
  var endAccessor = _ref.endAccessor;

  var eStart = (0, _accessors.accessor)(event, startAccessor);
  var offset = last;

  function overlap(eventB) {
    return _dates2.default.lt(eStart, (0, _accessors.accessor)(eventB, endAccessor));
  }

  if (!events.length) return last - 1;
  events.reverse().some(function (prevEvent) {
    if (overlap(prevEvent)) return true;
    offset = offset - 1;
  });

  return offset;
}

var DaySlot = _react2.default.createClass({
  displayName: 'DaySlot',


  propTypes: {
    events: _react2.default.PropTypes.array.isRequired,
    step: _react2.default.PropTypes.number.isRequired,
    min: _react2.default.PropTypes.instanceOf(Date).isRequired,
    max: _react2.default.PropTypes.instanceOf(Date).isRequired,

    allDayAccessor: _propTypes.accessor.isRequired,
    startAccessor: _propTypes.accessor.isRequired,
    endAccessor: _propTypes.accessor.isRequired,

    selectable: _react2.default.PropTypes.bool,
    eventOffset: _react2.default.PropTypes.number,

    onSelecting: _react2.default.PropTypes.func,
    onSelectSlot: _react2.default.PropTypes.func.isRequired,
    onSelectEvent: _react2.default.PropTypes.func.isRequired,

    className: _react2.default.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return { selecting: false };
  },
  componentDidMount: function componentDidMount() {
    this.props.selectable && this._selectable();
  },
  componentWillUnmount: function componentWillUnmount() {
    this._teardownSelectable();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable) this._selectable();
    if (!nextProps.selectable && this.props.selectable) this._teardownSelectable();
  },
  render: function render() {
    var _props = this.props;
    var min = _props.min;
    var max = _props.max;
    var step = _props.step;
    var timeslots = _props.timeslots;
    var now = _props.now;
    var selectRangeFormat = _props.selectRangeFormat;
    var culture = _props.culture;

    var props = _objectWithoutProperties(_props, ['min', 'max', 'step', 'timeslots', 'now', 'selectRangeFormat', 'culture']);

    this._totalMin = _dates2.default.diff(min, max, 'minutes');

    var _state = this.state;
    var selecting = _state.selecting;
    var startSlot = _state.startSlot;
    var endSlot = _state.endSlot;
    var style = this._slotStyle(startSlot, endSlot, 0);

    var selectDates = {
      start: this.state.startDate,
      end: this.state.endDate
    };

    return _react2.default.createElement(
      _TimeColumn2.default,
      _extends({}, props, {
        className: 'rbc-day-slot',
        timeslots: timeslots,
        now: now,
        min: min,
        max: max,
        step: step
      }),
      this.renderEvents(),
      selecting && _react2.default.createElement(
        'div',
        { className: 'rbc-slot-selection', style: style },
        _react2.default.createElement(
          'span',
          null,
          _localizer2.default.format(selectDates, selectRangeFormat, culture)
        )
      )
    );
  },
  renderEvents: function renderEvents() {
    var _this = this;

    var _props2 = this.props;
    var events = _props2.events;
    var step = _props2.step;
    var min = _props2.min;
    var culture = _props2.culture;
    var eventPropGetter = _props2.eventPropGetter;
    var selected = _props2.selected;
    var eventTimeRangeFormat = _props2.eventTimeRangeFormat;
    var eventComponent = _props2.eventComponent;
    var startAccessor = _props2.startAccessor;
    var endAccessor = _props2.endAccessor;
    var titleAccessor = _props2.titleAccessor;


    var EventComponent = eventComponent,
        lastLeftOffset = 0;

    events.sort(function (a, b) {
      return +(0, _accessors.accessor)(a, startAccessor) - +(0, _accessors.accessor)(b, startAccessor);
    });

    return events.map(function (event, idx) {
      var start = (0, _accessors.accessor)(event, startAccessor);
      var end = (0, _accessors.accessor)(event, endAccessor);
      var startSlot = positionFromDate(start, min, step);
      var endSlot = positionFromDate(end, min, step);

      lastLeftOffset = Math.max(0, overlaps(event, events.slice(0, idx), _this.props, lastLeftOffset + 1));

      var style = _this._slotStyle(startSlot, endSlot, lastLeftOffset);

      var title = (0, _accessors.accessor)(event, titleAccessor);
      var label = _localizer2.default.format({ start: start, end: end }, eventTimeRangeFormat, culture);
      var _isSelected = (0, _selection.isSelected)(event, selected);

      if (eventPropGetter) {
        var _eventPropGetter = eventPropGetter(event, start, end, _isSelected);

        var xStyle = _eventPropGetter.style;
        var className = _eventPropGetter.className;
      }

      return _react2.default.createElement(
        'div',
        {
          key: 'evt_' + idx,
          style: _extends({}, xStyle, style),
          title: label + ': ' + title,
          onClick: _this._select.bind(null, event),
          className: (0, _classnames2.default)('rbc-event', className, {
            'rbc-selected': _isSelected,
            'rbc-event-overlaps': lastLeftOffset !== 0
          })
        },
        _react2.default.createElement(
          'div',
          { className: 'rbc-event-label' },
          label
        ),
        _react2.default.createElement(
          'div',
          { className: 'rbc-event-content' },
          EventComponent ? _react2.default.createElement(EventComponent, { event: event, title: title }) : title
        )
      );
    });
  },
  _slotStyle: function _slotStyle(startSlot, endSlot, leftOffset) {
    var _ref2;

    endSlot = Math.max(endSlot, startSlot + this.props.step); //must be at least one `step` high

    var eventOffset = this.props.eventOffset || 10,
        isRtl = this.props.rtl;

    var top = startSlot / this._totalMin * 100;
    var bottom = endSlot / this._totalMin * 100;
    var per = leftOffset === 0 ? 0 : leftOffset * eventOffset;
    var rightDiff = eventOffset / (leftOffset + 1);

    return _ref2 = {
      top: top + '%',
      height: bottom - top + '%'
    }, _ref2[isRtl ? 'right' : 'left'] = per + '%', _ref2.width = (leftOffset === 0 ? 100 - eventOffset : 100 - per - rightDiff) + '%', _ref2;
  },
  _selectable: function _selectable() {
    var _this2 = this;

    var node = (0, _reactDom.findDOMNode)(this);
    var selector = this._selector = new _Selection2.default(function () {
      return (0, _reactDom.findDOMNode)(_this2);
    });

    var maybeSelect = function maybeSelect(box) {
      var onSelecting = _this2.props.onSelecting;
      var current = _this2.state || {};
      var state = selectionState(box);
      var start = state.startDate;
      var end = state.endDate;


      if (onSelecting) {
        if (_dates2.default.eq(current.startDate, start, 'minutes') && _dates2.default.eq(current.endDate, end, 'minutes') || onSelecting({ start: start, end: end }) === false) return;
      }

      _this2.setState(state);
    };

    var selectionState = function selectionState(_ref3) {
      var y = _ref3.y;
      var _props3 = _this2.props;
      var step = _props3.step;
      var min = _props3.min;
      var max = _props3.max;

      var _getBoundsForNode = (0, _Selection.getBoundsForNode)(node);

      var top = _getBoundsForNode.top;
      var bottom = _getBoundsForNode.bottom;


      var mins = _this2._totalMin;

      var range = Math.abs(top - bottom);

      var current = (y - top) / range;

      current = snapToSlot(minToDate(mins * current, min), step);

      if (!_this2.state.selecting) _this2._initialDateSlot = current;

      var initial = _this2._initialDateSlot;

      if (_dates2.default.eq(initial, current, 'minutes')) current = _dates2.default.add(current, step, 'minutes');

      var start = _dates2.default.max(min, _dates2.default.min(initial, current));
      var end = _dates2.default.min(max, _dates2.default.max(initial, current));

      return {
        selecting: true,
        startDate: start,
        endDate: end,
        startSlot: positionFromDate(start, min, step),
        endSlot: positionFromDate(end, min, step)
      };
    };

    selector.on('selecting', maybeSelect);
    selector.on('selectStart', maybeSelect);

    selector.on('click', function (_ref4) {
      var x = _ref4.x;
      var y = _ref4.y;

      _this2._clickTimer = setTimeout(function () {
        _this2._selectSlot(selectionState({ x: x, y: y }));
      });

      _this2.setState({ selecting: false });
    });

    selector.on('select', function () {
      if (_this2.state.selecting) {
        _this2._selectSlot(_this2.state);
        _this2.setState({ selecting: false });
      }
    });
  },
  _teardownSelectable: function _teardownSelectable() {
    if (!this._selector) return;
    this._selector.teardown();
    this._selector = null;
  },
  _selectSlot: function _selectSlot(_ref5) {
    var startDate = _ref5.startDate;
    var endDate = _ref5.endDate;

    var current = startDate,
        slots = [];

    while (_dates2.default.lte(current, endDate)) {
      slots.push(current);
      current = _dates2.default.add(current, this.props.step, 'minutes');
    }

    (0, _helpers.notify)(this.props.onSelectSlot, {
      slots: slots,
      start: startDate,
      end: endDate
    });
  },
  _select: function _select(event) {
    clearTimeout(this._clickTimer);
    (0, _helpers.notify)(this.props.onSelectEvent, event);
  }
});

function minToDate(min, date) {
  var dt = new Date(date),
      totalMins = _dates2.default.diff(_dates2.default.startOf(date, 'day'), date, 'minutes');

  dt = _dates2.default.hours(dt, 0);
  dt = _dates2.default.minutes(dt, totalMins + min);
  dt = _dates2.default.seconds(dt, 0);
  return _dates2.default.milliseconds(dt, 0);
}

exports.default = DaySlot;
module.exports = exports['default'];