import dates from './dates';

export function eventSegments(event, first, last){
  let start = dates.duration(first, dates.max(event.start, first), 'day');
  let span = Math.min(dates.duration(
      dates.max(event.start, first)
    , dates.min(event.end, dates.add(last, 1, 'day'))
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
  return { flexBasis: (span / slots) * 100 + '%' }
}

export function eventLevels(rowSegments){
  let i, j, seg
    , levels = [];

  for (i = 0; i < rowSegments.length; i++) {
    seg = rowSegments[i];

    for (j = 0; j < levels.length; j++)
      if (!segsOverlap(seg, levels[j]))
        break

    seg.level = j;
    (levels[j] || (levels[j] = [])).push(seg);
  }

  for (i = 0; i < levels.length; i++) {
    levels[i].sort((a, b) => a.left - b.left); //eslint-disable-line
  }

  return levels;
}

export function inRange(e, start, end){
  let starts = dates.inRange(e.start, start, end, 'day')
  let during = dates.lt(e.start, start, 'day') && dates.gt(e.end, end, 'day')
  let ends = dates.lt(e.start, start) && dates.inRange(e.end, start, end, 'day')

  return starts || ends || during
}


export function segsOverlap(seg, otherSegs) {
  return otherSegs.some(
    otherSeg => otherSeg.left <= seg.right && otherSeg.right >= seg.left)
}


export function sortEvents(evtA, evtB, allDayField) {
  let durA = dates.duration(evtA.start, evtA.end, 'day')
    , durB = dates.duration(evtB.start, evtB.end, 'day');

  return (+evtA.start - +evtB.start)
    || (durB - durA)
    || !!evtA[allDayField] - !!evtB[allDayField]
}
