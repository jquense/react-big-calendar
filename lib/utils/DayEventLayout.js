'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.getStyledEvents = getStyledEvents

var _sortBy = _interopRequireDefault(require('lodash/sortBy'))

var Event = function Event(data, _ref) {
  var accessors = _ref.accessors,
    slotMetrics = _ref.slotMetrics

  var _slotMetrics$getRange = slotMetrics.getRange(
      accessors.start(data),
      accessors.end(data)
    ),
    start = _slotMetrics$getRange.start,
    startDate = _slotMetrics$getRange.startDate,
    end = _slotMetrics$getRange.end,
    endDate = _slotMetrics$getRange.endDate,
    top = _slotMetrics$getRange.top,
    height = _slotMetrics$getRange.height

  this.start = start
  this.end = end
  this.startMs = +startDate
  this.endMs = +endDate
  this.top = top
  this.height = height
  this.data = data
}

function areEventsTooCloseOrOverlapping(a, b, minimumStartDifference) {
  return (
    // Occupies the same start slot.
    Math.abs(b.start - a.start) < minimumStartDifference || // A's start slot overlaps with b's end slot.
    (b.start > a.start && b.start < a.end)
  )
}

function getStyledEvents(_ref2) {
  var events = _ref2.events,
    minimumStartDifference = _ref2.minimumStartDifference,
    slotMetrics = _ref2.slotMetrics,
    accessors = _ref2.accessors
  if (events.length === 0) return []
  var proxies = events.map(function(event) {
    return new Event(event, {
      slotMetrics: slotMetrics,
      accessors: accessors,
    })
  })
  var sortedByTime = (0, _sortBy.default)(proxies, [
    'startMs',
    function(e) {
      return -e.endMs
    },
  ])
  var firstEvent = sortedByTime.shift()
  var groups = [[[firstEvent]]]
  var eventWithLatestEnd = firstEvent
  sortedByTime.forEach(function(event) {
    // If event is the first or doesn't collide with the latest group
    // create a new group
    if (
      !areEventsTooCloseOrOverlapping(
        eventWithLatestEnd,
        event,
        minimumStartDifference
      )
    ) {
      groups.push([[event]])
    } else {
      var eventAdded = false
      var latestGroup = groups[groups.length - 1]

      for (var i = 0; i < latestGroup.length; i++) {
        var column = latestGroup[i]
        var lastInColumn = column[column.length - 1] // If event doesn't collide with the latest event in the column
        // append it to the column

        if (
          !areEventsTooCloseOrOverlapping(
            lastInColumn,
            event,
            minimumStartDifference
          )
        ) {
          column.push(event)
          eventAdded = true
          break
        }
      } // If event has not been appended, create a new column in this group

      if (!eventAdded) {
        latestGroup.push([event])
      }
    }

    if (event.endMs > eventWithLatestEnd.endMs) {
      eventWithLatestEnd = event
    }
  }) // Flatten [groups > columns > events] structure and set css properties

  return groups.reduce(function(acc, group) {
    return acc.concat(
      group.reduce(function(_acc, column, columnIdx) {
        return _acc.concat(
          column.map(function(event) {
            return {
              event: event.data,
              style: {
                top: event.top,
                height: event.height,
                width:
                  columnIdx === group.length - 1
                    ? 100 / group.length
                    : (100 / group.length) * 1,
                xOffset: (100 / group.length) * columnIdx,
              },
            }
          })
        )
      }, [])
    )
  }, [])
}
