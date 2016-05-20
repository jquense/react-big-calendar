import React, { PropTypes, Component } from 'react'
import SelectableDaySliceGroup from '../containers/SelectableDaySliceGroup.jsx'

export default class DaySlot extends Component {

  render() {
    return (
      <div className="rbc-day-slot">
        <SelectableDaySliceGroup />
      </div>
    )
  }
}

