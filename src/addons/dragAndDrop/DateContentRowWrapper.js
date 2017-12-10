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
import addDays from 'date-fns/add_days';
import addHours from 'date-fns/add_hours';
import addMinutes from 'date-fns/add_minutes';
import getHours from 'date-fns/get_hours';
import getMinutes from 'date-fns/get_minutes';
import isSameDay from 'date-fns/is_same_day';
import format from 'date-fns/format';
import cuid from 'cuid';

import BigCalendar from '../../index';
import { withLevels } from '../../utils/eventLevels';
import reorderLevels from './eventLevels';

const fAddHours = compose(flip, curry)(addHours);
const fAddMinutes = compose(flip, curry)(addMinutes);

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
    self.setState({ levels });
  };
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
    const { getInternalState, setInternalState } = this.context;
    const { levels } = this.state;
    const { type, data, position } = dragItem;
    const internalState = getInternalState();
    const { lastKnownWeekRow, removeOrphanedSegment } = internalState;
    if (type === 'resizeL' || type === 'resizeR') return;

    console.log('row', row, lastKnownWeekRow);
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
      console.log('generating', event);
    }

    const { level: dlevel, left: dleft, span: dspan, row: drow } = drag;

    if (drag) {
      const dragId = path(['event', 'id'], drag);
      const nextLeft = findDayIndex(range, date) + 1;
      const segsInDay = ((right, left) =>
        levels.reduce((acc, lvl) => {
          return acc.concat(filter(overlaps(right, left))(lvl));
        }, []))(nextLeft, nextLeft);

      console.log(nextLeft, segsInDay.length, dragId, [].concat(segsInDay));
      if (segsInDay.length && dragId && segsInDay.some(({ event: { id } }) => id === dragId)) {
        this.ignoreHoverUpdates = false;
        setInternalState({ removeOrphanedSegment: _segRemover(this, drag) });
        return;
      }

      const lastSeg = last(segsInDay) || { level: -1 };
      const nextLevel = lastSeg.level + 1;

      // update start/end date
      const [dstart, dend] = [path(['event', 'start'], drag), path(['event', 'end'], drag)];
      const [start, end] = [date, addDays(date, dspan - 1)];
      const [sHours, sMins] = [getHours(dstart) || 8, getMinutes(dstart)];
      const [eHours, eMins] = [getHours(dend) || 16, getMinutes(dend)];
      drag.event.start = compose(format, fAddHours(sHours), fAddMinutes(sMins))(start);
      drag.event.end = compose(format, fAddHours(eHours), fAddMinutes(eMins))(end);

      let hover = calcPosFromDate(date, range, dspan);
      //hover.level = nextLevel;
      console.log('before if', row, drow);
      if (row !== drow || (type === 'outsideEvent' && dlevel === -1 && lastKnownWeekRow !== row)) {
        drag.level = nextLevel;
        drag.row = row;

        const lvl = levels[nextLevel] || [];
        lvl.push(drag);
        lvl.sort((a, b) => a.left - b.left);
        levels[nextLevel] = lvl;
        setInternalState({ removeOrphanedSegment: _segRemover(this, drag), drag });
        this.setState({ levels });
        return;
      } else {
        hover.level = nextLevel;
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
    const { level: dlevel, left: dleft, span: dspan } = drag;
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
    console.time('reorder-lavels in hover');
    const [nextDrag, nextLevels] = reorderLevels(levels, drag, hover);
    console.timeEnd('reorder-lavels in hover');
    console.log('hover', nextDrag);

    // check if start and end dates need updating
    const nextDragStart = path(['event', 'start'], nextDrag);
    const nextDragEnd = path(['event', 'end'], nextDrag);
    const nextLeft = findDayIndex(range, nextDragStart) + 1;
    console.log('nnn', nextDragStart, nextDragEnd, nextLeft);
    if (nextLeft !== nextDrag.left) {
      const [sHours, sMins] = [getHours(nextDragStart) || 8, getMinutes(nextDragStart)];
      const [eHours, eMins] = [getHours(nextDragEnd) || 16, getMinutes(nextDragEnd)];
      const nextStart = range[nextDrag.left - 1];
      console.log('nnn1', sHours, sMins, eHours, eMins);
      nextDrag.event.start = compose(format, fAddHours(sHours), fAddMinutes(sMins))(nextStart);
      nextDrag.event.end = compose(format, fAddHours(eHours), fAddMinutes(eMins))(
        addDays(nextStart, dspan - 1),
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
