import PropTypes from 'prop-types';
import React from 'react';
import EventRowMixin from './EventRowMixin';

class EventRow extends React.Component {
  static propTypes = {
    segments: PropTypes.array,
    ...EventRowMixin.propTypes,
  };
  static defaultProps = {
    ...EventRowMixin.defaultProps,
  };
  render() {
    let { segments } = this.props;

    let lastEnd = 1;

    console.log('row', this.props.level);
    return (
      <div className="rbc-row">
        {segments.reduce((row, segment, li) => {
          const { event: data, left, right, span, level } = segment;
          const key = '_lvl_' + li;
          const gap = left - lastEnd;

          const event = {
            data,
            position: { left, right, span, level, row: this.props.level },
          };

          const content = EventRowMixin.renderEvent(this.props, event);

          if (gap) row.push(EventRowMixin.renderSpan(this.props, gap, key + '_gap'));

          row.push(EventRowMixin.renderSpan(this.props, span, key, content, segment.isHidden));

          lastEnd = right + 1;

          return row;
        }, [])}
      </div>
    );
  }
}

export default EventRow;
