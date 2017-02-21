import React from 'react';
import BigCalendar from 'react-big-calendar';
import Toolbar from './Toolbar';
import events from '../../events';


const formats = {
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) => {
    return localizer.format(start, { skeleton: 'MMM' }, culture) + ' - ' +
      localizer.format(end, { skeleton: 'yMMMd' }, culture);
  }
}

export default class Elation extends React.Component {
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={events}
        formats={formats}
        step={10}
        timeslots={8}
        defaultView="week"
        defaultDate={new Date(2015, 3, 12)}
        components={{
          toolbar: Toolbar
        }}
      />
    )
  }
}
