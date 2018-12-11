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
    this.startMs = startDate.getTime()
    this.endMs = endDate.getTime()
    this.top = top
    this.height = height
    this.data = data
  }
}

export default function getPositionedEvents({
  events: rawEvents,
  slotMetrics,
  accessors,
}) {
  const events = rawEvents
    .map(event => new Event(event, { accessors, slotMetrics }))
    .sort((a, b) => {
      if (a.height === b.height) {
        return a.startMs - b.startMs
      }

      return b.height - a.height
    })

  const columns = []

  return events
    .map(event => {
      let currentColumnIndex = 0
      let availableColumnIndex = null
      while (availableColumnIndex === null) {
        if (!columns[currentColumnIndex]) {
          columns.push([])
        }

        const currentColumn = columns[currentColumnIndex]

        let overlap = false
        for (
          let eventIndex = 0;
          eventIndex < currentColumn.length;
          eventIndex++
        ) {
          const existingEvent = currentColumn[eventIndex]
          if (event.start >= existingEvent.end) continue
          if (event.end <= existingEvent.start) continue

          // overlap with existing event
          overlap = true
        }

        if (overlap) {
          currentColumnIndex++
        } else {
          columns[currentColumnIndex].push(event)
          availableColumnIndex = currentColumnIndex
        }
      }

      return [event, availableColumnIndex]
    })
    .map(([event, availableColumnIndex]) => ({
      event: event.data,
      style: {
        top: event.top,
        height: event.height,
        width: 100 / columns.length,
        xOffset:
          availableColumnIndex === 0
            ? 0
            : (availableColumnIndex / columns.length) * 100,
      },
    }))
}
