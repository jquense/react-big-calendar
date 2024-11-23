import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
import events from '../../resources/events'
import * as dates from '../../../src/utils/dates'

const mLocalizer = momentLocalizer(moment)

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
export default function Basic({
  localizer = mLocalizer,
  showDemoLink = true,
  ...props
}) {
  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(2022, 9, 14),
      max: dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours'),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  )

  return (
    <Fragment>
      {showDemoLink ? <DemoLink fileName="basic" /> : null}
      <div className="height600" {...props}>
        <Calendar
          components={components}
          defaultDate={defaultDate}
          events={events}
          localizer={localizer}
          min={new Date(2022, 10, 14, 9, 0, 0)}
          max={new Date(2022, 10, 14, 22, 59, 59)}
          showMultiDayTimes
          step={60}
          timeslots={1}
          views={views}
        />
      </div>
    </Fragment>
  )
}
Basic.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  showDemoLink: PropTypes.bool,
}
