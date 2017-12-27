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
    reportDayBounds: PropTypes.func,
  };

  getChildContext() {
    return {
      onSegmentDrag: this.handleSegmentDrag,
      onSegmentDragEnd: this.handleSegmentDragEnd,
      onSegmentHover: this.handleSegmentHover,
      onSegmentDrop: this.handleSegmentDrop,
      onBackgroundCellEnter: this.handleBackgroundCellEnter,
      reportDayBounds: this.handleReportDayBounds,
    };
  }

  componentWillMount() {
    const props = withLevels(this.props);
    this.setState({ ...props });
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

    const { range, level: row } = this.props;
    const { getInternalState, setInternalState, onEventUpdate } = this.context;
    const { levels } = this.state;
    const { type, data, position } = dragItem;
    const internalState = getInternalState();
    const { lastKnownWeekRow, removeOrphanedSegment } = internalState;
    if (type === 'resizeL' || type === 'resizeR') return;

    if (!isNaN(lastKnownWeekRow) && lastKnownWeekRow !== row && removeOrphanedSegment) {
      removeOrphanedSegment();
      setInternalState({ removeOrphanedSegment: null });
    }

    // update last known week row
    setInternalState({ lastKnownWeekRow: row });

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
    }

    if (!drag) return;

    const { level: dlevel, left: dleft, span: dspan, row: drow } = drag;

    const dragId = path(['event', 'id'], drag);
    const nextLeft = findDayIndex(range, date) + 1;
    const segsInDay = ((right, left) =>
      levels.reduce((acc, lvl) => {
        return acc.concat(filter(overlaps(right, left))(lvl));
      }, []))(nextLeft, nextLeft);

    // recalculate  start/end date
    const [start, end, span] = (() => {
      const rawStart = range[nextLeft - 1];
      const rawEnd = range[dspan - 1];
      let { event: { start: s, end: e } } = drag;
      const start = dates.startOf(s || rawStart, 'day');
      const end = dates.ceil(e || rawEnd, 'day');
      let span = dlevel === -1 ? dspan : dates.diff(start, end, 'day');
      return [s || rawStart, e || rawEnd, span];
    })();

    if (
      segsInDay.length &&
      dragId &&
      segsInDay.some(({ event: { id } }) => id === dragId) &&
      (span === 1 || (span > 1 && nextLeft === dleft))
    ) {
      this.ignoreHoverUpdates = false;
      setInternalState({ removeOrphanedSegment: _segRemover(this, drag) });
      return;
    }

    const [sHours, sMins] = [getHours(start) || 8, 0];
    const [eHours, eMins] = [getHours(end) || 16, 0];
    const nextStart = range[nextLeft - 1];
    const nextEnd = addDays(nextStart, span - 1);
    drag.event.start = compose(format, fAddHours(sHours), fAddMinutes(sMins))(nextStart);
    drag.event.end = compose(format, fAddHours(eHours), fAddMinutes(eMins))(nextEnd);

    let hover = calcPosFromDate(date, range, span);
    const overSegs = findFirstOverlappingSegs(levels, { ...hover, event: drag.event });
    let nextDragLevel = path(['level'], last(overSegs) || { level: -1 }) + 1;
    const lastSeg = last(overSegs) || { level: -1 };
    const nextLevel = lastSeg.level + 1;
    if (row !== drow || (type === 'outsideEvent' && dlevel === -1 && lastKnownWeekRow !== row)) {
      drag.level = nextLevel;
      drag.row = row;
      drag.event.weight = (path(['event', 'weight'], lastSeg) || 0) + 0.5;

      if (nextLeft + span - 1 > 7) {
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
      return this.setState({ levels });
    } else {
      hover.level = nextDragLevel;
    }

    // check hover right exceeds bounds
    const { didUpdateEvent } = internalState;
    if (span + nextLeft - 1 > 7) {
      if (dlevel < nextDragLevel) nextDragLevel -= 1;
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
    } else if (didUpdateEvent) {
      const nextDragEvent = drag.event;
      nextDragEvent.weight = (path(['event', 'weight'], lastSeg) || 0) + 0.5;
      const nextDrag = {
        ...hover,
        level: nextDragLevel,
        event: nextDragEvent,
        row,
      };
      setInternalState({ didUpdateEvent: false, drag: nextDrag });
      return onEventUpdate(drag.event);
    }

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
  };

  handleSegmentHover = (hoverItem, dragItem) => {
    if (this.ignoreHoverUpdates) return;

    const { getInternalState, setInternalState } = this.context;
    const internalState = getInternalState();
    const { level: row, range } = this.props;
    let { drag } = internalState;
    const { position: hover } = hoverItem;
    const { level: hlevel, left: hleft } = hover;

    if (!drag) {
      const { type } = dragItem;
      if (type !== 'outsideEvent') return;

      // use handleBackgroundCellEnter
      return this.handleBackgroundCellEnter(range[hleft - 1], dragItem);
    }

    const { level: dlevel, left: dleft, right: dright, span: dspan, row: drow } = drag;

    if (dleft === hleft && dlevel === hlevel) return;

    const { levels } = this.state;

    // update drag level
    if (drow !== row) {
      // remove orphaned segment
      const { removeOrphanedSegment } = internalState;
      if (removeOrphanedSegment) {
        removeOrphanedSegment();
        setInternalState({ removeOrphanedSegment: null, lastKnownWeekRow: row });
      } else {
        setInternalState({ lastKnownWeekRow: row });
      }

      const overSegs = findFirstOverlappingSegs(levels, { ...hover, event: drag.event });
      const nextDragLevel = path(['level'], last(overSegs) || { level: -1 }) + 1;

      drag.level = nextDragLevel;

      const lvl = levels[nextDragLevel] || [];

      // insert drag segment at the bottom of current day
      if (dspan === 1) {
        lvl.push(drag);
        lvl.sort((a, b) => a.left - b.left);
        levels[nextDragLevel] = lvl;
      } else {
        const [over, notOver] = groupOverlapping(lvl, drag);
        if (!over.length) {
          lvl.push(drag);
          lvl.sort((a, b) => a.left - b.left);
          levels[nextDragLevel] = lvl;
        } else {
          const nextLvl = [drag, ...notOver];
          nextLvl.sort((a, b) => a.keft - b.left);
          levels.splice(nextDragLevel, 1, nextLvl, over);
        }
      }
    }

    // reorder based on drag and hover
    const [nextDrag, nextLevels] = reorderLevels(levels, drag, hover);

    // check if start and end dates need updating
    const nextDragStart = path(['event', 'start'], nextDrag);
    const nextDragEnd = path(['event', 'end'], nextDrag);
    const nextLeft = findDayIndex(range, nextDragStart) + 1;
    if (nextLeft !== nextDrag.left) {
      const [sHours, sMins] = [getHours(nextDragStart) || 8, getMinutes(nextDragStart)];
      const [eHours, eMins] = [getHours(nextDragEnd) || 16, getMinutes(nextDragEnd)];
      const nextStart = range[nextDrag.left - 1];
      const s = dates.startOf(nextDragStart, 'day');
      const e = dates.ceil(nextDragEnd, 'day');
      const span = dates.diff(s, e, 'day');
      nextDrag.event.start = compose(format, fAddHours(sHours), fAddMinutes(sMins))(nextStart);
      nextDrag.event.end = compose(format, fAddHours(eHours), fAddMinutes(eMins))(
        addDays(nextStart, span - 1),
      );
    }

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
