'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsMessages = require('./utils/messages');

var _utilsMessages2 = _interopRequireDefault(_utilsMessages);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _utilsDates = require('./utils/dates');

var _utilsDates2 = _interopRequireDefault(_utilsDates);

var _utilsConstants = require('./utils/constants');

var _utilsAccessors = require('./utils/accessors');

var _domHelpersClass = require('dom-helpers/class');

var _domHelpersClass2 = _interopRequireDefault(_domHelpersClass);

var _domHelpersQueryWidth = require('dom-helpers/query/width');

var _domHelpersQueryWidth2 = _interopRequireDefault(_domHelpersQueryWidth);

var _domHelpersUtilScrollbarSize = require('dom-helpers/util/scrollbarSize');

var _domHelpersUtilScrollbarSize2 = _interopRequireDefault(_domHelpersUtilScrollbarSize);

var _utilsEventLevels = require('./utils/eventLevels');

var Agenda = _react2['default'].createClass({
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

    var messages = _utilsMessages2['default'](this.props.messages);
    var end = _utilsDates2['default'].add(date, length, 'day');

    var range = _utilsDates2['default'].range(date, end, 'day');

    events = events.filter(function (event) {
      return _utilsEventLevels.inRange(event, date, end, _this.props);
    });

    events.sort(function (a, b) {
      return +_utilsAccessors.accessor(a, startAccessor) - +_utilsAccessors.accessor(b, startAccessor);
    });

    return _react2['default'].createElement(
      'div',
      { className: 'rbc-agenda-view' },
      _react2['default'].createElement(
        'table',
        { ref: 'header' },
        _react2['default'].createElement(
          'thead',
          null,
          _react2['default'].createElement(
            'tr',
            null,
            _react2['default'].createElement(
              'th',
              { className: 'rbc-header', ref: 'dateCol' },
              messages.date
            ),
            _react2['default'].createElement(
              'th',
              { className: 'rbc-header', ref: 'timeCol' },
              messages.time
            ),
            _react2['default'].createElement(
              'th',
              { className: 'rbc-header' },
              messages.event
            )
          )
        )
      ),
      _react2['default'].createElement(
        'div',
        { className: 'rbc-agenda-content', ref: 'content' },
        _react2['default'].createElement(
          'table',
          null,
          _react2['default'].createElement(
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
      return _utilsEventLevels.inRange(e, day, day, _this2.props);
    });

    return events.map(function (event, idx) {
      var dateLabel = idx === 0 && _localizer2['default'].format(day, agendaDateFormat, culture);
      var first = idx === 0 ? _react2['default'].createElement(
        'td',
        { rowSpan: events.length, className: 'rbc-agenda-date-cell' },
        DateComponent ? _react2['default'].createElement(DateComponent, { day: day, label: dateLabel }) : dateLabel
      ) : false;

      var title = _utilsAccessors.accessor(event, titleAccessor);

      return _react2['default'].createElement(
        'tr',
        { key: dayKey + '_' + idx },
        first,
        _react2['default'].createElement(
          'td',
          { className: 'rbc-agenda-time-cell' },
          _this2.timeRangeLabel(day, event)
        ),
        _react2['default'].createElement(
          'td',
          { className: 'rbc-agenda-event-cell' },
          EventComponent ? _react2['default'].createElement(EventComponent, { event: event, title: title }) : title
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
        label = _utilsMessages2['default'](messages).allDay;

    var start = _utilsAccessors.accessor(event, startAccessor);
    var end = _utilsAccessors.accessor(event, endAccessor);

    if (!_utilsAccessors.accessor(event, allDayAccessor)) {
      if (_utilsDates2['default'].eq(start, end, 'day')) {
        label = _localizer2['default'].format({ start: start, end: end }, this.props.agendaTimeRangeFormat, culture);
      } else if (_utilsDates2['default'].eq(day, start, 'day')) {
        label = _localizer2['default'].format(start, this.props.agendaTimeFormat, culture);
      } else if (_utilsDates2['default'].eq(day, end, 'day')) {
        label = _localizer2['default'].format(start, this.props.agendaTimeFormat, culture);
      }
    }

    if (_utilsDates2['default'].gt(day, start, 'day')) labelClass = 'rbc-continues-prior';
    if (_utilsDates2['default'].lt(day, end, 'day')) labelClass += ' rbc-continues-after';

    return _react2['default'].createElement(
      'span',
      { className: labelClass.trim() },
      TimeComponent ? _react2['default'].createElement(TimeComponent, { event: event, label: label }) : label
    );
  },

  _adjustHeader: function _adjustHeader() {
    var header = this.refs.header;
    var firstRow = this.refs.tbody.firstChild;

    if (!firstRow) return;

    var isOverflowing = this.refs.content.scrollHeight > this.refs.content.clientHeight;
    var widths = this._widths || [];

    this._widths = [_domHelpersQueryWidth2['default'](firstRow.children[0]), _domHelpersQueryWidth2['default'](firstRow.children[1])];

    if (widths[0] !== this._widths[0] || widths[1] !== this._widths[1]) {
      this.refs.dateCol.style.width = this._widths[0] + 'px';
      this.refs.timeCol.style.width = this._widths[1] + 'px';
    }

    if (isOverflowing) {
      _domHelpersClass2['default'].addClass(header, 'rbc-header-overflowing');
      header.style.marginRight = _domHelpersUtilScrollbarSize2['default']() + 'px';
    } else {
      _domHelpersClass2['default'].removeClass(header, 'rbc-header-overflowing');
    }
  }
});

Agenda.navigate = function (date, action) {
  switch (action) {
    case _utilsConstants.navigate.PREVIOUS:
      return _utilsDates2['default'].add(date, -1, 'day');

    case _utilsConstants.navigate.NEXT:
      return _utilsDates2['default'].add(date, 1, 'day');

    default:
      return date;
  }
};

Agenda.range = function (start, _ref) {
  var _ref$length = _ref.length;
  var length = _ref$length === undefined ? Agenda.defaultProps.length : _ref$length;

  var end = _utilsDates2['default'].add(start, length, 'day');
  return { start: start, end: end };
};

exports['default'] = Agenda;
module.exports = exports['default'];