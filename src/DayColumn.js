import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'
import cn from 'classnames'

import Selection, { getBoundsForNode, isEvent } from './Selection'
import dates from './utils/dates'
import * as TimeSlotUtils from './utils/TimeSlots'
import { isSelected } from './utils/selection'
import localizer from './localizer'

import { notify } from './utils/helpers'
import { accessor, elementType, dateFormat } from './utils/propTypes'
import { accessor as get } from './utils/accessors'
import * as DayEventLayout from './utils/DayEventLayout'
import TimeSlotGroup from './TimeSlotGroup'

class DayColumn extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    components: PropTypes.object,
    step: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    getNow: PropTypes.func.isRequired,

    rtl: PropTypes.bool,
    titleAccessor: accessor,
    tooltipAccessor: accessor,
    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,

    selectRangeFormat: dateFormat,
    eventTimeRangeFormat: dateFormat,
    eventTimeRangeStartFormat: dateFormat,
    eventTimeRangeEndFormat: dateFormat,
    showMultiDayTimes: PropTypes.bool,
    culture: PropTypes.string,
    timeslots: PropTypes.number,
    messages: PropTypes.object,

    selected: PropTypes.object,
    selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
    eventOffset: PropTypes.number,
    longPressThreshold: PropTypes.number,

    onSelecting: PropTypes.func,
    onSelectSlot: PropTypes.func.isRequired,
    onSelectEvent: PropTypes.func.isRequired,
    onDoubleClickEvent: PropTypes.func.isRequired,

    className: PropTypes.string,
    dragThroughEvents: PropTypes.bool,
    eventPropGetter: PropTypes.func,
    dayPropGetter: PropTypes.func,
    slotPropGetter: PropTypes.func,
    timeSlotWrapperComponent: elementType,
    eventComponent: elementType,
    eventWrapperComponent: elementType.isRequired,
    resource: PropTypes.string,
  }

  static defaultProps = {
    dragThroughEvents: true,
    timeslots: 2,
  }

  state = { selecting: false }

  constructor(...args) {
    super(...args)

    this.slotMetrics = TimeSlotUtils.getSlotMetrics(this.props)
  }

  componentDidMount() {
    this.props.selectable && this._selectable()
  }

  componentWillUnmount() {
    this._teardownSelectable()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable) this._selectable()
    if (!nextProps.selectable && this.props.selectable)
      this._teardownSelectable()

    this.slotMetrics = this.slotMetrics.update(nextProps)
  }

  render() {
    const {
      max,
      rtl,
      date,
      getNow,
      selectRangeFormat,
      culture,
      slotPropGetter,
      resource,
      timeSlotWrapperComponent,
      dayPropGetter,
    } = this.props

    let { slotMetrics } = this
    let { selecting, top, height, startDate, endDate } = this.state

    let selectDates = { start: startDate, end: endDate }

    const { className, style } = (dayPropGetter && dayPropGetter(max)) || {}
    const current = getNow()

    return (
      <div
        style={style}
        className={cn(
          className,
          'rbc-day-slot',
          'rbc-time-column',
          selecting && 'rbc-slot-selecting',
          dates.eq(date, current, 'day') && 'rbc-today'
        )}
      >
        {slotMetrics.groups.map((grp, idx) => (
          <TimeSlotGroup
            key={idx}
            group={grp}
            resource={resource}
            slotPropGetter={slotPropGetter}
            timeSlotWrapperComponent={timeSlotWrapperComponent}
          />
        ))}
        <div className={cn('rbc-events-container', rtl && 'rtl')}>
          {this.renderEvents()}
        </div>

        {selecting && (
          <div className="rbc-slot-selection" style={{ top, height }}>
            <span>
              {localizer.format(selectDates, selectRangeFormat, culture)}
            </span>
          </div>
        )}
      </div>
    )
  }

  renderEvents = () => {
    let {
      components: { event: EventComponent },
      culture,
      endAccessor,
      eventPropGetter,
      eventTimeRangeEndFormat,
      eventTimeRangeFormat,
      eventTimeRangeStartFormat,
      eventWrapperComponent: EventWrapper,
      events,
      max,
      messages,
      min,
      rtl: isRtl,
      selected,
      startAccessor,
      titleAccessor,
      tooltipAccessor,
    } = this.props

    let styledEvents = DayEventLayout.getStyledEvents({
      events,
      startAccessor,
      endAccessor,
      slotMetrics: this.slotMetrics,
    })

    return styledEvents.map(({ event, style }, idx) => {
      let _eventTimeRangeFormat = eventTimeRangeFormat
      let _continuesPrior = false
      let _continuesAfter = false
      let start = get(event, startAccessor)
      let end = get(event, endAccessor)

      if (start < min) {
        start = min
        _continuesPrior = true
        _eventTimeRangeFormat = eventTimeRangeEndFormat
      }

      if (end > max) {
        end = max
        _continuesAfter = true
        _eventTimeRangeFormat = eventTimeRangeStartFormat
      }

      let continuesPrior = this.slotMetrics.startsBefore(start)
      let continuesAfter = this.slotMetrics.startsAfter(end)

      let title = get(event, titleAccessor)
      let tooltip = get(event, tooltipAccessor)
      let label
      if (_continuesPrior && _continuesAfter) {
        label = messages.allDay
      } else {
        label = localizer.format({ start, end }, _eventTimeRangeFormat, culture)
      }

      let _isSelected = isSelected(event, selected)

      if (eventPropGetter)
        var { style: xStyle, className } = eventPropGetter(
          event,
          start,
          end,
          _isSelected
        )

      let { height, top, width, xOffset } = style

      let wrapperProps = {
        event,
        continuesPrior: _continuesPrior,
        continuesAfter: _continuesAfter,
      }

      return (
        <EventWrapper {...wrapperProps} key={'evt_' + idx}>
          <div
            style={{
              ...xStyle,
              top: `${top}%`,
              height: `${height}%`,
              [isRtl ? 'right' : 'left']: `${Math.max(0, xOffset)}%`,
              width: `${width}%`,
            }}
            title={
              tooltip
                ? (typeof label === 'string' ? label + ': ' : '') + tooltip
                : undefined
            }
            onClick={e => this._select(event, e)}
            onDoubleClick={e => this._doubleClick(event, e)}
            className={cn('rbc-event', className, {
              'rbc-selected': _isSelected,
              'rbc-event-continues-earlier': continuesPrior,
              'rbc-event-continues-later': continuesAfter,
              'rbc-event-continues-day-prior': _continuesPrior,
              'rbc-event-continues-day-after': _continuesAfter,
            })}
          >
            <div className="rbc-event-label">{label}</div>
            <div className="rbc-event-content">
              {EventComponent ? (
                <EventComponent event={event} title={title} />
              ) : (
                title
              )}
            </div>
          </div>
        </EventWrapper>
      )
    })
  }

  _selectable = () => {
    let node = findDOMNode(this)
    let selector = (this._selector = new Selection(() => findDOMNode(this), {
      longPressThreshold: this.props.longPressThreshold,
    }))

    let maybeSelect = box => {
      let onSelecting = this.props.onSelecting
      let current = this.state || {}
      let state = selectionState(box)
      let { startDate: start, endDate: end } = state

      if (onSelecting) {
        if (
          (dates.eq(current.startDate, start, 'minutes') &&
            dates.eq(current.endDate, end, 'minutes')) ||
          onSelecting({ start, end }) === false
        )
          return
      }

      if (
        this.state.start !== state.start ||
        this.state.end !== state.end ||
        this.state.selecting !== state.selecting
      ) {
        this.setState(state)
      }
    }

    let selectionState = ({ y }) => {
      let { top, bottom } = getBoundsForNode(node)

      let range = Math.abs(top - bottom)
      let currentSlot = this.slotMetrics.closestSlotToPosition(
        (y - top) / range
      )

      if (!this.state.selecting) this._initialSlot = currentSlot

      let initialSlot = this._initialSlot
      if (initialSlot === currentSlot)
        currentSlot = this.slotMetrics.nextSlot(initialSlot)

      const selectRange = this.slotMetrics.getRange(
        dates.min(initialSlot, currentSlot),
        dates.max(initialSlot, currentSlot)
      )

      return {
        ...selectRange,
        selecting: true,

        top: `${selectRange.top}%`,
        height: `${selectRange.height}%`,
      }
    }

    let selectorClicksHandler = (box, actionType) => {
      if (!isEvent(findDOMNode(this), box)) {
        const { startDate, endDate } = selectionState(box)
        this._selectSlot({
          startDate,
          endDate,
          action: actionType,
          box,
        })
      }
      this.setState({ selecting: false })
    }

    selector.on('selecting', maybeSelect)
    selector.on('selectStart', maybeSelect)

    selector.on('beforeSelect', box => {
      if (this.props.selectable !== 'ignoreEvents') return

      return !isEvent(findDOMNode(this), box)
    })

    selector.on('click', box => selectorClicksHandler(box, 'click'))

    selector.on('doubleClick', box => selectorClicksHandler(box, 'doubleClick'))

    selector.on('select', bounds => {
      if (this.state.selecting) {
        this._selectSlot({ ...this.state, action: 'select', bounds })
        this.setState({ selecting: false })
      }
    })
  }

  _teardownSelectable = () => {
    if (!this._selector) return
    this._selector.teardown()
    this._selector = null
  }

  _selectSlot = ({ startDate, endDate, action, bounds, box }) => {
    let current = startDate,
      slots = []

    while (dates.lte(current, endDate)) {
      slots.push(current)
      current = dates.add(current, this.props.step, 'minutes')
    }

    notify(this.props.onSelectSlot, {
      slots,
      start: startDate,
      end: endDate,
      resourceId: this.props.resource,
      action,
      bounds,
      box,
    })
  }

  _select = (...args) => {
    notify(this.props.onSelectEvent, args)
  }

  _doubleClick = (...args) => {
    notify(this.props.onDoubleClickEvent, args)
  }
}

export default DayColumn
