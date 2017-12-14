import PropTypes from 'prop-types';
import React, { Component } from 'react';

import propEq from 'ramda/src/propEq';
import findIndex from 'ramda/src/findIndex';
import splitAt from 'ramda/src/splitAt';
import path from 'ramda/src/path';
import filter from 'ramda/src/filter';
import last from 'ramda/src/last';
import curry from 'ramda/src/curry';
import flip from 'ramda/src/flip';
import compose from 'ramda/src/compose';
import pick from 'ramda/src/pick';
import reduce from 'ramda/src/reduce';
import reduced from 'ramda/src/reduced';
import addDays from 'date-fns/add_days';
import addHours from 'date-fns/add_hours';
import addMinutes from 'date-fns/add_minutes';
import getHours from 'date-fns/get_hours';
import getMinutes from 'date-fns/get_minutes';
import isSameDay from 'date-fns/is_same_day';
import format from 'date-fns/format';
import isAfter from 'date-fns/is_after';
import diffInDays from 'date-fns/difference_in_days';
import cuid from 'cuid';

import BigCalendar from '../../index';
import { withLevels } from '../../utils/eventLevels';
import reorderLevels, { removeGaps, groupOverlapping } from './eventLevels';
import dates from '../../utils/dates';

const fAddHours = compose(flip, curry)(addHours);
const fAddMinutes = compose(flip, curry)(addMinutes);

const eventPath = path(['event']);

const rect = ({ x, y, left, right, top, bottom, height, width }) => ({
  x,
  y,
  left,
  right,
  top,
  bottom,
  height,
  width,
});

const overlaps = (left, right) => ({ left: l, right: r }) => r >= left && right >= l;

const findDayIndex = (range, date) => findIndex(val => isSameDay(date, val))(range);

const findDayBoundsIndex = (range, { x, width, y, height }) => {
  return findIndex(({ x: otherX, width: otherWidth, y: otherY, height: otherHeight }) => {
    return (
      x >= otherX &&
      y >= otherY &&
      // we dont use `width` because the segment can be a multi span seg
      x + 100 <= otherX + otherWidth + 20 && // error margin
      y + height <= otherY + otherHeight
    );
  }, range);
};

const calcPosFromDate = (date, range, span) => {
  const idx = findDayIndex(range, date);
  return { left: idx + 1, right: idx + span, span, level: 0 };
};

const _segRemover = (self, { level, left }) => {
  const findSeg = findIndex(propEq('left', left));
  return () => {
    const { levels } = self.state;
    const lvl = levels[level];
    const idx = findSeg(lvl);
    lvl.splice(idx, 1);
    const nextLevels = removeGaps(levels, level, left);
    self.setState({ levels: nextLevels });
  };
};

const findFirstOverlappingSegs = (levels, { left, right, event: { id } }) => {
  let over = [];
  for (let i = levels.length - 1; i >= 0; i--) {
    const lvl = levels[i];
    for (let j = 0, len = lvl.length; j < len; j++) {
      const seg = lvl[j];
      const segId = path(['event', 'id'], seg);
      if (segId === id) continue;
      if (overlaps(left, right)(seg)) over.push(seg);
    }
    if (over.length) return over;
  }
  return over;
};

const calcNextLevel = (levels, { left, right, event: { id } }) => {
  for (let i = 0, len = levels.length; i < len; i++) {
    const idx = findIndex(overlaps(left, right))(levels[i]);
    if (idx === -1) continue;
    const seg = levels[i][idx];
    const segId = path(['event', 'id'], seg);
    if (segId === id) continue;
    console.log('found next lvl', i + 1, { ...levels[i][idx] });
    return i + 1;
  }
  return -1;
};

const cloneLevels = lvls => lvls.map(lvl => [].concat(lvl));

class DateContentRowWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: [],
    };

    this.rangeBounds = [];
    this.ignoreHoverUpdates = false;
  }

  static contextTypes = {
    onEventReorder: PropTypes.func,
    onEventUpdate: PropTypes.func,
    getInternalState: PropTypes.func,
    setInternalState: PropTypes.func,
  };

  static childContextTypes = {
    onSegmentDrag: PropTypes.func,
    onSegmentDragEnd: PropTypes.func,
    onSegmentHover: PropTypes.func,
    onSegmentDrop: PropTypes.func,
    onBackgroundCellEnter: PropTypes.func,
    onBackgroundCellHoverExit: PropTypes.func,
    reportDayBounds: PropTypes.func,
  };

  getChildContext() {
    return {
      onSegmentDrag: this.handleSegmentDrag,
      onSegmentDragEnd: this.handleSegmentDragEnd,
      onSegmentHover: this.handleSegmentHover,
      onSegmentDrop: this.handleSegmentDrop,
      onBackgroundCellEnter: this.handleBackgroundCellEnter,
      onBackgroundCellHoverExit: this.handleBackgroundCellHoverExit,
      reportDayBounds: this.handleReportDayBounds,
    };
  }

  componentWillMount() {
    const props = withLevels(this.props);
    this.setState({ ...props });
  }

  componentDidMount() {
    //console.log('mm', this.div.getBoundingClientHeight());
  }

  componentWillReceiveProps(props, _) {
    const next = withLevels(props);
    this.setState({ ...next });
  }

  componentWillUpdate() {
    this.ignoreHoverUpdates = true;
  }

  componentDidUpdate() {
    this.ignoreHoverUpdates = false;
  }

  handleReportDayBounds = (day, bounds) => {
    const { range } = this.props;
    const idx = findDayIndex(range, day);
    if (idx < 0) return;
    this.rangeBounds[idx] = bounds;
  };

  handleSegmentDrag = drag => {
    const { setInternalState } = this.context;
    setInternalState({ drag });
  };

  handleSegmentDragEnd = () => {
    const { setInternalState } = this.context;
    setInternalState({ drag: null });
  };

  handleBackgroundCellEnter = (date, dragItem) => {
    this.ignoreHoverUpdates = true;
    console.log('background cell enter', date);

    const { range, level: row } = this.props;
    const { getInternalState, setInternalState, onEventUpdate } = this.context;
    const { levels } = this.state;
    const { type, data, position } = dragItem;
    const internalState = getInternalState();
    const { lastKnownWeekRow, removeOrphanedSegment, didFinishUpdateEvent } = internalState;
    if (type === 'resizeL' || type === 'resizeR') return;

    console.log('row', row, lastKnownWeekRow);
    if (!isNaN(lastKnownWeekRow) && lastKnownWeekRow !== row && removeOrphanedSegment) {
      removeOrphanedSegment();
      setInternalState({ removeOrphanedSegment: null });
    }

    // update last known week row
    setInternalState({ lastKnownWeekRow: row });
    console.log('background hover [0]', type);

    let { drag } = internalState;
    if (!drag && type === 'outsideEvent') {
      const { id: eventTemplateId, eventTemplateId: id, styles, name } = data;

      // calculate start and end
      const newId = cuid();
      const event = {
        id: newId,
        eventTemplateId,
        styles,
        name,
        locked: false,
        visible: true,
        weight: 0,
      };
      drag = {
        ...calcPosFromDate(date, range, position.span),
        event,
        row,
        level: -1,
      };
      console.log('generating', { ...event });
    }

    /*if (didFinishUpdateEvent) {
      drag.level = position.level;
      setInternalState({ didFinishUpdateEvent: false });
    }*/
    const { level: dlevel, left: dleft, span: dspan, row: drow } = drag;

    console.log('background hover [1]', drag);
    if (drag) {
      const dragId = path(['event', 'id'], drag);
      const nextLeft = findDayIndex(range, date) + 1;
      const segsInDay = ((right, left) =>
        levels.reduce((acc, lvl) => {
          return acc.concat(filter(overlaps(right, left))(lvl));
        }, []))(nextLeft, nextLeft);

      // update start/end date
      const [start, end, span] = (() => {
        const rawStart = range[nextLeft - 1];
        const rawEnd = range[dspan - 1];
        let { event: { start: s, end: e } } = drag;
        const start = dates.startOf(s || rawStart, 'day');
        const end = dates.ceil(e || rawEnd, 'day');
        let span = dates.diff(start, end, 'day');
        return [s || rawStart, e || rawEnd, span];
      })();

      console.log(nextLeft, segsInDay.length, dragId, [].concat(segsInDay));
      if (
        segsInDay.length &&
        dragId &&
        segsInDay.some(({ event: { id } }) => id === dragId) &&
        (span === 1 || (span > 1 && nextLeft === dleft))
      ) {
        this.ignoreHoverUpdates = false;
        console.log('early return [0]');
        setInternalState({ removeOrphanedSegment: _segRemover(this, drag) });
        return;
      }

      //const segsInDayFiltered = segsInDay.filter(({ event: { id }}) => (id !== drag.event.id));

      console.log('before re-calc', start, end, span, nextLeft);
      const [sHours, sMins] = [getHours(start) || 8, 0];
      const [eHours, eMins] = [getHours(end) || 16, 0];
      const nextStart = range[nextLeft - 1];
      const nextEnd = addDays(nextStart, span - 1);
      drag.event.start = compose(format, fAddHours(sHours), fAddMinutes(sMins))(nextStart);
      drag.event.end = compose(format, fAddHours(eHours), fAddMinutes(eMins))(nextEnd);
      console.log('re-calc date', drag.event.start, drag.event.end);
      /*const segsInDayFiltered = segsInDay
          .filter(({ event: { id }}) => (id !== drag.event.id));
        drag.level = segsInDayFiltered.length;
        const right2 = nextLeft + dspan - 1;
      // drag.level = nextLevel;
        drag.row = row;
        drag.event.weight = (path(['event', 'weight'], lastSeg) || 0) + 0.5;
        setInternalState({ didUpdateEvent: true, drag: { ...drag, left: nextLeft, right: right2 } });
        return onEventUpdate(drag.event);*/

      let hover = calcPosFromDate(date, range, span);
      const overSegs = findFirstOverlappingSegs(levels, { ...hover, event: drag.event });
      const nextDragLevel = path(['level'], last(overSegs) || { level: -1 }) + 1;
      const lastSeg = last(overSegs) || { level: -1 };
      const nextLevel = lastSeg.level + 1;
      console.log('xxx', { ...drag }, { ...hover }, overSegs, nextDragLevel, lastSeg, nextLevel);
      //hover.level = nextLevel;
      console.log(
        'before if',
        row,
        drow,
        type,
        dlevel,
        nextLevel,
        nextDragLevel,
        lastKnownWeekRow,
        nextLeft,
        span,
      );
      if (row !== drow || (type === 'outsideEvent' && dlevel === -1 && lastKnownWeekRow !== row)) {
        drag.level = nextLevel;
        drag.row = row;
        drag.event.weight = (path(['event', 'weight'], lastSeg) || 0) + 0.5;
        console.log({ ...drag });

        if (nextLeft + span - 1 > 7) {
          console.log('inside if > 7', nextLeft + span - 1);
          const nextDragEvent = drag.event;
          nextDragEvent.weight = (path(['event', 'weight'], lastSeg) || 0) + 0.5;
          const nextDrag = {
            ...hover,
            level: nextDragLevel,
            event: nextDragEvent,
            row,
          };
          setInternalState({ didUpdateEvent: true, drag: nextDrag });
          return onEventUpdate(drag.event);
        }

        const lvl = levels[nextLevel] || [];
        if (dspan === 1) {
          lvl.push(drag);
          lvl.sort((a, b) => a.left - b.left);
          levels[nextLevel] = lvl;
        } else {
          const [over, notOver] = groupOverlapping(lvl, drag);
          if (!over.length) {
            lvl.push(drag);
            lvl.sort((a, b) => a.left - b.left);
            levels[nextLevel] = lvl;
          } else {
            const nextLvl = [drag, ...notOver];
            nextLvl.sort((a, b) => a.keft - b.left);
            levels.splice(nextLevel, 1, nextLvl, over);
          }
        }
        setInternalState({ removeOrphanedSegment: _segRemover(this, drag), drag });
        this.setState({ levels });
        return;
      } else {
        const segsInDayFiltered = segsInDay.filter(({ event: { id } }) => id !== drag.event.id);
        hover.level = segsInDayFiltered.length;
      }

      // check hover right exceeds bounds
      const { didUpdateEvent } = internalState;
      //if (isAfter(path(['event', 'end'], drag), last(range))) {
      if (span + nextLeft - 1 > 7) {
        console.log('ll 0');
        /*const idx = findDayIndex(range, date);
        const right = idx + dspan > 7 ? 7 : idx + dspan;
        const nextPos = { left: idx + 1, right };*/
        //const right = nextLeft + dspan - 1;
        const nextDragEvent = drag.event;
        nextDragEvent.weight = (path(['event', 'weight'], lastSeg) || 0) + 0.5;
        const nextDrag = {
          ...hover,
          level: nextDragLevel,
          event: nextDragEvent,
          row,
        };
        /*  drag.level = nextDragLevel;
          drag.left = hover.left;
          drag.right = hover.right;
          drag.span = hover.span;
        drag.event.weight = (path(['event', 'weight'], lastSeg) || 0) + 0.5;*/
        setInternalState({ didUpdateEvent: true, drag: nextDrag });
        return onEventUpdate(drag.event);
      } else if (didUpdateEvent) {
        console.log('ll 1');
        const nextDragEvent = drag.event;
        nextDragEvent.weight = (path(['event', 'weight'], lastSeg) || 0) + 0.5;
        const nextDrag = {
          ...hover,
          level: nextDragLevel,
          event: nextDragEvent,
          row,
        };
        setInternalState({ didUpdateEvent: false, didFinishUpdateEvent: true, drag: nextDrag });
        return onEventUpdate(drag.event);
      }
      console.log('before', { ...drag }, { ...hover });
      const [nextDrag, nextLevels] = reorderLevels(levels, drag, {
        ...hover,
        row,
      });

      // setup cleanup routine
      setInternalState({
        removeOrphanedSegment: _segRemover(this, nextDrag),
        drag: { ...nextDrag, row },
        didReorder: true,
      });
      this.setState({ levels: nextLevels });
    }
  };

  handleBackgroundCellHoverExit = () => {
    const { setInternalState } = this.context;
    //setInternalState('lastKnownWeekRow', null);
  };

  handleSegmentHover = (hoverItem, dragItem) => {
    if (this.ignoreHoverUpdates) return;

    const { getInternalState, setInternalState } = this.context;
    const { drag } = getInternalState();
    const { level: row, range } = this.props;

    if (!drag) return;

    const { position: hover } = hoverItem;
    const { level: dlevel, left: dleft, right: dright, span: dspan, row: drow } = drag;
    const { level: hlevel, left: hleft } = hover;

    if (dleft === hleft && dlevel === hlevel) return;

    /*const dragBounds = rect(getInternalState('dragBounds'));
    const dragMonitor = getInternalState('dragMonitor');
    const nextBounds = { ...dragBounds, ...dragMonitor.getSourceClientOffset() };
    const dayIdx = findDayBoundsIndex(this.rangeBounds, nextBounds);
    if (dayIdx < 0) {
      console.error('unable to find day index from bounds', dragBounds, nextBounds, this.rangeBounds);
    }
    const dayInRow = range[dayIdx];
    if (!isSameDay(dayInRow, event.start)) {
      drag.event.start = format(dayInRow);
      drag.event.end = format(addDays(dayInRow, dspan - 1));
    }*/

    const { levels } = this.state;

    // update drag level
    if (drow !== row) {
      const lastOverlappingSeg = (() => {
        for (let i = levels.length - 1; i >= 0; i--) {
          const idx = findIndex(overlaps(dleft, dright))(levels[i]);
          return levels[i][idx];
        }
        return undefined;
      })();

      const nextDragLevel = lastOverlappingSeg.level + 1;
      drag.level = nextDragLevel;

      const lvl = levels[nextLevel] || [];
      if (dspan === 1) {
        lvl.push(drag);
        lvl.sort((a, b) => a.left - b.left);
        levels[nextLevel] = lvl;
      } else {
        const [over, notOver] = groupOverlapping(lvl, drag);
        if (!over.length) {
          lvl.push(drag);
          lvl.sort((a, b) => a.left - b.left);
          levels[nextLevel] = lvl;
        } else {
          const nextLvl = [drag, ...notOver];
          nextLvl.sort((a, b) => a.keft - b.left);
          levels.splice(nextDragLevel, 1, nextLvl, over);
        }
      }
    }

    console.log('before hover', { ...drag }, { ...hover });
    console.time('reorder-lavels in hover');
    const [nextDrag, nextLevels] = reorderLevels(levels, drag, hover);
    console.timeEnd('reorder-lavels in hover');
    console.log('hover', nextDrag, cloneLevels(nextLevels));

    // check if start and end dates need updating
    const nextDragStart = path(['event', 'start'], nextDrag);
    const nextDragEnd = path(['event', 'end'], nextDrag);
    const nextLeft = findDayIndex(range, nextDragStart) + 1;
    console.log('nnn', nextDragStart, nextDragEnd, nextLeft);
    if (nextLeft !== nextDrag.left) {
      const [sHours, sMins] = [getHours(nextDragStart) || 8, getMinutes(nextDragStart)];
      const [eHours, eMins] = [getHours(nextDragEnd) || 16, getMinutes(nextDragEnd)];
      const nextStart = range[nextDrag.left - 1];
      const s = dates.startOf(nextDragStart, 'day');
      const e = dates.ceil(nextDragEnd, 'day');
      const span = dates.diff(s, e, 'day');
      console.log('nnn1', sHours, sMins, eHours, eMins, s, e, span);
      nextDrag.event.start = compose(format, fAddHours(sHours), fAddMinutes(sMins))(nextStart);
      nextDrag.event.end = compose(format, fAddHours(eHours), fAddMinutes(eMins))(
        addDays(nextStart, span - 1),
      );
    }

    console.log('hover', { ...hover }, { ...nextDrag });
    setInternalState({
      removeOrphanedSegment: _segRemover(this, nextDrag),
      drag: { ...nextDrag, row },
      didReorder: true,
    });
    this.setState({ levels: nextLevels });
  };

  handleSegmentDrop = () => {
    const { levels } = this.state;
    const { onEventReorder, setInternalState, getInternalState } = this.context;
    const { drag } = getInternalState();

    // clean up internal state
    setInternalState(null);

    const dragSeg = levels[drag.level].find(({ left }) => drag.left === left);
    if (!dragSeg) return;

    const events = levels.reduce(
      (acc, row) => row.reduce((acc, { event }) => (acc.push(event), acc), acc),
      [],
    );

    onEventReorder && onEventReorder(events);
  };

  render() {
    const DateContentRowWrapper = BigCalendar.components.dateContentRowWrapper;
    const props = { ...this.props, ...this.state };
    return <DateContentRowWrapper {...props}>{this.props.children}</DateContentRowWrapper>;
  }
}

export default DateContentRowWrapper;
