import dates from './dates';
import { accessor as get } from './accessors';
//import canUseDom from 'dom-helpers/util/inDOM';

// let isIE = false;

// if (canUseDom) {
//   isIE = ('documentMode' in document)
// }

export function eventSegments(event, first, last, { startAccessor, endAccessor }){

  let start = dates.duration(first,
      dates.max(get(event, startAccessor), first), 'day');

  let span = Math.min(dates.duration(
      dates.max(get(event, startAccessor), first)
    , dates.min(get(event, endAccessor), dates.add(last, 1, 'day'))
    , 'day'), 7);

  span = Math.max(span, 1);

  return {
    event,
    span,
    left: start + 1,
    right: Math.max(start + span, 1)
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
