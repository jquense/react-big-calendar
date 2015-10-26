import React from 'react';
import EventCell from './EventCell';
import { isSelected } from './utils/selection';

class Popup extends React.Component {
  render() {
    let { events, selected, ...props } = this.props;

    let { left, width, top } = this.props.position;

    top += 20;

    let style = { left, top, minWidth: width + (width / 2) }

    return (
      <div style={style} className='rbc-overlay'>
        {
          events.map((event, idx) =>
            <EventCell key={idx} {...props} event={event} selected={isSelected(event, selected)} />
          )
        }
      </div>
    )
  }
}

export default Popup;
