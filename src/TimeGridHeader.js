import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import DateContentRow from './DateContentRow'
import Header from './Header'
import ResourceHeader from './ResourceHeader'
import * as dates from './utils/dates'
import { notify } from './utils/helpers'

class TimeGridHeader extends React.Component {
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
      components: { header: HeaderComponent = Header },
    } = this.props

    const today = getNow()

    return range.map((date, i) => {
      let drilldownView = getDrilldownView(date)
      let label = localizer.format(date, 'dayFormat')

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
          {drilldownView ? (
            <a
              href="#"
              onClick={e => this.handleHeaderClick(date, drilldownView, e)}
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
      resizable,
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
        onKeyPress={this.props.onKeyPressEvent}
        onSelectSlot={this.props.onSelectSlot}
        longPressThreshold={this.props.longPressThreshold}
        resizable={resizable}
      />
    )
  }

  render() {
    let {
      rtl,
      resources,
      range,
      events,
      getNow,
      accessors,
      selectable,
      components,
      getters,
      scrollRef,
      localizer,
      components: {
        timeGutterHeader: TimeGutterHeader,
        resourceHeader: ResourceHeaderComponent = ResourceHeader,
      },
      resizable,
    } = this.props

    let style = {}

    const groupedEvents = resources.groupEvents(events)

    return (
      <div style={style} ref={scrollRef} className={clsx('rbc-time-header')}>
        <div className="rbc-label rbc-time-header-gutter">
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
              {this.renderHeaderCells(range)}
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
              selected={this.props.selected}
              components={components}
              accessors={accessors}
              getters={getters}
              localizer={localizer}
              onSelect={this.props.onSelectEvent}
              onDoubleClick={this.props.onDoubleClickEvent}
              onKeyPress={this.props.onKeyPressEvent}
              onSelectSlot={this.props.onSelectSlot}
              longPressThreshold={this.props.longPressThreshold}
              resizable={resizable}
            />
          </div>
        ))}
      </div>
    )
  }
}

TimeGridHeader.propTypes = {
  range: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  resources: PropTypes.object,
  getNow: PropTypes.func.isRequired,

  rtl: PropTypes.bool,
  resizable: PropTypes.bool,

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
