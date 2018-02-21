import { accessor as get } from './accessors'

export const NONE = {}

export default function Resources(resources, resourceIdAccessor) {
  return {
    map(fn) {
      if (!resources) return [fn([NONE, null], 0)]
      return resources.map((resource, idx) =>
        fn([get(resource, resourceIdAccessor), resource], idx)
      )
    },

    groupEvents(events, resourceAccessor) {
      const eventsByResource = new Map()
      events.forEach(event => {
        const id = get(event, resourceAccessor) || NONE
        let resourceEvents = eventsByResource.get(id) || []
        resourceEvents.push(event)
        eventsByResource.set(id, resourceEvents)
      })
      return eventsByResource
    },
  }
}
