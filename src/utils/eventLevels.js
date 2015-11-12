import dates from './dates';
import { accessor as get } from './accessors';

export function eventSegments(event, first, last, { startAccessor, endAccessor, culture }){
  let slots = dates.diff(first, last, 'day')
  let start = dates.max(dates.startOf(get(event, startAccessor), 'day'), first);
  let end = dates.min(dates.ceil(get(event, endAccessor), 'day'), dates.add(last, 1, 'day'))

  let span = dates.diff(start, end, 'day');

  span = Math.floor(Math.max(Math.min(span, slots), 1));

  let padding = Math.floor(dates.diff(first, start, 'day'));

  return {
    event,
    span,
    left: padding + 1,
    right: Math.max(padding + span, 1)
  }
}


export function segStyle(span, slots){
  let per = (span / slots) * 100 + '%';
  return { flexBasis: per, maxWidth: per } // IE10/11 need max-width. flex-basis doesn't respect box-sizing
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
  let eStart = get(e, startAccessor)
  let eEnd = get(e, endAccessor)

  let starts = dates.inRange(eStart, start, end, 'day')
  let during = dates.lt(eStart, start, 'day') && dates.gt(eEnd, end, 'day')
  let ends = dates.lt(eStart, start) && dates.inRange(eEnd, start, end, 'day')

  return starts || ends || during
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
