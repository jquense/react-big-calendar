'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _messages = require('./utils/messages');

var _messages2 = _interopRequireDefault(_messages);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _constants = require('./utils/constants');

var _accessors = require('./utils/accessors');

var _class = require('dom-helpers/class');

var _class2 = _interopRequireDefault(_class);

var _width = require('dom-helpers/query/width');

var _width2 = _interopRequireDefault(_width);

var _scrollbarSize = require('dom-helpers/util/scrollbarSize');

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _eventLevels = require('./utils/eventLevels');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Agenda = _react2.default.createClass({
  displayName: 'Agenda',


  propTypes: {
    messages: _react.PropTypes.shape({
      date: _react.PropTypes.string,
      time: _react.PropTypes.string,
      event: _react.PropTypes.string
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      length: 30
    };
  },
  componentDidMount: function componentDidMount() {
    this._adjustHeader();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._adjustHeader();
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var length = _props.length;
    var date = _props.date;
    var events = _props.events;
    var startAccessor = _props.startAccessor;

    var messages = (0, _messages2.default)(this.props.messages);
    var end = _dates2.default.add(date, length, 'day');

    var range = _dates2.default.range(date, end, 'day');

    events = events.filter(function (event) {
      return (0, _eventLevels.inRange)(event, date, end, _this.props);
    });

    events.sort(function (a, b) {
      return +(0, _accessors.accessor)(a, startAccessor) - +(0, _accessors.accessor)(b, startAccessor);
    });

    return _react2.default.createElement(
      'div',
      { className: 'rbc-agenda-view' },
      _react2.default.createElement(
        'table',
        { ref: 'header' },
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              { className: 'rbc-header', ref: 'dateCol' },
              messages.date
            ),
            _react2.default.createElement(
              'th',
              { className: 'rbc-header', ref: 'timeCol' },
              messages.time
            ),
            _react2.default.createElement(
              'th',
              { className: 'rbc-header' },
              messages.event
            )
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'rbc-agenda-content', ref: 'content' },
        _react2.default.createElement(
          'table',
          null,
          _react2.default.createElement(
            'tbody',
            { ref: 'tbody' },
            range.map(function (day, idx) {
              return _this.renderDay(day, events, idx);
            })
          )
        )
      )
    );
  },
  renderDay: function renderDay(day, events, dayKey) {
    var _this2 = this;

    var _props2 = this.props;
    var culture = _props2.culture;
    var components = _props2.components;
    var titleAccessor = _props2.titleAccessor;
    var agendaDateFormat = _props2.agendaDateFormat;


    var EventComponent = components.event;
    var DateComponent = components.date;

    events = events.filter(function (e) {
      return (0, _eventLevels.inRange)(e, day, day, _this2.props);
    });

    return events.map(function (event, idx) {
      var dateLabel = idx === 0 && _localizer2.default.format(day, agendaDateFormat, culture);
      var first = idx === 0 ? _react2.default.createElement(
        'td',
        { rowSpan: events.length, className: 'rbc-agenda-date-cell' },
        DateComponent ? _react2.default.createElement(DateComponent, { day: day, label: dateLabel }) : dateLabel
      ) : false;

      var title = (0, _accessors.accessor)(event, titleAccessor);

      return _react2.default.createElement(
        'tr',
        { key: dayKey + '_' + idx },
        first,
        _react2.default.createElement(
          'td',
          { className: 'rbc-agenda-time-cell' },
          _this2.timeRangeLabel(day, event)
        ),
        _react2.default.createElement(
          'td',
          { className: 'rbc-agenda-event-cell' },
          EventComponent ? _react2.default.createElement(EventComponent, { event: event, title: title }) : title
        )
      );
    }, []);
  },
  timeRangeLabel: function timeRangeLabel(day, event) {
    var _props3 = this.props;
    var endAccessor = _props3.endAccessor;
    var startAccessor = _props3.startAccessor;
    var allDayAccessor = _props3.allDayAccessor;
    var culture = _props3.culture;
    var messages = _props3.messages;
    var components = _props3.components;


    var labelClass = '',
        TimeComponent = components.time,
        label = (0, _messages2.default)(messages).allDay;

    var start = (0, _accessors.accessor)(event, startAccessor);
    var end = (0, _accessors.accessor)(event, endAccessor);

    if (!(0, _accessors.accessor)(event, allDayAccessor)) {
      if (_dates2.default.eq(start, end, 'day')) {
        label = _localizer2.default.format({ start: start, end: end }, this.props.agendaTimeRangeFormat, culture);
      } else if (_dates2.default.eq(day, start, 'day')) {
        label = _localizer2.default.format(start, this.props.agendaTimeFormat, culture);
      } else if (_dates2.default.eq(day, end, 'day')) {
        label = _localizer2.default.format(start, this.props.agendaTimeFormat, culture);
      }
    }

    if (_dates2.default.gt(day, start, 'day')) labelClass = 'rbc-continues-prior';
    if (_dates2.default.lt(day, end, 'day')) labelClass += ' rbc-continues-after';

    return _react2.default.createElement(
      'span',
      { className: labelClass.trim() },
      TimeComponent ? _react2.default.createElement(TimeComponent, { event: event, label: label }) : label
    );
  },
  _adjustHeader: function _adjustHeader() {
    var header = this.refs.header;
    var firstRow = this.refs.tbody.firstChild;

    if (!firstRow) return;

    var isOverflowing = this.refs.content.scrollHeight > this.refs.content.clientHeight;
    var widths = this._widths || [];

    this._widths = [(0, _width2.default)(firstRow.children[0]), (0, _width2.default)(firstRow.children[1])];

    if (widths[0] !== this._widths[0] || widths[1] !== this._widths[1]) {
      this.refs.dateCol.style.width = this._widths[0] + 'px';
      this.refs.timeCol.style.width = this._widths[1] + 'px';
    }

    if (isOverflowing) {
      _class2.default.addClass(header, 'rbc-header-overflowing');
      header.style.marginRight = (0, _scrollbarSize2.default)() + 'px';
    } else {
      _class2.default.removeClass(header, 'rbc-header-overflowing');
    }
  }
});

Agenda.navigate = function (date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates2.default.add(date, -1, 'day');

    case _constants.navigate.NEXT:
      return _dates2.default.add(date, 1, 'day');

    default:
      return date;
  }
};

Agenda.range = function (start, _ref) {
  var _ref$length = _ref.length;
  var length = _ref$length === undefined ? Agenda.defaultProps.length : _ref$length;

  var end = _dates2.default.add(start, length, 'day');
  return { start: start, end: end };
};

exports.default = Agenda;
module.exports = exports['default'];