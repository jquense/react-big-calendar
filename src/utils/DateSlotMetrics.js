import memoize from 'memoize-one'
import * as dates from './dates'
import { eventSegments, endOfRange, eventLevels } from './eventLevels'

let isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot

const isEqual = (a, b) =>
  a[0].range === b[0].range && a[0].events === b[0].events

export function getSlotMetrics() {
  return memoize(options => {
    const { range, events, maxRows, minRows, accessors } = options
    let { first, last } = endOfRange(range)

    let segments = events.map(evt => eventSegments(evt, range, accessors))

    let { levels, extra } = eventLevels(segments, Math.max(maxRows - 1, 1))
    while (levels.length < minRows) levels.push([])

    return {
      first,
      last,

      levels,
      extra,
      range,
      slots: range.length,

      clone(args) {
        const metrics = getSlotMetrics()
        return metrics({ ...options, ...args })
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
        const eventEnd = accessors.end(event)
        const singleDayDuration = dates.eq(
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
