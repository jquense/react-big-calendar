'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.NONE = void 0
exports.default = Resources
var NONE = (exports.NONE = {})
function Resources(resources, accessors) {
  return {
    map: function map(fn) {
      if (!resources) return [fn([NONE, null], 0)]
      return resources.map(function (resource, idx) {
        return fn([accessors.resourceId(resource), resource], idx)
      })
    },
    groupEvents: function groupEvents(events) {
      var eventsByResource = new Map()
      if (!resources) {
        // Return all events if resources are not provided
        eventsByResource.set(NONE, events)
        return eventsByResource
      }
      events.forEach(function (event) {
        var id = accessors.resource(event) || NONE
        if (Array.isArray(id)) {
          id.forEach(function (item) {
            var resourceEvents = eventsByResource.get(item) || []
            resourceEvents.push(event)
            eventsByResource.set(item, resourceEvents)
          })
        } else {
          var resourceEvents = eventsByResource.get(id) || []
          resourceEvents.push(event)
          eventsByResource.set(id, resourceEvents)
        }
      })
      return eventsByResource
    },
  }
}
