import findIndex from 'lodash/findIndex'
import { startOf, lte, neq, gt, gte, ceil, diff } from './dates'

export function endOfRange({ dateRange, unit = 'day', localizer }) {
  return {
    first: dateRange[0],
    last: localizer.add(dateRange[dateRange.length - 1], 1, unit),
  }
}

// properly calculating segments requires working with dates in
// the timezone we're working with, so we use the localizer
export function eventSegments(event, range, accessors, localizer) {
  let { first, last } = endOfRange({ dateRange: range, localizer })

  let slots = localizer.diff(first, last, 'day')
  let start = localizer.max(
    localizer.startOf(accessors.start(event), 'day'),
    first
  )
  let end = localizer.min(localizer.ceil(accessors.end(event), 'day'), last)

  let padding = findIndex(range, x => localizer.eq(x, start, 'day'))
  let span = localizer.diff(start, end, 'day')

  span = Math.min(span, slots)
  // The segmentOffset is necessary when adjusting for timezones
  // ahead of the browser timezone
  span = Math.max(span - localizer.segmentOffset, 1)

  return {
    event,
    span,
    left: padding + 1,
    right: Math.max(padding + span, 1),
  }
}

export function eventLevels(rowSegments, limit = Infinity) {
  let i,
    j,
    seg,
    levels = [],
    extra = []

  for (i = 0; i < rowSegments.length; i++) {
    seg = rowSegments[i]

    for (j = 0; j < levels.length; j++) if (!segsOverlap(seg, levels[j])) break

    if (j >= limit) {
      extra.push(seg)
    } else {
      ;(levels[j] || (levels[j] = [])).push(seg)
    }
  }

  for (i = 0; i < levels.length; i++) {
    levels[i].sort((a, b) => a.left - b.left) //eslint-disable-line
  }

  return { levels, extra }
}

export function inRange(e, start, end, accessors) {
  let eStart = startOf(accessors.start(e), 'day')
  let eEnd = accessors.end(e)

  let startsBeforeEnd = lte(eStart, end, 'day')
  // when the event is zero duration we need to handle a bit differently
  let endsAfterStart = neq(eStart, eEnd, 'minutes')
    ? gt(eEnd, start, 'minutes')
    : gte(eEnd, start, 'minutes')

  return startsBeforeEnd && endsAfterStart
}

export function segsOverlap(seg, otherSegs) {
  return otherSegs.some(
    otherSeg => otherSeg.left <= seg.right && otherSeg.right >= seg.left
  )
}

export function sortEvents(evtA, evtB, accessors) {
  let startSort =
    +startOf(accessors.start(evtA), 'day') -
    +startOf(accessors.start(evtB), 'day')

  let durA = diff(
    accessors.start(evtA),
    ceil(accessors.end(evtA), 'day'),
    'day'
  )

  let durB = diff(
    accessors.start(evtB),
    ceil(accessors.end(evtB), 'day'),
    'day'
  )

  return (
    startSort || // sort by start Day first
    Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
    !!accessors.allDay(evtB) - !!accessors.allDay(evtA) || // then allDay single day events
    +accessors.start(evtA) - +accessors.start(evtB) || // then sort by start time
    +accessors.end(evtA) - +accessors.end(evtB) // then sort by end time
  )
}
