import React from 'react';
import BigCalendar from 'react-big-calendar';
import Toolbar from './Toolbar';
import physicians from './data/physicians';
import getAppts from './data/appts';


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

  state = {
    currentPhysicianId: physicians[0],
    appts: getAppts(physicians[0])
  }

  render(){
    return (
      <BigCalendar
        {...this.props}
        events={this.state.appts}
        singleDayEventsOnly
        formats={formats}
        step={10}
        rightOffset={10}
        groupHeight={140}
        timeslots={6}
        views={['week', 'day']}
        messages={{
          week: '7 Days',
          day: 'Multi-Providers'
        }}
        defaultView="week"
        defaultDate={new Date(2015, 3, 12)}
        titleAccessor="_patientName"
        startAccessor={(event) => new Date(event._apptTime)}
        endAccessor={(event) => new Date(event._apptEnd)}
        components={{
          toolbar: Toolbar
        }}
        componentProps={{
          toolbar: {
            onCurrentPhysicianChange: (event) => {
              this.setState({
                currentPhysicianId: event.target.value,
                appts: getAppts(event.target.value)
              })
            },
            onRefresh: () => {
              console.log('Refreshing!');
              this.setState({
                appts: getAppts(this.state.currentPhysicianId)
              })
            }
          }
        }}
      />
    )
  }
}
