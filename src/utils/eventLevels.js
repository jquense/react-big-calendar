import findIndex from 'lodash/findIndex'

export function endOfRange({ dateRange, localizer, unit = 'day' }) {
  return {
    first: dateRange[0],
    last: localizer.add(dateRange[dateRange.length - 1], 1, unit),
  }
}

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
  span = Math.max(span, 1)

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

export function inRange(e, start, end, accessors, localizer) {
  let eStart = localizer.startOf(accessors.start(e), 'day')
  let eEnd = accessors.end(e)

  let startsBeforeEnd = localizer.lte(eStart, end, 'day')
  // when the event is zero duration we need to handle a bit differently
  let endsAfterStart = !localizer.eq(eStart, eEnd, 'minutes')
    ? localizer.gt(eEnd, start, 'minutes')
    : localizer.gte(eEnd, start, 'minutes')

  return startsBeforeEnd && endsAfterStart
}

export function segsOverlap(seg, otherSegs) {
  return otherSegs.some(
    otherSeg => otherSeg.left <= seg.right && otherSeg.right >= seg.left
  )
}

export function sortEvents(evtA, evtB, accessors, localizer) {
  let startSort =
    +localizer.startOf(accessors.start(evtA), 'day') -
    +localizer.startOf(accessors.start(evtB), 'day')

  let durA = localizer.diff(
    accessors.start(evtA),
    localizer.ceil(accessors.end(evtA), 'day'),
    'day'
  )

  let durB = localizer.diff(
    accessors.start(evtB),
    localizer.ceil(accessors.end(evtB), 'day'),
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
