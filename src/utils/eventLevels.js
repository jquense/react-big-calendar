import findIndex from 'lodash/findIndex';
import dates from './dates';
import { accessor as get } from './accessors';

export function endOfRange(dateRange, unit = 'day') {
  return {
    first: dateRange[0],
    last: dates.add(dateRange[dateRange.length - 1], 1, unit)
  }
}

export function eventSegments(event, first, last, { startAccessor, endAccessor }, range) {
  let slots = dates.diff(first, last, 'day')
  let start = dates.max(dates.startOf(get(event, startAccessor), 'day'), first);
  let end = dates.min(dates.ceil(get(event, endAccessor), 'day'), last)

  let padding = findIndex(range, x => dates.eq(x, start, 'day'));
  let span = dates.diff(start, end, 'day');

  span = Math.min(span, slots)
  span = Math.max(span, 1);

  return {
    event,
    span,
    left: padding + 1,
    right: Math.max(padding + span, 1)
  }
}

export function segStyle(span, slots){
  let per = (span / slots) * 100 + '%';
  return { WebkitFlexBasis: per, flexBasis: per, maxWidth: per } // IE10/11 need max-width. flex-basis doesn't respect box-sizing
}

export function eventLevels(rowSegments, limit = Infinity){
  let i, j, seg
    , levels = []
    , extra = [];

  for (i = 0; i < rowSegments.length; i++) {
    seg = rowSegments[i];

    for (j = 0; j < levels.length; j++)
      if (!segsOverlap(seg, levels[j]))
        break

    if (j >= limit) {
      extra.push(seg)
    }
    else {
      (levels[j] || (levels[j] = [])).push(seg);
    }
  }

  for (i = 0; i < levels.length; i++) {
    levels[i].sort((a, b) => a.left - b.left); //eslint-disable-line
  }

  return { levels, extra };
}

export function inRange(e, start, end, { startAccessor, endAccessor }){
  let eStart = dates.startOf(get(e, startAccessor), 'day')
  let eEnd = get(e, endAccessor)

  let startsBeforeEnd = dates.lte(eStart, end, 'day')
  let endsAfterStart = dates.gte(eEnd, start, 'day')

  return startsBeforeEnd && endsAfterStart
}


export function segsOverlap(seg, otherSegs) {
  return otherSegs.some(
    otherSeg => otherSeg.left <= seg.right && otherSeg.right >= seg.left)
}


export function sortEvents(evtA, evtB, { startAccessor, endAccessor, allDayAccessor }) {
  let startSort = +dates.startOf(get(evtA, startAccessor), 'day') - +dates.startOf(get(evtB, startAccessor), 'day')

  let durA = dates.diff(
        get(evtA, startAccessor)
      , dates.ceil(get(evtA, endAccessor), 'day')
      , 'day');

  let durB = dates.diff(
        get(evtB, startAccessor)
      , dates.ceil(get(evtB, endAccessor), 'day')
      , 'day');

  return startSort // sort by start Day first
    || Math.max(durB, 1) - Math.max(durA, 1) // events spanning multiple days go first
    || !!get(evtB, allDayAccessor) - !!get(evtA, allDayAccessor) // then allDay single day events
    || +get(evtA, startAccessor) - +get(evtB, startAccessor)     // then sort by start time
}
