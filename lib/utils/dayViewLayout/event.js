'use strict'

exports.__esModule = true
exports.Event = undefined

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

exports.startsBefore = startsBefore
exports.positionFromDate = positionFromDate

var _accessors = require('../accessors')

var _dates = require('../dates')

var _dates2 = _interopRequireDefault(_dates)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function startsBefore(date, min) {
  return _dates2.default.lt(_dates2.default.merge(min, date), min, 'minutes')
}

function positionFromDate(date, min, total) {
  if (startsBefore(date, min)) {
    return 0
  }

  var diff = _dates2.default.diff(
    min,
    _dates2.default.merge(min, date),
    'minutes'
  )
  return Math.min(diff, total)
}

var Event = (exports.Event = (function() {
  function Event(data, props) {
    _classCallCheck(this, Event)

    var startAccessor = props.startAccessor,
      endAccessor = props.endAccessor,
      min = props.min,
      totalMin = props.totalMin

    var _normalizeDates = normalizeDates(
        (0, _accessors.accessor)(data, startAccessor),
        (0, _accessors.accessor)(data, endAccessor),
        props
      ),
      startDate = _normalizeDates[0],
      endDate = _normalizeDates[1]

    this.startSlot = positionFromDate(startDate, min, totalMin)
    this.endSlot = positionFromDate(endDate, min, totalMin)
    this.start = +startDate
    this.end = +endDate
    this.top = this.startSlot / totalMin * 100
    this.height = this.endSlot / totalMin * 100 - this.top
    this.data = data
  }

  /**
   * The event's width without any overlap.
   */

  _createClass(Event, [
    {
      key: '_width',
      get: function get() {
        // The container event's width is determined by the maximum number of
        // events in any of its rows.
        if (this.rows) {
          var columns =
            this.rows.reduce(function(max, row) {
              return Math.max(max, row.leaves.length + 1) // add itself
            }, 0) + 1 // add the container

          return 100 / columns
        }

        var availableWidth = 100 - this.container._width

        // The row event's width is the space left by the container, divided
        // among itself and its leaves.
        if (this.leaves) {
          return availableWidth / (this.leaves.length + 1)
        }

        // The leaf event's width is determined by its row's width
        return this.row._width
      },

      /**
       * The event's calculated width, possibly with extra width added for
       * overlapping effect.
       */
    },
    {
      key: 'width',
      get: function get() {
        var noOverlap = this._width
        var overlap = Math.min(100, this._width * 1.7)

        // Containers can always grow.
        if (this.rows) {
          return overlap
        }

        // Rows can grow if they have leaves.
        if (this.leaves) {
          return this.leaves.length > 0 ? overlap : noOverlap
        }

        // Leaves can grow unless they're the last item in a row.
        var leaves = this.row.leaves

        var index = leaves.indexOf(this)
        return index === leaves.length - 1 ? noOverlap : overlap
      },
    },
    {
      key: 'xOffset',
      get: function get() {
        // Containers have no offset.
        if (this.rows) {
          return 0
        }

        // Rows always start where their container ends.
        if (this.leaves) {
          return this.container._width
        }

        // Leaves are spread out evenly on the space left by its row.
        var _row = this.row,
          leaves = _row.leaves,
          xOffset = _row.xOffset,
          _width = _row._width

        var index = leaves.indexOf(this) + 1
        return xOffset + index * _width
      },
    },
  ])

  return Event
})())

/**
 * Return start and end dates with respect to timeslot positions.
 */

function normalizeDates(startDate, endDate, _ref) {
  var min = _ref.min,
    showMultiDayTimes = _ref.showMultiDayTimes

  if (!showMultiDayTimes) {
    return [startDate, endDate]
  }

  var current = new Date(min) // today at midnight
  var c = new Date(current)
  var s = new Date(startDate)
  var e = new Date(endDate)

  // Use noon to compare dates to avoid DST issues.
  s.setHours(12, 0, 0, 0)
  e.setHours(12, 0, 0, 0)
  c.setHours(12, 0, 0, 0)

  // Current day is at the start, but it spans multiple days,
  // so we correct the end.
  if (+c === +s && c < e) {
    return [startDate, _dates2.default.endOf(startDate, 'day')]
  }

  // Current day is in between start and end dates,
  // so we make it span all day.
  if (c > s && c < e) {
    return [current, _dates2.default.endOf(current, 'day')]
  }

  // Current day is at the end of a multi day event,
  // so we make it start at midnight, and end normally.
  if (c > s && +c === +e) {
    return [current, endDate]
  }

  return [startDate, endDate]
}
