import React, { Fragment, useMemo } from 'react'
import dayjs from 'dayjs'
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
import events from '../../resources/events'
import * as dates from '../../../src/utils/dates'

// add optional time zone support
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(timezone)

const djLocalizer = dayjsLocalizer(dayjs)

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

export default function Dayjs({ ...props }) {
  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(2015, 3, 1),
      max: dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours'),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  )

  return (
    <Fragment>
      <DemoLink fileName="dayjs" />
      <div className="height600" {...props}>
        <Calendar
          components={components}
          defaultDate={defaultDate}
          events={events}
          localizer={djLocalizer}
          max={max}
          showMultiDayTimes
          step={60}
          views={views}
        />
      </div>
    </Fragment>
  )
}
