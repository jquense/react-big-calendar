'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.getSlotMetrics = getSlotMetrics

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _memoizeOne = _interopRequireDefault(require('memoize-one'))

var dates = _interopRequireWildcard(require('./dates'))

var _eventLevels = require('./eventLevels')

var isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot

var isEqual = (a, b) => a[0].range === b[0].range && a[0].events === b[0].events

function getSlotMetrics() {
  return (0, _memoizeOne.default)(options => {
    var { range, events, maxRows, minRows, accessors } = options
    var { first, last } = (0, _eventLevels.endOfRange)(range)
    var segments = events.map(evt =>
      (0, _eventLevels.eventSegments)(evt, range, accessors)
    )
    var { levels, extra } = (0, _eventLevels.eventLevels)(
      segments,
      Math.max(maxRows - 1, 1)
    )

    while (levels.length < minRows) {
      levels.push([])
    }

    return {
      first,
      last,
      levels,
      extra,
      range,
      slots: range.length,

      clone(args) {
        var metrics = getSlotMetrics()
        return metrics((0, _extends2.default)({}, options, args))
      },

      getDateForSlot(slotNumber) {
        return range[slotNumber]
      },

      getSlotForDate(date) {
        return range.find(r => dates.eq(r, date, 'day'))
      },

      getEventsForSlot(slot) {
        return segments
          .filter(seg => isSegmentInSlot(seg, slot))
          .map(seg => seg.event)
      },

      continuesPrior(event) {
        return dates.lt(accessors.start(event), first, 'day')
      },

      continuesAfter(event) {
        var eventEnd = accessors.end(event)
        var singleDayDuration = dates.eq(
          accessors.start(event),
          eventEnd,
          'minutes'
        )
        return singleDayDuration
          ? dates.gte(eventEnd, last, 'minutes')
          : dates.gt(eventEnd, last, 'minutes')
      },
    }
  }, isEqual)
}
