import React from 'react';
import createReactClass from 'create-react-class';
import BigCalendar from 'react-big-calendar';
import events from '../events';

let Basic = createReactClass({
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={events}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  }
})

export default Basic;
