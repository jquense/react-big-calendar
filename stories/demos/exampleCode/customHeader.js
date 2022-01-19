import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Calendar, DateLocalizer } from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
import events from '../../resources/events'

const MyOtherNestedComponent = () => <div>NESTED COMPONENT</div>

const MyCustomHeader = ({ label }) => (
  <div>
    CUSTOM HEADER:
    <div>{label}</div>
    <MyOtherNestedComponent />
  </div>
)
MyCustomHeader.propTypes = {
  label: PropTypes.string.isRequired,
}

export default function CustomHeader({ localizer }) {
  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        day: { header: MyCustomHeader },
        week: { header: MyCustomHeader },
        month: { header: MyCustomHeader },
      },
      defaultDate: new Date(2015, 3, 1),
    }),
    []
  )

  return (
    <Fragment>
      <DemoLink fileName="customHeader" />
      <div className="height600">
        <Calendar
          components={components}
          defaultDate={defaultDate}
          events={events}
          localizer={localizer}
        />
      </div>
    </Fragment>
  )
}
CustomHeader.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
