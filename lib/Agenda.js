'use strict'

exports.__esModule = true

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _class = require('dom-helpers/class')

var _class2 = _interopRequireDefault(_class)

var _width = require('dom-helpers/query/width')

var _width2 = _interopRequireDefault(_width)

var _scrollbarSize = require('dom-helpers/util/scrollbarSize')

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize)

var _localizer = require('./localizer')

var _localizer2 = _interopRequireDefault(_localizer)

var _messages = require('./utils/messages')

var _messages2 = _interopRequireDefault(_messages)

var _dates = require('./utils/dates')

var _dates2 = _interopRequireDefault(_dates)

var _constants = require('./utils/constants')

var _accessors = require('./utils/accessors')

var _propTypes3 = require('./utils/propTypes')

var _eventLevels = require('./utils/eventLevels')

var _selection = require('./utils/selection')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var Agenda = (function(_React$Component) {
  _inherits(Agenda, _React$Component)

  function Agenda() {
    var _temp, _this, _ret

    _classCallCheck(this, Agenda)

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        _React$Component.call.apply(_React$Component, [this].concat(args))
      )),
      _this)),
      (_this.renderDay = function(day, events, dayKey) {
        var _this$props = _this.props,
          culture = _this$props.culture,
          components = _this$props.components,
          titleAccessor = _this$props.titleAccessor,
          agendaDateFormat = _this$props.agendaDateFormat,
          eventPropGetter = _this$props.eventPropGetter,
          startAccessor = _this$props.startAccessor,
          endAccessor = _this$props.endAccessor,
          selected = _this$props.selected

        var EventComponent = components.event
        var DateComponent = components.date

        events = events.filter(function(e) {
          return (0, _eventLevels.inRange)(e, day, day, _this.props)
        })

        return events.map(function(event, idx) {
          var _ref = eventPropGetter
              ? eventPropGetter(
                  event,
                  (0, _accessors.accessor)(event, startAccessor),
                  (0, _accessors.accessor)(event, endAccessor),
                  (0, _selection.isSelected)(event, selected)
                )
              : {},
            className = _ref.className,
            style = _ref.style

          var dateLabel =
            idx === 0 &&
            _localizer2.default.format(day, agendaDateFormat, culture)
          var first =
            idx === 0
              ? _react2.default.createElement(
                  'td',
                  { rowSpan: events.length, className: 'rbc-agenda-date-cell' },
                  DateComponent
                    ? _react2.default.createElement(DateComponent, {
                        day: day,
                        label: dateLabel,
                      })
                    : dateLabel
                )
              : false

          var title = (0, _accessors.accessor)(event, titleAccessor)

          return _react2.default.createElement(
            'tr',
            { key: dayKey + '_' + idx, className: className, style: style },
            first,
            _react2.default.createElement(
              'td',
              { className: 'rbc-agenda-time-cell' },
              _this.timeRangeLabel(day, event)
            ),
            _react2.default.createElement(
              'td',
              { className: 'rbc-agenda-event-cell' },
              EventComponent
                ? _react2.default.createElement(EventComponent, {
                    event: event,
                    title: title,
                  })
                : title
            )
          )
        }, [])
      }),
      (_this.timeRangeLabel = function(day, event) {
        var _this$props2 = _this.props,
          endAccessor = _this$props2.endAccessor,
          startAccessor = _this$props2.startAccessor,
          allDayAccessor = _this$props2.allDayAccessor,
          culture = _this$props2.culture,
          messages = _this$props2.messages,
          components = _this$props2.components

        var labelClass = '',
          TimeComponent = components.time,
          label = (0, _messages2.default)(messages).allDay

        var start = (0, _accessors.accessor)(event, startAccessor)
        var end = (0, _accessors.accessor)(event, endAccessor)

        if (!(0, _accessors.accessor)(event, allDayAccessor)) {
          if (_dates2.default.eq(start, end, 'day')) {
            label = _localizer2.default.format(
              { start: start, end: end },
              _this.props.agendaTimeRangeFormat,
              culture
            )
          } else if (_dates2.default.eq(day, start, 'day')) {
            label = _localizer2.default.format(
              start,
              _this.props.agendaTimeFormat,
              culture
            )
          } else if (_dates2.default.eq(day, end, 'day')) {
            label = _localizer2.default.format(
              end,
              _this.props.agendaTimeFormat,
              culture
            )
          }
        }

        if (_dates2.default.gt(day, start, 'day'))
          labelClass = 'rbc-continues-prior'
        if (_dates2.default.lt(day, end, 'day'))
          labelClass += ' rbc-continues-after'

        return _react2.default.createElement(
          'span',
          { className: labelClass.trim() },
          TimeComponent
            ? _react2.default.createElement(TimeComponent, {
                event: event,
                day: day,
                label: label,
              })
            : label
        )
      }),
      (_this._adjustHeader = function() {
        var header = _this.refs.header
        var firstRow = _this.refs.tbody.firstChild

        if (!firstRow) return

        var isOverflowing =
          _this.refs.content.scrollHeight > _this.refs.content.clientHeight
        var widths = _this._widths || []

        _this._widths = [
          (0, _width2.default)(firstRow.children[0]),
          (0, _width2.default)(firstRow.children[1]),
        ]

        if (widths[0] !== _this._widths[0] || widths[1] !== _this._widths[1]) {
          _this.refs.dateCol.style.width = _this._widths[0] + 'px'
          _this.refs.timeCol.style.width = _this._widths[1] + 'px'
        }

        if (isOverflowing) {
          _class2.default.addClass(header, 'rbc-header-overflowing')
          header.style.marginRight = (0, _scrollbarSize2.default)() + 'px'
        } else {
          _class2.default.removeClass(header, 'rbc-header-overflowing')
        }
      }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    )
  }

  Agenda.prototype.componentDidMount = function componentDidMount() {
    this._adjustHeader()
  }

  Agenda.prototype.componentDidUpdate = function componentDidUpdate() {
    this._adjustHeader()
  }

  Agenda.prototype.render = function render() {
    var _this2 = this

    var _props = this.props,
      length = _props.length,
      date = _props.date,
      events = _props.events,
      startAccessor = _props.startAccessor

    var messages = (0, _messages2.default)(this.props.messages)
    var end = _dates2.default.add(date, length, 'day')

    var range = _dates2.default.range(date, end, 'day')

    events = events.filter(function(event) {
      return (0, _eventLevels.inRange)(event, date, end, _this2.props)
    })

    events.sort(function(a, b) {
      return (
        +(0, _accessors.accessor)(a, startAccessor) -
        +(0, _accessors.accessor)(b, startAccessor)
      )
    })

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
            range.map(function(day, idx) {
              return _this2.renderDay(day, events, idx)
            })
          )
        )
      )
    )
  }

  return Agenda
})(_react2.default.Component)

Agenda.propTypes = {
  events: _propTypes2.default.array,
  date: _propTypes2.default.instanceOf(Date),
  length: _propTypes2.default.number.isRequired,
  titleAccessor: _propTypes3.accessor.isRequired,
  tooltipAccessor: _propTypes3.accessor.isRequired,
  allDayAccessor: _propTypes3.accessor.isRequired,
  startAccessor: _propTypes3.accessor.isRequired,
  endAccessor: _propTypes3.accessor.isRequired,
  eventPropGetter: _propTypes2.default.func,
  selected: _propTypes2.default.object,

  agendaDateFormat: _propTypes3.dateFormat,
  agendaTimeFormat: _propTypes3.dateFormat,
  agendaTimeRangeFormat: _propTypes3.dateRangeFormat,
  culture: _propTypes2.default.string,

  components: _propTypes2.default.object.isRequired,
  messages: _propTypes2.default.shape({
    date: _propTypes2.default.string,
    time: _propTypes2.default.string,
  }),
}
Agenda.defaultProps = {
  length: 30,
}

Agenda.navigate = function(date, action, _ref2) {
  var _ref2$length = _ref2.length,
    length =
      _ref2$length === undefined ? Agenda.defaultProps.length : _ref2$length

  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates2.default.add(date, -length, 'day')

    case _constants.navigate.NEXT:
      return _dates2.default.add(date, length, 'day')

    default:
      return date
  }
}

Agenda.title = function(start, _ref3) {
  var _ref3$length = _ref3.length,
    length =
      _ref3$length === undefined ? Agenda.defaultProps.length : _ref3$length,
    formats = _ref3.formats,
    culture = _ref3.culture

  var end = _dates2.default.add(start, length, 'day')
  return _localizer2.default.format(
    { start: start, end: end },
    formats.agendaHeaderFormat,
    culture
  )
}

Agenda.title = function(start, _ref4) {
  var _ref4$length = _ref4.length,
    length =
      _ref4$length === undefined
        ? (length = Agenda.defaultProps.length)
        : _ref4$length,
    formats = _ref4.formats,
    culture = _ref4.culture

  var end = _dates2.default.add(start, length, 'day')
  return _localizer2.default.format(
    { start: start, end: end },
    formats.agendaHeaderFormat,
    culture
  )
}

exports.default = Agenda
module.exports = exports['default']
