import sortBy from 'lodash/sortBy'

class Event {
  constructor(data, { accessors, slotMetrics }) {
    const {
      start,
      startDate,
      end,
      endDate,
      top,
      height,
    } = slotMetrics.getRange(accessors.start(data), accessors.end(data))

    this.start = start
    this.end = end
    this.startMs = +startDate
    this.endMs = +endDate
    this.top = top
    this.height = height
    this.data = data
  }
}

function areEventsTooCloseOrOverlapping(a, b, minimumStartDifference) {
  return (
    // Occupies the same start slot.
    Math.abs(b.start - a.start) < minimumStartDifference ||
    // A's start slot overlaps with b's end slot.
    (b.start > a.start && b.start < a.end)
  )
}

function getStyledEvents({
  events,
  minimumStartDifference,
  slotMetrics,
  accessors,
}) {
  if (events.length === 0) return []

  const proxies = events.map(
    event => new Event(event, { slotMetrics, accessors })
  )

  const sortedByTime = sortBy(proxies, ['startMs', e => -e.endMs])

  const firstEvent = sortedByTime.shift()

  const groups = [[[firstEvent]]]
  let eventWithLatestEnd = firstEvent

  sortedByTime.forEach(event => {
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
      let eventAdded = false
      const latestGroup = groups[groups.length - 1]

      for (let i = 0; i < latestGroup.length; i++) {
        let column = latestGroup[i]
        let lastInColumn = column[column.length - 1]

        // If event doesn't collide with the latest event in the column
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
      }

      // If event has not been appended, create a new column in this group
      if (!eventAdded) {
        latestGroup.push([event])
      }
    }

    if (event.endMs > eventWithLatestEnd.endMs) {
      eventWithLatestEnd = event
    }
  })

  // Flatten [groups > columns > events] structure and set css properties
  return groups.reduce(
    (acc, group) =>
      acc.concat(
        group.reduce(
          (_acc, column, columnIdx) =>
            _acc.concat(
              column.map(event => ({
                event: event.data,
                style: {
                  top: event.top,
                  height: event.height,
                  width:
                    columnIdx === group.length - 1
                      ? 100 / group.length
                      : (100 / group.length) * 1.7,
                  xOffset: (100 / group.length) * columnIdx,
                },
              }))
            ),
          []
        )
      ),
    []
  )
}

export { getStyledEvents }
