import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let Basic = React.createClass({
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={events}
        views={allViews}
        step={60}
        defaultDate={new Date(2015, 3, 1)}
        dayPropGetter={customDayPropGetter}
        slotPropGetter={customSlotPropGetter}
      />
    )
  }
})

const customDayPropGetter = (date) => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: 'special-day',
      style: {
        border: 'solid 3px '+((date.getDate() === 7) ? '#faa' : '#afa'),
      }
    }
  else return {}
}

const customSlotPropGetter = (date) => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: 'special-day'
    }
  else return {}
}

export default Basic;
