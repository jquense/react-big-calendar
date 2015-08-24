import React, { PropTypes } from 'react';
import message from './utils/messages';
import localizer from './utils/localizer'

import dates from './utils/dates';
import { dateFormat } from './utils/propTypes';
import { accessor as get } from './utils/accessors';
import { segStyle, inRange, sortEvents } from './utils/eventLevels';


let Agenda = React.createClass({

  propTypes: {
    messages: PropTypes.shape({
      date: PropTypes.string,
      time: PropTypes.string,
      event: PropTypes.string
    })
  },

  getDefaultProps() {
    return {
      length: 30
    };
  },

  render() {
    let { length, date, events, startAccessor } = this.props;
    let messages = message(this.props.messages);
    let end = dates.add(date, length, 'day')

    let range = dates.range(date, end, 'day');

    events = events.filter(event =>
      inRange(event, date, end, this.props)
    )

    events.sort((a, b) => +get(a, startAccessor) - +get(b, startAccessor))

    return (
      <div className='rbc-agenda-view'>
        <table>
          <thead>
            <tr>
              <th className='rbc-header'>{messages.date}</th>
              <th className='rbc-header'>{messages.time}</th>
              <th className='rbc-header'>{messages.event}</th>
            </tr>
          </thead>
          <tbody>
            {range.map((day, idx) => this.renderDay(day, events, idx))}
          </tbody>
        </table>
      </div>
    );
  },

  renderDay(day, events, dayKey){
    let {
        date, culture, components
      , endAccessor, startAccessor, titleAccessor
      , agendaDateFormat } = this.props;

    let EventComponent = components.event;

    events = events.filter(e => inRange(e, day, day, this.props))

    return events.map((event, idx) => {
      let first = idx === 0
          ? (
            <td rowSpan={events.length} className='rbc-agenda-date-cell'>
              {localizer.format(day, agendaDateFormat, culture)}
            </td>
          ) : false

      let title = get(event, titleAccessor)

      return (
        <tr key={dayKey + '_' + idx}>
          {first}
          <td className='rbc-agenda-time-cell'>
            { this.timeRangeLabel(day, event) }
          </td>
          <td className='rbc-agenda-event-cell'>
            { EventComponent
                ? <EventComponent event={event} title={title}/>
                : title
            }
          </td>
        </tr>
      )
    }, [])
  },

  timeRangeLabel(day, event){
    let {
        endAccessor, startAccessor, allDayAccessor
      , culture, messages } = this.props;

    let labelClass = ''
      , label = message(messages).allDay

    let start = get(event, startAccessor)
    let end = get(event, endAccessor)

    if (!get(event, allDayAccessor)) {
      if (dates.eq(start, end, 'day')){
        label = localizer.format({ start, end }, this.props.agendaTimeRangeFormat, culture)
      }
      else if (dates.eq(day, start, 'day')){
        label = localizer.format(start, this.props.agendaTimeFormat, culture)
      }
      else if (dates.eq(day, end, 'day')){
        label = localizer.format(start, this.props.agendaTimeFormat, culture)
      }
    }

    if (dates.gt(day, start, 'day'))
      labelClass = 'rbc-continues-prior'

    if (dates.lt(day, end, 'day'))
      labelClass += ' rbc-continues-after'

    return <span className={labelClass.trim()}>{label}</span>
  }
});

Agenda.range = (start, { length = Agenda.defaultProps.length }) => {
  let end = dates.add(start, length, 'day')
  return { start, end }
}

export default Agenda
