'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireWildcard(require('react'))

var _addClass = _interopRequireDefault(require('dom-helpers/addClass'))

var _removeClass = _interopRequireDefault(require('dom-helpers/removeClass'))

var _width = _interopRequireDefault(require('dom-helpers/width'))

var _scrollbarSize = _interopRequireDefault(
  require('dom-helpers/scrollbarSize')
)

var dates = _interopRequireWildcard(require('./utils/dates'))

var _constants = require('./utils/constants')

var _eventLevels = require('./utils/eventLevels')

var _selection = require('./utils/selection')

function Agenda(_ref) {
  var selected = _ref.selected,
    getters = _ref.getters,
    accessors = _ref.accessors,
    localizer = _ref.localizer,
    components = _ref.components,
    length = _ref.length,
    date = _ref.date,
    events = _ref.events
  var headerRef = (0, _react.useRef)(null)
  var dateColRef = (0, _react.useRef)(null)
  var timeColRef = (0, _react.useRef)(null)
  var contentRef = (0, _react.useRef)(null)
  var tbodyRef = (0, _react.useRef)(null)
  ;(0, _react.useEffect)(function() {
    _adjustHeader()
  })

  var renderDay = function renderDay(day, events, dayKey) {
    var Event = components.event,
      AgendaDate = components.date
    events = events.filter(function(e) {
      return (0,
      _eventLevels.inRange)(e, dates.startOf(day, 'day'), dates.endOf(day, 'day'), accessors)
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
          ? _react.default.createElement(
              'td',
              {
                rowSpan: events.length,
                className: 'rbc-agenda-date-cell',
              },
              AgendaDate
                ? _react.default.createElement(AgendaDate, {
                    day: day,
                    label: dateLabel,
                  })
                : dateLabel
            )
          : false
      return _react.default.createElement(
        'tr',
        {
          key: dayKey + '_' + idx,
          className: userProps.className,
          style: userProps.style,
        },
        first,
        _react.default.createElement(
          'td',
          {
            className: 'rbc-agenda-time-cell',
          },
          timeRangeLabel(day, event)
        ),
        _react.default.createElement(
          'td',
          {
            className: 'rbc-agenda-event-cell',
          },
          Event
            ? _react.default.createElement(Event, {
                event: event,
                title: title,
              })
            : title
        )
      )
    }, [])
  }

  var timeRangeLabel = function timeRangeLabel(day, event) {
    var labelClass = '',
      TimeComponent = components.time,
      label = localizer.messages.allDay
    var end = accessors.end(event)
    var start = accessors.start(event)

    if (!accessors.allDay(event)) {
      if (dates.eq(start, end)) {
        label = localizer.format(start, 'agendaTimeFormat')
      } else if (dates.eq(start, end, 'day')) {
        label = localizer.format(
          {
            start: start,
            end: end,
          },
          'agendaTimeRangeFormat'
        )
      } else if (dates.eq(day, start, 'day')) {
        label = localizer.format(start, 'agendaTimeFormat')
      } else if (dates.eq(day, end, 'day')) {
        label = localizer.format(end, 'agendaTimeFormat')
      }
    }

    if (dates.gt(day, start, 'day')) labelClass = 'rbc-continues-prior'
    if (dates.lt(day, end, 'day')) labelClass += ' rbc-continues-after'
    return _react.default.createElement(
      'span',
      {
        className: labelClass.trim(),
      },
      TimeComponent
        ? _react.default.createElement(TimeComponent, {
            event: event,
            day: day,
            label: label,
          })
        : label
    )
  }

  var _adjustHeader = function _adjustHeader() {
    if (!tbodyRef.current) return
    var header = headerRef.current
    var firstRow = tbodyRef.current.firstChild
    if (!firstRow) return
    var isOverflowing =
      contentRef.current.scrollHeight > contentRef.current.clientHeight
    var _widths = []
    var widths = _widths
    _widths = [
      (0, _width.default)(firstRow.children[0]),
      (0, _width.default)(firstRow.children[1]),
    ]

    if (widths[0] !== _widths[0] || widths[1] !== _widths[1]) {
      dateColRef.current.style.width = _widths[0] + 'px'
      timeColRef.current.style.width = _widths[1] + 'px'
    }

    if (isOverflowing) {
      ;(0, _addClass.default)(header, 'rbc-header-overflowing')
      header.style.marginRight = (0, _scrollbarSize.default)() + 'px'
    } else {
      ;(0, _removeClass.default)(header, 'rbc-header-overflowing')
    }
  }

  var messages = localizer.messages
  var end = dates.add(date, length, 'day')
  var range = dates.range(date, end, 'day')
  events = events.filter(function(event) {
    return (0, _eventLevels.inRange)(event, date, end, accessors)
  })
  events.sort(function(a, b) {
    return +accessors.start(a) - +accessors.start(b)
  })
  return _react.default.createElement(
    'div',
    {
      className: 'rbc-agenda-view',
    },
    events.length !== 0
      ? _react.default.createElement(
          _react.default.Fragment,
          null,
          _react.default.createElement(
            'table',
            {
              ref: headerRef,
              className: 'rbc-agenda-table',
            },
            _react.default.createElement(
              'thead',
              null,
              _react.default.createElement(
                'tr',
                null,
                _react.default.createElement(
                  'th',
                  {
                    className: 'rbc-header',
                    ref: dateColRef,
                  },
                  messages.date
                ),
                _react.default.createElement(
                  'th',
                  {
                    className: 'rbc-header',
                    ref: timeColRef,
                  },
                  messages.time
                ),
                _react.default.createElement(
                  'th',
                  {
                    className: 'rbc-header',
                  },
                  messages.event
                )
              )
            )
          ),
          _react.default.createElement(
            'div',
            {
              className: 'rbc-agenda-content',
              ref: contentRef,
            },
            _react.default.createElement(
              'table',
              {
                className: 'rbc-agenda-table',
              },
              _react.default.createElement(
                'tbody',
                {
                  ref: tbodyRef,
                },
                range.map(function(day, idx) {
                  return renderDay(day, events, idx)
                })
              )
            )
          )
        )
      : _react.default.createElement(
          'span',
          {
            className: 'rbc-agenda-empty',
          },
          messages.noEventsInRange
        )
  )
}

Agenda.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        events: _propTypes.default.array,
        date: _propTypes.default.instanceOf(Date),
        length: _propTypes.default.number.isRequired,
        selected: _propTypes.default.object,
        accessors: _propTypes.default.object.isRequired,
        components: _propTypes.default.object.isRequired,
        getters: _propTypes.default.object.isRequired,
        localizer: _propTypes.default.object.isRequired,
      }
    : {}
Agenda.defaultProps = {
  length: 30,
}

Agenda.range = function(start, _ref2) {
  var _ref2$length = _ref2.length,
    length = _ref2$length === void 0 ? Agenda.defaultProps.length : _ref2$length
  var end = dates.add(start, length, 'day')
  return {
    start: start,
    end: end,
  }
}

Agenda.navigate = function(date, action, _ref3) {
  var _ref3$length = _ref3.length,
    length = _ref3$length === void 0 ? Agenda.defaultProps.length : _ref3$length

  switch (action) {
    case _constants.navigate.PREVIOUS:
      return dates.add(date, -length, 'day')

    case _constants.navigate.NEXT:
      return dates.add(date, length, 'day')

    default:
      return date
  }
}

Agenda.title = function(start, _ref4) {
  var _ref4$length = _ref4.length,
    length =
      _ref4$length === void 0 ? Agenda.defaultProps.length : _ref4$length,
    localizer = _ref4.localizer
  var end = dates.add(start, length, 'day')
  return localizer.format(
    {
      start: start,
      end: end,
    },
    'agendaHeaderFormat'
  )
}

var _default = Agenda
exports.default = _default
module.exports = exports['default']
