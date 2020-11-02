import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import scrollbarSize from 'dom-helpers/scrollbarSize'

import * as dates from './utils/dates'
import Header from './Header'
import TimeGridHeaderContent from './TimeGridHeaderContent'
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

      const header = (
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
          {drilldownView ? (
            <button
              className={'btn-as-anchor'}
              onClick={e => handleHeaderClick(date, drilldownView, e)}
            >
              {header}
            </button>
          ) : (
            <span>{header}</span>
          )}
        </div>
      )
    })
  }

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
        <TimeGridHeaderContent
          key={id || idx}
          {...{
            resource,
            id,
            idx,
            groupedEvents,
            renderHeaderCells,
            localizer,
            getters,
            selectable,
            selected,
            range,
            rtl,
            getNow,
            accessors,
            components,
            onSelectEvent,
            onDoubleClickEvent,
            onKeyPressEvent,
            onSelectSlot,
            longPressThreshold,
          }}
        />
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
