import React from 'react'
import createReactClass from 'create-react-class'
import BigCalendar from 'react-big-calendar'
import events from '../events'

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let Basic = createReactClass({
  render() {
    return (
      <BigCalendar
        {...this.props}
        events={events}
        views={allViews}
        step={60}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  },
})

export default Basic
