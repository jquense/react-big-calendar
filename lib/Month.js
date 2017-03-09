'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _chunk = require('lodash/chunk');

var _chunk2 = _interopRequireDefault(_chunk);

var _constants = require('./utils/constants');

var _helpers = require('./utils/helpers');

var _position = require('dom-helpers/query/position');

var _position2 = _interopRequireDefault(_position);

var _requestAnimationFrame = require('dom-helpers/util/requestAnimationFrame');

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _Overlay = require('react-overlays/lib/Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _DateContentRow = require('./DateContentRow');

var _DateContentRow2 = _interopRequireDefault(_DateContentRow);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _propTypes = require('./utils/propTypes');

var _eventLevels = require('./utils/eventLevels');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var eventsForWeek = function eventsForWeek(evts, start, end, props) {
  return evts.filter(function (e) {
    return (0, _eventLevels.inRange)(e, start, end, props);
  });
};

var propTypes = {
  events: _react2.default.PropTypes.array.isRequired,
  date: _react2.default.PropTypes.instanceOf(Date),

  min: _react2.default.PropTypes.instanceOf(Date),
  max: _react2.default.PropTypes.instanceOf(Date),

  step: _react2.default.PropTypes.number,
  now: _react2.default.PropTypes.instanceOf(Date),

  scrollToTime: _react2.default.PropTypes.instanceOf(Date),
  eventPropGetter: _react2.default.PropTypes.func,

  culture: _react2.default.PropTypes.string,
  dayFormat: _propTypes.dateFormat,

  rtl: _react2.default.PropTypes.bool,
  width: _react2.default.PropTypes.number,

  titleAccessor: _propTypes.accessor.isRequired,
  allDayAccessor: _propTypes.accessor.isRequired,
  startAccessor: _propTypes.accessor.isRequired,
  endAccessor: _propTypes.accessor.isRequired,

  selected: _react2.default.PropTypes.object,
  selectable: _react2.default.PropTypes.oneOf([true, false, 'ignoreEvents']),

  onNavigate: _react2.default.PropTypes.func,
  onSelectSlot: _react2.default.PropTypes.func,
  onSelectEvent: _react2.default.PropTypes.func,
  onShowMore: _react2.default.PropTypes.func,
  onDrillDown: _react2.default.PropTypes.func,
  getDrilldownView: _react2.default.PropTypes.func.isRequired,

  dateFormat: _propTypes.dateFormat,

  weekdayFormat: _propTypes.dateFormat,
  popup: _react2.default.PropTypes.bool,

  messages: _react2.default.PropTypes.object,
  components: _react2.default.PropTypes.object.isRequired,
  popupOffset: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.shape({
    x: _react2.default.PropTypes.number,
    y: _react2.default.PropTypes.number
  })])
};

var MonthView = _react2.default.createClass({

  displayName: 'MonthView',

  propTypes: propTypes,

  getInitialState: function getInitialState() {
    return {
      rowLimit: 5,
      needLimitMeasure: true
    };
  },
  componentWillMount: function componentWillMount() {
    this._bgRows = [];
    this._pendingSelection = [];
  },
  componentWillReceiveProps: function componentWillReceiveProps(_ref) {
    var date = _ref.date;

    this.setState({
      needLimitMeasure: !_dates2.default.eq(date, this.props.date)
    });
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var running = void 0;

    if (this.state.needLimitMeasure) this.measureRowLimit(this.props);

    window.addEventListener('resize', this._resizeListener = function () {
      if (!running) {
        (0, _requestAnimationFrame2.default)(function () {
          running = false;
          _this.setState({ needLimitMeasure: true }); //eslint-disable-line
        });
      }
    }, false);
  },
  componentDidUpdate: function componentDidUpdate() {
    if (this.state.needLimitMeasure) this.measureRowLimit(this.props);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this._resizeListener, false);
  },
  getContainer: function getContainer() {
    return (0, _reactDom.findDOMNode)(this);
  },
  render: function render() {
    var _this2 = this;

    var _props = this.props,
        date = _props.date,
        culture = _props.culture,
        weekdayFormat = _props.weekdayFormat,
        className = _props.className,
        month = _dates2.default.visibleDays(date, culture),
        weeks = (0, _chunk2.default)(month, 7);

    this._weekCount = weeks.length;

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('rbc-month-view', className) },
      _react2.default.createElement(
        'div',
        { className: 'rbc-row rbc-month-header' },
        this._headers(weeks[0], weekdayFormat, culture)
      ),
      weeks.map(function (week, idx) {
        return _this2.renderWeek(week, idx);
      }),
      this.props.popup && this._renderOverlay()
    );
  },
  renderWeek: function renderWeek(week, weekIdx) {
    var _this3 = this;

    var _props2 = this.props,
        events = _props2.events,
        components = _props2.components,
        selectable = _props2.selectable,
        titleAccessor = _props2.titleAccessor,
        startAccessor = _props2.startAccessor,
        endAccessor = _props2.endAccessor,
        allDayAccessor = _props2.allDayAccessor,
        eventPropGetter = _props2.eventPropGetter,
        messages = _props2.messages,
        selected = _props2.selected;
    var _state = this.state,
        needLimitMeasure = _state.needLimitMeasure,
        rowLimit = _state.rowLimit;


    events = eventsForWeek(events, week[0], week[week.length - 1], this.props);
    events.sort(function (a, b) {
      return (0, _eventLevels.sortEvents)(a, b, _this3.props);
    });

    return _react2.default.createElement(_DateContentRow2.default, {
      key: weekIdx,
      ref: weekIdx === 0 ? 'slotRow' : undefined,
      container: this.getContainer,
      className: 'rbc-month-row',
      range: week,
      events: events,
      maxRows: rowLimit,
      selected: selected,
      selectable: selectable,
      messages: messages,

      titleAccessor: titleAccessor,
      startAccessor: startAccessor,
      endAccessor: endAccessor,
      allDayAccessor: allDayAccessor,
      eventPropGetter: eventPropGetter,

      renderHeader: this.readerDateHeading,
      renderForMeasure: needLimitMeasure,

      onShowMore: this.handleShowMore,
      onSelect: this.handleSelectEvent,
      onSelectSlot: this.handleSelectSlot,

      eventComponent: components.event,
      eventWrapperComponent: components.eventWrapper,
      dateCellWrapper: components.dateCellWrapper
    });
  },
  readerDateHeading: function readerDateHeading(_ref2) {
    var _this4 = this;

    var date = _ref2.date,
        className = _ref2.className,
        props = _objectWithoutProperties(_ref2, ['date', 'className']);

    var _props3 = this.props,
        currentDate = _props3.date,
        getDrilldownView = _props3.getDrilldownView,
        dateFormat = _props3.dateFormat,
        culture = _props3.culture;


    var isOffRange = _dates2.default.month(date) !== _dates2.default.month(currentDate);
    var isCurrent = _dates2.default.eq(date, currentDate, 'day');
    var drilldownView = getDrilldownView(date);
    var label = _localizer2.default.format(date, dateFormat, culture);

    return _react2.default.createElement(
      'div',
      _extends({}, props, {
        className: (0, _classnames2.default)(className, isOffRange && 'rbc-off-range', isCurrent && 'rbc-current')
      }),
      drilldownView ? _react2.default.createElement(
        'a',
        {
          href: '#',
          onClick: function onClick(e) {
            return _this4.handleHeadingClick(date, drilldownView, e);
          }
        },
        label
      ) : _react2.default.createElement(
        'span',
        null,
        label
      )
    );
  },
  _headers: function _headers(row, format, culture) {
    var first = row[0];
    var last = row[row.length - 1];
    var HeaderComponent = this.props.components.header || _Header2.default;

    return _dates2.default.range(first, last, 'day').map(function (day, idx) {
      return _react2.default.createElement(
        'div',
        {
          key: 'header_' + idx,
          className: 'rbc-header',
          style: (0, _eventLevels.segStyle)(1, 7)
        },
        _react2.default.createElement(HeaderComponent, {
          date: day,
          label: _localizer2.default.format(day, format, culture),
          localizer: _localizer2.default,
          format: format,
          culture: culture
        })
      );
    });
  },
  _renderOverlay: function _renderOverlay() {
    var _this5 = this;

    var overlay = this.state && this.state.overlay || {};
    var components = this.props.components;


    return _react2.default.createElement(
      _Overlay2.default,
      {
        rootClose: true,
        placement: 'bottom',
        container: this,
        show: !!overlay.position,
        onHide: function onHide() {
          return _this5.setState({ overlay: null });
        }
      },
      _react2.default.createElement(_Popup2.default, _extends({}, this.props, {
        eventComponent: components.event,
        eventWrapperComponent: components.eventWrapper,
        position: overlay.position,
        events: overlay.events,
        slotStart: overlay.date,
        slotEnd: overlay.end,
        onSelect: this.handleSelectEvent
      }))
    );
  },
  measureRowLimit: function measureRowLimit() {
    this.setState({
      needLimitMeasure: false,
      rowLimit: this.refs.slotRow.getRowLimit()
    });
  },
  handleSelectSlot: function handleSelectSlot(range) {
    var _this6 = this;

    this._pendingSelection = this._pendingSelection.concat(range);

    clearTimeout(this._selectTimer);
    this._selectTimer = setTimeout(function () {
      return _this6._selectDates();
    });
  },
  handleHeadingClick: function handleHeadingClick(date, view, e) {
    e.preventDefault();
    this.clearSelection();
    (0, _helpers.notify)(this.props.onDrillDown, [date, view]);
  },
  handleSelectEvent: function handleSelectEvent() {
    this.clearSelection();

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (0, _helpers.notify)(this.props.onSelectEvent, args);
  },
  _selectDates: function _selectDates() {
    var slots = this._pendingSelection.slice();

    this._pendingSelection = [];

    slots.sort(function (a, b) {
      return +a - +b;
    });

    (0, _helpers.notify)(this.props.onSelectSlot, {
      slots: slots,
      start: slots[0],
      end: slots[slots.length - 1]
    });
  },
  handleShowMore: function handleShowMore(events, date, cell, slot) {
    var _props4 = this.props,
        popup = _props4.popup,
        onDrillDown = _props4.onDrillDown,
        onShowMore = _props4.onShowMore,
        getDrilldownView = _props4.getDrilldownView;
    //cancel any pending selections so only the event click goes through.

    this.clearSelection();

    if (popup) {
      var position = (0, _position2.default)(cell, (0, _reactDom.findDOMNode)(this));

      this.setState({
        overlay: { date: date, events: events, position: position }
      });
    } else {
      (0, _helpers.notify)(onDrillDown, [date, getDrilldownView(date) || _constants.views.DAY]);
    }

    (0, _helpers.notify)(onShowMore, [events, date, slot]);
  },
  clearSelection: function clearSelection() {
    clearTimeout(this._selectTimer);
    this._pendingSelection = [];
  }
});

MonthView.navigate = function (date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates2.default.add(date, -1, 'month');

    case _constants.navigate.NEXT:
      return _dates2.default.add(date, 1, 'month');

    default:
      return date;
  }
};

MonthView.range = function (date, _ref3) {
  var culture = _ref3.culture;

  var start = _dates2.default.firstVisibleDay(date, culture);
  var end = _dates2.default.lastVisibleDay(date, culture);
  return { start: start, end: end };
};

exports.default = MonthView;
module.exports = exports['default'];