import PropTypes from 'prop-types'
import cn from 'classnames'
import scrollbarSize from 'dom-helpers/util/scrollbarSize'
import React from 'react'

import dates from './utils/dates'
import DateContentRow from './DateContentRow'
import Header from './Header'
import { notify } from './utils/helpers'

class TimeGridHeader extends React.Component {
  static propTypes = {
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
    resourceWeekViewHeader: PropTypes.oneOf(['week', 'resource']),
  }

  handleHeaderClick = (date, view, e) => {
    e.preventDefault()
    notify(this.props.onDrillDown, [date, view])
  }

  renderHeaderCell({ date, index, today }) {
    let {
      localizer,
      getDrilldownView,
      getters: { dayProp },
      components: { header: HeaderComponent = Header },
    } = this.props
    let drilldownView = getDrilldownView(date)
    let label = localizer.format(date, 'dayFormat')

    const { className, style } = dayProp(date)

    let header = (
      <HeaderComponent date={date} label={label} localizer={localizer} />
    )

    return (
      <div
        key={index}
        style={style}
        className={cn(
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
  }

  renderHeaderCellsByRange(range) {
    let { getNow } = this.props
    const today = getNow()
    return range.map((date, index) =>
      this.renderHeaderCell({
        date,
        index,
        today,
      })
    )
  }

  renderDateContentRow({ groupedEvents, resource, id, range }) {
    return (
      <DateContentRow
        isAllDay
        rtl={this.props.rtl}
        getNow={this.props.getNow}
        minRows={2}
        range={range}
        events={groupedEvents.get(id) || []}
        resourceId={resource && id}
        className="rbc-allday-cell"
        selectable={this.props.selectable}
        selected={this.props.selected}
        components={this.props.components}
        accessors={this.props.accessors}
        getters={this.props.getters}
        localizer={this.props.localizer}
        onSelect={this.props.onSelectEvent}
        onDoubleClick={this.props.onDoubleClickEvent}
        onSelectSlot={this.props.onSelectSlot}
        longPressThreshold={this.props.longPressThreshold}
      />
    )
  }

  renderHeaderByDay() {
    let { resources, range, getNow, accessors } = this.props
    const today = getNow()

    return range.map((date, index) => (
      <div className="rbc-time-header-content" key={index}>
        <div className="rbc-row rbc-time-header-cell">
          {this.renderHeaderCell({ date, index, today })}
        </div>
        <div className="rbc-row rbc-row-resource">
          {resources.map(([id, resource], idx) => (
            <div key={`resource_${id || idx}`} className="rbc-header">
              {accessors.resourceTitle(resource)}
            </div>
          ))}
        </div>
        {/* TODO - render date content row */}
      </div>
    ))
  }

  renderHeaderByResource(groupedEvents) {
    let { resources, range, accessors } = this.props
    return resources.map(([id, resource], idx) => (
      <div className="rbc-time-header-content" key={id || idx}>
        {resource && (
          <div className="rbc-row rbc-row-resource">
            <div key={`resource_${idx}`} className="rbc-header">
              {accessors.resourceTitle(resource)}
            </div>
          </div>
        )}
        {/* For rendering only one day no need to show the headers */}
        {range.length > 1 && (
          <div className="rbc-row rbc-time-header-cell">
            {this.renderHeaderCellsByRange(range)}
          </div>
        )}
        {this.renderDateContentRow({ groupedEvents, resource, range })}
      </div>
    ))
  }

  render() {
    let {
      width,
      rtl,
      resources,
      events,
      scrollRef,
      isOverflowing,
      resourceWeekViewHeader,
      components: { timeGutterHeader: TimeGutterHeader },
    } = this.props

    let style = {}
    if (isOverflowing) {
      style[rtl ? 'marginLeft' : 'marginRight'] = `${scrollbarSize()}px`
    }

    const groupedEvents = resources.groupEvents(events)

    return (
      <div
        style={style}
        ref={scrollRef}
        className={cn('rbc-time-header', isOverflowing && 'rbc-overflowing')}
      >
        <div
          className="rbc-label rbc-time-header-gutter"
          style={{ width, minWidth: width, maxWidth: width }}
        >
          {TimeGutterHeader && <TimeGutterHeader />}
        </div>
        {resourceWeekViewHeader === 'resource' &&
          this.renderHeaderByResource(groupedEvents)}
        {resourceWeekViewHeader === 'day' &&
          this.renderHeaderByDay(groupedEvents)}
      </div>
    )
  }
}

export default TimeGridHeader
