export const NONE = {}

export default function Resources(resources, accessors) {
  return {
    map(fn) {
      if (!resources) return [fn([NONE, null], 0)]
      return resources.map((resource, idx) =>
        fn([accessors.resourceId(resource), resource], idx)
      )
    },

    groupEvents(events) {
      // console.log("groupEvents",events);
      const eventsByResource = new Map()

      if (!resources) {
        // console.log("no resources");
        // Return all events if resources are not provided
        eventsByResource.set(NONE, events)
        return eventsByResource
      }

      events.forEach(event => {
        const id = accessors.resource(event) || NONE

        //split up if it is an array
        if (Array.isArray(id)) {
          id.forEach(item => {
            let resourceEvents = eventsByResource.get(item) || []
            resourceEvents.push(event)
            eventsByResource.set(item, resourceEvents)
          })
        } else {
          let resourceEvents = eventsByResource.get(id) || []
          resourceEvents.push(event)
          eventsByResource.set(id, resourceEvents)
        }
      })
      // console.log("eventsByResource", eventsByResource);
      return eventsByResource
    },
  }
}
