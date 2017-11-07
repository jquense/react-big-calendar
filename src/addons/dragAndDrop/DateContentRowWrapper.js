import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cuid from 'cuid';
import propEq from 'ramda/src/propEq';
import findIndex from 'ramda/src/findIndex';
import addDays from 'date-fns/add_days';

import BigCalendar from '../../index';
import { withLevels } from '../../utils/eventLevels';

class DateContentRowWrapper extends Component {
  state = {
    drag: null,
    hover: null,
    hoverData: null,
  };

  static contextTypes = {
    onEventReorder: PropTypes.func,
  };

  static childContextTypes = {
    onSegmentDrag: PropTypes.func,
    onSegmentHover: PropTypes.func,
    onSegmentDrop: PropTypes.func,
    onBackgroundCellHoverExit: PropTypes.func,
  };

  getChildContext() {
    return {
      onSegmentDrag: this.handleSegmentDrag,
      onSegmentHover: this.handleSegmentHover,
      onSegmentDrop: this.handleSegmentDrop,
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

  _posEq = (a, b) => a.left === b.left && a.level === b.level;

  handleSegmentDrag = drag => {
    this.setState({ drag });
  };

  handleBackgroundCellHoverExit = () => {
    const props = withLevels(this.props);
    this.setState({ ...props, drag: null });
  };

  handleSegmentHover = ({ position: hover, data: hoverData }, dragEvent) => {
    const { type: dragEventType, data: dragData, ...dragRest } = dragEvent;
    let { drag } = this.state;
    let { events } = this.props;
    if (!drag && dragEventType === 'outsideEvent') {
      // update position based on hover
      const { position: { span } } = dragRest;
      const dragPos = { ...hover, span, level: hover.level + 1 };
      const { id: eventTemplateId, eventTemplateId: id, ...dragDataRest } = dragData;

      // calculate start and end
      const data = {
        ...dragDataRest,
        id: cuid(),
        eventTemplateId,
        locked: false,
        start: hoverData.start,
        end: addDays(hoverData.start, span),
        weight: hoverData.weight - 0.5,
      };

      // update events
      events = [...events, data];

      // sort events
      events.sort(({ weight: a }, { weight: b }) => (a < b ? -1 : 1));

      // recalculate levels
      const levels = withLevels({ ...this.props, events });

      // update drag level
      let nextDragData = null;
      const lvls = levels.levels;
      for (let i = 0, len = lvls.length; i < len; i++) {
        const lvl = lvls[i];
        nextDragData = lvl.find(({ event, ...pos }) => event === data);
        if (nextDragData) break;
      }

      dragPos.level = nextDragData.level;
      return this.setState(prev => ({
        ...levels,
        drag: dragPos,
      }));
    }
    if (this._posEq(drag, hover) || hover.left !== drag.left) return;

    const { level: dlevel, left: dleft } = drag;
    const { level: hlevel, left: hleft } = hover;
    const { levels } = this.state;

    // flatten out segments in a single day cell
    let cellSegs = levels.map(segs => {
      const idx = findIndex(propEq('left', dleft))(segs);
      if (idx === -1) {
        return { idx };
      }

      const seg = segs[idx];
      return { ...seg, idx, isHidden: false };
    });

    const [dseg] = cellSegs.splice(dlevel, 1);
    cellSegs.splice(hlevel, 0, { ...dseg, isHidden: true });

    // update cell segments
    cellSegs.forEach(({ idx, ...seg }, i) => {
      if (idx === -1) return;

      let lvl = levels[i];
      seg.level = i;
      lvl[idx] = seg;
    });

    this.setState({ levels, drag: { ...drag, level: hlevel }, hover, hoverData });
  };

  handleSegmentDrop = ({ level, left }) => {
    const { drag, levels, hoverData } = this.state;
    const { onEventReorder } = this.context;

    if (!hoverData) return;

    const dragSeg = levels[drag.level].find(({ left }) => drag.left === left);
    if (!dragSeg) {
      this.setState({ drag: null, hover: null, hoverData: null });
      return;
    }

    const dragData = dragSeg.event;
    const events = levels.reduce((acc, row) => {
      const seg = row.find(({ left }) => drag.left === left);
      if (seg) acc.push(seg.event);
      return acc;
    }, []);

    // return draggedData, hoverData, idxa, idxb, segments
    onEventReorder && onEventReorder(dragData, hoverData, drag.level, level, events);
    this.setState({ drag: null, hover: null, hoverData: null });
  };

  render() {
    const DateContentRowWrapper = BigCalendar.components.dateContentRowWrapper;
    const props = { ...this.props, ...this.state };
    return <DateContentRowWrapper {...props}>{this.props.children}</DateContentRowWrapper>;
  }
}

export default DateContentRowWrapper;
