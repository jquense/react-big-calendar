import PropTypes from 'prop-types'
import clsx from 'clsx'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import React from 'react'

import * as dates from './utils/dates'
import DateContentRow from './DateContentRow'
import Header from './Header'
import ResourceHeader from './ResourceHeader'
import { notify } from './utils/helpers'

const TimeGridHeader = ({
  localizer,
  getDrilldownView,
  getNow,
  components,
  onDrillDown,
  onSelectEvent,
  onDoubleClickEvent,
  onKeyPressEvent,
  onSelectSlot,
  longPressThreshold,
  events,
  rtl,
  selectable,
  selected,
  range,
  getters,
  accessors,
  width,
  resources,
  scrollRef,
  isOverflowing,
}) => {
  const {
    header: HeaderComponent = Header,
    timeGutterHeader: TimeGutterHeader,
    resourceHeader: ResourceHeaderComponent = ResourceHeader,
  } = components
  const { dayProp } = getters

  const handleHeaderClick = (date, view, e) => {
    e.preventDefault()
    notify(onDrillDown, [date, view])
  }

  const renderHeaderCells = () => {
    const today = getNow()

    return range.map((date, i) => {
      const drilldownView = getDrilldownView(date)
      const label = localizer.format(date, 'dayFormat')

      const { className, style } = dayProp(date)

      let header = (
        <HeaderComponent date={date} label={label} localizer={localizer} />
      )

      return (
        <div
          key={i}
          style={style}
          className={clsx(
            'rbc-header',
            className,
            dates.eq(date, today, 'day') && 'rbc-today'
          )}
        >
          {/* TODO: replace with button with 'as-anchor' type styling */}
          {drilldownView ? (
            <a
              href="#"
              onClick={e => handleHeaderClick(date, drilldownView, e)}
            >
              {header}
            </a>
          ) : (
            <span>{header}</span>
          )}
        </div>
      )
    })
  }

  /** TODO: ??? doesn't appear to be called */
  /*const renderRow = resource => {
    const resourceId = accessors.resourceId(resource)
    const eventsToDisplay = resource
      ? events.filter(event => accessors.resource(event) === resourceId)
      : events

    return (
      <DateContentRow
        isAllDay
        rtl={rtl}
        getNow={getNow}
        minRows={2}
        range={range}
        events={eventsToDisplay}
        resourceId={resourceId}
        className="rbc-allday-cell"
        selectable={selectable}
        selected={selected}
        components={components}
        accessors={accessors}
        getters={getters}
        localizer={localizer}
        onSelect={onSelectEvent}
        onDoubleClick={onDoubleClickEvent}
        onKeyPress={onKeyPressEvent}
        onSelectSlot={onSelectSlot}
        longPressThreshold={longPressThreshold}
      />
    )
  }*/

  let style = {}
  if (isOverflowing) {
    style[rtl ? 'marginLeft' : 'marginRight'] = `${scrollbarSize()}px`
  }

  const groupedEvents = resources.groupEvents(events)

  return (
    <div
      style={style}
      ref={scrollRef}
      className={clsx('rbc-time-header', isOverflowing && 'rbc-overflowing')}
    >
      <div
        className="rbc-label rbc-time-header-gutter"
        style={{ width, minWidth: width, maxWidth: width }}
      >
        {TimeGutterHeader && <TimeGutterHeader />}
      </div>

      {resources.map(([id, resource], idx) => (
        <div className="rbc-time-header-content" key={id || idx}>
          {resource && (
            <div className="rbc-row rbc-row-resource" key={`resource_${idx}`}>
              <div className="rbc-header">
                <ResourceHeaderComponent
                  index={idx}
                  label={accessors.resourceTitle(resource)}
                  resource={resource}
                />
              </div>
            </div>
          )}
          <div
            className={`rbc-row rbc-time-header-cell${
              range.length <= 1 ? ' rbc-time-header-cell-single-day' : ''
            }`}
          >
            {renderHeaderCells()}
          </div>
          <DateContentRow
            isAllDay
            rtl={rtl}
            getNow={getNow}
            minRows={2}
            range={range}
            events={groupedEvents.get(id) || []}
            resourceId={resource && id}
            className="rbc-allday-cell"
            selectable={selectable}
            selected={selected}
            components={components}
            accessors={accessors}
            getters={getters}
            localizer={localizer}
            onSelect={onSelectEvent}
            onDoubleClick={onDoubleClickEvent}
            onKeyPress={onKeyPressEvent}
            onSelectSlot={onSelectSlot}
            longPressThreshold={longPressThreshold}
          />
        </div>
      ))}
    </div>
  )
}

TimeGridHeader.propTypes = {
  range: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  resources: PropTypes.object,
  getNow: PropTypes.func.isRequired,
  isOverflowing: PropTypes.bool,

  rtl: PropTypes.bool,
  width: PropTypes.number,

  localizer: PropTypes.object.isRequired,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,

  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,

  onSelectSlot: PropTypes.func,
  onSelectEvent: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
  onDrillDown: PropTypes.func,
  getDrilldownView: PropTypes.func.isRequired,
  scrollRef: PropTypes.any,
}

export default TimeGridHeader
