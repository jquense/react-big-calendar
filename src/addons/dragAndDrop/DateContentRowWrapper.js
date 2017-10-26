import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BigCalendar from '../../index';
import { withLevels } from '../../utils/eventLevels';

class DateContentRowWrapper extends Component {
  state = {
    drag: null,
    hover: null,
    hoverData: null,
    origLevels: null,
  };

  static contextTypes = {
    onEventReorder: PropTypes.func,
  };

  static childContextTypes = {
    onSegmentDrag: PropTypes.func,
    onSegmentHover: PropTypes.func,
    onSegmentDrop: PropTypes.func,
  };

  getChildContext() {
    return {
      onSegmentDrag: this.handleSegmentDrag,
      onSegmentHover: this.handleSegmentHover,
      onSegmentDrop: this.handleSegmentDrop,
    };
  }

  componentWillMount() {
    const props = withLevels(this.props);
    this.setState({ ...props, origLevels: props.levels });
  }

  componentWillReceiveProps(props, _) {
    const next = withLevels(props);
    this.setState({ ...next, origLevels: next.levels });
  }

  _posEq = (a, b) =>
    a.span === b.span && a.left === b.left && a.right === b.right && a.level === b.level;

  handleSegmentDrag = drag => {
    this.setState({ drag });
  };

  handleSegmentHover = (hover, hoverData) => {
    const { drag } = this.state;
    if (this._posEq(drag, hover)) return;

    const { level: dlevel, left: dleft } = drag;
    const { level: hlevel, left: hleft } = hover;

    const { levels } = this.state;

    const cellSegs = levels.reduce((acc, segs) => {
      return segs.reduce((acc, seg, idx) => {
        seg.left == dleft && acc.push({ ...seg, idx, isHidden: false });
        return acc;
      }, acc);
    }, []);

    const [dseg] = cellSegs.splice(dlevel, 1);
    cellSegs.splice(hlevel, 0, { ...dseg, isHidden: true });

    // update cell segments
    cellSegs.forEach(({ idx, ...seg }, i) => {
      let lvl = levels[i];
      seg.level = i;
      lvl[idx] = seg;
    });

    this.setState({ levels, drag: { ...drag, level: hlevel }, hover, hoverData });
  };

  handleSegmentDrop = ({ level, left }) => {
    const { drag, levels, hoverData } = this.state;
    const { onEventReorder } = this.context;
    onEventReorder && onEventReorder(levels[drag.level][drag.left - 1].event, hoverData);
    this.setState({ drag: null, hover: null, hoverData: null });
  };

  render() {
    const DateContentRowWrapper = BigCalendar.components.dateContentRowWrapper;
    const props = { ...this.props, ...this.state };
    return <DateContentRowWrapper {...props}>{this.props.children}</DateContentRowWrapper>;
  }
}

export default DateContentRowWrapper;
