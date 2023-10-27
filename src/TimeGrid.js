import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import * as animationFrame from 'dom-helpers/animationFrame'
import memoize from 'memoize-one'

import DayColumn from './DayColumn'
import TimeGutter from './TimeGutter'
import TimeGridHeader from './TimeGridHeader'
import PopOverlay from './PopOverlay'

import getWidth from 'dom-helpers/width'
import getPosition from 'dom-helpers/position'
import { views } from './utils/constants'
import { inRange, sortEvents } from './utils/eventLevels'
import { notify } from './utils/helpers'
import Resources from './utils/Resources'
import { DayLayoutAlgorithmPropType } from './utils/propTypes'

export default class TimeGrid extends Component {
  constructor(props) {
    super(props)

    this.state = { gutterWidth: undefined, isOverflowing: null }

    this.scrollRef = React.createRef()
    this.contentRef = React.createRef()
    this.containerRef = React.createRef()
    this._scrollRatio = null
    this.gutterRef = createRef()
  }

  getSnapshotBeforeUpdate() {
    this.checkOverflow()
    return null
  }

  componentDidMount() {
    if (this.props.width == null) {
      this.measureGutter()
    }

    this.calculateScroll()
    this.applyScroll()

    window.addEventListener('resize', this.handleResize)
  }

  handleScroll = (e) => {
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
    this.applyScroll()
  }

  handleKeyPressEvent = (...args) => {
    this.clearSelection()
    notify(this.props.onKeyPressEvent, args)
  }

  handleSelectEvent = (...args) => {
    //cancel any pending selections so only the event click goes through.
    this.clearSelection()
    notify(this.props.onSelectEvent, args)
  }

  handleDoubleClickEvent = (...args) => {
    this.clearSelection()
    notify(this.props.onDoubleClickEvent, args)
  }

  handleShowMore = (events, date, cell, slot, target) => {
    const {
      popup,
      onDrillDown,
      onShowMore,
      getDrilldownView,
      doShowMoreDrillDown,
    } = this.props
    this.clearSelection()

    if (popup) {
      let position = getPosition(cell, this.containerRef.current)

      this.setState({
        overlay: {
          date,
          events,
          position: { ...position, width: '200px' },
          target,
        },
      })
    } else if (doShowMoreDrillDown) {
      notify(onDrillDown, [date, getDrilldownView(date) || views.DAY])
    }

    notify(onShowMore, [events, date, slot])
  }

  handleSelectAllDaySlot = (slots, slotInfo) => {
    const { onSelectSlot } = this.props

    const start = new Date(slots[0])
    const end = new Date(slots[slots.length - 1])
    end.setDate(slots[slots.length - 1].getDate() + 1)

    notify(onSelectSlot, {
      slots,
      start,
      end,
      action: slotInfo.action,
      resourceId: slotInfo.resourceId,
    })
  }

  renderEvents(range, events, backgroundEvents, now) {
    let { min, max, components, accessors, localizer, dayLayoutAlgorithm } =
      this.props

    const resources = this.memoizedResources(this.props.resources, accessors)
    const groupedEvents = resources.groupEvents(events)
    const groupedBackgroundEvents = resources.groupEvents(backgroundEvents)

    return resources.map(([id, resource], i) =>
      range.map((date, jj) => {
        let daysEvents = (groupedEvents.get(id) || []).filter((event) =>
          localizer.inRange(
            date,
            accessors.start(event),
            accessors.end(event),
            'day'
          )
        )

        let daysBackgroundEvents = (
          groupedBackgroundEvents.get(id) || []
        ).filter((event) =>
          localizer.inRange(
            date,
            accessors.start(event),
            accessors.end(event),
            'day'
          )
        )

        return (
          <DayColumn
            {...this.props}
            localizer={localizer}
            min={localizer.merge(date, min)}
            max={localizer.merge(date, max)}
            resource={resource && id}
            components={components}
            isNow={localizer.isSameDate(date, now)}
            key={i + '-' + jj}
            date={date}
            events={daysEvents}
            backgroundEvents={daysBackgroundEvents}
            dayLayoutAlgorithm={dayLayoutAlgorithm}
          />
        )
      })
    )
  }

  render() {
    let {
      events,
      backgroundEvents,
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
      resizable,
    } = this.props

    width = width || this.state.gutterWidth

    let start = range[0],
      end = range[range.length - 1]

    this.slots = range.length

    let allDayEvents = [],
      rangeEvents = [],
      rangeBackgroundEvents = []

    events.forEach((event) => {
      if (inRange(event, start, end, accessors, localizer)) {
        let eStart = accessors.start(event),
          eEnd = accessors.end(event)

        if (
          accessors.allDay(event) ||
          localizer.startAndEndAreDateOnly(eStart, eEnd) ||
          (!showMultiDayTimes && !localizer.isSameDate(eStart, eEnd))
        ) {
          allDayEvents.push(event)
        } else {
          rangeEvents.push(event)
        }
      }
    })

    backgroundEvents.forEach((event) => {
      if (inRange(event, start, end, accessors, localizer)) {
        rangeBackgroundEvents.push(event)
      }
    })

    allDayEvents.sort((a, b) => sortEvents(a, b, accessors, localizer))

    return (
      <div
        className={clsx(
          'rbc-time-view',
          resources && 'rbc-time-view-resources'
        )}
        ref={this.containerRef}
      >
        <TimeGridHeader
          range={range}
          events={allDayEvents}
          width={width}
          rtl={rtl}
          getNow={getNow}
          localizer={localizer}
          selected={selected}
          allDayMaxRows={
            this.props.showAllEvents
              ? Infinity
              : this.props.allDayMaxRows ?? Infinity
          }
          resources={this.memoizedResources(resources, accessors)}
          selectable={this.props.selectable}
          accessors={accessors}
          getters={getters}
          components={components}
          scrollRef={this.scrollRef}
          isOverflowing={this.state.isOverflowing}
          longPressThreshold={longPressThreshold}
          onSelectSlot={this.handleSelectAllDaySlot}
          onSelectEvent={this.handleSelectEvent}
          onShowMore={this.handleShowMore}
          onDoubleClickEvent={this.props.onDoubleClickEvent}
          onKeyPressEvent={this.props.onKeyPressEvent}
          onDrillDown={this.props.onDrillDown}
          getDrilldownView={this.props.getDrilldownView}
          resizable={resizable}
        />
        {this.props.popup && this.renderOverlay()}
        <div
          ref={this.contentRef}
          className="rbc-time-content"
          onScroll={this.handleScroll}
        >
          <TimeGutter
            date={start}
            ref={this.gutterRef}
            localizer={localizer}
            min={localizer.merge(start, min)}
            max={localizer.merge(start, max)}
            step={this.props.step}
            getNow={this.props.getNow}
            timeslots={this.props.timeslots}
            components={components}
            className="rbc-time-gutter"
            getters={getters}
          />
          {this.renderEvents(
            range,
            rangeEvents,
            rangeBackgroundEvents,
            getNow()
          )}
        </div>
      </div>
    )
  }

  renderOverlay() {
    let overlay = this.state?.overlay ?? {}
    let {
      accessors,
      localizer,
      components,
      getters,
      selected,
      popupOffset,
      handleDragStart,
    } = this.props

    const onHide = () => this.setState({ overlay: null })

    return (
      <PopOverlay
        overlay={overlay}
        accessors={accessors}
        localizer={localizer}
        components={components}
        getters={getters}
        selected={selected}
        popupOffset={popupOffset}
        ref={this.containerRef}
        handleKeyPressEvent={this.handleKeyPressEvent}
        handleSelectEvent={this.handleSelectEvent}
        handleDoubleClickEvent={this.handleDoubleClickEvent}
        handleDragStart={handleDragStart}
        show={!!overlay.position}
        overlayDisplay={this.overlayDisplay}
        onHide={onHide}
      />
    )
  }

  overlayDisplay = () => {
    this.setState({
      overlay: null,
    })
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
        const width = this.gutterRef?.current
          ? getWidth(this.gutterRef.current)
          : undefined

        if (width && this.state.gutterWidth !== width) {
          this.setState({ gutterWidth: width })
        }
      }
    )
  }

  applyScroll() {
    // If auto-scroll is disabled, we don't actually apply the scroll
    if (this._scrollRatio != null && this.props.enableAutoScroll === true) {
      const content = this.contentRef.current
      content.scrollTop = content.scrollHeight * this._scrollRatio
      // Only do this once
      this._scrollRatio = null
    }
  }

  calculateScroll(props = this.props) {
    const { min, max, scrollToTime, localizer } = props

    const diffMillis = localizer.diff(
      localizer.merge(scrollToTime, min),
      scrollToTime,
      'milliseconds'
    )
    const totalMillis = localizer.diff(min, max, 'milliseconds')

    this._scrollRatio = diffMillis / totalMillis
  }

  checkOverflow = () => {
    if (this._updatingOverflow) return

    const content = this.contentRef.current

    if (!content?.scrollHeight) return
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

TimeGrid.propTypes = {
  events: PropTypes.array.isRequired,
  backgroundEvents: PropTypes.array.isRequired,
  resources: PropTypes.array,

  step: PropTypes.number,
  timeslots: PropTypes.number,
  range: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  min: PropTypes.instanceOf(Date).isRequired,
  max: PropTypes.instanceOf(Date).isRequired,
  getNow: PropTypes.func.isRequired,

  scrollToTime: PropTypes.instanceOf(Date).isRequired,
  enableAutoScroll: PropTypes.bool,
  showMultiDayTimes: PropTypes.bool,

  rtl: PropTypes.bool,
  resizable: PropTypes.bool,
  width: PropTypes.number,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,

  allDayMaxRows: PropTypes.number,

  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,

  onNavigate: PropTypes.func,
  onSelectSlot: PropTypes.func,
  onSelectEnd: PropTypes.func,
  onSelectStart: PropTypes.func,
  onSelectEvent: PropTypes.func,
  onShowMore: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
  onDrillDown: PropTypes.func,
  getDrilldownView: PropTypes.func.isRequired,

  dayLayoutAlgorithm: DayLayoutAlgorithmPropType,

  showAllEvents: PropTypes.bool,
  doShowMoreDrillDown: PropTypes.bool,

  popup: PropTypes.bool,
  handleDragStart: PropTypes.func,

  popupOffset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ]),
}

TimeGrid.defaultProps = {
  step: 30,
  timeslots: 2,
}
