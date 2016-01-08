'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDom = require('react-dom');

var _utilsDates = require('./utils/dates');

var _utilsDates2 = _interopRequireDefault(_utilsDates);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _DaySlot = require('./DaySlot');

var _DaySlot2 = _interopRequireDefault(_DaySlot);

var _EventRow = require('./EventRow');

var _EventRow2 = _interopRequireDefault(_EventRow);

var _TimeGutter = require('./TimeGutter');

var _TimeGutter2 = _interopRequireDefault(_TimeGutter);

var _BackgroundCells = require('./BackgroundCells');

var _BackgroundCells2 = _interopRequireDefault(_BackgroundCells);

var _domHelpersClass = require('dom-helpers/class');

var _domHelpersClass2 = _interopRequireDefault(_domHelpersClass);

var _domHelpersQueryWidth = require('dom-helpers/query/width');

var _domHelpersQueryWidth2 = _interopRequireDefault(_domHelpersQueryWidth);

var _domHelpersUtilScrollbarSize = require('dom-helpers/util/scrollbarSize');

var _domHelpersUtilScrollbarSize2 = _interopRequireDefault(_domHelpersUtilScrollbarSize);

var _utilsMessages = require('./utils/messages');

var _utilsMessages2 = _interopRequireDefault(_utilsMessages);

var _utilsPropTypes = require('./utils/propTypes');

var _utilsHelpers = require('./utils/helpers');

var _utilsConstants = require('./utils/constants');

var _utilsAccessors = require('./utils/accessors');

var _utilsEventLevels = require('./utils/eventLevels');

var MIN_ROWS = 2;

var TimeGrid = _react2['default'].createClass({
  displayName: 'TimeGrid',

  propTypes: _extends({}, _DaySlot2['default'].propTypes, _TimeGutter2['default'].propTypes, {

    step: _react2['default'].PropTypes.number,
    min: _react2['default'].PropTypes.instanceOf(Date),
    max: _react2['default'].PropTypes.instanceOf(Date),
    dayFormat: _utilsPropTypes.dateFormat,
    rtl: _react2['default'].PropTypes.bool
  }),

  getDefaultProps: function getDefaultProps() {
    return {
      step: 30,
      min: _utilsDates2['default'].startOf(new Date(), 'day'),
      max: _utilsDates2['default'].endOf(new Date(), 'day')
    };
  },

  componentWillMount: function componentWillMount() {
    this._gutters = [];
  },

  componentDidMount: function componentDidMount() {
    this._adjustGutter();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._adjustGutter();
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var events = _props.events;
    var start = _props.start;
    var end = _props.end;
    var messages = _props.messages;
    var startAccessor = _props.startAccessor;
    var endAccessor = _props.endAccessor;
    var allDayAccessor = _props.allDayAccessor;

    var addGutterRef = function addGutterRef(i) {
      return function (ref) {
        return _this._gutters[i] = ref;
      };
    };

    var range = _utilsDates2['default'].range(start, end, 'day');

    this._slots = range.length;

    var allDayEvents = [],
        rangeEvents = [];

    events.forEach(function (event) {
      if (_utilsEventLevels.inRange(event, start, end, _this.props)) {
        var eStart = _utilsAccessors.accessor(event, startAccessor),
            eEnd = _utilsAccessors.accessor(event, endAccessor);

        if (_utilsAccessors.accessor(event, allDayAccessor) || !_utilsDates2['default'].eq(eStart, eEnd, 'day') || _utilsDates2['default'].isJustDate(eStart) && _utilsDates2['default'].isJustDate(eEnd)) {
          allDayEvents.push(event);
        } else rangeEvents.push(event);
      }
    });

    allDayEvents.sort(function (a, b) {
      return _utilsEventLevels.sortEvents(a, b, _this.props);
    });

    var segments = allDayEvents.map(function (evt) {
      return _utilsEventLevels.eventSegments(evt, start, end, _this.props);
    });

    var _eventLevels = _utilsEventLevels.eventLevels(segments);

    var levels = _eventLevels.levels;

    return _react2['default'].createElement(
      'div',
      { className: 'rbc-time-view' },
      _react2['default'].createElement(
        'div',
        { ref: 'headerCell', className: 'rbc-time-header' },
        _react2['default'].createElement(
          'div',
          { className: 'rbc-row' },
          _react2['default'].createElement('div', { ref: addGutterRef(0), className: 'rbc-gutter-cell' }),
          this.renderHeader(range)
        ),
        _react2['default'].createElement(
          'div',
          { className: 'rbc-row' },
          _react2['default'].createElement(
            'div',
            { ref: addGutterRef(1), className: 'rbc-gutter-cell' },
            _utilsMessages2['default'](messages).allDay
          ),
          _react2['default'].createElement(
            'div',
            { ref: 'allDay', className: 'rbc-allday-cell' },
            _react2['default'].createElement(_BackgroundCells2['default'], {
              slots: range.length,
              container: function () {
                return _this.refs.allDay;
              },
              selectable: this.props.selectable
            }),
            _react2['default'].createElement(
              'div',
              { style: { zIndex: 1, position: 'relative' } },
              this.renderAllDayEvents(range, levels)
            )
          )
        )
      ),
      _react2['default'].createElement(
        'div',
        { ref: 'content', className: 'rbc-time-content' },
        _react2['default'].createElement(_TimeGutter2['default'], _extends({ ref: 'gutter' }, this.props)),
        this.renderEvents(range, rangeEvents)
      )
    );
  },

  renderEvents: function renderEvents(range, events) {
    var _this2 = this;

    var _props2 = this.props;
    var min = _props2.min;
    var max = _props2.max;
    var endAccessor = _props2.endAccessor;
    var startAccessor = _props2.startAccessor;
    var components = _props2.components;

    var today = new Date();

    return range.map(function (date, idx) {
      var daysEvents = events.filter(function (event) {
        return _utilsDates2['default'].inRange(date, _utilsAccessors.accessor(event, startAccessor), _utilsAccessors.accessor(event, endAccessor), 'day');
      });

      return _react2['default'].createElement(_DaySlot2['default'], _extends({}, _this2.props, {
        min: _utilsDates2['default'].merge(date, min),
        max: _utilsDates2['default'].merge(date, max),
        eventComponent: components.event,
        className: _classnames2['default']({ 'rbc-now': _utilsDates2['default'].eq(date, today, 'day') }),
        style: _utilsEventLevels.segStyle(1, _this2._slots),
        key: idx,
        date: date,
        events: daysEvents
      }));
    });
  },

  renderAllDayEvents: function renderAllDayEvents(range, levels) {
    var _this3 = this;

    var first = range[0],
        last = range[range.length - 1];

    while (levels.length < MIN_ROWS) levels.push([]);

    return levels.map(function (segs, idx) {
      return _react2['default'].createElement(_EventRow2['default'], {
        eventComponent: _this3.props.components.event,
        titleAccessor: _this3.props.titleAccessor,
        startAccessor: _this3.props.startAccessor,
        endAccessor: _this3.props.endAccessor,
        allDayAccessor: _this3.props.allDayAccessor,
        onSelect: _this3._selectEvent,
        slots: _this3._slots,
        key: idx,
        segments: segs,
        start: first,
        end: last
      });
    });
  },

  renderHeader: function renderHeader(range) {
    var _this4 = this;

    var _props3 = this.props;
    var dayFormat = _props3.dayFormat;
    var culture = _props3.culture;

    return range.map(function (date, i) {
      return _react2['default'].createElement(
        'div',
        { key: i,
          className: 'rbc-header',
          style: _utilsEventLevels.segStyle(1, _this4._slots)
        },
        _react2['default'].createElement(
          'a',
          { href: '#', onClick: _this4._headerClick.bind(null, date) },
          _localizer2['default'].format(date, dayFormat, culture)
        )
      );
    });
  },

  _headerClick: function _headerClick(date, e) {
    e.preventDefault();
    _utilsHelpers.notify(this.props.onNavigate, [_utilsConstants.navigate.DATE, date]);
  },

  _selectEvent: function _selectEvent() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _utilsHelpers.notify(this.props.onSelectEvent, args);
  },

  _adjustGutter: function _adjustGutter() {
    var isRtl = this.props.rtl;
    var header = this.refs.headerCell;
    var width = this._gutterWidth;
    var gutterCells = [_reactDom.findDOMNode(this.refs.gutter)].concat(this._gutters);
    var isOverflowing = this.refs.content.scrollHeight > this.refs.content.clientHeight;

    if (width) gutterCells.forEach(function (node) {
      return node.style.width = '';
    });

    this._gutterWidth = Math.max.apply(Math, gutterCells.map(_domHelpersQueryWidth2['default']));

    if (this._gutterWidth && width !== this._gutterWidth) {
      width = this._gutterWidth + 'px';
      gutterCells.forEach(function (node) {
        return node.style.width = width;
      });
    }

    if (isOverflowing) {
      _domHelpersClass2['default'].addClass(header, 'rbc-header-overflowing');
      this.refs.headerCell.style[!isRtl ? 'marginLeft' : 'marginRight'] = '';
      this.refs.headerCell.style[isRtl ? 'marginLeft' : 'marginRight'] = _domHelpersUtilScrollbarSize2['default']() + 'px';
    } else {
      _domHelpersClass2['default'].removeClass(header, 'rbc-header-overflowing');
    }
  }

});

exports['default'] = TimeGrid;
module.exports = exports['default'];