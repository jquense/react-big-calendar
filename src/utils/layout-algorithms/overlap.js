import sortBy from 'lodash/sortBy'
import { mergeRanges } from '../rangeFunctions'

/**
 * @typedef {{ start: number, end: number }} Range
 */

/**
 * The original library categorized events as containers, rows, or leaves - where a container can contain many rows
 * and a row can contain many leaves. However there are layout issues with this approach. The biggest we found was
 * that each leaf would always take up its own column even if it could share another leaf's column without overlapping.
 * There was no logic to account for more than 3 events occurring at the same time since it was always assumed that
 * each leaf occupied its own column.
 *
 * This new approach is more flexible and is built on ranges. Each EventRange can have multiple child EventRanges,
 * which allows for nesting beyond the 3 layers that the original library was built to support.
 *
 * An EventRange includes an array of events. These events are the events that are showing at that ranges specific
 * depth. The child ranges' events are not included.
 */
export class EventRange {
  /**
   * @param {number} start
   * @param {number} end
   */
  constructor(start, end) {
    /**
     * @type {number}
     */
    this.start = start

    /**
     * @type {number}
     */
    this.end = end

    /**
     * @type {Event[]}
     */
    this.events = []

    /**
     * @type {EventRange | null}
     */
    this.parentRange = null

    /**
     * @type {EventRange[]}
     */
    this.childRanges = []

    // Memoized values below. These values require recursively checking parents/children,
    // so it's best to save the value after it's been calculated once.

    /**
     * @type {number | null}
     * @private
     */
    this._depth = null

    /**
     * @type {number | null}
     * @private
     */
    this._maxDepth = null

    /**
     * @type {number | null}
     * @private
     */
    this._width = null

    /**
     * @type {number | null}
     * @private
     */
    this._xOffset = null
  }

  /**
   * The depth of this range, with 0 being the topmost range.
   * @returns number
   */
  get depth() {
    if (this._depth !== null) {
      return this._depth
    }

    if (this.parentRange) {
      this._depth = this.parentRange.depth + 1
    } else {
      this._depth = 0
    }

    return this._depth
  }

  /**
   * The max depth this range goes to, checking all child ranges to see which
   * one has the deepest nesting.
   * @returns {number}
   */
  get maxDepth() {
    if (this._maxDepth !== null) {
      return this._maxDepth
    }

    if (this.childRanges.length === 0) {
      this._maxDepth = this.depth
      return this._maxDepth
    }

    const maxChildDepth = Math.max(
      ...this.childRanges.map(range => range.maxDepth)
    )
    this._maxDepth = maxChildDepth
    return this._maxDepth
  }

  /**
   * The width of this range's column, given in percent (i.e. a value of 50 means 50%).
   * @returns {number}
   */
  get width() {
    if (this._width !== null) {
      return this._width
    }

    const availableWidth = 100 - this.xOffset
    // Plus one to include self.
    const layersRemaining = this.maxDepth - this.depth + 1
    this._width = availableWidth / layersRemaining
    return this._width
  }

  /**
   * The width of the gap to the left of this range's column, given in percent (i.e.
   * a value of 50 means 50%).
   * @returns {number}
   */
  get xOffset() {
    if (this._xOffset !== null) {
      return this._xOffset
    }

    if (!this.parentRange) {
      this._xOffset = 0
      return 0
    }

    const parentTotalWidth = this.parentRange.xOffset + this.parentRange.width
    this._xOffset = parentTotalWidth
    return this._xOffset
  }

  /**
   * @param {EventRange[]} ranges
   */
  addRanges(ranges) {
    ranges.forEach(range => {
      range.parentRange = this
      this.childRanges.push(range)
    })
  }

  /**
   * Adds an event to this range.
   * @param {Event} event
   */
  addEvent(event) {
    this.events.push(event)
    event.range = this
  }

  /**
   * Checks if an event overlaps with this range.
   * @param {Event} event
   */
  isEventInRange(event) {
    if (event.start >= this.start && event.start < this.end) {
      return true
    }

    if (event.end > this.start && event.end <= this.end) {
      return true
    }

    if (event.start < this.start && event.end > this.end) {
      return true
    }

    return false
  }
}

export class Event {
  constructor(data, { accessors, slotMetrics }) {
    const {
      start,
      startDate,
      end,
      endDate,
      top,
      height,
    } = slotMetrics.getRange(accessors.start(data), accessors.end(data))

    /**
     * @type {EventRange | null}
     */
    this.range = null
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
    if (!this.range) {
      return 100
    }

    return this.range.width
  }

  /**
   * The event's calculated width, possibly with extra width added for
   * overlapping effect.
   */
  get width() {
    const noOverlap = this._width
    const overlap = Math.min(100, this._width * 1.7)

    if (!this.range) {
      return noOverlap
    }

    if (this.range.childRanges.length === 0) {
      return noOverlap
    }

    return overlap
  }

  get xOffset() {
    if (!this.range) {
      return 0
    }

    return this.range.xOffset
  }
}

/**
 * Sort the events in a way that makes building the ranges easier.
 * First order by start time (earliest first).
 * Break ties by the end time (latest first).
 * @param {Event[]} events
 * @returns {Event[]}
 */
function sortByTime(events) {
  return sortBy(events, ['startMs', e => -e.endMs])
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
  const sortedEvents = sortByTime(proxies)
  const eventRanges = createNestedRanges(sortedEvents, minimumStartDifference)

  /**
   * Instead of calculating z-indexes to use for each event, we can simply render in
   * an order that allows the DOM to use the correct stacking order.
   * @type {Event[]}
   */
  const eventsInRenderOrder = []

  /**
   * @param {EventRange} eventRange
   */
  const addEventsFromRange = eventRange => {
    eventRange.events.forEach(event => {
      eventsInRenderOrder.push(event)
    })
    eventRange.childRanges.forEach(addEventsFromRange)
  }

  eventRanges.forEach(addEventsFromRange)

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

/**
 * Recursively creates all the EventRanges given an an array of events.
 * This returns only the top-level ranges, which have references pointing to their child ranges.
 *
 * The events should be pre-sorted before being passed into this function.
 * @param {Event[]} sortedEvents
 * @param {number} minimumStartDifference
 * @returns {EventRange[]}
 */
export function createNestedRanges(sortedEvents, minimumStartDifference) {
  const plainRanges = sortedEvents.map(event => ({
    start: event.start,
    end: Math.max(event.end, event.start + minimumStartDifference),
  }))
  const mergedRanges = mergeRanges(plainRanges, false)
  let remainingEvents = sortedEvents

  const eventRanges = mergedRanges.map(range => {
    const {
      eventRange,
      childEvents,
      remainingEvents: returnedRemainingEvents,
    } = createEventRange(range, remainingEvents, minimumStartDifference)
    remainingEvents = returnedRemainingEvents

    if (childEvents.length > 0) {
      const childEventRanges = createNestedRanges(
        childEvents,
        minimumStartDifference
      )
      eventRange.addRanges(childEventRanges)
    }

    return eventRange
  })

  return eventRanges
}

/**
 * Create an EventRange given a start and end point and the list of available events.
 *
 * The events should be pre-sorted before being passed into this function.
 * @param {Range} range
 * @param {Event[]} sortedEvents
 * @param {number} minimumStartDifference
 */
function createEventRange(range, sortedEvents, minimumStartDifference) {
  const eventRange = new EventRange(range.start, range.end)

  /**
   * @type {number | null}
   */
  let blockedUntil = null
  /**
   * @type {Event[]}
   */
  const childEvents = []
  /**
   * @type {Event[]}
   */
  const remainingEvents = []

  // Group the events into three categories:
  // - Events directly in this range (not in a parent or child)
  // - Events that are in this range's child ranges
  // - Events that are outside of this range completely
  sortedEvents.forEach(event => {
    if (!eventRange.isEventInRange(event)) {
      remainingEvents.push(event)
      return
    }

    if (blockedUntil !== null && event.start < blockedUntil) {
      childEvents.push(event)
      return
    }

    blockedUntil = Math.max(event.end, event.start + minimumStartDifference)
    eventRange.addEvent(event)
  })

  return { eventRange, childEvents, remainingEvents }
}
