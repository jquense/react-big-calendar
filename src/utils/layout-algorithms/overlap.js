import sortBy from 'lodash/sortBy'

// Terminology below:
// container:
// These are the largest grouping entities that can encompass multiple rows. 
// A container in this scenario can be thought of as a block of time or a particular segment 
// of the schedule where multiple related events occur.

// Rows within Containers
// These sub-groupings within containers help manage events that are related but might not directly overlap. 
// Each row can contain multiple leaves.

// Leaves in Rows: 
// The individual events that do not contain other events but are contained within rows. 
// They are the actual entries or appointments in the calendar.

// Leaves:
// Leaves in this context refer to the individual events that are the last level within a grouping hierarchy. 
// They do not contain other events but are contained by a row. 
// Leaves are essentially the 'children' in this hierarchical model, 
// where they represent the most granular level of detail or the smallest grouping unit within an event container.

// Rows:
// Rows represent a middle layer in the hierarchy that groups multiple leaves (events). 
// A row can contain one or more leaves but itself is contained within a container. 
// Rows help organize events that occur in the same timeframe but might not be directly overlapping. 
// They can be thought of as a sub-grouping within a larger event structure (container) 
// where events are related or share similar characteristics, such as a similar start time or location within a view.

// ================================================================================================================

// Functionality below:
// The function getStyledEvents() takes a set of events and processes them through 
// a series of steps to categorize them into containers, rows, and leaves 
// based on their timing and overlapping characteristics.

// The sortByRender() function sorts these events primarily by their start time, 
// helping arrange them sequentially.

// Overlapping events are then grouped into containers. 
// If an event cannot fit into an existing container, it becomes a new container.

// Within each container, the code attempts to place events into existing rows based on their start times and overlap. 
// If an event does not fit into any existing row, it starts a new row.

// Events that fit into a row become leaves of that row.

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

  /**
   * The event's width without any overlap.
   */
  get _width() {
    // The container event's width is determined by the maximum number of
    // events in any of its rows.
    if (this.rows) {
      const columns =
        this.rows.reduce(
          (max, row) => Math.max(max, row.leaves.length + 1), // add itself
          0
        ) + 1 // add the container
      // this section handles the logic for container with leaves (in this case all the short events belong to Long_1)
      return 100 / columns;
    }

    const availableWidth = 100 - this.container._width

    // The row event's width is the space left by the container, divided
    // among itself and its leaves.
    if (this.leaves) {
      return availableWidth / (this.leaves.length + 1)
    }

    // this handles leaves
    // The leaf event's width is determined by its row's width
    return this.row._width;
  }

  // For dev
  getEventTitle() {
    return this.data.title;
  }

  /**
   * The event's calculated width, possibly with extra width added for
   * overlapping effect.
   */
  get width() {
    const noOverlap = this._width
    const overlap = Math.min(100, this._width * 1.7)

    // Containers can always grow.
    if (this.rows) {
      return overlap
    }

    // Rows can grow if they have leaves.
    if (this.leaves) {
      return this.leaves.length > 0 ? overlap : noOverlap
    }

    // Leaves can grow unless they're the last item in a row.
    const { leaves } = this.row
    const index = leaves.indexOf(this)
    return index === leaves.length - 1 ? noOverlap : overlap
  }

  get xOffset() {
    // Containers have no offset.
    if (this.rows) {
      return 0;
    }

    // Rows always start where their container ends.
    if (this.leaves) {
      return this.container._width
    }

    // Leaves are spread out evenly on the space left by its row.
    const { leaves, xOffset, _width } = this.row
    const index = leaves.indexOf(this) + 1
    return xOffset + index * _width
  }
}

/**
 * Return true if event a and b is considered to be on the same row.
 */
function onSameRow(a, b, minimumStartDifference) {
  return (
    // Occupies the same start slot.
    Math.abs(b.start - a.start) < minimumStartDifference ||
    // A's start slot overlaps with b's end slot.
    (b.start > a.start && b.start < a.end) // b start is inbtween a start and a end
  )
}

function isLeafTouchingEvent(event, row) {
  return row.leaves.every(leaf => {
      // Check if leaf start time is within the event duration
      const startsDuringEvent = leaf.start >= event.start && leaf.start < event.end;
      // Check if leaf end time is within the event duration
      const endsDuringEvent = leaf.end > event.start && leaf.end <= event.end;
      // Check if the leaf completely encompasses the event duration
      const encompassesEvent = leaf.start <= event.start && leaf.end >= event.end;
      // Return true if any of these conditions are true
      return startsDuringEvent || endsDuringEvent || encompassesEvent;
  });
}

function sortByRender(events) {
  const sortedByTime = sortBy(events, ['startMs', e => -e.endMs])

  const sorted = []
  while (sortedByTime.length > 0) {
    const event = sortedByTime.shift()
    sorted.push(event)

    for (let i = 0; i < sortedByTime.length; i++) {
      const test = sortedByTime[i]

      // Still inside this event, look for next.
      if (event.endMs > test.startMs) continue

      // We've found the first event of the next event group.
      // If that event is not right next to our current event, we have to
      // move it here.
      if (i > 0) {
        const event = sortedByTime.splice(i, 1)[0]
        sorted.push(event)
      }

      // We've already found the next event group, so stop looking.
      break
    }
  }

  return sorted
}

export default function getStyledEvents({
  events,
  minimumStartDifference,
  slotMetrics,
  accessors,
}) {
  // Create proxy events and order them so that we don't have
  // to fiddle with z-indexes.
  const proxies = events.map(
    event => new Event(event, { slotMetrics, accessors })
  )
  const eventsInRenderOrder = sortByRender(proxies)

  // Group overlapping events, while keeping order.
  // Every event is always one of: container, row or leaf.
  // Containers can contain rows, and rows can contain leaves.
  const containerEvents = []
  for (let i = 0; i < eventsInRenderOrder.length; i++) {
    const event = eventsInRenderOrder[i]

    // Check if this event can go into a container event.
    const container = containerEvents.find(
      c =>
        c.end > event.start ||
        Math.abs(event.start - c.start) < minimumStartDifference
    )

    // Couldn't find a container — that means this event is a container.
    if (!container) {
      event.rows = []
      containerEvents.push(event)
      continue
    }

    // Found a container for the event.
    event.container = container

    // Check if the event can be placed in an existing row.
    // Start looking from behind.
    let row = null
    for (let j = container.rows.length - 1; !row && j >= 0; j--) {
      // compares the event with the container's rows
      // in staircase issue^, this is the long event
      if (onSameRow(container.rows[j], event, minimumStartDifference)) {
        row = container.rows[j]
      }
    }

    if (row && isLeafTouchingEvent(event, row)) {
      // Found a row, so add it.
      row.leaves.push(event)
      event.row = row
    } else {
      // Couldn't find a row – that means this event is a row.
      event.leaves = []
      container.rows.push(event)
    }
    // Problem: it all belongs to the same row but events that are not actually overlapping are being placed in the same row
    // console.log(event.data.title, "leaves:", event.row?.leaves.map(leaf => leaf.data.title)) // TODO: delete
  }

  // Return the original events, along with their styles.
  return eventsInRenderOrder.map(event => ({
    event: event.data,
    style: {
      top: event.top,
      height: event.height,
      width: event.width,
      xOffset: Math.max(0, event.xOffset),
    },
  }))
}
