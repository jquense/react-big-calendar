import React from 'react';
import { findDOMNode } from 'react-dom';
import EventCell from './EventCell';
import getHeight from 'dom-helpers/query/height';
import { accessor } from './utils/propTypes';
import { segStyle } from './utils/eventLevels';
import { isSelected } from './utils/selection';

let propTypes = {
  segments: React.PropTypes.array,
  end: React.PropTypes.instanceOf(Date),
  start: React.PropTypes.instanceOf(Date),

  titleAccessor: accessor,
  allDayAccessor: accessor,
  startAccessor: accessor,
  endAccessor: accessor,

  onEventClick: React.PropTypes.func
};


let EventRow = React.createClass({

  displayName: 'EventRow',

  propTypes,

  getDefaultProps() {
    return {
      segments: [],
      selected: [],
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

          let content = this.renderEvent(event, start, end)

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

  renderEvent(event, start, end, props = {}){
    let {
        selected, startAccessor, endAccessor
      , titleAccessor, eventComponent, onSelect } = this.props;


    return (
      <EventCell
        event={event}
        onSelect={onSelect}
        selected={isSelected(event, selected)}
        startAccessor={startAccessor}
        endAccessor={endAccessor}
        titleAccessor={titleAccessor}
        slotStart={start}
        slotEnd={end}
        component={eventComponent}
      />
    )
  },

  renderSpan(len, key, content = ' '){
    let { slots } = this.props;

    return (
      <div key={key} className='rbc-row-segment' style={segStyle(Math.abs(len), slots)}>
        {content}
      </div>
    )
  },

  getRowHeight(){
    getHeight(findDOMNode(this))
  }
});

export default EventRow
