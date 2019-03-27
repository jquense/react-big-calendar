import cn from 'classnames'
import getHeight from 'dom-helpers/query/height'
import qsa from 'dom-helpers/query/querySelectorAll'
import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'

import dates from './utils/dates'
import BackgroundCells from './BackgroundCells'
import EventRow from './EventRow'
import EventEndingRow from './EventEndingRow'
import * as DateSlotMetrics from './utils/DateSlotMetrics'

class DateContentRow extends React.Component {
  constructor(...args) {
    super(...args)

    this.slotMetrics = DateSlotMetrics.getSlotMetrics()
  }

  handleSelectSlot = slot => {
    const { range, onSelectSlot } = this.props

    onSelectSlot(range.slice(slot.start, slot.end + 1), slot)
  }

  handleShowMore = slot => {
    const { range, onShowMore } = this.props
    let metrics = this.slotMetrics(this.props)
    let row = qsa(findDOMNode(this), '.rbc-row-bg')[0]

    let cell
    if (row) cell = row.children[slot - 1]

    let events = metrics.getEventsForSlot(slot)
    onShowMore(events, range[slot - 1], cell, slot)
  }

  createHeadingRef = r => {
    this.headingRow = r
  }

  createEventRef = r => {
    this.eventRow = r
  }

  getContainer = () => {
    const { container } = this.props
    return container ? container() : findDOMNode(this)
  }

  getRowMetrics() {
    let eventHeight = getHeight(this.eventRow)
    let headingHeight = this.headingRow ? getHeight(this.headingRow) : 0
    let eventSpace = getHeight(findDOMNode(this)) - headingHeight

    let actualRowLimit = Math.floor(eventSpace / eventHeight)
    let boundedRowLimit = Math.max(actualRowLimit, 1)
    let eventLevelsLimit = Math.max(actualRowLimit, 1)
    let leftoverSpace = eventSpace - eventLevelsLimit * eventHeight

    return {
      eventHeight,
      rowLimit: boundedRowLimit,
      leftoverSpace,
    }
  }

  renderHeadingCell = (date, index) => {
    let { renderHeader, getNow } = this.props

    return renderHeader({
      date,
      key: `header_${index}`,
      className: cn(
        'rbc-date-cell',
        dates.eq(date, getNow(), 'day') && 'rbc-now'
      ),
    })
  }

  render() {
    const {
      date,
      rtl,
      range,
      className,
      selected,
      selectable,
      renderForMeasure,

      accessors,
      getters,
      components,

      getNow,
      renderHeader,
      onSelect,
      localizer,
      onSelectStart,
      onSelectEnd,
      onDoubleClick,
      resourceId,
      longPressThreshold,
      isAllDay,
      events,
      leftoverSpace,
      eventHeight,
    } = this.props

    let renderedEvents
    let WeekWrapper = components.weekWrapper

    if (renderForMeasure) {
      let segs = events[0]
        ? [
            {
              event: events[0],
              left: 1,
              right: 2,
              span: 1,
            },
          ]
        : []

      const eventRowProps = {
        selected,
        accessors,
        getters,
        localizer,
        components,
        onSelect,
        onDoubleClick,
        resourceId,
        slotMetrics: {
          slots: this.props.range,
          continuesPrior: () => false,
          continuesAfter: () => false,
        },
      }

      renderedEvents = (
        <WeekWrapper isAllDay={isAllDay} {...eventRowProps}>
          <EventRow
            segments={segs}
            eventRef={this.createEventRef}
            {...eventRowProps}
          />
        </WeekWrapper>
      )
    } else {
      let metrics = this.slotMetrics(this.props)
      let { levels, extra } = metrics

      const eventRowProps = {
        selected,
        accessors,
        getters,
        localizer,
        components,
        onSelect,
        onDoubleClick,
        resourceId,
        slotMetrics: metrics,
      }

      renderedEvents = (
        <WeekWrapper isAllDay={isAllDay} {...eventRowProps}>
          {levels.map((segs, idx) => (
            <EventRow key={idx} segments={segs} {...eventRowProps} />
          ))}
          {!!extra.length && (
            <EventEndingRow
              segments={extra}
              onShowMore={this.handleShowMore}
              leftoverSpace={leftoverSpace}
              eventHeight={eventHeight}
              {...eventRowProps}
            />
          )}
        </WeekWrapper>
      )
    }

    return (
      <div className={className}>
        <BackgroundCells
          date={date}
          getNow={getNow}
          rtl={rtl}
          range={range}
          selectable={selectable}
          container={this.getContainer}
          getters={getters}
          onSelectStart={onSelectStart}
          onSelectEnd={onSelectEnd}
          onSelectSlot={this.handleSelectSlot}
          components={components}
          longPressThreshold={longPressThreshold}
        />

        <div className="rbc-row-content">
          {renderHeader && (
            <div className="rbc-row" ref={this.createHeadingRef}>
              {range.map(this.renderHeadingCell)}
            </div>
          )}
          {renderedEvents}
        </div>
      </div>
    )
  }
}

DateContentRow.propTypes = {
  date: PropTypes.instanceOf(Date),
  events: PropTypes.array.isRequired,
  range: PropTypes.array.isRequired,

  rtl: PropTypes.bool,
  resourceId: PropTypes.any,
  renderForMeasure: PropTypes.bool,
  renderHeader: PropTypes.func,

  container: PropTypes.func,
  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,

  onShowMore: PropTypes.func,
  onSelectSlot: PropTypes.func,
  onSelect: PropTypes.func,
  onSelectEnd: PropTypes.func,
  onSelectStart: PropTypes.func,
  onDoubleClick: PropTypes.func,
  dayPropGetter: PropTypes.func,

  getNow: PropTypes.func.isRequired,
  isAllDay: PropTypes.bool,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,

  minRows: PropTypes.number.isRequired,
  maxRows: PropTypes.number.isRequired,
  leftoverSpace: PropTypes.number,
  eventHeight: PropTypes.number,
}

DateContentRow.defaultProps = {
  minRows: 0,
  maxRows: Infinity,
  leftoverSpace: 0,
  eventHeight: 25,
}

export default DateContentRow
