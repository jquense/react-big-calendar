import PropTypes from 'prop-types';
import React, { Component } from 'react';

import propEq from 'ramda/src/propEq';
import findIndex from 'ramda/src/findIndex';
import splitAt from 'ramda/src/splitAt';
import path from 'ramda/src/path';
import filter from 'ramda/src/filter';
import last from 'ramda/src/last';
import addDays from 'date-fns/add_days';
import isSameDay from 'date-fns/is_same_day';
import format from 'date-fns/format';
import cuid from 'cuid';

import BigCalendar from '../../index';
import { withLevels } from '../../utils/eventLevels';
import reorderLevels from './eventLevels';

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
    getLocalProp: PropTypes.func,
    setLocalProp: PropTypes.func,
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
    const { setLocalProp } = this.context;
    setLocalProp('drag', drag);
  };

  handleSegmentDragEnd = () => {
    const { setLocalProp } = this.context;
    setLocalProp('drag', null);
  };

  handleBackgroundCellEnter = (date, dragItem) => {
    this.ignoreHoverUpdates = true;
    console.log('background cell enter', date);

    const { range, level: row } = this.props;
    const { getLocalProp, setLocalProp } = this.context;
    const { levels } = this.state;
    const { type, data, position } = dragItem;
    let drag = getLocalProp('drag');
    if (type === 'resizeL' || type === 'resizeR') return;

    const lastKnownWeekRow = getLocalProp('lastKnownWeekRow');
    const orphanedSegmentRemover = getLocalProp('removeOrphanedSegment');
    console.log('row', row, lastKnownWeekRow);
    if (!isNaN(lastKnownWeekRow) && lastKnownWeekRow !== row && orphanedSegmentRemover) {
      orphanedSegmentRemover();
      setLocalProp('removeOrphanedSegment', null);
    }

    // update last known week row
    setLocalProp('lastKnownWeekRow', row);

    if (!drag && type === 'outsideEvent') {
      const { id: eventTemplateId, eventTemplateId: id, styles, name } = data;

      // calculate start and end
      const newId = cuid();
      const event = {
        id: newId,
        key: newId,
        eventTemplateId,
        styles,
        name,
        locked: false,
        visible: true,
        weight: 0,
        //start: date,
        //end: addDays(date, position.span - 1),
      };
      drag = {
        ...calcPosFromDate(date, range, position.span),
        event,
        row,
        level: -1,
      };
    }

    const { level: dlevel, left: dleft, span: dspan, row: drow } = drag;

    //console.log('d', drag);
    if (drag) {
      const dragId = path(['event', 'id'], drag);
      const nextLeft = findDayIndex(range, date) + 1;
      const segsInDay = ((right, left) =>
        levels.reduce((acc, lvl) => {
          return acc.concat(filter(overlaps(right, left))(lvl));
        }, []))(nextLeft, nextLeft);

      console.log(nextLeft, segsInDay.length, dragId, [].concat(segsInDay));
      //console.log('curr lvls', cloneLevels(levels));
      if (segsInDay.length && dragId && segsInDay.some(({ event: { id } }) => id === dragId)) {
        this.ignoreHoverUpdates = false;
        setLocalProp('removeOrphanedSegment', _segRemover(this, drag));
        return;
      }

      const lastSeg = last(segsInDay) || { level: -1 };
      const nextLevel = lastSeg.level + 1; //.filter(({ left }) => left === nextLeft).length;
      //console.log('next lvl', row, drow, nextLevel);
      /*if ((type === 'outsideEvent' && drag.level === 0) || row !== drow) {
        drag.level = nextLevel;
      }*/

      // update start/end date
      drag.event.start = format(date);
      drag.event.end = format(addDays(date, dspan - 1));

      let hover = calcPosFromDate(date, range, dspan);
      //hover.level = nextLevel;
      if (row !== drow || (type === 'outsideEvent' && dlevel === -1)) {
        if (nextLevel > 0) {
          drag.level = nextLevel;
          drag.left = hover.left;
          drag.right = hover.right;
          const lvl = levels[nextLevel] || [];
          lvl.push(drag);
          lvl.sort((a, b) => a.left - b.left);
          levels[nextLevel] = lvl;
          setLocalProp('removeOrphanedSegment', _segRemover(this, drag));
          setLocalProp('drag', drag);
          this.setState({ levels });
          console.log('enter 0', nextLevel, drag, levels);
          return;
        }
        //hover.level = nextLevel;
        console.log('enter', nextLevel, drag);
      } else {
        //hover.level = nextLevel;
      }

      console.log('before', { ...drag }, { ...hover });
      const [nextDrag, nextLevels] = reorderLevels(levels, drag, {
        ...hover,
        row,
        //event: drag.event,
      });

      // setup cleanup routine
      setLocalProp('removeOrphanedSegment', _segRemover(this, nextDrag));
      setLocalProp('drag', { ...nextDrag, row });
      this.setState({ levels: nextLevels });
    }
  };

  handleBackgroundCellHoverExit = () => {
    // TODO: figure out if needed
    //console.log('hover exit');
  };

  handleSegmentHover = (hoverItem, dragItem) => {
    if (this.ignoreHoverUpdates) return;

    const { getLocalProp, setLocalProp } = this.context;
    const drag = getLocalProp('drag');
    const { level: row, range } = this.props;

    if (!drag) return;

    const { position: hover, data: hevent } = hoverItem;
    const { level: dlevel, left: dleft, span: dspan, event: devent } = drag;
    const { level: hlevel, left: hleft } = hover;

    if (dleft === hleft && dlevel === hlevel) return;

    // check if start and end dates need updating
    if (dleft !== hleft) {
      const nextStart = hevent.start;
      drag.event.start = nextStart;
      drag.event.end = format(addDays(nextStart, dspan - 1));
    }
    /*const dragBounds = rect(getLocalProp('dragBounds'));
    const dragMonitor = getLocalProp('dragMonitor');
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
    setLocalProp('removeOrphanedSegment', _segRemover(this, nextDrag));
    setLocalProp('drag', { ...nextDrag, row });
    this.setState({ levels: nextLevels });
  };

  handleSegmentDrop = ({ level, left }) => {
    const { levels } = this.state;
    const { onEventReorder, getLocalProp } = this.context;
    const drag = getLocalProp('drag');

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
