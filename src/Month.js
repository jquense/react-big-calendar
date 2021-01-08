import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'
import clsx from 'clsx'

import * as dates from './utils/dates'
import chunk from 'lodash/chunk'
import debounce from 'lodash/debounce'

import { navigate, views } from './utils/constants'
import { notify } from './utils/helpers'
import getPosition from 'dom-helpers/position'
import * as animationFrame from 'dom-helpers/animationFrame'
import scrollbarSize from 'dom-helpers/scrollbarSize'

import Popup from './Popup'
import Overlay from 'react-overlays/Overlay'
import DateContentRow from './DateContentRow'
import ExpandContentRow from './ExpandContentRow'
import Header from './Header'
import DateHeader from './DateHeader'

import { inRange, sortEvents } from './utils/eventLevels'

let eventsForWeek = (evts, start, end, accessors) =>
  evts.filter(e => inRange(e, start, end, accessors))

class MonthView extends React.Component {
  constructor(...args) {
    super(...args)

    this._bgRows = []
    this._pendingSelection = []
    this.slotRowRef = React.createRef()
    this.monthRef = React.createRef()
    this.state = {
      rowLimit: 5,
      needLimitMeasure: true,
      showFixedHeaders: false,
    }
  }

  UNSAFE_componentWillReceiveProps({ date }) {
    this.setState({
      needLimitMeasure: !dates.eq(date, this.props.date, 'month'),
    })
  }

  componentDidMount() {
    let running

    if (this.state.needLimitMeasure) this.measureRowLimit(this.props)

    window.addEventListener(
      'resize',
      (this._resizeListener = () => {
        if (!running) {
          animationFrame.request(() => {
            running = false
            this.setState({ needLimitMeasure: true }) //eslint-disable-line
          })
        }
      }),
      false
    )

    this.monthRef.current.addEventListener(
      'wheel',
      (this._horizontalScrollListener = event => {
        event.stopPropagation()

        if (event.deltaX) {
          event.preventDefault()

          if (Math.abs(event.deltaX) > 10) {
            this.handleHorizontalScroll(event.deltaX > 0)
          }
        }
      }),
      { passive: false }
    )
  }

  componentDidUpdate() {
    if (this.state.needLimitMeasure) this.measureRowLimit(this.props)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeListener, false)

    this.monthRef.current.removeEventListener(
      'wheel',
      this._horizontalScrollListener,
      { passive: false }
    )
  }

  handleHorizontalScroll = debounce(
    scrollRight => {
      if (scrollRight) {
        this.props.onNavigate(navigate.NEXT)
      } else {
        this.props.onNavigate(navigate.PREVIOUS)
      }
    },
    100,
    { leading: true, trailing: false }
  )

  getContainer = () => {
    return findDOMNode(this)
  }

  handleScroll = e => {
    this.handleScrollDebounced(e.target.scrollTop)
  }

  handleScrollDebounced = debounce(scrollPosition => {
    const { showFixedHeaders } = this.state

    const scrollThreshold = 32
    if (showFixedHeaders && scrollPosition < scrollThreshold) {
      this.setState({ showFixedHeaders: false })
    } else if (!showFixedHeaders && scrollPosition > scrollThreshold) {
      this.setState({ showFixedHeaders: true })
    }
  }, 100)

  render() {
    let {
        date,
        localizer,
        className,
        infiniteScroll,
        expandRow,
        arrowNavProps,
      } = this.props,
      month = dates.visibleDays(date, localizer),
      weeks = chunk(month, 7)

    const scrollableMonth = infiniteScroll || expandRow
    this._weekCount = weeks.length

    const style =
      scrollableMonth && scrollbarSize() > 0
        ? {
            marginRight: `${scrollbarSize() - 1}px`,
            borderRight: '1px solid #DDD',
          }
        : {}

    const renderWeekWithHeight = (week, weekIdx) =>
      this.renderWeek(week, weekIdx, weeks.length)

    return (
      <div
        className={clsx('rbc-month-view', className)}
        ref={this.monthRef}
        {...arrowNavProps}
        tabIndex={-1}
      >
        <div
          className={clsx('rbc-row rbc-month-header rbc-fixed-header', {
            'show-header': this.state.showFixedHeaders,
          })}
          style={style}
        >
          {this.renderHeaders(weeks[0])}
        </div>
        <div
          className={clsx(
            'rbc-month-rows-container',
            scrollableMonth && 'rbc-month-rows-container-scrollable'
          )}
          onScroll={this.handleScroll}
        >
          <div className="rbc-row rbc-month-header" style={style}>
            {this.renderHeaders(weeks[0])}
          </div>
          {weeks.map(renderWeekWithHeight)}
          {this.props.popup && this.renderOverlay()}
        </div>
      </div>
    )
  }

  renderWeek = (week, weekIdx, numOfWeeks = 5) => {
    let {
      events,
      components,
      selectable,
      getNow,
      selected,
      date,
      localizer,
      longPressThreshold,
      accessors,
      getters,
      showAllEvents,
      infiniteScroll,
      expandRow,
      customSorting,
    } = this.props

    const flexibleRowHeight = infiniteScroll || expandRow

    const renderAllEvents = showAllEvents || flexibleRowHeight

    const { needLimitMeasure, rowLimit } = this.state

    events = eventsForWeek(events, week[0], week[week.length - 1], accessors)

    events.sort((a, b) => sortEvents(a, b, accessors, customSorting))
    const style = {
      minHeight: `${100 / numOfWeeks}%`,
    }

    const rowContainer = (
      <DateContentRow
        key={weekIdx}
        ref={weekIdx === 0 ? this.slotRowRef : undefined}
        container={this.getContainer}
        className={clsx(
          'rbc-month-row',
          flexibleRowHeight && 'rbc-month-row-full'
        )}
        getNow={getNow}
        date={date}
        range={week}
        events={events}
        maxRows={renderAllEvents ? Infinity : rowLimit}
        selected={selected}
        selectable={selectable}
        components={components}
        accessors={accessors}
        getters={getters}
        localizer={localizer}
        renderHeader={this.readerDateHeading}
        renderForMeasure={needLimitMeasure}
        onShowMore={this.handleShowMore}
        onSelect={this.handleSelectEvent}
        onDoubleClick={this.handleDoubleClickEvent}
        onKeyPress={this.handleKeyPressEvent}
        onSelectSlot={this.handleSelectSlot}
        longPressThreshold={longPressThreshold}
        rtl={this.props.rtl}
        resizable={this.props.resizable}
        showAllEvents={showAllEvents}
        style={style}
        renderAllEvents={renderAllEvents}
      />
    )

    if (expandRow) {
      return (
        <ExpandContentRow key={week[0].getTime() + weekIdx}>
          {rowContainer}
        </ExpandContentRow>
      )
    } else return rowContainer
  }

  readerDateHeading = ({ date, className, ...props }) => {
    let { date: currentDate, getDrilldownView, localizer } = this.props

    let isOffRange = dates.month(date) !== dates.month(currentDate)
    let isCurrent = dates.eq(date, currentDate, 'day')
    let drilldownView = getDrilldownView(date)
    let label = localizer.format(date, 'dateFormat')
    let DateHeaderComponent = this.props.components.dateHeader || DateHeader

    return (
      <div
        {...props}
        className={clsx(
          className,
          isOffRange && 'rbc-off-range',
          isCurrent && 'rbc-current'
        )}
      >
        <DateHeaderComponent
          label={label}
          date={date}
          drilldownView={drilldownView}
          isOffRange={isOffRange}
          onDrillDown={e => this.handleHeadingClick(date, drilldownView, e)}
        />
      </div>
    )
  }

  renderHeaders(row) {
    let {
      localizer,
      components: {
        header: HeaderComponent = Header,
        headerWrapper: HeaderWrapper,
      },
    } = this.props
    let first = row[0]
    let last = row[row.length - 1]

    return dates.range(first, last, 'day').map((day, idx) => (
      <HeaderWrapper key={idx} value={day}>
        <div key={'header_' + idx} className="rbc-header">
          <HeaderComponent
            date={day}
            localizer={localizer}
            label={localizer.format(day, 'weekdayFormat')}
          />
        </div>
      </HeaderWrapper>
    ))
  }

  renderOverlay() {
    let overlay = (this.state && this.state.overlay) || {}
    let {
      accessors,
      localizer,
      components,
      getters,
      selected,
      popupOffset,
    } = this.props

    return (
      <Overlay
        rootClose
        placement="bottom"
        show={!!overlay.position}
        onHide={() => this.setState({ overlay: null })}
        target={() => overlay.target}
      >
        {({ props }) => (
          <Popup
            {...props}
            popupOffset={popupOffset}
            accessors={accessors}
            getters={getters}
            selected={selected}
            components={components}
            localizer={localizer}
            position={overlay.position}
            show={this.overlayDisplay}
            events={overlay.events}
            slotStart={overlay.date}
            slotEnd={overlay.end}
            onSelect={this.handleSelectEvent}
            onDoubleClick={this.handleDoubleClickEvent}
            onKeyPress={this.handleKeyPressEvent}
            handleDragStart={this.props.handleDragStart}
          />
        )}
      </Overlay>
    )
  }

  measureRowLimit() {
    this.setState({
      needLimitMeasure: false,
      rowLimit: this.slotRowRef.current.getRowLimit(),
    })
  }

  handleSelectSlot = (range, slotInfo) => {
    this._pendingSelection = this._pendingSelection.concat(range)

    clearTimeout(this._selectTimer)
    this._selectTimer = setTimeout(() => this.selectDates(slotInfo))
  }

  handleHeadingClick = (date, view, e) => {
    e.preventDefault()
    this.clearSelection()
    notify(this.props.onDrillDown, [date, view])
  }

  handleSelectEvent = (...args) => {
    this.clearSelection()
    notify(this.props.onSelectEvent, args)
  }

  handleDoubleClickEvent = (...args) => {
    this.clearSelection()
    notify(this.props.onDoubleClickEvent, args)
  }

  handleKeyPressEvent = (...args) => {
    this.clearSelection()
    notify(this.props.onKeyPressEvent, args)
  }

  handleShowMore = (events, date, cell, slot, target) => {
    const { popup, onDrillDown, onShowMore, getDrilldownView } = this.props
    //cancel any pending selections so only the event click goes through.
    this.clearSelection()

    if (popup) {
      let position = getPosition(cell, findDOMNode(this))

      this.setState({
        overlay: { date, events, position, target },
      })
    } else {
      notify(onDrillDown, [date, getDrilldownView(date) || views.DAY])
    }

    notify(onShowMore, [events, date, slot])
  }

  overlayDisplay = () => {
    this.setState({
      overlay: null,
    })
  }

  selectDates(slotInfo) {
    let slots = this._pendingSelection.slice()

    this._pendingSelection = []

    slots.sort((a, b) => +a - +b)

    notify(this.props.onSelectSlot, {
      slots,
      start: slots[0],
      end: slots[slots.length - 1],
      action: slotInfo.action,
      bounds: slotInfo.bounds,
      box: slotInfo.box,
    })
  }

  clearSelection() {
    clearTimeout(this._selectTimer)
    this._pendingSelection = []
  }
}

MonthView.propTypes = {
  events: PropTypes.array.isRequired,
  date: PropTypes.instanceOf(Date),
  infiniteScroll: PropTypes.bool,

  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),

  step: PropTypes.number,
  getNow: PropTypes.func.isRequired,

  scrollToTime: PropTypes.instanceOf(Date),
  rtl: PropTypes.bool,
  resizable: PropTypes.bool,
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
  onSelectEvent: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
  onShowMore: PropTypes.func,
  showAllEvents: PropTypes.bool,
  onDrillDown: PropTypes.func,
  getDrilldownView: PropTypes.func.isRequired,

  popup: PropTypes.bool,
  expandRow: PropTypes.bool,
  handleDragStart: PropTypes.func,

  popupOffset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ]),

  customSorting: PropTypes.shape({
    sortPriority: PropTypes.arrayOf(PropTypes.string),
    customComparators: PropTypes.object,
  }),
  arrowNavProps: PropTypes.shape({
    onKeyDown: PropTypes.func,
  }),
}

MonthView.range = (date, { localizer }) => {
  let start = dates.firstVisibleDay(date, localizer)
  let end = dates.lastVisibleDay(date, localizer)
  return { start, end }
}

MonthView.navigate = (date, action) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'month')

    case navigate.NEXT:
      return dates.add(date, 1, 'month')

    default:
      return date
  }
}

MonthView.title = (date, { localizer }) =>
  localizer.format(date, 'monthHeaderFormat')

export default MonthView
