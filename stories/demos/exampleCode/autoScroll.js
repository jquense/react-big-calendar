import React, { Fragment, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import events from '../../resources/events'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import Card from '../../resources/Card'
import DemoLink from '../../DemoLink.component'
// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop'
import withDragAndDrop from '../../../src/addons/dragAndDrop'
// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import '../../../src/addons/dragAndDrop/styles.scss'

const DragAndDropCalendar = withDragAndDrop(Calendar)

const adjEvents = events.map((it, ind) => ({
  ...it,
  isDraggable: true,
}))

export default function AutoScroll({ localizer }) {
  const [autoScroll, setAutoScroll] = useState(true)

  const toggleAutoScroll = useCallback(() => setAutoScroll((prev) => !prev), [])

  const defaultDate = useMemo(() => new Date(2015, 3, 12), [])

  return (
    <Fragment>
      <DemoLink fileName="dndOutsideSource">
        <Card className="dndOutsideSourceExample">
          <div className="inner">
            <h4>Drag auto scroll</h4>
            <p>
              Calendar will auto scroll once event is dragged near top or bottom
              edge of the calendar
            </p>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={toggleAutoScroll}
              />
              Allow auto scroll
            </label>
          </div>
        </Card>
      </DemoLink>
      <div className="height600">
        <DragAndDropCalendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          draggableAccessor="isDraggable"
          events={adjEvents}
          localizer={localizer}
          enableDragAutoScroll={autoScroll}
        />
      </div>
    </Fragment>
  )
}
AutoScroll.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
