'use strict'

exports.__esModule = true
exports.default = Resources
exports.NONE = void 0
var NONE = {}
exports.NONE = NONE

function Resources(resources, accessors) {
  return {
    map: function map(fn) {
      if (!resources) return [fn([NONE, null], 0)]
      return resources.map(function(resource, idx) {
        return fn([accessors.resourceId(resource), resource], idx)
      })
    },
    groupEvents: function groupEvents(events, partTimeResourceIds) {
      var eventsByResource = new Map()

      if (!resources) {
        // Return all events if resources are not provided
        eventsByResource.set(NONE, events)
        return eventsByResource
      }

      events.forEach(function(event) {
        var resourceId = accessors.resource(event)
        var id
        partTimeResourceIds.includes(resourceId)
          ? (id = 'other')
          : (id = accessors.resource(event) || NONE)
        var resourceEvents = eventsByResource.get(id) || []
        resourceEvents.push(event)
        eventsByResource.set(id, resourceEvents)
      })
      return eventsByResource
    },
  }
}
