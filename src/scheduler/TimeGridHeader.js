import PropTypes from 'prop-types'
import clsx from 'clsx'
import React from 'react'
import * as TimeSlotUtils from '../utils/TimeSlots'

import * as dates from '../utils/dates'
import Header from '../Header'
import BackgroundWrapper from '../BackgroundWrapper'

class TimeGridHeader extends React.Component {
  constructor(...args) {
    super(...args)

    this.slotMetrics = TimeSlotUtils.getSlotMetrics(this.props)
  }

  renderHeaderCells(date) {
    let {
      localizer,
      getDrilldownView,
      getNow,
      getters: { dayProp },
      components: { header: HeaderComponent = Header },
    } = this.props

    const today = getNow()

    let drilldownView = getDrilldownView(date)
    let label = localizer.format(date, 'dayFormat')

    const { className, style } = dayProp(date)

    let header = (
      <HeaderComponent date={date} label={label} localizer={localizer} />
    )

    return (
      <div
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
  }

  componentWillReceiveProps(nextProps) {
    this.slotMetrics = this.slotMetrics.update(nextProps)
  }
  render() {
    const {
      max,
      resource,
      localizer,
      getters: { dayProp, ...getters },
      components: {
        eventContainerWrapper: EventContainer,
        timeSlotWrapper: Wrapper = BackgroundWrapper,
      },
    } = this.props

    let { slotMetrics } = this

    const { className, style } = dayProp(max)

    return (
      <div className="rbc-time-header-content">
        <div className={`rbc-row rbc-time-header-cell`}>
          {this.renderHeaderCells(max)}
        </div>
        <div
          style={style}
          className={clsx(className, 'rbc-day-slot', 'rbc-time-header-row')}
        >
          {slotMetrics.groups.map((grp, idx) => (
            <div key={idx} className="rbc-timeslot-row-group">
              {grp.map((value, idx) => {
                const slotProps = getters
                  ? getters.slotProp(value, resource)
                  : {}
                return (
                  <Wrapper key={idx} value={value} resource={resource}>
                    <div
                      {...slotProps}
                      className={clsx('rbc-time-slot', slotProps.className)}
                    >
                      {idx === 0 && localizer.format(value, 'timeGutterFormat')}
                    </div>
                  </Wrapper>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

TimeGridHeader.propTypes = {
  range: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  resources: PropTypes.array,
  getNow: PropTypes.func.isRequired,
  isOverflowing: PropTypes.bool,
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),

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
