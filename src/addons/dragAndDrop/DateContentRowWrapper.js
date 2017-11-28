import PropTypes from 'prop-types';
import React, { Component } from 'react';

import propEq from 'ramda/src/propEq';
import findIndex from 'ramda/src/findIndex';
import splitAt from 'ramda/src/splitAt';
import path from 'ramda/src/path';
import filter from 'ramda/src/filter';
import addDays from 'date-fns/add_days';
import isSameDay from 'date-fns/is_same_day';
import format from 'date-fns/format';
import cuid from 'cuid';

import BigCalendar from '../../index';
import { withLevels } from '../../utils/eventLevels';
import reorderLevels from './eventLevels';

const overlaps = (left, right) => ({ left: l, right: r }) => r >= left && right >= l;

const findDayIndex = (range, date) => findIndex(val => isSameDay(date, val))(range);

const calcPosFromDate = (date, range, span) => {
  const idx = findDayIndex(range, date);
  return { left: idx + 1, right: idx + span, span, level: 0 };
};

const overlaps = (left, right) => ({ left: l, right: r }) => r >= left && right >= l;

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

    this.ignoreHoverUpdates = false;
  }

  static contextTypes = {
    onEventReorder: PropTypes.func,
    getDragItem: PropTypes.func,
    setDragItem: PropTypes.func,
  };

  static childContextTypes = {
    onSegmentDrag: PropTypes.func,
    onSegmentDragEnd: PropTypes.func,
    onSegmentHover: PropTypes.func,
    onSegmentDrop: PropTypes.func,
    onBackgroundCellEnter: PropTypes.func,
    onBackgroundCellHoverExit: PropTypes.func,
  };

  getChildContext() {
    return {
      onSegmentDrag: this.handleSegmentDrag,
      onSegmentDragEnd: this.handleSegmentDragEnd,
      onSegmentHover: this.handleSegmentHover,
      onSegmentDrop: this.handleSegmentDrop,
      onBackgroundCellEnter: this.handleBackgroundCellEnter,
      onBackgroundCellHoverExit: this.handleBackgroundCellHoverExit,
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

  handleSegmentDrag = drag => {
    const { setDragItem } = this.context;
    setDragItem(drag);
  };

  handleSegmentDragEnd = () => {
    const { setDragItem } = this.context;
    setDragItem(null);
  };

  handleBackgroundCellEnter = (date, dragItem) => {
    this.ignoreHoverUpdates = true;
    console.log('background cell enter', date);

    const { range, level: row } = this.props;
    const { levels } = this.state;
    const { type, data, position } = dragItem;
    let drag = window.RBC_DRAG_POS;
    if (type === 'resizeL' || type === 'resizeR') return;

    const lastKnownWeekRow = window.RBC_LAST_WEEK_ROW;
    if (lastKnownWeekRow && lastKnownWeekRow !== row && window.RBC_REMOVE_ORPHANED_SEG) {
      window.RBC_REMOVE_ORPHANED_SEG();
      window.RBC_REMOVE_ORPHANED_SEG = null;
    }

    // update last known week row
    window.RBC_LAST_WEEK_ROW = row;

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

      //console.log(segsInDay.length, dragId, [].concat(segsInDay));
      //console.log('curr lvls', cloneLevels(levels));
      if (segsInDay.length && dragId && segsInDay.some(({ event: { id } }) => id === dragId)) {
        this.ignoreHoverUpdates = false;
        return;
      }

      const nextLevel = segsInDay.length; //.filter(({ left }) => left === nextLeft).length;
      //console.log('next lvl', row, drow, nextLevel);
      /*if ((type === 'outsideEvent' && drag.level === 0) || row !== drow) {
        drag.level = nextLevel;
      }*/

      let hover = calcPosFromDate(date, range, dspan);
      //hover.level = nextLevel;
      if (row !== drow || (type === 'outsideEvent' && dlevel === -1)) {
        drag.level = nextLevel;
        hover.level = nextLevel;
      }

      // update start/end date
      drag.event.start = format(date);
      drag.event.end = format(addDays(date, dspan - 1));

      console.log('before', { ...drag }, { ...hover });
      const [nextDrag, nextLevels] = reorderLevels(levels, drag, {
        ...hover,
        row,
        event: drag.event,
      });
      const { level: hlevel, right: hright } = hover;
      let _dleft = hlevel !== dlevel ? nextLeft : hright - (dspan - 1);
      window.RBC_DRAG_POS = {
        ...nextDrag,
        row,
      }; /*{
        left: _dleft,
        right: _dleft + (dspan - 1),
        span: dspan,
        level: hlevel,
        event: drag.event,
        row,
      };*/

      //console.log('next drag', window.RBC_DRAG_POS);
      //console.log('nnnn', cloneLevels(nextLevels));
      // setup cleanup routine
      window.RBC_REMOVE_ORPHANED_SEG = _segRemover(this, window.RBC_DRAG_POS);
      return this.setState({ levels: nextLevels });
    }
  };

  handleBackgroundCellHoverExit = () => {
    // TODO: figure out if needed
    //console.log('hover exit');
  };

  handleSegmentHover = (hoverItem, dragItem) => {
    if (this.ignoreHoverUpdates) return;

    const { getDragItem, setDragItem } = this.context;
    const drag = getDragItem();
    const { level: row } = this.props;

    if (!drag) return;

    const { position: hover, data: hoverData } = hoverItem;
    const { level: dlevel, left: dleft, right: dright, row: drow } = drag;
    const { level: hlevel, left: hleft } = hover;

    if (dleft === hleft && dlevel === hlevel) return;

    const { levels } = this.state;
    const [nextDrag, nextLevels] = reorderLevels(levels, drag, hoverItem.position);
    setDragItem({ ...nextDrag, row });
    this.setState({ levels: nextLevels });
  };

  handleSegmentDrop = ({ level, left }) => {
    const { levels } = this.state;
    const { onEventReorder, getDragItem } = this.context;
    const drag = getDragItem();

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
