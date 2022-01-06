import moment from 'moment'
import { momentLocalizer, Views } from '../../src'
import demoEvents from '../../examples/events'
import resourceData from '../helpers/resourceEvents'

const { events: resourceEvents, list: resources } = resourceData

const mLocalizer = momentLocalizer(moment)

const adjusted = demoEvents.map((event) => {
  const {
    start: startDate,
    end: endDate,
    title: label,
    allDay: allDayEvent,
    ...other
  } = event
  return { ...other, startDate, endDate, label, allDayEvent }
})

export const accessorStoryArgs = {
  defaultDate: new Date(2015, 3, 13),
  localizer: mLocalizer,
  events: adjusted,
  titleAccessor: 'label',
  tooltipAccessor: 'label',
  startAccessor: 'startDate',
  endAccessor: 'endDate',
  allDayAccessor: 'allDayEvent',
}

const adjustedResources = resources.map(({ id: Id, title: Title }) => ({
  Id,
  Title,
}))

export const resourceAccessorStoryArgs = {
  defaultDate: new Date(2015, 3, 4),
  defaultView: Views.DAY,
  localizer: mLocalizer,
  events: resourceEvents,
  resources: adjustedResources,
  resourceIdAccessor: 'Id',
  resourceTitleAccessor: 'Title',
}
