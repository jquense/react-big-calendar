import PropTypes from 'prop-types';
import React, { Component } from 'react';

import propEq from 'ramda/src/propEq';
import findIndex from 'ramda/src/findIndex';

import BigCalendar from '../../index';
import { withLevels } from '../../utils/eventLevels';
import reorderLevels from './eventLevels';

const overlaps = (left, right) => ({ left: l, right: r }) => r >= left && right >= l;

class DateContentRowWrapper extends Component {
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
    const { setDragItem } = this.context;
    setDragItem(drag);
  };

  handleSegmentDragEnd = () => {
    const { setDragItem } = this.context;
    setDragItem(null);
  };

  handleSegmentHover = (hoverItem, dragItem) => {
    const { getDragItem, setDragItem } = this.context;
    const drag = getDragItem();
    const { level: row } = this.props;

    if (!drag) return;

    const { position: hover, data: hoverData } = hoverItem;
    const { level: dlevel, left: dleft, right: dright, row: drow } = drag;
    const { level: hlevel, left: hleft } = hover;

    if (
      row !== drow || // restrict to same week
      (dleft === hleft && dlevel === hlevel) || // ignore equal segments
      !overlaps(dleft, dright)(hover)
    )
      return; // ignore non overlapping segs

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
    onEventReorder(events);
  };

  render() {
    const DateContentRowWrapper = BigCalendar.components.dateContentRowWrapper;
    const props = { ...this.props, ...this.state };
    return <DateContentRowWrapper {...props}>{this.props.children}</DateContentRowWrapper>;
  }
}

export default DateContentRowWrapper;
