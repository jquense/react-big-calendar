import findIndex from 'lodash/findIndex'
import dates from './dates'
import { accessor as get } from './accessors'
import { convertToTimezone } from './dayViewLayout/event'

export function endOfRange(dateRange, unit = 'day') {
  return {
    first: dateRange[0],
    last: dates.add(dateRange[dateRange.length - 1], 1, unit),
  }
}

export function eventSegments(
  event,
  first,
  last,
  { timezone, startAccessor, endAccessor }, // props
  range
) {
  let slots = dates.diff(first, last, 'day')
  let zonedStart = convertToTimezone(get(event, startAccessor), timezone)
  let zonedEnd = convertToTimezone(get(event, endAccessor), timezone)

  let start = dates.max(dates.startOf(zonedStart, 'day'), first)
  let end = dates.min(dates.ceil(zonedEnd, 'day'), last)

  let padding = findIndex(range, d => {
    return dates.eq(d, start, 'day')
  })

  let span = dates.diff(start, end, 'day')

  span = Math.min(span, slots)
  span = Math.max(span, 1)

  return {
    event,
    span,
    left: padding + 1,
    right: Math.max(padding + span, 1),
  }
}

export function segStyle(span, slots) {
  let per = span / slots * 100 + '%'
  return { WebkitFlexBasis: per, flexBasis: per, maxWidth: per } // IE10/11 need max-width. flex-basis doesn't respect box-sizing
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

export function inRange(
  e,
  rangeStart,
  rangeEnd,
  { timezone, startAccessor, endAccessor, getNow }
) {
  const zonedStart = convertToTimezone(get(e, startAccessor), timezone)
  const zonedEnd = convertToTimezone(get(e, endAccessor), timezone)
  const zonedRangeStart = convertToTimezone(rangeStart, timezone)
  const zonedRangeEnd = convertToTimezone(rangeEnd, timezone)

  let eStart = dates.startOf(zonedStart, 'day')
  let eEnd = convertToTimezone(get(e, endAccessor), timezone)

  let startsBeforeEnd = dates.lte(eStart, zonedRangeEnd, 'day')
  // when the event is zero duration we need to handle a bit differently
  let endsAfterStart = !dates.eq(eStart, zonedRangeEnd, 'minutes')
    ? dates.gt(eEnd, zonedRangeStart, 'minutes')
    : dates.gte(eEnd, zonedRangeStart, 'minutes')

  return startsBeforeEnd && endsAfterStart
}

export function segsOverlap(seg, otherSegs) {
  return otherSegs.some(
    otherSeg => otherSeg.left <= seg.right && otherSeg.right >= seg.left
  )
}

export function sortEvents(
  evtA,
  evtB,
  { startAccessor, endAccessor, allDayAccessor }
) {
  let startSort =
    +dates.startOf(get(evtA, startAccessor), 'day') -
    +dates.startOf(get(evtB, startAccessor), 'day')

  let durA = dates.diff(
    get(evtA, startAccessor),
    dates.ceil(get(evtA, endAccessor), 'day'),
    'day'
  )

  let durB = dates.diff(
    get(evtB, startAccessor),
    dates.ceil(get(evtB, endAccessor), 'day'),
    'day'
  )

  return (
    startSort || // sort by start Day first
    Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
    !!get(evtB, allDayAccessor) - !!get(evtA, allDayAccessor) || // then allDay single day events
    +get(evtA, startAccessor) - +get(evtB, startAccessor)
  ) // then sort by start time
}
