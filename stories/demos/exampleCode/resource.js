import LinkTo from '@storybook/addon-links/react'
import PropTypes from 'prop-types'
import React, { Fragment, useMemo, useState } from 'react'
import { Calendar, DateLocalizer, Views } from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'

const resources = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
]

let eventId = 0
const events = Array.from({ length: 20 }, (_, k) => k).flatMap((i) => {
  const currentResource = resources[i % resources.length]
  const dayDiff = i % 7

  return Array.from({ length: 5 }, (_, j) => ({
    id: eventId++,
    title: `Event ${i + j} _ ${currentResource.resourceTitle}`,
    start: new Date(2018, 0, 29 + dayDiff, 9 + (j % 4), 0, 0),
    end: new Date(2018, 0, 29 + dayDiff, 11 + (j % 4), 0, 0),
    resourceId: currentResource.resourceId,
  }))
})

export default function Resource({ localizer }) {
  const [groupResourcesOnWeek, setGroupResourcesOnWeek] = useState(false)

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
        The calendar below uses the{' '}
        <LinkTo kind="props" story="resource-id-accessor">
          resourceIdAccessor
        </LinkTo>
        ,{' '}
        <LinkTo kind="props" story="resource-title-accessor">
          resourceTitleAccessor
        </LinkTo>{' '}
        and{' '}
        <LinkTo kind="props" story="resources">
          resources
        </LinkTo>{' '}
        props to show events scheduled for different resources.
        <br />
        Events can be mapped to a single resource, or multiple resources.
      </strong>
      <div style={{ margin: '10px 0 20px 0' }}>
        <label>
          <input
            type="checkbox"
            checked={groupResourcesOnWeek}
            onChange={() => setGroupResourcesOnWeek(!groupResourcesOnWeek)}
          />
          Group resources on week view.
        </label>
      </div>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.DAY}
          events={events}
          localizer={localizer}
          resources={resources}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          step={60}
          views={views}
          resourceGroupingLayout={groupResourcesOnWeek}
        />
      </div>
    </Fragment>
  )
}
Resource.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
