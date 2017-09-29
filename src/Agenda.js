import PropTypes from 'prop-types';
import React from 'react';
import classes from 'dom-helpers/class';
import getWidth from 'dom-helpers/query/width';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';

import localizer from './localizer'
import message from './utils/messages';
import dates from './utils/dates';
import { navigate } from './utils/constants';
import { accessor as get } from './utils/accessors';
import { accessor, dateFormat, dateRangeFormat } from './utils/propTypes';
import { inRange } from './utils/eventLevels';
import { isSelected } from './utils/selection';


class Agenda extends React.Component {
  static propTypes = {
    events: PropTypes.array,
    date: PropTypes.instanceOf(Date),
    length: PropTypes.number.isRequired,
    titleAccessor: accessor.isRequired,
    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,
    eventPropGetter: PropTypes.func,
    selected: PropTypes.object,

    agendaDateFormat: dateFormat,
    agendaTimeFormat: dateFormat,
    agendaTimeRangeFormat: dateRangeFormat,
    culture: PropTypes.string,

    components: PropTypes.object.isRequired,
    messages: PropTypes.shape({
      date: PropTypes.string,
      time: PropTypes.string,
    })
  };

  static defaultProps = {
    length: 30
  };

  componentDidMount() {
    this._adjustHeader();
  }

  componentDidUpdate() {
    this._adjustHeader();
  }

  render() {
    let { length, date, events, startAccessor } = this.props;
    let messages = message(this.props.messages);
    let end = dates.add(date, length, 'day');

    let range = dates.range(date, end, 'day');

    events = events.filter(event =>
      inRange(event, date, end, this.props)
    );

    events.sort((a, b) => +get(a, startAccessor) - +get(b, startAccessor));

    return (
      <div className='rbc-agenda-view'>
        <table ref='header'>
          <thead>
            <tr>
              <th className='rbc-header' ref='dateCol'>
                {messages.date}
              </th>
              <th className='rbc-header' ref='timeCol'>
                {messages.time}
              </th>
              <th className='rbc-header'>
                {messages.event}
              </th>
            </tr>
          </thead>
        </table>
        <div className='rbc-agenda-content' ref='content'>
          <table>
            <tbody ref='tbody'>
              { range.map((day, idx) => this.renderDay(day, events, idx)) }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderDay = (day, events, dayKey) => {
    let {
        culture, components
      , titleAccessor, agendaDateFormat
      , eventPropGetter, startAccessor, endAccessor, selected } = this.props;

    let EventComponent = components.event;
    let DateComponent = components.date;

    events = events.filter(e => inRange(e, day, day, this.props));

    return events.map((event, idx) => {
      const { className, style } = eventPropGetter ?
        eventPropGetter(
          event,
          get(event, startAccessor),
          get(event, endAccessor),
          isSelected(event, selected),
        ) : {};
      let dateLabel = idx === 0 && localizer.format(day, agendaDateFormat, culture);
      let first = idx === 0
          ? (
            <td rowSpan={events.length} className='rbc-agenda-date-cell'>
              { DateComponent
                ? <DateComponent day={day} label={dateLabel}/>
                : dateLabel
              }
            </td>
          ) : false;

      let title = get(event, titleAccessor);

      return (
        <tr key={dayKey + '_' + idx} className={className} style={style}>
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
      );
    }, []);
  };

  timeRangeLabel = (day, event) => {
    let {
        endAccessor, startAccessor, allDayAccessor
      , culture, messages, components } = this.props;

    let labelClass = ''
      , TimeComponent = components.time
      , label = message(messages).allDay;

    let start = get(event, startAccessor);
    let end = get(event, endAccessor);

    if (!get(event, allDayAccessor)) {
      if (dates.eq(start, end, 'day')){
        label = localizer.format({ start, end }, this.props.agendaTimeRangeFormat, culture);
      }
      else if (dates.eq(day, start, 'day')){
        label = localizer.format(start, this.props.agendaTimeFormat, culture);
      }
      else if (dates.eq(day, end, 'day')){
        label = localizer.format(end, this.props.agendaTimeFormat, culture);
      }
    }

    if (dates.gt(day, start, 'day')) labelClass = 'rbc-continues-prior';
    if (dates.lt(day, end, 'day'))   labelClass += ' rbc-continues-after';

    return (
      <span className={labelClass.trim()}>
        { TimeComponent
          ? <TimeComponent event={event} day={day} label={label}/>
          : label
        }
      </span>
    );
  };

  _adjustHeader = () => {
    let header = this.refs.header;
    let firstRow = this.refs.tbody.firstChild;

    if (!firstRow)
      return;

    let isOverflowing = this.refs.content.scrollHeight > this.refs.content.clientHeight;
    let widths = this._widths || [];

    this._widths = [
      getWidth(firstRow.children[0]),
      getWidth(firstRow.children[1])
    ];

    if (widths[0] !== this._widths[0] || widths[1] !== this._widths[1]) {
      this.refs.dateCol.style.width = this._widths[0] + 'px';
      this.refs.timeCol.style.width = this._widths[1] + 'px';
    }

    if (isOverflowing) {
      classes.addClass(header, 'rbc-header-overflowing');
      header.style.marginRight = scrollbarSize() + 'px';
    }
    else {
      classes.removeClass(header, 'rbc-header-overflowing');
    }
  };
}

Agenda.navigate = (date, action, { length = Agenda.defaultProps.length }) => {
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -length, 'day');

    case navigate.NEXT:
      return dates.add(date, length, 'day');

    default:
      return date;
  }
};

Agenda.title = (start, { length = length = Agenda.defaultProps.length, formats, culture }) => {
  let end = dates.add(start, length, 'day');
  return localizer.format(
    { start, end },
    formats.agendaHeaderFormat,
    culture
  );
}


export default Agenda;
