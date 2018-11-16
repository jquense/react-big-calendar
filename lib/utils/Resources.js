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
      var eventsByResource = new window.Map()
      events.forEach(function(event) {
        var id = accessors.resource(event) || NONE
        var resourceEvents = eventsByResource.get(id) || []
        resourceEvents.push(event)
        eventsByResource.set(id, resourceEvents)
      })
      return eventsByResource
    },
  }
}
