import React, { PropTypes, Component } from 'react'
import TimeGridHeader from './TimeGridHeader.jsx'
import TimeGridGutter from './TimeGridGutter.jsx'
import TimeGutter from './TimeGutter.jsx'
import TimeGridAllDay from './TimeGridAllDay.jsx'
import dates from '../utils/dates';

export default class TimeGrid extends Component {
  static propTypes = {
    end: PropTypes.instanceOf(Date),
    start: PropTypes.instanceOf(Date),
    gutterProps: PropTypes.shape({...TimeGutter.propTypes})
  }

  render() {
    const range = dates.range(this.props.start, this.props.end, 'day')

    return (
      <div className='rbc-time-view'>
        <div className='rbc-time-header'>
          <TimeGridHeader range={range} />
          <TimeGridAllDay range={range}>
          </TimeGridAllDay>
          <TimeGridGutter gutterProps={this.props.gutterProps} />
        </div>
      </div>
    )
  }
}
