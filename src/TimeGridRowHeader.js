import PropTypes from 'prop-types'
import clsx from 'clsx'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import React from 'react'
import * as TimeSlotUtils from './utils/TimeSlots'
import TimeSlotGroup from './TimeSlotGroup'

import * as dates from './utils/dates'
import DateContentRow from './DateContentRow'
import Header from './Header'
import ResourceHeader from './ResourceHeader'
import { notify } from './utils/helpers'
import BackgroundWrapper from './BackgroundWrapper'

class TimeGridRowHeader extends React.Component {
  constructor(...args) {
    super(...args)

    this.slotMetrics = TimeSlotUtils.getSlotMetrics(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.slotMetrics = this.slotMetrics.update(nextProps)
  }
  render() {
    const {
      max,
      rtl,
      isNow,
      resource,
      accessors,
      localizer,
      getters: { dayProp, ...getters },
      components: { eventContainerWrapper: EventContainer, timeSlotWrapper: Wrapper = BackgroundWrapper, ...components },
    } = this.props

    let { slotMetrics } = this

    const { className, style } = dayProp(max)

    return (
      <div
        style={style}
        className={clsx(className, 'rbc-day-slot', 'rbc-time-header-row')}
      >
        {slotMetrics.groups.map((grp, idx) => (
          <div className="rbc-timeslot-row-group">
            {grp.map((value, idx) => {
              const slotProps = getters ? getters.slotProp(value, resource) : {}
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
    )
  }
}

TimeGridRowHeader.propTypes = {
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

export default TimeGridRowHeader
