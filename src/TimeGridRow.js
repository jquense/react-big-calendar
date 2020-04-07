import PropTypes from 'prop-types'
import clsx from 'clsx'
import * as animationFrame from 'dom-helpers/animationFrame'
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import memoize from 'memoize-one'

import * as dates from './utils/dates'
import DayRow from './DayRow'
import TimeGutterRow from './TimeGutterRow'

import getWidth from 'dom-helpers/width'
import TimeGridRowHeader from './TimeGridRowHeader'
import { notify } from './utils/helpers'
import { inRange, sortEvents } from './utils/eventLevels'
import Resources from './utils/Resources'
import ResourceHeader from './ResourceHeader'

export default class TimeGridRow extends Component {
  constructor(props) {
    super(props)

    this.state = { gutterWidth: undefined, isOverflowing: null }

    this.scrollRef = React.createRef()
    this.contentRef = React.createRef()
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

    window.addEventListener('resize', this.handleResize)
  }

  handleScroll = e => {
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollLeft = e.target.scrollLeft
    }
  }

  handleResize = () => {
    animationFrame.cancel(this.rafHandle)
    this.rafHandle = animationFrame.request(this.checkOverflow)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)

    animationFrame.cancel(this.rafHandle)

    if (this.measureGutterAnimationFrameRequest) {
      window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest)
    }
  }

  componentDidUpdate() {
    if (this.props.width == null) {
      this.measureGutter()
    }

    this.applyScroll()
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

  renderEvents(range, events, now) {
    let { min, max, accessors, components, localizer } = this.props

        const resources = this.memoizedResources(this.props.resources, accessors)
    const groupedEvents = resources.groupEvents(events)

    return resources.map(([id, resource], i) => {
      return (
        <div key={`resource_${i}`} className="rbc-time-row-resource">
          {this.renderDay(
            range,
            groupedEvents,
            id,
            accessors,
            localizer,
            min,
            max,
            resource,
            components,
            now,
            i
          )}
        </div>
      )
    })
    // return this.renderDay(range, groupedEvents, id, accessors, localizer, min, max, resource, components, now, i)})
  }

  renderDay(
    range,
    groupedEvents,
    id,
    accessors,
    localizer,
    min,
    max,
    resource,
    components,
    now,
    i
  ) {
    return range.map((date, jj) => {
      let daysEvents = (groupedEvents.get(id) || []).filter(event =>
        dates.inRange(date, accessors.start(event), accessors.end(event), 'day')
      )
      return (
        <DayRow
          {...this.props}
          localizer={localizer}
          min={dates.merge(date, min)}
          max={dates.merge(date, max)}
          resource={resource && id}
          components={components}
          isNow={dates.eq(date, now, 'day')}
          key={i + '-' + jj}
          date={date}
          events={daysEvents}
        />
      )
    })
  }

  render() {
    let {
      events,
      range,
      width,
      rtl,
      selected,
      getNow,
      resources,
      components,
      accessors,
      getters,
      localizer,
      min,
      max,
      showMultiDayTimes,
      longPressThreshold,
      components: { timeGutterHeader: TimeGutterHeader, resourceHeader: ResourceHeaderComponent = ResourceHeader },
    } = this.props

    width = width || this.state.gutterWidth

    let start = range[0],
      end = range[range.length - 1]

    this.slots = range.length

    let allDayEvents = [],
      rangeEvents = []

    events.forEach(event => {
      if (inRange(event, start, end, accessors)) {
        let eStart = accessors.start(event),
          eEnd = accessors.end(event)

        if (
          accessors.allDay(event) ||
          (dates.isJustDate(eStart) && dates.isJustDate(eEnd)) ||
          (!showMultiDayTimes && !dates.eq(eStart, eEnd, 'day'))
        ) {
          allDayEvents.push(event)
        } else {
          rangeEvents.push(event)
        }
      }
    })

    allDayEvents.sort((a, b) => sortEvents(a, b, accessors))
    return (
      <div
        className={clsx(
          'rbc-time-view-row',          
          'rbc-time-view-resources'
        )}
      >

<div
        ref={this.scrollRef}
        className={clsx('rbc-time-header')}
      >
        <div
          className="rbc-time-header-gutter"
          style={{ width, minWidth: width, maxWidth: width }}
        >
          {TimeGutterHeader && <TimeGutterHeader />}
        </div>
            {range.map((date, jj) => {
              return (
                <TimeGridRowHeader
                  key={jj}
                  {...this.props}
                  localizer={localizer}
                  min={dates.merge(date, min)}
                  max={dates.merge(date, max)}
                  components={components}
                  key={'-' + jj}
                  date={date}
                />
              )
            })}
            </div>

        <div
          ref={this.contentRef}
          className={clsx("rbc-time-content-row-xx")}
          onScroll={this.handleScroll}
        >

{resources && <div className={clsx('rbc-time-column', 'rbc-time-gutter')} ref={this.gutterRef}>
          {this.memoizedResources(resources, accessors).map(
            ([id, resource], i) => {
              return (
                resource && (
                  <div className="rbc-row rbc-time-row" key={`resource_${i}`}>
                    <div className="rbc-header">
                      <ResourceHeaderComponent                        
                        index={i}
                        label={accessors.resourceTitle(resource)}
                        resource={resource}
                      />
                    </div>
                  </div>
                )
              )
            }
          )}
        </div>}
          
        <div className='rbc-time-column-resource-xx'>
          {this.renderEvents(range, rangeEvents, getNow())}
          </div>
        </div>
      </div>
    )
  }

  clearSelection() {
    clearTimeout(this._selectTimer)
    this._pendingSelection = []
  }

  measureGutter() {
    if (this.measureGutterAnimationFrameRequest) {
      window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest)
    }
    this.measureGutterAnimationFrameRequest = window.requestAnimationFrame(
      () => {
        if (this.gutter) {
        const width = getWidth(this.gutter)

        if (width && this.state.gutterWidth !== width) {
          this.setState({ gutterWidth: width })
        }
      }
      }
    )
  }

  applyScroll() {
    if (this._scrollRatio) {
      const content = this.contentRef.current
      content.scrollLeft = content.scrollWidth * this._scrollRatio
      // Only do this once
      this._scrollRatio = null
    }
  }

  calculateScroll(props = this.props) {
    const { range, scrollToTime } = props
    
    const diffMillis = scrollToTime - dates.startOf(scrollToTime, 'week')
    const totalMillis = dates.diff(dates.endOf(range.slice(-1)[0], 'day'), range[0])
    
    this._scrollRatio = diffMillis / totalMillis
  }

  checkOverflow = () => {
    if (this._updatingOverflow) return

    const content = this.contentRef.current
    let isOverflowing = content.scrollHeight > content.clientHeight

    if (this.state.isOverflowing !== isOverflowing) {
      this._updatingOverflow = true
      this.setState({ isOverflowing }, () => {
        this._updatingOverflow = false
      })
    }
  }

  memoizedResources = memoize((resources, accessors) =>
    Resources(resources, accessors)
  )
}

TimeGridRow.propTypes = {
  events: PropTypes.array.isRequired,
  resources: PropTypes.array,

  step: PropTypes.number,
  timeslots: PropTypes.number,
  range: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  getNow: PropTypes.func.isRequired,

  scrollToTime: PropTypes.instanceOf(Date),
  showMultiDayTimes: PropTypes.bool,

  rtl: PropTypes.bool,
  width: PropTypes.number,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,

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
}

TimeGridRow.defaultProps = {
  step: 30,
  timeslots: 2,
  min: dates.startOf(new Date(), 'day'),
  max: dates.endOf(new Date(), 'day'),
  scrollToTime: dates.startOf(new Date(), 'day'),
}
