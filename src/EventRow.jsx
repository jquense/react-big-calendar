import React from 'react';
import cn from 'classnames';
import dates from './utils/dates';
import localizer from './utils/localizer'

import { segStyle } from './utils/eventLevels';



let propTypes = {
  segments: React.PropTypes.array,
  end: React.PropTypes.instanceOf(Date),
  start: React.PropTypes.instanceOf(Date),

  onChange: React.PropTypes.func.isRequired,
  onEventClick: React.PropTypes.func
};


let MonthView = React.createClass({

  displayName: 'MonthView',

  propTypes,

  getDefaultProps() {
    return {
      segments: [],
      slots: 7
    };
  },

  render(){
    let { segments, start, end } = this.props;

    let lastEnd = 1;

    return (
      <div className='rbc-row'>
      {
        segments.reduce((row, { event, left, right, span }, li) => {
          let key = '_lvl_' + li;
          let gap = left - lastEnd;
          let content = this.renderEvent(event, {
            className: cn({
              'rbc-event-continues-after': dates.gt(event.end, end),
              'rbc-event-continues-prior': dates.lt(event.start, start)
            })
          })

          if (gap)
            row.push(this.renderSpan(gap, key + '_gap'))

          row.push(
            this.renderSpan(span, key, content)
          )

          lastEnd = (right + 1);

          return row;
        }, [])
      }
      </div>
    )
  },

  renderEvent(event, props = {}){
    let { onEventClick } = this.props;

    return (
      <div
        {...props}
        className={cn('rbc-event', props.className)}
        onClick={onEventClick.bind(null, event)}
      >
        { event.start.toLocaleString() }
      </div>
    )
  },

  renderSpan(len, key, content = ' '){
    let { slots } = this.props;

    return (
      <div key={key} style={segStyle(Math.abs(len), slots)}>
        {content}
      </div>
    )
  }

});

export default MonthView
