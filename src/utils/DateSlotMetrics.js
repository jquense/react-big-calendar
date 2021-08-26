import memoize from 'memoize-one'
import { eventSegments, endOfRange, eventLevels } from './eventLevels'

let isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot

const isEqual = (a, b) =>
  a[0].range === b[0].range && a[0].events === b[0].events

export function getSlotMetrics() {
  return memoize(options => {
    const { range, events, maxRows, minRows, accessors, localizer } = options
    let { first, last } = endOfRange({ dateRange: range, localizer })

    let segments = events.map(evt =>
      eventSegments(evt, range, accessors, localizer)
    )

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
        return range.find(r => localizer.eq(r, date, 'day'))
      },

      getEventsForSlot(slot) {
        return segments
          .filter(seg => isSegmentInSlot(seg, slot))
          .map(seg => seg.event)
      },

      continuesPrior(event) {
        return localizer.lt(accessors.start(event), first, 'day')
      },

      continuesAfter(event) {
        const eventEnd = accessors.end(event)
        const singleDayDuration = localizer.eq(
          accessors.start(event),
          eventEnd,
          'minutes'
        )

        return singleDayDuration
          ? localizer.gte(eventEnd, last, 'minutes')
          : localizer.gt(eventEnd, last, 'minutes')
      },
    }
  }, isEqual)
}
