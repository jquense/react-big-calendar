import PropTypes from 'prop-types'
import cn from 'classnames'
import scrollbarSize from 'dom-helpers/util/scrollbarSize'
import React from 'react'

import dates from './utils/dates'
import { elementType, accessor, dateFormat } from './utils/propTypes'
import localizer from './localizer'
import DateContentRow from './DateContentRow'
import Header from './Header'
import { notify } from './utils/helpers'
import { accessor as get } from './utils/accessors'

class TimeGridHeader extends React.Component {
  static propTypes = {
    range: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
    resources: PropTypes.array,
    getNow: PropTypes.func.isRequired,
    isOverflowing: PropTypes.bool,

    dayFormat: dateFormat,
    eventPropGetter: PropTypes.func,
    dayPropGetter: PropTypes.func,
    culture: PropTypes.string,

    rtl: PropTypes.bool,
    width: PropTypes.number,

    titleAccessor: accessor.isRequired,
    tooltipAccessor: accessor.isRequired,
    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,
    resourceAccessor: accessor.isRequired,

    resourceIdAccessor: accessor.isRequired,
    resourceTitleAccessor: accessor.isRequired,

    selected: PropTypes.object,
    selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
    longPressThreshold: PropTypes.number,

    headerComponent: elementType,
    eventComponent: elementType,
    eventWrapperComponent: elementType.isRequired,
    dateCellWrapperComponent: elementType,

    onSelectSlot: PropTypes.func,
    onSelectEvent: PropTypes.func,
    onDoubleClickEvent: PropTypes.func,
    onDrillDown: PropTypes.func,
    getDrilldownView: PropTypes.func.isRequired,
  }
  static defaultProps = {
    headerComponent: Header,
  }

  handleHeaderClick = (date, view, e) => {
    e.preventDefault()
    notify(this.props.onDrillDown, [date, view])
  }

  renderHeaderResources(range, resources) {
    const { resourceTitleAccessor, getNow } = this.props
    const today = getNow()

    return range.map((date, i) => {
      return resources.map((resource, j) => {
        return (
          <div
            key={`${i}-${j}`}
            className={cn(
              'rbc-header',
              dates.eq(date, today, 'day') && 'rbc-today'
            )}
          >
            {get(resource, resourceTitleAccessor)}
          </div>
        )
      })
    })
  }

  renderHeaderCells(range) {
    let {
      dayFormat,
      culture,
      dayPropGetter,
      getDrilldownView,
      getNow,
      headerComponent: Header,
    } = this.props

    const today = getNow()

    return range.map((date, i) => {
      let drilldownView = getDrilldownView(date)
      let label = localizer.format(date, dayFormat, culture)

      const { className, style } = (dayPropGetter && dayPropGetter(date)) || {}

      let header = (
        <Header
          date={date}
          label={label}
          localizer={localizer}
          format={dayFormat}
          culture={culture}
        />
      )

      return (
        <div
          key={i}
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
    })
  }

  render() {
    let {
      width,
      events,
      rtl,
      selectable,
      resources,
      getNow,
      range,
      isOverflowing,
      eventComponent,
      dateCellWrapperComponent,
      eventWrapperComponent,
    } = this.props

    let style = {}
    if (isOverflowing) {
      style[rtl ? 'marginLeft' : 'marginRight'] = `${scrollbarSize()}px`
    }

    return (
      <div
        ref="headerCell"
        style={style}
        className={cn('rbc-time-header', isOverflowing && 'rbc-overflowing')}
      >
        <div className="rbc-label rbc-time-header-gutter" style={{ width }} />

        <div className="rbc-time-header-content">
          <div className="rbc-row rbc-time-header-cell">
            {this.renderHeaderCells(range)}
          </div>
          {resources && (
            <div className="rbc-row rbc-row-resource">
              {this.renderHeaderResources(range, resources)}
            </div>
          )}

          <DateContentRow
            isAllDay
            rtl={rtl}
            getNow={getNow}
            minRows={2}
            range={range}
            events={events}
            className="rbc-allday-cell"
            selectable={selectable}
            selected={this.props.selected}
            eventComponent={eventComponent}
            eventWrapperComponent={eventWrapperComponent}
            dateCellWrapperComponent={dateCellWrapperComponent}
            dayPropGetter={this.props.dayPropGetter}
            titleAccessor={this.props.titleAccessor}
            tooltipAccessor={this.props.tooltipAccessor}
            startAccessor={this.props.startAccessor}
            endAccessor={this.props.endAccessor}
            allDayAccessor={this.props.allDayAccessor}
            eventPropGetter={this.props.eventPropGetter}
            onSelect={this.props.onSelectEvent}
            onDoubleClick={this.props.onDoubleClickEvent}
            onSelectSlot={this.props.onSelectSlot}
            longPressThreshold={this.props.longPressThreshold}
          />
        </div>
      </div>
    )
  }
}

export default TimeGridHeader
