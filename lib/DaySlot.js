'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Selection = require('./Selection');

var _Selection2 = _interopRequireDefault(_Selection);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsDates = require('./utils/dates');

var _utilsDates2 = _interopRequireDefault(_utilsDates);

var _utilsSelection = require('./utils/selection');

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _utilsHelpers = require('./utils/helpers');

var _utilsPropTypes = require('./utils/propTypes');

var _utilsAccessors = require('./utils/accessors');

function snapToSlot(date, step) {
  var roundTo = 1000 * 60 * step;
  return new Date(Math.floor(date.getTime() / roundTo) * roundTo);
}

function positionFromDate(date, min, step) {
  return _utilsDates2['default'].diff(min, _utilsDates2['default'].merge(min, date), 'minutes');
}

function overlaps(event, events, _ref2, last) {
  var startAccessor = _ref2.startAccessor;
  var endAccessor = _ref2.endAccessor;

  var eStart = _utilsAccessors.accessor(event, startAccessor);
  var offset = last;

  function overlap(eventB) {
    return _utilsDates2['default'].lt(eStart, _utilsAccessors.accessor(eventB, endAccessor));
  }

  if (!events.length) return last - 1;
  events.reverse().some(function (prevEvent) {
    if (overlap(prevEvent)) return true;
    offset = offset - 1;
  });

  return offset;
}

var DaySlot = _react2['default'].createClass({
  displayName: 'DaySlot',

  propTypes: {
    events: _react2['default'].PropTypes.array.isRequired,
    step: _react2['default'].PropTypes.number.isRequired,
    min: _react2['default'].PropTypes.instanceOf(Date).isRequired,
    max: _react2['default'].PropTypes.instanceOf(Date).isRequired,

    allDayAccessor: _utilsPropTypes.accessor.isRequired,
    startAccessor: _utilsPropTypes.accessor.isRequired,
    endAccessor: _utilsPropTypes.accessor.isRequired,

    selectable: _react2['default'].PropTypes.bool,
    eventOffset: _react2['default'].PropTypes.number,

    onSelectSlot: _react2['default'].PropTypes.func.isRequired,
    onSelectEvent: _react2['default'].PropTypes.func.isRequired
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
    var start = _props.start;
    var end = _props.end;
    var selectRangeFormat = _props.selectRangeFormat;
    var culture = _props.culture;

    var props = _objectWithoutProperties(_props, ['min', 'max', 'step', 'start', 'end', 'selectRangeFormat', 'culture']);

    var totalMin = _utilsDates2['default'].diff(min, max, 'minutes');
    var numSlots = Math.ceil(totalMin / step);
    var children = [];

    for (var i = 0; i < numSlots; i++) {
      children.push(_react2['default'].createElement('div', { key: i, className: 'rbc-time-slot' }));
    }

    this._totalMin = totalMin;

    var _state = this.state;
    var selecting = _state.selecting;
    var startSlot = _state.startSlot;
    var endSlot = _state.endSlot;
    var style = this._slotStyle(startSlot, endSlot, 0);

    var selectDates = {
      start: this.state.startDate,
      end: this.state.endDate
    };

    return _react2['default'].createElement(
      'div',
      _extends({}, props, { className: _classnames2['default']('rbc-day-slot', props.className) }),
      children,
      this.renderEvents(numSlots, totalMin),
      selecting && _react2['default'].createElement(
        'div',
        { className: 'rbc-slot-selection', style: style },
        _react2['default'].createElement(
          'span',
          null,
          _localizer2['default'].format(selectDates, selectRangeFormat, culture)
        )
      )
    );
  },

  renderEvents: function renderEvents(numSlots, totalMin) {
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
      return +_utilsAccessors.accessor(a, startAccessor) - +_utilsAccessors.accessor(b, startAccessor);
    });

    return events.map(function (event, idx) {
      var start = _utilsAccessors.accessor(event, startAccessor);
      var end = _utilsAccessors.accessor(event, endAccessor);
      var startSlot = positionFromDate(start, min, step);
      var endSlot = positionFromDate(end, min, step);

      lastLeftOffset = Math.max(0, overlaps(event, events.slice(0, idx), _this.props, lastLeftOffset + 1));

      var style = _this._slotStyle(startSlot, endSlot, lastLeftOffset);

      var title = _utilsAccessors.accessor(event, titleAccessor);
      var label = _localizer2['default'].format({ start: start, end: end }, eventTimeRangeFormat, culture);
      var _isSelected = _utilsSelection.isSelected(event, selected);

      if (eventPropGetter) var _eventPropGetter = eventPropGetter(event, start, end, _isSelected),
            xStyle = _eventPropGetter.style,
            className = _eventPropGetter.className;

      return _react2['default'].createElement(
        'div',
        {
          key: 'evt_' + idx,
          style: _extends({}, xStyle, style),
          title: label + ': ' + title,
          onClick: _this._select.bind(null, event),
          className: _classnames2['default']('rbc-event', className, {
            'rbc-selected': _isSelected,
            'rbc-event-overlaps': lastLeftOffset !== 0
          })
        },
        _react2['default'].createElement(
          'div',
          { className: 'rbc-event-label' },
          label
        ),
        _react2['default'].createElement(
          'div',
          { className: 'rbc-event-content' },
          EventComponent ? _react2['default'].createElement(EventComponent, { event: event, title: title }) : title
        )
      );
    });
  },

  _slotStyle: function _slotStyle(startSlot, endSlot, leftOffset) {
    var _ref;

    endSlot = Math.max(endSlot, startSlot + this.props.step); //must be at least one `step` high

    var eventOffset = this.props.eventOffset || 10,
        isRtl = this.props.rtl;

    var top = startSlot / this._totalMin * 100;
    var bottom = endSlot / this._totalMin * 100;
    var per = leftOffset === 0 ? 0 : leftOffset * eventOffset;
    var rightDiff = eventOffset / (leftOffset + 1);

    return _ref = {
      top: top + '%',
      height: bottom - top + '%'
    }, _ref[isRtl ? 'right' : 'left'] = per + '%', _ref.width = (leftOffset === 0 ? 100 - eventOffset : 100 - per - rightDiff) + '%', _ref;
  },

  _selectable: function _selectable() {
    var _this2 = this;

    var node = _reactDom.findDOMNode(this);
    var selector = this._selector = new _Selection2['default'](function () {
      return _reactDom.findDOMNode(_this2);
    });

    var selectionState = function selectionState(_ref3) {
      var x = _ref3.x;
      var y = _ref3.y;
      var _props3 = _this2.props;
      var step = _props3.step;
      var min = _props3.min;
      var max = _props3.max;

      var _getBoundsForNode = _Selection.getBoundsForNode(node);

      var top = _getBoundsForNode.top;
      var bottom = _getBoundsForNode.bottom;

      var mins = _this2._totalMin;

      var range = Math.abs(top - bottom);

      var current = (y - top) / range;

      current = snapToSlot(minToDate(mins * current, min), step);

      if (!_this2.state.selecting) _this2._initialDateSlot = current;

      var initial = _this2._initialDateSlot;

      if (_utilsDates2['default'].eq(initial, current, 'minutes')) current = _utilsDates2['default'].add(current, step, 'minutes');

      var start = _utilsDates2['default'].max(min, _utilsDates2['default'].min(initial, current));
      var end = _utilsDates2['default'].min(max, _utilsDates2['default'].max(initial, current));

      return {
        selecting: true,
        startDate: start,
        endDate: end,
        startSlot: positionFromDate(start, min, step),
        endSlot: positionFromDate(end, min, step)
      };
    };

    selector.on('selecting', function (box) {
      return _this2.setState(selectionState(box));
    });

    selector.on('selectStart', function (box) {
      return _this2.setState(selectionState(box));
    });

    selector.on('click', function (_ref4) {
      var x = _ref4.x;
      var y = _ref4.y;

      _this2._clickTimer = setTimeout(function () {
        _this2._selectSlot(selectionState({ x: x, y: y }));
      });

      _this2.setState({ selecting: false });
    });

    selector.on('select', function () {
      _this2._selectSlot(_this2.state);
      _this2.setState({ selecting: false });
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
    var endSlot = _ref5.endSlot;
    var startSlot = _ref5.startSlot;

    var current = startDate,
        slots = [];

    while (_utilsDates2['default'].lte(current, endDate)) {
      slots.push(current);
      current = _utilsDates2['default'].add(current, this.props.step, 'minutes');
    }

    _utilsHelpers.notify(this.props.onSelectSlot, {
      slots: slots,
      start: startDate,
      end: endDate
    });
  },

  _select: function _select(event) {
    clearTimeout(this._clickTimer);
    _utilsHelpers.notify(this.props.onSelectEvent, event);
  }
});

function minToDate(min, date) {
  var dt = new Date(date),
      totalMins = _utilsDates2['default'].diff(_utilsDates2['default'].startOf(date, 'day'), date, 'minutes');

  dt = _utilsDates2['default'].hours(dt, 0);
  dt = _utilsDates2['default'].minutes(dt, totalMins + min);
  dt = _utilsDates2['default'].seconds(dt, 0);
  return _utilsDates2['default'].milliseconds(dt, 0);
}

exports['default'] = DaySlot;
module.exports = exports['default'];