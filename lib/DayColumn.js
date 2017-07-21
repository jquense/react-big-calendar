'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var _propTypes3 = require('./utils/propTypes');

var _accessors = require('./utils/accessors');

var _dayViewLayout = require('./utils/dayViewLayout');

var _dayViewLayout2 = _interopRequireDefault(_dayViewLayout);

var _TimeColumn = require('./TimeColumn');

var _TimeColumn2 = _interopRequireDefault(_TimeColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function snapToSlot(date, step) {
  var roundTo = 1000 * 60 * step;
  return new Date(Math.floor(date.getTime() / roundTo) * roundTo);
}

function startsAfter(date, max) {
  return _dates2.default.gt(_dates2.default.merge(max, date), max, 'minutes');
}

var DaySlot = function (_React$Component) {
  _inherits(DaySlot, _React$Component);

  function DaySlot() {
    var _temp, _this, _ret;

    _classCallCheck(this, DaySlot);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  DaySlot.prototype.componentDidMount = function componentDidMount() {
    this.props.selectable && this._selectable();
  };

  DaySlot.prototype.componentWillUnmount = function componentWillUnmount() {
    this._teardownSelectable();
  };

  DaySlot.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable) this._selectable();
    if (!nextProps.selectable && this.props.selectable) this._teardownSelectable();
  };

  DaySlot.prototype.render = function render() {
    var _props = this.props,
        min = _props.min,
        max = _props.max,
        step = _props.step,
        now = _props.now,
        selectRangeFormat = _props.selectRangeFormat,
        culture = _props.culture,
        props = _objectWithoutProperties(_props, ['min', 'max', 'step', 'now', 'selectRangeFormat', 'culture']);

    this._totalMin = _dates2.default.diff(min, max, 'minutes');

    var _state = this.state,
        selecting = _state.selecting,
        startSlot = _state.startSlot,
        endSlot = _state.endSlot;

    var style = this._slotStyle(startSlot, endSlot);

    var selectDates = {
      start: this.state.startDate,
      end: this.state.endDate
    };

    return _react2.default.createElement(
      _TimeColumn2.default,
      _extends({}, props, {
        className: (0, _classnames2.default)('rbc-day-slot', _dates2.default.isToday(max) && 'rbc-today'),
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
  };

  return DaySlot;
}(_react2.default.Component);

DaySlot.propTypes = {
  events: _propTypes2.default.array.isRequired,
  step: _propTypes2.default.number.isRequired,
  min: _propTypes2.default.instanceOf(Date).isRequired,
  max: _propTypes2.default.instanceOf(Date).isRequired,
  now: _propTypes2.default.instanceOf(Date),

  rtl: _propTypes2.default.bool,
  titleAccessor: _propTypes3.accessor,
  allDayAccessor: _propTypes3.accessor.isRequired,
  startAccessor: _propTypes3.accessor.isRequired,
  endAccessor: _propTypes3.accessor.isRequired,

  selectRangeFormat: _propTypes3.dateFormat,
  eventTimeRangeFormat: _propTypes3.dateFormat,
  culture: _propTypes2.default.string,

  selected: _propTypes2.default.object,
  selectable: _propTypes2.default.oneOf([true, false, 'ignoreEvents']),
  eventOffset: _propTypes2.default.number,

  onSelecting: _propTypes2.default.func,
  onSelectSlot: _propTypes2.default.func.isRequired,
  onSelectEvent: _propTypes2.default.func.isRequired,

  className: _propTypes2.default.string,
  dragThroughEvents: _propTypes2.default.bool,
  eventPropGetter: _propTypes2.default.func,
  dayWrapperComponent: _propTypes3.elementType,
  eventComponent: _propTypes3.elementType,
  eventWrapperComponent: _propTypes3.elementType.isRequired
};
DaySlot.defaultProps = { dragThroughEvents: true };

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.state = { selecting: false };

  this.renderEvents = function () {
    var _props2 = _this2.props,
        events = _props2.events,
        min = _props2.min,
        max = _props2.max,
        culture = _props2.culture,
        eventPropGetter = _props2.eventPropGetter,
        selected = _props2.selected,
        eventTimeRangeFormat = _props2.eventTimeRangeFormat,
        eventComponent = _props2.eventComponent,
        EventWrapper = _props2.eventWrapperComponent,
        isRtl = _props2.rtl,
        step = _props2.step,
        startAccessor = _props2.startAccessor,
        endAccessor = _props2.endAccessor,
        titleAccessor = _props2.titleAccessor;


    var EventComponent = eventComponent;

    var styledEvents = (0, _dayViewLayout2.default)({
      events: events, startAccessor: startAccessor, endAccessor: endAccessor, min: min, totalMin: _this2._totalMin, step: step
    });

    return styledEvents.map(function (_ref, idx) {
      var _extends2;

      var event = _ref.event,
          style = _ref.style;

      var start = (0, _accessors.accessor)(event, startAccessor);
      var end = (0, _accessors.accessor)(event, endAccessor);

      var continuesPrior = (0, _dayViewLayout.startsBefore)(start, min);
      var continuesAfter = startsAfter(end, max);

      var title = (0, _accessors.accessor)(event, titleAccessor);
      var label = _localizer2.default.format({ start: start, end: end }, eventTimeRangeFormat, culture);
      var _isSelected = (0, _selection.isSelected)(event, selected);

      if (eventPropGetter) var _eventPropGetter = eventPropGetter(event, start, end, _isSelected),
            xStyle = _eventPropGetter.style,
            className = _eventPropGetter.className;

      var height = style.height,
          top = style.top,
          width = style.width,
          xOffset = style.xOffset;


      return _react2.default.createElement(
        EventWrapper,
        { event: event, key: 'evt_' + idx },
        _react2.default.createElement(
          'div',
          {
            style: _extends({}, xStyle, (_extends2 = {
              top: top + '%',
              height: height + '%'
            }, _extends2[isRtl ? 'right' : 'left'] = Math.max(0, xOffset) + '%', _extends2.width = width + '%', _extends2)),
            title: label + ': ' + title,
            onClick: function onClick(e) {
              return _this2._select(event, e);
            },
            className: (0, _classnames2.default)('rbc-event', className, {
              'rbc-selected': _isSelected,
              'rbc-event-continues-earlier': continuesPrior,
              'rbc-event-continues-later': continuesAfter
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
        )
      );
    });
  };

  this._slotStyle = function (startSlot, endSlot) {
    var top = startSlot / _this2._totalMin * 100;
    var bottom = endSlot / _this2._totalMin * 100;

    return {
      top: top + '%',
      height: bottom - top + '%'
    };
  };

  this._selectable = function () {
    var node = (0, _reactDom.findDOMNode)(_this2);
    var selector = _this2._selector = new _Selection2.default(function () {
      return (0, _reactDom.findDOMNode)(_this2);
    });

    var maybeSelect = function maybeSelect(box) {
      var onSelecting = _this2.props.onSelecting;
      var current = _this2.state || {};
      var state = selectionState(box);
      var start = state.startDate,
          end = state.endDate;


      if (onSelecting) {
        if (_dates2.default.eq(current.startDate, start, 'minutes') && _dates2.default.eq(current.endDate, end, 'minutes') || onSelecting({ start: start, end: end }) === false) return;
      }

      _this2.setState(state);
    };

    var selectionState = function selectionState(_ref2) {
      var y = _ref2.y;
      var _props3 = _this2.props,
          step = _props3.step,
          min = _props3.min,
          max = _props3.max;

      var _getBoundsForNode = (0, _Selection.getBoundsForNode)(node),
          top = _getBoundsForNode.top,
          bottom = _getBoundsForNode.bottom;

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
        startSlot: (0, _dayViewLayout.positionFromDate)(start, min, _this2._totalMin),
        endSlot: (0, _dayViewLayout.positionFromDate)(end, min, _this2._totalMin)
      };
    };

    selector.on('selecting', maybeSelect);
    selector.on('selectStart', maybeSelect);

    selector.on('mousedown', function (box) {
      if (_this2.props.selectable !== 'ignoreEvents') return;

      return !(0, _Selection.isEvent)((0, _reactDom.findDOMNode)(_this2), box);
    });

    selector.on('click', function (box) {
      if (!(0, _Selection.isEvent)((0, _reactDom.findDOMNode)(_this2), box)) _this2._selectSlot(_extends({}, selectionState(box), { action: 'click' }));

      _this2.setState({ selecting: false });
    });

    selector.on('select', function () {
      if (_this2.state.selecting) {
        _this2._selectSlot(_extends({}, _this2.state, { action: 'select' }));
        _this2.setState({ selecting: false });
      }
    });
  };

  this._teardownSelectable = function () {
    if (!_this2._selector) return;
    _this2._selector.teardown();
    _this2._selector = null;
  };

  this._selectSlot = function (_ref3) {
    var startDate = _ref3.startDate,
        endDate = _ref3.endDate,
        action = _ref3.action;

    var current = startDate,
        slots = [];

    while (_dates2.default.lte(current, endDate)) {
      slots.push(current);
      current = _dates2.default.add(current, _this2.props.step, 'minutes');
    }

    (0, _helpers.notify)(_this2.props.onSelectSlot, {
      slots: slots,
      start: startDate,
      end: endDate,
      action: action
    });
  };

  this._select = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    (0, _helpers.notify)(_this2.props.onSelectEvent, args);
  };
};

function minToDate(min, date) {
  var dt = new Date(date),
      totalMins = _dates2.default.diff(_dates2.default.startOf(date, 'day'), date, 'minutes');

  dt = _dates2.default.hours(dt, 0);
  dt = _dates2.default.minutes(dt, totalMins + min);
  dt = _dates2.default.seconds(dt, 0);
  return _dates2.default.milliseconds(dt, 0);
}

exports.default = DaySlot;