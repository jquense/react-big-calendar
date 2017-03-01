import React from 'react';
import BigCalendar from 'react-big-calendar';
import Toolbar from './Toolbar';
import Event from './Event';
import physicians, { getPhysicianName } from './data/physicians';
import { getAppts, getAllAppts } from './data/appts';
import eventStyler from './util/eventStyler';


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
    currentPhysicianId: physicians[0].id,
    appts: getAppts(physicians[0].id)
  }

  onCurrentPhysicianChange = (event) => {
    const newPhysicianId = Number(event.target.value);
    this.setState({
      currentPhysicianId: newPhysicianId,
      appts: getAppts(newPhysicianId)
    });
  }

  onRefresh = () => {
    console.log('Refreshing!'); // eslint-disable-line no-console
    this.setState({
      appts: getAppts(this.state.currentPhysicianId)
    })
  }

  onSelectSlot = ({ start, end, entityKey/*, slots */}) => {
    const name = getPhysicianName(entityKey || this.state.currentPhysicianId);
    alert(`Adding event from ${start.toLocaleString()} to ${end.toLocaleString()} for physician ${name}`);
  }

  onSelectEvent = (event/*, e*/) => {
    const name = getPhysicianName(event._physicianUserId);
    alert(`Selected appointment with ${event._patientName} for ${name} starting at ${new Date(event._apptTime).toLocaleString()}`);
  }

  render(){
    return (
      <BigCalendar
        {...this.props}
        events={this.state.appts}
        eventMap={getAllAppts()}
        entities={physicians}
        entityKeyAccessor="id"
        entityNameAccessor="fullName"
        eventPropGetter={eventStyler}
        singleDayEventsOnly
        formats={formats}
        step={10}
        rightOffset={10}
        groupHeight={140}
        timeslots={6}
        views={['week', 'multi']}
        messages={{
          week: '7 Days',
          multi: 'Multi-Providers'
        }}
        defaultView="week"
        defaultDate={new Date(2015, 3, 12)}
        titleAccessor="_patientName"
        startAccessor={(event) => new Date(event._apptTime)}
        endAccessor={(event) => new Date(event._apptEnd)}
        drilldownView={null}
        components={{
          toolbar: Toolbar,
          event: Event
        }}
        componentProps={{
          toolbar: {
            currentPhysicianId: this.state.currentPhysicianId,
            onCurrentPhysicianChange: this.onCurrentPhysicianChange,
            onRefresh: this.onRefresh
          }
        }}
        selectable
        onSelectSlot={this.onSelectSlot}
        onSelectEvent={this.onSelectEvent}
      />
    )
  }
}
