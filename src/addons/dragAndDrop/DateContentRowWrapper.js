import PropTypes from 'prop-types';
import React, { Component } from 'react';

import propEq from 'ramda/src/propEq';
import findIndex from 'ramda/src/findIndex';

import BigCalendar from '../../index';
import { withLevels } from '../../utils/eventLevels';

const overlaps = (left, right) => ({ left: l, right: r }) => r >= left && right >= l;

class DateContentRowWrapper extends Component {
  state = {
    hover: null,
    hoverData: null,
  };

  static contextTypes = {
    onEventReorder: PropTypes.func,
  };

  static childContextTypes = {
    onSegmentDrag: PropTypes.func,
    onSegmentDragEnd: PropTypes.func,
    onSegmentHover: PropTypes.func,
    onSegmentDrop: PropTypes.func,
  };

  getChildContext() {
    return {
      onSegmentDrag: this.handleSegmentDrag,
      onSegmentDragEnd: this.handleSegmentDragEnd,
      onSegmentHover: this.handleSegmentHover,
      onSegmentDrop: this.handleSegmentDrop,
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

  handleSegmentDrag = drag => {
    window.RBC_DRAG_ITEM = drag;
  };

  handleSegmentDragEnd = () => {
    window.RBC_DRAG_ITEM = null;
  };

  handleSegmentHover = (hover, hoverData) => {
    const drag = window.RBC_DRAG_ITEM;
    if (!drag || !overlaps(drag)(hover)) return;

    const { level: dlevel, left: dleft } = drag;
    const { level: hlevel, left: hleft } = hover;
    const { levels } = this.state;

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
