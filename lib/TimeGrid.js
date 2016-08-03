'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDom = require('react-dom');

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _DayColumn = require('./DayColumn');

var _DayColumn2 = _interopRequireDefault(_DayColumn);

var _EventRow = require('./EventRow');

var _EventRow2 = _interopRequireDefault(_EventRow);

var _TimeColumn = require('./TimeColumn');

var _TimeColumn2 = _interopRequireDefault(_TimeColumn);

var _BackgroundCells = require('./BackgroundCells');

var _BackgroundCells2 = _interopRequireDefault(_BackgroundCells);

var _width = require('dom-helpers/query/width');

var _width2 = _interopRequireDefault(_width);

var _scrollbarSize = require('dom-helpers/util/scrollbarSize');

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _messages = require('./utils/messages');

var _messages2 = _interopRequireDefault(_messages);

var _propTypes = require('./utils/propTypes');

var _helpers = require('./utils/helpers');

var _constants = require('./utils/constants');

var _accessors = require('./utils/accessors');

var _eventLevels2 = require('./utils/eventLevels');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MIN_ROWS = 2;

var TimeGrid = function (_Component) {
  _inherits(TimeGrid, _Component);

  function TimeGrid(props) {
    _classCallCheck(this, TimeGrid);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = { gutterWidth: undefined, isOverflowing: null };
    _this._selectEvent = _this._selectEvent.bind(_this);
    _this._headerClick = _this._headerClick.bind(_this);
    return _this;
  }

  TimeGrid.prototype.componentWillMount = function componentWillMount() {
    this._gutters = [];
    this.calculateScroll();
  };

  TimeGrid.prototype.componentDidMount = function componentDidMount() {
    this.checkOverflow();

    if (this.props.width == null) {
      this.measureGutter();
    }
    this.applyScroll();
  };

  TimeGrid.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.props.width == null && !this.state.gutterWidth) {
      this.measureGutter();
    }

    this.applyScroll();
    //this.checkOverflow()
  };

  TimeGrid.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _props = this.props;
    var start = _props.start;
    var scrollToTime = _props.scrollToTime;
    // When paginating, reset scroll

    if (!_dates2.default.eq(nextProps.start, start) || nextProps.scrollToTime !== scrollToTime) {
      this.calculateScroll();
    }
  };

  TimeGrid.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props;
    var events = _props2.events;
    var start = _props2.start;
    var end = _props2.end;
    var width = _props2.width;
    var startAccessor = _props2.startAccessor;
    var endAccessor = _props2.endAccessor;
    var allDayAccessor = _props2.allDayAccessor;


    width = width || this.state.gutterWidth;

    var range = _dates2.default.range(start, end, 'day');

    this._slots = range.length;

    var allDayEvents = [],
        rangeEvents = [];

    events.forEach(function (event) {
      if ((0, _eventLevels2.inRange)(event, start, end, _this2.props)) {
        var eStart = (0, _accessors.accessor)(event, startAccessor),
            eEnd = (0, _accessors.accessor)(event, endAccessor);

        if ((0, _accessors.accessor)(event, allDayAccessor) || !_dates2.default.eq(eStart, eEnd, 'day') || _dates2.default.isJustDate(eStart) && _dates2.default.isJustDate(eEnd)) {
          allDayEvents.push(event);
        } else rangeEvents.push(event);
      }
    });

    allDayEvents.sort(function (a, b) {
      return (0, _eventLevels2.sortEvents)(a, b, _this2.props);
    });

    var _endOfRange = (0, _eventLevels2.endOfRange)(range);

    var first = _endOfRange.first;
    var last = _endOfRange.last;


    var segments = allDayEvents.map(function (evt) {
      return (0, _eventLevels2.eventSegments)(evt, first, last, _this2.props);
    });

    var gutterRef = function gutterRef(ref) {
      return _this2._gutters[1] = ref && (0, _reactDom.findDOMNode)(ref);
    };

    return _react2.default.createElement(
      'div',
      { className: 'rbc-time-view' },
      this.renderHeader(range, segments, width),
      _react2.default.createElement(
        'div',
        { ref: 'content', className: 'rbc-time-content' },
        _react2.default.createElement(_TimeColumn2.default, _extends({}, this.props, {
          showLabels: true,
          style: { width: width },
          ref: gutterRef,
          className: 'rbc-time-gutter'
        })),
        this.renderEvents(range, rangeEvents, this.props.now)
      )
    );
  };

  TimeGrid.prototype.renderEvents = function renderEvents(range, events, today) {
    var _this3 = this;

    var _props3 = this.props;
    var min = _props3.min;
    var max = _props3.max;
    var endAccessor = _props3.endAccessor;
    var startAccessor = _props3.startAccessor;
    var components = _props3.components;


    return range.map(function (date, idx) {
      var daysEvents = events.filter(function (event) {
        return _dates2.default.inRange(date, (0, _accessors.accessor)(event, startAccessor), (0, _accessors.accessor)(event, endAccessor), 'day');
      });

      return _react2.default.createElement(_DayColumn2.default, _extends({}, _this3.props, {
        min: _dates2.default.merge(date, min),
        max: _dates2.default.merge(date, max),
        eventComponent: components.event,
        className: (0, _classnames2.default)({ 'rbc-now': _dates2.default.eq(date, today, 'day') }),
        style: (0, _eventLevels2.segStyle)(1, _this3._slots),
        key: idx,
        date: date,
        events: daysEvents
      }));
    });
  };

  TimeGrid.prototype.renderAllDayEvents = function renderAllDayEvents(range, levels) {
    var _this4 = this;

    var _endOfRange2 = (0, _eventLevels2.endOfRange)(range);

    var first = _endOfRange2.first;
    var last = _endOfRange2.last;


    while (levels.length < MIN_ROWS) {
      levels.push([]);
    }return levels.map(function (segs, idx) {
      return _react2.default.createElement(_EventRow2.default, {
        eventComponent: _this4.props.components.event,
        titleAccessor: _this4.props.titleAccessor,
        startAccessor: _this4.props.startAccessor,
        endAccessor: _this4.props.endAccessor,
        allDayAccessor: _this4.props.allDayAccessor,
        eventPropGetter: _this4.props.eventPropGetter,
        onSelect: _this4._selectEvent,
        slots: _this4._slots,
        key: idx,
        segments: segs,
        start: first,
        end: last
      });
    });
  };

  TimeGrid.prototype.renderHeader = function renderHeader(range, segments, width) {
    var _this5 = this;

    var _props4 = this.props;
    var messages = _props4.messages;
    var rtl = _props4.rtl;

    var _ref = this.state || {};

    var isOverflowing = _ref.isOverflowing;

    var _eventLevels = (0, _eventLevels2.eventLevels)(segments);

    var levels = _eventLevels.levels;

    var style = {};

    if (isOverflowing) style[rtl ? 'marginLeft' : 'marginRight'] = (0, _scrollbarSize2.default)() + 'px';

    return _react2.default.createElement(
      'div',
      {
        ref: 'headerCell',
        className: (0, _classnames2.default)('rbc-time-header', isOverflowing && 'rbc-overflowing'),
        style: style
      },
      _react2.default.createElement(
        'div',
        { className: 'rbc-row' },
        _react2.default.createElement('div', {
          className: 'rbc-label rbc-header-gutter',
          style: { width: width }
        }),
        this.renderHeaderCells(range)
      ),
      _react2.default.createElement(
        'div',
        { className: 'rbc-row' },
        _react2.default.createElement(
          'div',
          {
            ref: function ref(_ref2) {
              return _this5._gutters[0] = _ref2;
            },
            className: 'rbc-label rbc-header-gutter',
            style: { width: width }
          },
          (0, _messages2.default)(messages).allDay
        ),
        _react2.default.createElement(
          'div',
          { ref: 'allDay', className: 'rbc-allday-cell' },
          _react2.default.createElement(_BackgroundCells2.default, {
            slots: range.length,
            container: function container() {
              return _this5.refs.allDay;
            },
            selectable: this.props.selectable
          }),
          _react2.default.createElement(
            'div',
            { style: { zIndex: 1, position: 'relative' } },
            this.renderAllDayEvents(range, levels)
          )
        )
      )
    );
  };

  TimeGrid.prototype.renderHeaderCells = function renderHeaderCells(range) {
    var _this6 = this;

    var _props5 = this.props;
    var dayFormat = _props5.dayFormat;
    var culture = _props5.culture;


    return range.map(function (date, i) {
      return _react2.default.createElement(
        'div',
        {
          key: i,
          className: 'rbc-header',
          style: (0, _eventLevels2.segStyle)(1, _this6._slots)
        },
        _react2.default.createElement(
          'a',
          { href: '#', onClick: _this6._headerClick.bind(null, date) },
          _localizer2.default.format(date, dayFormat, culture)
        )
      );
    });
  };

  TimeGrid.prototype._headerClick = function _headerClick(date, e) {
    e.preventDefault();
    (0, _helpers.notify)(this.props.onNavigate, [_constants.navigate.DATE, date]);
  };

  TimeGrid.prototype._selectEvent = function _selectEvent() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (0, _helpers.notify)(this.props.onSelectEvent, args);
  };

  TimeGrid.prototype.measureGutter = function measureGutter() {
    var width = this.state.gutterWidth;
    var gutterCells = this._gutters;

    if (!width) {
      width = Math.max.apply(Math, gutterCells.map(_width2.default));

      if (width) {
        this.setState({ gutterWidth: width });
      }
    }
  };

  TimeGrid.prototype.applyScroll = function applyScroll() {
    if (this._scrollRatio) {
      var content = this.refs.content;

      content.scrollTop = content.scrollHeight * this._scrollRatio;
      // Only do this once
      this._scrollRatio = null;
    }
  };

  TimeGrid.prototype.calculateScroll = function calculateScroll() {
    var _props6 = this.props;
    var min = _props6.min;
    var max = _props6.max;
    var scrollToTime = _props6.scrollToTime;


    var diffMillis = scrollToTime - _dates2.default.startOf(scrollToTime, 'day');
    var totalMillis = _dates2.default.diff(max, min);

    this._scrollRatio = diffMillis / totalMillis;
  };

  TimeGrid.prototype.checkOverflow = function checkOverflow() {
    var _this7 = this;

    if (this._updatingOverflow) return;

    var isOverflowing = this.refs.content.scrollHeight > this.refs.content.clientHeight;

    if (this.state.isOverflowing !== isOverflowing) {
      this._updatingOverflow = true;
      this.setState({ isOverflowing: isOverflowing }, function () {
        _this7._updatingOverflow = false;
      });
    }
  };

  return TimeGrid;
}(_react.Component);

TimeGrid.propTypes = _extends({}, _DayColumn2.default.propTypes, _TimeColumn2.default.propTypes, {

  step: _react2.default.PropTypes.number,
  min: _react2.default.PropTypes.instanceOf(Date),
  max: _react2.default.PropTypes.instanceOf(Date),
  scrollToTime: _react2.default.PropTypes.instanceOf(Date),
  dayFormat: _propTypes.dateFormat,
  rtl: _react2.default.PropTypes.bool
});
TimeGrid.defaultProps = _extends({}, _DayColumn2.default.defaultProps, _TimeColumn2.default.defaultProps, {

  step: 30,
  min: _dates2.default.startOf(new Date(), 'day'),
  max: _dates2.default.endOf(new Date(), 'day'),
  scrollToTime: _dates2.default.startOf(new Date(), 'day'),
  /* these 2 are needed to satisfy requirements from TimeColumn required props
   * There is a strange bug in React, using ...TimeColumn.defaultProps causes weird crashes
   */
  type: 'gutter',
  now: new Date()
});
exports.default = TimeGrid;
module.exports = exports['default'];