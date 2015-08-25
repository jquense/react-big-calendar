import React from 'react';
import dates from './utils/dates';
import EventCell from './EventCell';
import { isSelected } from './utils/selection';

class Popup {
  render() {
    let { events, selected, ...props } = this.props;

    let { left, width, top, height } = this.props.position;

    top += 20;

    let style = { left, top, minWidth: width + (width / 2) }

    return (
      <div style={style} className='rbc-overlay'>
        {
          events.map(event =>
            <EventCell {...props} event={event} selected={isSelected(event, selected)} />
          )
        }
      </div>
    )
  }
}

export default Popup;
