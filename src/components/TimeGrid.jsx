import React, { PropTypes, Component } from 'react'
import cn from 'classnames'
import localizer from '../localizer.js'
import formats from '../formats.js'

import TimeGridHeader from './TimeGridHeader.jsx'
import TimeGutter from './TimeGutter.jsx'
import DaySlot from './DaySlot.jsx'
import TimeGridAllDay from './TimeGridAllDay.jsx'

import { segStyle } from '../utils/eventLevels';
import { accessor as get } from '../utils/accessors';
import dates from '../utils/dates';

export default class TimeGrid extends Component {
  static propTypes = {
    ...DaySlot.propTypes,
    ...TimeGutter.propTypes,

    end: PropTypes.instanceOf(Date),
    start: PropTypes.instanceOf(Date),
    selectRangeFormat: PropTypes.func.isRequired,
    eventTimeRangeFormat: PropTypes.func.isRequired,
    timeGutterFormat: PropTypes.string,
    culture: PropTypes.string.isRequired
  }

  static defaultProps = {
    ...DaySlot.defaultProps,
    ...TimeGutter.defaultProps,
    culture: 'en',
    selectRangeFormat: formats().selectRangeFormat,
    eventTimeRangeFormat: formats().eventTimeRangeFormat
  }

  renderEvents(range, events){
    let { min, max, endAccessor, startAccessor, components } = this.props;
    let today = new Date(), daysEvents=[]

    return range.map((date, idx) => {
       let daysEvents = events.filter(
         event => dates.inRange(date,
           get(event, startAccessor),
           get(event, endAccessor), 'day')
       )

      return (
        <DaySlot
          {...this.props }
          min={dates.merge(date, min)}
          max={dates.merge(date, max)}
          now={new Date()}
          eventTimeRangeFormat={this.props.eventTimeRangeFormat}
          formatter={({start, end}) => {
            if (start+'' === end+'') {
              return localizer.format(
                {start, end: dates.add(end, this.props.step, 'minutes')},
                this.props.selectRangeFormat,
                this.props.culture)
            }
            return localizer.format(
              {start, end},
              this.props.selectRangeFormat,
              this.props.culture)
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
            <TimeGutter {...this.props} />
            {this.renderEvents(range, this.props.events)}
          </div>
        </div>
      </div>
    )
  }
}
