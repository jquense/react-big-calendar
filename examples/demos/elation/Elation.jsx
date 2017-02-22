import React from 'react';
import BigCalendar from 'react-big-calendar';
import Toolbar from './Toolbar';
import events from '../../events';


const formats = {
  dayFormat: (date, culture, localizer) => {
    return localizer.format(date, 'dddd MM/dd', culture);
  },
  dayHeaderFormat: (date, culture, localizer) => {
    return localizer.format(date, 'ddd, MMM dd, yyyy', culture);
  },
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) => {
    return localizer.format(start, 'MMM dd', culture) + ' - ' +
      localizer.format(end, 'MMM dd, yyyy', culture);
  }
}

export default class Elation extends React.Component {
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={events}
        singleDayEventsOnly
        formats={formats}
        step={10}
        rightOffset={10}
        timeslots={6}
        defaultView="week"
        defaultDate={new Date(2015, 3, 12)}
        components={{
          toolbar: Toolbar
        }}
      />
    )
  }
}
