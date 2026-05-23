import moment from 'moment'
import { momentLocalizer, Views } from '../../src'
import demoEvents from '../resources/events'
import resourceData from '../resources/resourceEvents'

const { events: resourceEvents, list: resources } = resourceData

const mLocalizer = momentLocalizer(moment)

/** Specific to event key accessors */
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
  allDayAccessor: 'allDayEvent',
  defaultDate: new Date(2015, 3, 13),
  endAccessor: 'endDate',
  events: adjusted,
  localizer: mLocalizer,
  titleAccessor: 'label',
  tooltipAccessor: 'label',
  startAccessor: 'startDate',
  idAccessor: 'id'
}
/** END Specific to event key accessors */

/** Specific to resource key accessors */
const adjustedResourceEvents = resourceEvents.map((event) => {
  const {
    resourceId: ResourceId,
    ...other
  } = event;
  return { ...other, ResourceId }
})
const adjustedResources = resources.map(({ id: Id, title: Title }) => ({
  Id,
  Title,
}))

export const resourceAccessorStoryArgs = {
  defaultDate: new Date(2015, 3, 4),
  defaultView: Views.DAY,
  events: adjustedResourceEvents,
  localizer: mLocalizer,
  resourceIdAccessor: 'Id',
  resources: adjustedResources,
  resourceTitleAccessor: 'Title',
  resourceAccessor: 'ResourceId',
}
/** END Specific to resource key accessors */
