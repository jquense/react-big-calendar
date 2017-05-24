import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';


let DynamicTimeslots = React.createClass({
  render(){
    const min = new Date();
    min.setHours(8);
    min.setMinutes(0, 0, 0);

    const max = new Date();
    max.setHours(22);
    max.setMinutes(0, 0, 0);
    return (
      <BigCalendar
        {...this.props}
        events={events}
        view='week'
        views={['week']}
        culture={'fr'}
        step={5}
        areSlotsDynamic={true}
        min={min}
        max={max}
        defaultDate={new Date(2015, 3, 12)}
      />
    )
  }
})

export default DynamicTimeslots;
