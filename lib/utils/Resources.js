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
    groupEvents: function groupEvents(events) {
      var eventsByResource = new Map()

      if (!resources) {
        // Return all events if resources are not provided
        eventsByResource.set(NONE, events)
        return eventsByResource
      }

      events.forEach(function(event) {
        var id = accessors.resource(event) || NONE

        if (Array.isArray(id)) {
          var resourceEvents = eventsByResource.get(item) || []
          resourceEvents.push(event)
          eventsByResource.set(item, resourceEvents)
        } else {
          var _resourceEvents = eventsByResource.get(id) || []

          _resourceEvents.push(event)

          eventsByResource.set(id, _resourceEvents)
        }
      })
      return eventsByResource
    },
  }
}