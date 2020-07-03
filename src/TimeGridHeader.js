import PropTypes from 'prop-types'
import clsx from 'clsx'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import React from 'react'

import * as dates from './utils/dates'
import DateContentRow from './DateContentRow'
import Header from './Header'
import ResourceHeader from './ResourceHeader'
import { notify } from './utils/helpers'

class TimeGridHeader extends React.Component {
  handleHeaderClick = (date, view, e) => {
    e.preventDefault()
    notify(this.props.onDrillDown, [date, view])
  }

  renderHeaderCells() {
    let {
      resources,
      accessors,
      components: { resourceHeader: ResourceHeaderComponent = ResourceHeader },
    } = this.props

    return (
      <div className="rbc-header">
        {resources.map(([id, resource], idx) => {
          return (
            <div className="rbc-row-resource" key={`resource_${id || idx}`}>
              <ResourceHeaderComponent
                index={idx}
                label={accessors.resourceTitle(resource)}
                resource={resource}
              />
            </div>
          )
        })}
      </div>
    )
  }
  renderRow = resource => {
    let {
      events,
      rtl,
      selectable,
      getNow,
      range,
      getters,
      localizer,
      accessors,
      components,
    } = this.props

    const resourceId = accessors.resourceId(resource)
    let eventsToDisplay = resource
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
        selected={this.props.selected}
        components={components}
        accessors={accessors}
        getters={getters}
        localizer={localizer}
        onSelect={this.props.onSelectEvent}
        onDoubleClick={this.props.onDoubleClickEvent}
        onSelectSlot={this.props.onSelectSlot}
        longPressThreshold={this.props.longPressThreshold}
      />
    )
  }

  render() {
    let {
      getNow,
      localizer,
      getDrilldownView,
      resources,
      width,
      rtl,
      range,
      scrollRef,
      isOverflowing,
      components: {
        header: HeaderComponent = Header,
        timeGutterHeader: TimeGutterHeader,
      },
    } = this.props

    let style = {}
    if (isOverflowing) {
      style[rtl ? 'marginLeft' : 'marginRight'] = `${scrollbarSize()}px`
    }

    const today = getNow()

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

        {range.map((date, i) => {
          let drilldownView = getDrilldownView(date)
          let label = localizer.format(date, 'dayFormat')

          let header = (
            <HeaderComponent date={date} label={label} localizer={localizer} />
          )

          // const { className } = dayProp(date)
          const { className } = 'generic-class-name'
          return (
            <div className="rbc-time-header-content" key={date || i}>
              <div
                className={`rbc-row rbc-time-header-cell${
                  range.length <= 1 ? ' rbc-time-header-cell-single-day' : ''
                }`}
              >
                <div
                  key={i}
                  style={style}
                  className={clsx(
                    'rbc-header-date',
                    className,
                    dates.eq(date, today, 'day') && 'rbc-today'
                  )}
                >
                  {drilldownView ? (
                    <a
                      href="#"
                      onClick={e =>
                        this.handleHeaderClick(date, drilldownView, e)
                      }
                    >
                      {header}
                    </a>
                  ) : (
                    <span>{header}</span>
                  )}
                </div>
                {this.renderHeaderCells(resources, date)}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
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
  onDrillDown: PropTypes.func,
  getDrilldownView: PropTypes.func.isRequired,
  scrollRef: PropTypes.any,
}

export default TimeGridHeader
