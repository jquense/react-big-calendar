import PropTypes from 'prop-types'
import React from 'react'
import addClass from 'dom-helpers/addClass'
import removeClass from 'dom-helpers/removeClass'
import getWidth from 'dom-helpers/width'
import scrollbarSize from 'dom-helpers/scrollbarSize'

import * as dates from './utils/dates'
import { navigate } from './utils/constants'
import { inRange } from './utils/eventLevels'
import { isSelected } from './utils/selection'

class Agenda extends React.Component {
  constructor(props) {
    super(props)
    this.headerRef = React.createRef()
    this.dateColRef = React.createRef()
    this.timeColRef = React.createRef()
    this.contentRef = React.createRef()
    this.tbodyRef = React.createRef()
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
            <table ref={this.headerRef} className="rbc-agenda-table">
              <thead>
                <tr>
                  <th className="rbc-header" ref={this.dateColRef}>
                    {messages.date}
                  </th>
                  <th className="rbc-header" ref={this.timeColRef}>
                    {messages.time}
                  </th>
                  <th className="rbc-header">{messages.event}</th>
                </tr>
              </thead>
            </table>
            <div className="rbc-agenda-content" ref={this.contentRef}>
              <table className="rbc-agenda-table">
                <tbody ref={this.tbodyRef}>
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
        >
          {first}
          <td 
            className="rbc-agenda-time-cell"
            style={userProps.style}
          >
            {this.timeRangeLabel(day, event)}
          </td>
          <td 
            className="rbc-agenda-event-cell"
            style={userProps.style}
          >
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
      if (dates.eq(start, end)) {
        label = localizer.format(start, 'agendaTimeFormat')
      } else if (dates.eq(start, end, 'day')) {
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
    if (!this.tbodyRef.current) return

    let header = this.headerRef.current
    let firstRow = this.tbodyRef.current.firstChild

    if (!firstRow) return

    let isOverflowing =
      this.contentRef.current.scrollHeight >
      this.contentRef.current.clientHeight
    let widths = this._widths || []

    this._widths = [
      getWidth(firstRow.children[0]),
      getWidth(firstRow.children[1]),
    ]

    if (widths[0] !== this._widths[0] || widths[1] !== this._widths[1]) {
      this.dateColRef.current.style.width = this._widths[0] + 'px'
      this.timeColRef.current.style.width = this._widths[1] + 'px'
    }

    if (isOverflowing) {
      addClass(header, 'rbc-header-overflowing')
      header.style.marginRight = scrollbarSize() + 'px'
    } else {
      removeClass(header, 'rbc-header-overflowing')
    }
  }
}

Agenda.propTypes = {
  events: PropTypes.array,
  date: PropTypes.instanceOf(Date),
  length: PropTypes.number.isRequired,

  selected: PropTypes.object,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
}

Agenda.defaultProps = {
  length: 30,
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
