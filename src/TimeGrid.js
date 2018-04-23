import PropTypes from 'prop-types'
import cn from 'classnames'
import raf from 'dom-helpers/util/requestAnimationFrame'
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import dates from './utils/dates'
import DayColumn from './DayColumn'
import TimeGutter from './TimeGutter'

import getWidth from 'dom-helpers/query/width'
import TimeGridHeader from './TimeGridHeader'
import { accessor, dateFormat } from './utils/propTypes'
import { notify } from './utils/helpers'
import { accessor as get } from './utils/accessors'
import { inRange, sortEvents } from './utils/eventLevels'

export default class TimeGrid extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    resources: PropTypes.array,

    step: PropTypes.number,
    range: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    getNow: PropTypes.func.isRequired,

    scrollToTime: PropTypes.instanceOf(Date),
    eventPropGetter: PropTypes.func,
    dayPropGetter: PropTypes.func,
    dayFormat: dateFormat,
    showMultiDayTimes: PropTypes.bool,
    culture: PropTypes.string,

    rtl: PropTypes.bool,
    width: PropTypes.number,

    titleAccessor: accessor.isRequired,
    tooltipAccessor: accessor.isRequired,
    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,
    resourceAccessor: accessor.isRequired,

    resourceIdAccessor: accessor.isRequired,
    resourceTitleAccessor: accessor.isRequired,

    selected: PropTypes.object,
    selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
    longPressThreshold: PropTypes.number,

    onNavigate: PropTypes.func,
    onSelectSlot: PropTypes.func,
    onSelectEnd: PropTypes.func,
    onSelectStart: PropTypes.func,
    onSelectEvent: PropTypes.func,
    onDoubleClickEvent: PropTypes.func,
    onDrillDown: PropTypes.func,
    getDrilldownView: PropTypes.func.isRequired,

    messages: PropTypes.object,
    components: PropTypes.object.isRequired,
  }

  static defaultProps = {
    step: 30,
    timeslots: 2,
    min: dates.startOf(new Date(), 'day'),
    max: dates.endOf(new Date(), 'day'),
    scrollToTime: dates.startOf(new Date(), 'day'),
  }

  constructor(props) {
    super(props)

    this.state = { gutterWidth: undefined, isOverflowing: null }
  }

  componentWillMount() {
    this.calculateScroll()
  }

  componentDidMount() {
    this.checkOverflow()

    if (this.props.width == null) {
      this.measureGutter()
    }

    this.applyScroll()

    this.positionTimeIndicator()
    this.triggerTimeIndicatorUpdate()

    window.addEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    raf.cancel(this.rafHandle)
    this.rafHandle = raf(this.checkOverflow)
  }

  componentWillUnmount() {
    window.clearTimeout(this._timeIndicatorTimeout)
    window.removeEventListener('resize', this.handleResize)

    raf.cancel(this.rafHandle)
  }

  componentDidUpdate() {
    if (this.props.width == null) {
      this.measureGutter()
    }

    this.applyScroll()
    this.positionTimeIndicator()
    //this.checkOverflow()
  }

  componentWillReceiveProps(nextProps) {
    const { range, scrollToTime } = this.props
    // When paginating, reset scroll
    if (
      !dates.eq(nextProps.range[0], range[0], 'minute') ||
      !dates.eq(nextProps.scrollToTime, scrollToTime, 'minute')
    ) {
      this.calculateScroll(nextProps)
    }
  }

  gutterRef = ref => {
    this.gutter = ref && findDOMNode(ref)
  }

  handleSelectAlldayEvent = (...args) => {
    //cancel any pending selections so only the event click goes through.
    this.clearSelection()
    notify(this.props.onSelectEvent, args)
  }

  handleSelectAllDaySlot = (slots, slotInfo) => {
    const { onSelectSlot } = this.props
    notify(onSelectSlot, {
      slots,
      start: slots[0],
      end: slots[slots.length - 1],
      action: slotInfo.action,
    })
  }

  renderEvents(range, events, today, resources) {
    let {
      min,
      max,
      endAccessor,
      startAccessor,
      resourceAccessor,
      resourceIdAccessor,
      components,
    } = this.props

    return range.map((date, idx) => {
      let daysEvents = events.filter(event =>
        dates.inRange(
          date,
          get(event, startAccessor),
          get(event, endAccessor),
          'day'
        )
      )

      return resources.map((resource, id) => {
        let eventsToDisplay = !resource
          ? daysEvents
          : daysEvents.filter(
              event =>
                get(event, resourceAccessor) ===
                get(resource, resourceIdAccessor)
            )

        return (
          <DayColumn
            {...this.props}
            min={dates.merge(date, min)}
            max={dates.merge(date, max)}
            resource={resource && resource.id}
            eventComponent={components.event}
            eventWrapperComponent={components.eventWrapper}
            timeSlotWrapperComponent={components.dayWrapper}
            className={cn({ 'rbc-now': dates.eq(date, today, 'day') })}
            key={idx + '-' + id}
            date={date}
            events={eventsToDisplay}
          />
        )
      })
    })
  }

  render() {
    let {
      events,
      range,
      width,
      startAccessor,
      endAccessor,
      selected,
      getNow,
      resources,
      components,
      allDayAccessor,
      eventPropGetter,
      showMultiDayTimes,
      longPressThreshold,
    } = this.props

    width = width || this.state.gutterWidth

    let start = range[0],
      end = range[range.length - 1]

    this.slots = range.length

    let allDayEvents = [],
      rangeEvents = []

    events.forEach(event => {
      if (inRange(event, start, end, this.props)) {
        let eStart = get(event, startAccessor),
          eEnd = get(event, endAccessor)

        if (
          get(event, allDayAccessor) ||
          (dates.isJustDate(eStart) && dates.isJustDate(eEnd)) ||
          (!showMultiDayTimes && !dates.eq(eStart, eEnd, 'day'))
        ) {
          allDayEvents.push(event)
        } else {
          rangeEvents.push(event)
        }
      }
    })

    allDayEvents.sort((a, b) => sortEvents(a, b, this.props))

    return (
      <div className="rbc-time-view">
        <TimeGridHeader
          range={range}
          events={allDayEvents}
          width={width}
          getNow={getNow}
          dayFormat={this.props.dayFormat}
          culture={this.props.culture}
          resources={resources}
          selected={selected}
          selectable={this.props.selectable}
          startAccessor={startAccessor}
          endAccessor={endAccessor}
          titleAccessor={this.props.titleAccessor}
          tooltipAccessor={this.props.tooltipAccessor}
          allDayAccessor={this.props.allDayAccessor}
          resourceAccessor={this.props.resourceAccessor}
          resourceIdAccessor={this.props.resourceIdAccessor}
          resourceTitleAccessor={this.props.resourceTitleAccessor}
          isOverflowing={this.state.isOverflowing}
          dayPropGetter={this.props.dayPropGetter}
          eventPropGetter={eventPropGetter}
          longPressThreshold={longPressThreshold}
          headerComponent={components.header}
          eventComponent={components.event}
          eventWrapperComponent={components.eventWrapper}
          dateCellWrapperComponent={components.dateCellWrapper}
          onSelectSlot={this.handleSelectAllDaySlot}
          onSelectEvent={this.handleSelectAlldayEvent}
          onDoubleClickEvent={this.props.onDoubleClickEvent}
          onDrillDown={this.props.onDrillDown}
          getDrilldownView={this.props.getDrilldownView}
        />
        <div ref="content" className="rbc-time-content">
          <TimeGutter
            {...this.props}
            date={start}
            ref={this.gutterRef}
            className="rbc-time-gutter"
          />
          {this.renderEvents(range, rangeEvents, getNow(), resources || [null])}

          <div ref="timeIndicator" className="rbc-current-time-indicator" />
        </div>
      </div>
    )
  }

  clearSelection() {
    clearTimeout(this._selectTimer)
    this._pendingSelection = []
  }

  measureGutter() {
    const width = getWidth(this.gutter)

    if (width && this.state.gutterWidth !== width) {
      this.setState({ gutterWidth: width })
    }
  }

  applyScroll() {
    if (this._scrollRatio) {
      const { content } = this.refs
      content.scrollTop = content.scrollHeight * this._scrollRatio
      // Only do this once
      this._scrollRatio = null
    }
  }

  calculateScroll(props = this.props) {
    const { min, max, scrollToTime } = props

    const diffMillis = scrollToTime - dates.startOf(scrollToTime, 'day')
    const totalMillis = dates.diff(max, min)

    this._scrollRatio = diffMillis / totalMillis
  }

  checkOverflow = () => {
    if (this._updatingOverflow) return

    let isOverflowing =
      this.refs.content.scrollHeight > this.refs.content.clientHeight

    if (this.state.isOverflowing !== isOverflowing) {
      this._updatingOverflow = true
      this.setState({ isOverflowing }, () => {
        this._updatingOverflow = false
      })
    }
  }

  positionTimeIndicator() {
    const { rtl, min, max, getNow, range } = this.props
    const current = getNow()

    const secondsGrid = dates.diff(max, min, 'seconds')
    const secondsPassed = dates.diff(current, min, 'seconds')

    const timeIndicator = this.refs.timeIndicator
    const factor = secondsPassed / secondsGrid
    const timeGutter = this.gutter

    const content = this.refs.content

    if (timeGutter && current >= min && current <= max) {
      const pixelHeight = timeGutter.offsetHeight
      const dayPixelWidth =
        (content.offsetWidth - timeGutter.offsetWidth) / this.slots
      const dayOffset =
        range.findIndex(d => dates.eq(d, dates.today(), 'day')) * dayPixelWidth
      const offset = Math.floor(factor * pixelHeight)

      timeIndicator.style.display = dayOffset >= 0 ? 'block' : 'none'
      timeIndicator.style[rtl ? 'left' : 'right'] = 0
      timeIndicator.style[rtl ? 'right' : 'left'] =
        timeGutter.offsetWidth + dayOffset + 'px'
      timeIndicator.style.top = offset + 'px'
      timeIndicator.style.width = dayPixelWidth + 'px'
    } else {
      timeIndicator.style.display = 'none'
    }
  }

  triggerTimeIndicatorUpdate() {
    // Update the position of the time indicator every minute
    this._timeIndicatorTimeout = window.setTimeout(() => {
      this.positionTimeIndicator()

      this.triggerTimeIndicatorUpdate()
    }, 60000)
  }
}
