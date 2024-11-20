import clsx from 'clsx'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import PropTypes from 'prop-types'
import React from 'react'

import DateContentRow from './DateContentRow'
import Header from './Header'
import ResourceHeader from './ResourceHeader'
import { notify } from './utils/helpers'

class TimeGridHeaderResources extends React.Component {
  handleHeaderClick = (date, view, e) => {
    e.preventDefault()
    notify(this.props.onDrillDown, [date, view])
  }

  renderHeaderCells(range) {
    let {
      localizer,
      getDrilldownView,
      getNow,
      getters: { dayProp },
      components: {
        header: HeaderComponent = Header,
        resourceHeader: ResourceHeaderComponent = ResourceHeader,
      },
      resources,
      accessors,
      events,
      rtl,
      selectable,
      components,
      getters,
      resizable,
    } = this.props

    const today = getNow()

    const groupedEvents = resources.groupEvents(events)

    return range.map((date, idx) => {
      let drilldownView = getDrilldownView(date)
      let label = localizer.format(date, 'dayFormat')

      const { className, style } = dayProp(date)

      let header = (
        <HeaderComponent date={date} label={label} localizer={localizer} />
      )

      return (
        <div key={idx} className="rbc-time-header-content">
          <div
            className={`rbc-row rbc-time-header-cell${
              range.length <= 1 ? ' rbc-time-header-cell-single-day' : ''
            }`}
          >
            <div
              style={style}
              className={clsx(
                'rbc-header',
                className,
                localizer.isSameDate(date, today) && 'rbc-today'
              )}
            >
              {drilldownView ? (
                <button
                  type="button"
                  className="rbc-button-link"
                  onClick={(e) =>
                    this.handleHeaderClick(date, drilldownView, e)
                  }
                >
                  {header}
                </button>
              ) : (
                <span>{header}</span>
              )}
            </div>
          </div>

          <div className="rbc-row">
            {resources.map(([id, resource], idx) => {
              return (
                <div
                  key={`resource_${id}_${idx}`}
                  className={clsx(
                    'rbc-header',
                    className,
                    localizer.isSameDate(date, today) && 'rbc-today'
                  )}
                >
                  <ResourceHeaderComponent
                    index={idx}
                    label={accessors.resourceTitle(resource)}
                    resource={resource}
                  />
                </div>
              )
            })}
          </div>

          <div className="rbc-row rbc-m-b-negative-3">
            {resources.map(([id, resource], idx) => {
              // Filter the grouped events by the current date.
              const filteredEvents = (groupedEvents.get(id) || []).filter(
                (event) =>
                  localizer.isSameDate(event.start, date) ||
                  localizer.isSameDate(event.end, date)
              )

              return (
                <DateContentRow
                  key={`resource_${id}_${idx}`}
                  isAllDay
                  rtl={rtl}
                  getNow={getNow}
                  minRows={2}
                  maxRows={this.props.allDayMaxRows + 1}
                  range={[date]} // This ensures that only the single day is rendered
                  events={filteredEvents} // Only show filtered events for this day.
                  resourceId={resource && id}
                  className="rbc-allday-cell"
                  selectable={selectable}
                  selected={this.props.selected}
                  components={components}
                  accessors={accessors}
                  getters={getters}
                  localizer={localizer}
                  onSelect={this.props.onSelectEvent}
                  onShowMore={this.props.onShowMore}
                  onDoubleClick={this.props.onDoubleClickEvent}
                  onKeyDown={this.props.onKeyPressEvent}
                  onSelectSlot={this.props.onSelectSlot}
                  longPressThreshold={this.props.longPressThreshold}
                  resizable={resizable}
                />
              )
            })}
          </div>
        </div>
      )
    })
  }

  render() {
    let {
      width,
      rtl,
      range,
      scrollRef,
      isOverflowing,
      components: { timeGutterHeader: TimeGutterHeader },
    } = this.props

    let style = {}
    if (isOverflowing) {
      style[rtl ? 'marginLeft' : 'marginRight'] = `${scrollbarSize() - 1}px`
    }

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

        {this.renderHeaderCells(range)}
      </div>
    )
  }
}

TimeGridHeaderResources.propTypes = {
  range: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  resources: PropTypes.object,
  getNow: PropTypes.func.isRequired,
  isOverflowing: PropTypes.bool,

  rtl: PropTypes.bool,
  resizable: PropTypes.bool,
  width: PropTypes.number,

  localizer: PropTypes.object.isRequired,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,

  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,

  allDayMaxRows: PropTypes.number,

  onSelectSlot: PropTypes.func,
  onSelectEvent: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
  onDrillDown: PropTypes.func,
  onShowMore: PropTypes.func,
  getDrilldownView: PropTypes.func.isRequired,
  scrollRef: PropTypes.any,
}

export default TimeGridHeaderResources
