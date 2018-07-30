import PropTypes from 'prop-types'
import React from 'react'
import classes from 'dom-helpers/class'
import getWidth from 'dom-helpers/query/width'
import scrollbarSize from 'dom-helpers/util/scrollbarSize'

import dates from './utils/dates'
import { navigate } from './utils/constants'
import { inRange } from './utils/eventLevels'
import { isSelected } from './utils/selection'

class Agenda extends React.Component {
  static propTypes = {
    events: PropTypes.array,
    date: PropTypes.instanceOf(Date),
    length: PropTypes.number.isRequired,

    selected: PropTypes.object,

    accessors: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    getters: PropTypes.object.isRequired,
    localizer: PropTypes.object.isRequired,
  }

  static defaultProps = {
    length: 30,
  }

  componentDidMount() {
    this._adjustHeader()
  }

  componentDidUpdate() {
    this._adjustHeader()
  }

  render() {
    let { length, date, events, accessors, localizer } = this.props
    let { messages } = localizer
    let end = dates.add(date, length, 'day')

    let range = dates.range(date, end, 'day')

    events = events.filter(event => inRange(event, date, end, accessors))

    events.sort((a, b) => +accessors.start(a) - +accessors.start(b))

    return (
      <div className="rbc-agenda-view">
        {events.length !== 0 ? (
          <React.Fragment>
            <table ref="header" className="rbc-agenda-table">
              <thead>
                <tr>
                  <th className="rbc-header" ref="dateCol">
                    {messages.date}
                  </th>
                  <th className="rbc-header" ref="timeCol">
                    {messages.time}
                  </th>
                  <th className="rbc-header">{messages.event}</th>
                </tr>
              </thead>
            </table>
            <div className="rbc-agenda-content" ref="content">
              <table className="rbc-agenda-table">
                <tbody ref="tbody">
                  {range.map((day, idx) => this.renderDay(day, events, idx))}
                </tbody>
              </table>
            </div>
          </React.Fragment>
        ) : (
          <span className="rbc-agenda-empty">{messages.noEventsInRange}</span>
        )}
      </div>
    )
  }

  renderDay = (day, events, dayKey) => {
    let {
      selected,
      getters,
      accessors,
      localizer,
      components: { event: Event, date: AgendaDate },
    } = this.props

    events = events.filter(e =>
      inRange(e, dates.startOf(day, 'day'), dates.endOf(day, 'day'), accessors)
    )

    return events.map((event, idx) => {
      let title = accessors.title(event)
      let end = accessors.end(event)
      let start = accessors.start(event)

      const userProps = getters.eventProp(
        event,
        start,
        end,
        isSelected(event, selected)
      )

      let dateLabel = idx === 0 && localizer.format(day, 'agendaDateFormat')
      let first =
        idx === 0 ? (
          <td rowSpan={events.length} className="rbc-agenda-date-cell">
            {AgendaDate ? (
              <AgendaDate day={day} label={dateLabel} />
            ) : (
              dateLabel
            )}
          </td>
        ) : (
          false
        )

      return (
        <tr
          key={dayKey + '_' + idx}
          className={userProps.className}
          style={userProps.style}
        >
          {first}
          <td className="rbc-agenda-time-cell">
            {this.timeRangeLabel(day, event)}
          </td>
          <td className="rbc-agenda-event-cell">
            {Event ? <Event event={event} title={title} /> : title}
          </td>
        </tr>
      )
    }, [])
  }

  timeRangeLabel = (day, event) => {
    let { accessors, localizer, components } = this.props

    let labelClass = '',
      TimeComponent = components.time,
      label = localizer.messages.allDay

    let end = accessors.end(event)
    let start = accessors.start(event)

    if (!accessors.allDay(event)) {
      if (dates.eq(start, end, 'day')) {
        label = localizer.format({ start, end }, 'agendaTimeRangeFormat')
      } else if (dates.eq(day, start, 'day')) {
        label = localizer.format(start, 'agendaTimeFormat')
      } else if (dates.eq(day, end, 'day')) {
        label = localizer.format(end, 'agendaTimeFormat')
      }
    }

    if (dates.gt(day, start, 'day')) labelClass = 'rbc-continues-prior'
    if (dates.lt(day, end, 'day')) labelClass += ' rbc-continues-after'

    return (
      <span className={labelClass.trim()}>
        {TimeComponent ? (
          <TimeComponent event={event} day={day} label={label} />
        ) : (
          label
        )}
      </span>
    )
  }

  _adjustHeader = () => {
    if (!this.refs.tbody) return

    let header = this.refs.header
    let firstRow = this.refs.tbody.firstChild

    if (!firstRow) return

    let isOverflowing =
      this.refs.content.scrollHeight > this.refs.content.clientHeight
    let widths = this._widths || []

    this._widths = [
      getWidth(firstRow.children[0]),
      getWidth(firstRow.children[1]),
    ]

    if (widths[0] !== this._widths[0] || widths[1] !== this._widths[1]) {
      this.refs.dateCol.style.width = this._widths[0] + 'px'
      this.refs.timeCol.style.width = this._widths[1] + 'px'
    }

    if (isOverflowing) {
      classes.addClass(header, 'rbc-header-overflowing')
      header.style.marginRight = scrollbarSize() + 'px'
    } else {
      classes.removeClass(header, 'rbc-header-overflowing')
    }
  }
}

Agenda.range = (start, { length = Agenda.defaultProps.length }) => {
  let end = dates.add(start, length, 'day')
  return { start, end }
}

Agenda.navigate = (date, action, { length = Agenda.defaultProps.length }) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -length, 'day')

    case navigate.NEXT:
      return dates.add(date, length, 'day')

    default:
      return date
  }
}

Agenda.title = (start, { length = Agenda.defaultProps.length, localizer }) => {
  let end = dates.add(start, length, 'day')
  return localizer.format({ start, end }, 'agendaHeaderFormat')
}

export default Agenda
