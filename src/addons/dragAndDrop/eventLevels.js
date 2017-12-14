import findIndex from 'ramda/src/findIndex';
import propEq from 'ramda/src/propEq';
import pathEq from 'ramda/src/pathEq';
import reduce from 'ramda/src/reduce';
import reduced from 'ramda/src/reduced';
import { eventLevels } from '../../utils/eventLevels';
//import slice from 'ramda/src/slice';
//import add from 'ramda/src/add';
//import cond from 'ramda/src/cond';
//import equals from 'ramda/src/equals';
//import always from 'ramda/src/always';
//import T from 'ramda/src/T';

const findSeg = (level, left) => findIndex(propEq('left', left))(level);

const overlaps = (left, right) => ({ left: l, right: r }) => r >= left && right >= l;

const calcRange = segs =>
  segs.reduce(
    (acc, { left, right }) => {
      let [a, b] = acc;
      if (!a) a = left;
      if (!b) b = right;
      if (left < a) a = left;
      if (right > b) b = right;
      return [a, b];
    },
    [0, 0],
  );

const groupOverlapping = (level, { left, right }) =>
  level.reduce(
    (acc, seg) => {
      const isOverlapping = overlaps(left, right)(seg);
      const [a, b] = acc;
      isOverlapping ? a.push(seg) : b.push(seg);
      return acc;
    },
    [[], []],
  );

const intersectOverlapping = (level, other) =>
  other.reduce(
    (acc, segB) => {
      const { left, right } = segB;
      const [a, b] = acc;
      if (!level.some(overlaps(left, right))) {
        a.push(segB);
      } else {
        b.push(segB);
      }
      return acc;
    },
    [[], []],
  );

const segSorter = ({ left: a }, { left: b }) => a - b;

const newPos = ({ left }, span) => ({ left, right: left + span - 1, span });

const newSeg = (seg, nextSeg, event) => ({ ...newPos(nextSeg, seg.span), event });

const copyLevels = lvls => lvls.map(lvl => [].concat(lvl));

const removeGaps = (levels, dlevel, dleft) => {
  const nextLevels = copyLevels(levels);
  for (let i = dlevel + 1, len = nextLevels.length; i < len; i++) {
    const prevLvl = nextLevels[i - 1];
    let currLvl = nextLevels[i];
    const overSegIdx = currLvl.findIndex(overlaps(dleft, dleft));
    console.log('gaps [0]', i, prevLvl, currLvl, overSegIdx, dleft);

    // level after drag doesn't contain seg
    // assuming subsequent levels don't either
    if (overSegIdx === -1) break;

    // group overlapping; continue only is over.length === 0
    const overSeg = currLvl[overSegIdx];
    const [over, notOver] = groupOverlapping(prevLvl, overSeg);
    console.log('gaps [1]', overSeg, over, notOver);
    if (over.length) break;

    // we can safely shift overSeg up a level
    prevLvl.push(overSeg);
    prevLvl.sort(segSorter);
    currLvl.splice(overSegIdx, 1);
    console.log('gaps end', [].concat(prevLvl), [].concat(currLvl));
  }
  for (let i = 0, len = nextLevels.length; i < len; i++) {
    nextLevels[i] = nextLevels[i].map(seg => ({ ...seg, level: i }));
  }
  return nextLevels;
};

const removeGaps2 = (levels, dragItem) => {
  const nextLevels = copyLevels(levels).reduce(
    (acc, lvl) => (lvl.length ? (acc.push(lvl), acc) : acc),
    [],
  );
  for (let i = 1, len = nextLevels.length; i < len; i++) {
    const [currIdx, prevIdx] = [i, i - 1];
    const prevLvl = nextLevels[prevIdx];
    let currLvl = nextLevels[currIdx];

    // interate through currLvl in search of segs whom do not overlap
    for (let j = 0; j < currLvl.length; j++) {
      const { left, right } = currLvl[j];
      const overIdx = prevLvl.findIndex(overlaps(left, right));
      if (overIdx !== -1) continue;

      // shift seg up
      const overSeg = currLvl[j];
      prevLvl.push(overSeg);
      currLvl.splice(j, 1);
      j -= 1;
    }

    // sort
    prevLvl.sort(segSorter);
  }
  console.log('removeGaps2', copyLevels(nextLevels));
  const finalLevels = nextLevels.reduce(
    (acc, lvl) => (lvl.length ? (acc.push(lvl), acc) : acc),
    [],
  );

  for (let i = 0, len = finalLevels.length; i < len; i++) {
    finalLevels[i] = finalLevels[i].map(seg => ({ ...seg, level: i }));
  }

  // find drag seg
  const { event: { id } } = dragItem;
  return reduce(
    (acc, level) => {
      const idx = findIndex(pathEq(['event', 'id'], id))(level);
      return idx < 0 ? acc : reduced([level[idx], finalLevels]);
    },
    [dragItem, levels],
    finalLevels,
  );
};

const reorderLevels = (levels, dragItem, hoverItem) => {
  let nextLevels = [];
  const lvls = copyLevels(levels);
  const { level: dlevel, left: dleft, right: dright, span: dspan } = dragItem;
  const { level: hlevel, left: hleft, right: hright, span: hspan } = hoverItem;

  if (lvls.length === 0) {
    return [dragItem, [[dragItem]]];
  }

  const dragIdx = findSeg(lvls[dlevel] || [], dleft);
  const hoverIdx = findSeg(lvls[hlevel] || [], hleft);

  // levels
  const _drag = [].concat(lvls[dlevel] || []);
  let _hover = [].concat(lvls[hlevel] || []);

  // dragging from outside the cal
  if (hoverIdx === -1 && dragIdx === -1) {
    _drag.push(dragItem);
    _drag.sort(segSorter);
    lvls[dlevel] = _drag;
    return [dragItem, lvls];
  }

  // drag
  const { event: dragData } = dragItem;
  const { event: _, ...dragSeg } = lvls[dlevel][dragIdx];
  console.log('reorder levels', hoverIdx, dragIdx);

  // dragging to an empty cell
  if (hoverIdx === -1 /*&& dragData === hoverItem.event*/) {
    _drag.splice(dragIdx, 1);
    if (dlevel === hlevel) {
      _hover = _drag;
    }
    const nextDragSeg = { ...hoverItem, event: dragData };
    if (dspan === 1) {
      _hover.push(nextDragSeg);
    } else {
      const [over, notOver] = groupOverlapping(_hover, nextDragSeg);
      if (!over.length) {
        _hover.push(nextDragSeg);
      } else {
        const nextLvl = [nextDragSeg, ...notOver];
        nextLvl.sort(segSorter);
        lvls[dlevel] = _drag;
        lvls.splice(hlevel, 1, over, nextLvl);
        return removeGaps2(lvls, nextDragSeg);
      }
    }
    _hover.sort(segSorter);
    (lvls[dlevel] = _drag), (lvls[hlevel] = _hover);
    return removeGaps2(lvls, dragItem);
  }

  const { event: hoverData, ...hoverSeg } = lvls[hlevel][hoverIdx];

  // remove drag and hover items
  if (dlevel === hlevel) {
    _drag.splice(dragIdx, 1);
    const newHoverIdx = findSeg(_drag, hleft);
    _drag.splice(newHoverIdx, 1);
    lvls[dlevel] = [].concat(_drag);
  } else {
    _drag.splice(dragIdx, 1), _hover.splice(hoverIdx, 1);
    (lvls[dlevel] = _drag), (lvls[hlevel] = _hover);
  }

  if (dragIdx < 0 || hoverIdx < 0) {
    throw `unable to find ${dragIdx < 0 ? 'drag' : 'hover'} segment`;
  }

  // calculate lvl difference between drag and hover under the context of the
  // day we are in
  /*const lvlDiffInDay = (levels, dlevel, hlevel, day) => {
    const [start, end] = dlevel > hlevel ? [dlevel, hlevel] : [hlevel, dlevel];
    const sub = slice(start, end, levels);
    return reduce(
      compose(add, cond([[equals(-1), always(0)], [T, val => val]]), findIndex(overlaps(day, day))),
      0,
    )(levels);
  };*/

  // calculated overlapping
  const [overlapping, notOverlapping] = groupOverlapping(lvls[hlevel], dragSeg);
  let remainder = null;
  let processRemainder = false;
  for (let i = 0, len = lvls.length; i < len; i++) {
    let level = [].concat(lvls[i]);
    let lvlDiff = dlevel - hlevel;
    if (dlevel === i) {
      if (dleft !== hleft && hlevel === dlevel) {
        // noop
      } else if (hspan > 1 && !overlaps(dleft, dright)(hoverSeg) && hlevel !== dlevel) {
        // noop
      } else if (Math.abs(lvlDiff) > 1) {
        // noop
      } else if (hspan > 1) {
        const [over, notOver] = groupOverlapping(level, hoverSeg);
        level = [...overlapping, ...notOver, { ...hoverSeg, event: hoverData }];
        remainder = over.length ? over : null;
      } else if (dspan > 1) {
        const [left, right] = calcRange(overlapping);
        const [over, notOver] = groupOverlapping(level, { right, left });

        if (!over.length) {
          level.push(...overlapping, { ...hoverSeg, event: hoverData });
        } else {
          const nxtLvl = [...overlapping, ...notOver, { ...hoverSeg, event: hoverData }];
          nxtLvl.sort(segSorter);
          level = nxtLvl;
          remainder = over;
        }
      } else if (dleft !== hleft) {
        // noop
      } else if (Math.abs(lvlDiff) === 1) {
        // insert hover into current level
        level.push({ ...hoverSeg, event: hoverData });
      }
    }

    if (hlevel === i) {
      if (!overlaps(dleft, dright)(hoverSeg)) {
        let leftOffset = hspan !== dspan ? (dleft > hleft ? hright : hleft) : hleft;
        const nextSeg = newSeg(dragSeg, { left: leftOffset }, dragData);
        level.push(nextSeg);
        remainder = [{ ...hoverSeg, event: hoverData }];
      } else if (dspan > 1) {
        if (Math.abs(lvlDiff) > 1) {
          nextLevels.push([...notOverlapping, { ...dragSeg, event: dragData }]);
          level = [...overlapping, { ...hoverSeg, event: hoverData }];
        } else {
          level = [...notOverlapping, { ...dragSeg, event: dragData }];
        }
      } else if (Math.abs(lvlDiff) === 1) {
        // insert drag into currect level
        level.push({ ...dragSeg, event: dragData });
      } else {
        nextLevels.push([{ ...dragSeg, event: dragData }]);
        level.push({ ...hoverSeg, event: hoverData });
      }
    }

    if (level.length === 0) continue;

    if (remainder) {
      if (processRemainder) {
        const [notOver, over] = intersectOverlapping(remainder, level);
        level = [...remainder, ...notOver];
        remainder = over.length ? over : ((processRemainder = false), null);
      } else {
        processRemainder = true;
      }
    }

    level.sort(segSorter);
    nextLevels.push(level);
  }

  if (remainder) {
    // detect if we can insert it in last level
    const [left, right] = calcRange(remainder);
    const lastLvl = nextLevels[nextLevels.length - 1];
    const [over, notOver] = groupOverlapping(lastLvl, { left, right });
    if (over.length) {
      nextLevels.push(remainder);
    } else {
      lastLvl.push(...remainder);
      lastLvl.sort(segSorter);
    }
  }

  // ensure no unnecessary gaps are present
  for (let i = 1, len = nextLevels.length; i < len; i++) {
    const [currIdx, prevIdx] = [i, i - 1];
    const prevLvl = nextLevels[prevIdx];
    let currLvl = nextLevels[currIdx];

    // interate through currLvl in search of segs whom do not overlap
    for (let j = 0; j < currLvl.length; j++) {
      const { left, right } = currLvl[j];
      const overIdx = prevLvl.findIndex(overlaps(left, right));
      if (overIdx !== -1) continue;

      // shift seg up
      const overSeg = currLvl[j];
      prevLvl.push(overSeg);
      currLvl.splice(j, 1);
      j -= 1;
    }

    // sort
    prevLvl.sort(segSorter);
  }

  for (let i = 0, len = nextLevels.length; i < len; i++) {
    nextLevels[i] = nextLevels[i].map(seg => ({ ...seg, level: i }));
  }

  // find drag seg
  return reduce(
    (acc, level) => {
      const idx = findIndex(pathEq(['event', 'id'], dragData.id))(level);
      return idx < 0 ? acc : reduced([level[idx], nextLevels]);
    },
    [dragItem, levels],
    nextLevels,
  );
};

export { reorderLevels as default, removeGaps, groupOverlapping };
