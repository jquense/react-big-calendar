import React, { Component, PropTypes } from 'react'
import dates from '../utils/dates';
import TimeSliceGroup from './TimeSliceGroup.jsx'
import TimeSlice from './TimeSlice.jsx'
import SelectableTimeSlice from '../containers/SelectableTimeSlice.jsx'

export default class TimeGutter extends Component {
  static propTypes = {
    step: PropTypes.number.isRequired,
    slices: PropTypes.number.isRequired,
    now: PropTypes.instanceOf(Date).isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    selectable: PropTypes.bool,
    hidelabels: PropTypes.bool,
    timesliceClassnames: PropTypes.string,
    timeGutterFormat: PropTypes.string
  }
  static defaultProps = {
    step: 10,
    slices: 2,
    selectable: false,
    timesliceClassnames: '',
    hidelabels: false
  }

  renderTimeSliceGroup(key, isNow, date) {
    const TS = this.props.selectable ? SelectableTimeSlice : TimeSlice
    return <TimeSliceGroup key={key}
                           isNow={isNow}
                           slices={this.props.slices}
                           step={this.props.step}
                           showlabels={!this.props.hidelabels}
                           timeGutterFormat={this.props.timeGutterFormat}
                           timesliceClassnames={this.props.timesliceClassnames}
                           value={date}
                           timesliceComponent={TS}
    />
  }
  
  render() {
    console.log(this.props)
    const totalMin = dates.diff(this.props.min, this.props.max, 'minutes')
    const numGroups = Math.ceil(totalMin / (this.props.step * this.props.slices))
    const children = []
    const groupLengthInMinutes = this.props.step * this.props.slices

    let date = this.props.min
    let next = date
    let isNow = false

    for (var i = 0; i < numGroups; i++) {
      isNow = dates.inRange(this.props.now, date, dates.add(next, groupLengthInMinutes - 1, 'minutes'), 'minutes')
      next = dates.add(date, groupLengthInMinutes, 'minutes');
      children.push(this.renderTimeSliceGroup(i, isNow, date))
      
      date = next
    }

    return (
      <div className='rbc-time-gutter'>
        {children}
      </div>
    )
  }
}

