import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
import LinkTo from '@storybook/addon-links/react'

const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'MS training',
    allDay: true,
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: [2, 3],
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
]

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
]

export default function Resource({ localizer }) {
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(2018, 0, 29),
      views: ['day', 'work_week'],
    }),
    []
  )

  return (
    <Fragment>
      <DemoLink fileName="resource" />
      <strong>
        The calendar below uses the <LinkTo kind="props" story="resource-id-accessor">resourceIdAccessor</LinkTo>, <LinkTo kind="props" story="resource-title-accessor">resourceTitleAccessor</LinkTo> and <LinkTo kind="props" story="resources">resources</LinkTo> props to show events scheduled for different resources.
        <br/>
        Events can be mapped to a single resource, or multiple resources.
      </strong>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.DAY}
          events={events}
          localizer={localizer}
          resourceIdAccessor="resourceId"
          resources={resourceMap}
          resourceTitleAccessor="resourceTitle"
          step={60}
          views={views}
        />
      </div>
    </Fragment>
  )
}
Resource.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
