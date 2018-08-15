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

var _dates = require('./utils/dates')

var _dates2 = _interopRequireDefault(_dates)

var _constants = require('./utils/constants')

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
          selected = _this$props.selected,
          getters = _this$props.getters,
          accessors = _this$props.accessors,
          localizer = _this$props.localizer,
          _this$props$component = _this$props.components,
          Event = _this$props$component.event,
          AgendaDate = _this$props$component.date

        events = events.filter(function(e) {
          return (0,
          _eventLevels.inRange)(e, _dates2.default.startOf(day, 'day'), _dates2.default.endOf(day, 'day'), accessors)
        })

        return events.map(function(event, idx) {
          var title = accessors.title(event)
          var end = accessors.end(event)
          var start = accessors.start(event)

          var userProps = getters.eventProp(
            event,
            start,
            end,
            (0, _selection.isSelected)(event, selected)
          )

          var dateLabel = idx === 0 && localizer.format(day, 'agendaDateFormat')
          var first =
            idx === 0
              ? _react2.default.createElement(
                  'td',
                  { rowSpan: events.length, className: 'rbc-agenda-date-cell' },
                  AgendaDate
                    ? _react2.default.createElement(AgendaDate, {
                        day: day,
                        label: dateLabel,
                      })
                    : dateLabel
                )
              : false

          return _react2.default.createElement(
            'tr',
            {
              key: dayKey + '_' + idx,
              className: userProps.className,
              style: userProps.style,
            },
            first,
            _react2.default.createElement(
              'td',
              { className: 'rbc-agenda-time-cell' },
              _this.timeRangeLabel(day, event)
            ),
            _react2.default.createElement(
              'td',
              { className: 'rbc-agenda-event-cell' },
              Event
                ? _react2.default.createElement(Event, {
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
          accessors = _this$props2.accessors,
          localizer = _this$props2.localizer,
          components = _this$props2.components

        var labelClass = '',
          TimeComponent = components.time,
          label = localizer.messages.allDay

        var end = accessors.end(event)
        var start = accessors.start(event)

        if (!accessors.allDay(event)) {
          if (_dates2.default.eq(start, end, 'day')) {
            label = localizer.format(
              { start: start, end: end },
              'agendaTimeRangeFormat'
            )
          } else if (_dates2.default.eq(day, start, 'day')) {
            label = localizer.format(start, 'agendaTimeFormat')
          } else if (_dates2.default.eq(day, end, 'day')) {
            label = localizer.format(end, 'agendaTimeFormat')
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
        if (!_this.refs.tbody) return

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
      accessors = _props.accessors,
      localizer = _props.localizer
    var messages = localizer.messages

    var end = _dates2.default.add(date, length, 'day')

    var range = _dates2.default.range(date, end, 'day')

    events = events.filter(function(event) {
      return (0, _eventLevels.inRange)(event, date, end, accessors)
    })

    events.sort(function(a, b) {
      return +accessors.start(a) - +accessors.start(b)
    })

    return _react2.default.createElement(
      'div',
      { className: 'rbc-agenda-view' },
      events.length !== 0
        ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(
              'table',
              { ref: 'header', className: 'rbc-agenda-table' },
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
                { className: 'rbc-agenda-table' },
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
        : _react2.default.createElement(
            'span',
            { className: 'rbc-agenda-empty' },
            messages.noEventsInRange
          )
    )
  }

  return Agenda
})(_react2.default.Component)

Agenda.propTypes = {
  events: _propTypes2.default.array,
  date: _propTypes2.default.instanceOf(Date),
  length: _propTypes2.default.number.isRequired,

  selected: _propTypes2.default.object,

  accessors: _propTypes2.default.object.isRequired,
  components: _propTypes2.default.object.isRequired,
  getters: _propTypes2.default.object.isRequired,
  localizer: _propTypes2.default.object.isRequired,
}
Agenda.defaultProps = {
  length: 30,
}

Agenda.range = function(start, _ref) {
  var _ref$length = _ref.length,
    length =
      _ref$length === undefined ? Agenda.defaultProps.length : _ref$length

  var end = _dates2.default.add(start, length, 'day')
  return { start: start, end: end }
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
    localizer = _ref3.localizer

  var end = _dates2.default.add(start, length, 'day')
  return localizer.format({ start: start, end: end }, 'agendaHeaderFormat')
}

exports.default = Agenda
module.exports = exports['default']
