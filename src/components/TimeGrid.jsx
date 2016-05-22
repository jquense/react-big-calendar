import React, { PropTypes, Component } from 'react'
import cn from 'classnames'
import moment from 'moment'

import TimeGridHeader from './TimeGridHeader.jsx'
import TimeGutter from './TimeGutter.jsx'
import DaySlot from './DaySlot.jsx'
import TimeGridAllDay from './TimeGridAllDay.jsx'

import { segStyle } from '../utils/eventLevels';
import dates from '../utils/dates';

export default class TimeGrid extends Component {
  static propTypes = {
    end: PropTypes.instanceOf(Date),
    start: PropTypes.instanceOf(Date),
    gutterProps: PropTypes.shape({...TimeGutter.propTypes})
  }

  renderEvents(range, events){
    let { min, max, endAccessor, startAccessor, components } = this.props.gutterProps;
    let today = new Date(), daysEvents=[]

    return range.map((date, idx) => {
      // let daysEvents = events.filter(
      //   event => dates.inRange(date,
      //     get(event, startAccessor),
      //     get(event, endAccessor), 'day')
      // )

      return (
        <DaySlot
          {...this.props.gutterProps }
          min={dates.merge(date, min)}
          max={dates.merge(date, max)}
          now={new Date()}
          formatter={({start, end}) => {
            if (start+'' === end+'') {
              return `${moment(start).format('h:mm')}-${moment(start)
              .add(this.props.gutterProps.step, 'minutes').format('h:mm')}`
            }
            return `${moment(start).format('h:mm')}-${
            moment(end).add(this.props.gutterProps.step, 'minutes').format('h:mm')}`
          }}
          className={cn({ 'rbc-now': dates.eq(date, today, 'day') })}
          style={segStyle(1, range.length)}
          key={idx}
          date={date}
          events={daysEvents}
        />
      )
    })
  }

  render() {
    const range = dates.range(this.props.start, this.props.end, 'day')

    return (
      <div className='rbc-time-view'>
        <div className='rbc-time-header'>
          <TimeGridHeader range={range} />
          <TimeGridAllDay range={range}>
          </TimeGridAllDay>
          <div className="rbc-time-content">
            <TimeGutter {...this.props.gutterProps} />
            {this.renderEvents(range, [])}
          </div>
        </div>
      </div>
    )
  }
}
