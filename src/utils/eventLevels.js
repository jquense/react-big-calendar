import dates from './dates';
import { accessor as get } from './accessors';

export function eventSegments(event, first, last, { startAccessor, endAccessor, culture }){
  let slots = dates.diff(first, last, 'day')
  let start = dates.max(get(event, startAccessor), first);
  let end = dates.min(get(event, endAccessor), dates.add(last, 1, 'day'))

  let span = dates.diff(start, end, 'day');

  span = Math.max(Math.min(span, slots), 1);

  let padding = dates.diff(first, start, 'day');

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
  let durA = dates.duration(
          get(evtA, startAccessor)
        , get(evtA, endAccessor)
        , 'day')
    , durB = dates.duration(
        get(evtB, startAccessor)
      , get(evtB, endAccessor)
      , 'day');

  return (+get(evtA, startAccessor) - +get(evtB, startAccessor))
    || (durB - durA)
    || !!get(evtA, allDayAccessor) - !!get(evtB, allDayAccessor)
}
