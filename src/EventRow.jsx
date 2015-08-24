import React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import dates from './utils/dates';
import getHeight from 'dom-helpers/query/height';
//import localizer from './utils/localizer'

import { notify } from './utils/helpers';
import { accessor } from './utils/propTypes';
import { segStyle } from './utils/eventLevels';
import { isSelected } from './utils/selection';
import { accessor as get } from './utils/accessors';

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


let MonthView = React.createClass({

  displayName: 'MonthView',

  propTypes,

  getDefaultProps() {
    return {
      segments: [],
      selected: [],
      slots: 7
    };
  },

  render(){
    let {
        segments, start, end
      , startAccessor, endAccessor } = this.props;

    let lastEnd = 1;

    return (
      <div className='rbc-row'>
      {
        segments.reduce((row, { event, left, right, span }, li) => {
          let key = '_lvl_' + li;
          let gap = left - lastEnd;
          let content = this.renderEvent(event, {
            className: cn({
              'rbc-event-continues-after': dates.gt(get(event, endAccessor), end),
              'rbc-event-continues-prior': dates.lt(get(event, startAccessor), start)
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
    let { selected, titleAccessor, eventComponent } = this.props;

    let EventComponent = eventComponent;
    let title = get(event, titleAccessor)
    return (
      <div
        {...props}
        className={cn('rbc-event', props.className, {
          'rbc-selected': isSelected(event, selected)
        })}
        onClick={this._select.bind(null, event)}
      >
        <div className='rbc-event-content'>
          { EventComponent
            ? <EventComponent event={event} title={title}/>
            : title
          }
        </div>
      </div>
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
  },

  _select(event){
    notify(this.props.onEventClick, event);
  }

});

export default MonthView
