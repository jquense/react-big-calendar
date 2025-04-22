import sortBy from 'lodash/sortBy'
import { mergeRanges } from '../rangeFunctions'
import _ from 'lodash'

const HIDDEN_EVENT_WIDTH = '10px'

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
    this.hiddenEvents = []

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

    /**
     * @type {Range[] | null}
     * @private
     */
    this._blockedTimes = null
  }

  get blockedTimes() {
    if (this._blockedTimes !== null) {
      return this._blockedTimes
    }

    this._blockedTimes = mergeRanges(this.events)
    return this._blockedTimes
  }

  get hasHiddenEvents() {
    return this.hiddenEvents.length > 0
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
    return isItemInRange(event, this)
  }
}

/**
 * An updated class from the original library.
 *
 * In general, an event will inherit the xOffset and width from the range it belongs to.
 * However, there are cases where an event has room to grow beyond its range.
 * Example:
 *
 * ```text
 * ┌─┬─┬─┐
 * │A│B│ │
 * └─┴─┤ │
 *     │C│
 * ┌─┐ │ │
 * │D│ │ │
 * └─┘ └─┘
 * ```
 *
 * In this example, event D is in the same range as event A.
 * There is no event blocking event D from expanding into the next range though.
 * By determining how many open ranges that can be expanded into, we can fill that space:
 *
 * ```text
 * ┌─┬─┬─┐
 * │A│B│ │
 * └─┴─┤ │
 *     │C│
 * ┌───┤ │
 * │ D │ │
 * └───┴─┘
 * ```
 */
export class Event {
  constructor(data, { accessors, slotMetrics, minimumStartDifference = 0 }) {
    const {
      start,
      startDate,
      end,
      endDate,
      top,
      height,
    } = slotMetrics.getRange(accessors.start(data), accessors.end(data))

    /**
     * Save this value since it's useful when building the event tree.
     * @type {number}
     */
    this.minimumStartDifference = minimumStartDifference

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

    // Memoized values below. These values require recursively checking parents/children,
    // so it's best to save the value after it's been calculated once.

    /**
     * Events in the parent range that overlap with some part of this event.
     * @type {Event[] | null}
     */
    this._parentEvents = null

    /**
     * Events in the child ranges that overlap with some part of this event.
     * @type {Event[] | null}
     */
    this._childEvents = null

    /**
     * The number of open ranges below this event.
     * Useful for determining when an event can expand past its range.
     * @type {number | null}
     */
    this._openRangesBelow = null

    /**
     * @type {{ openRanges: number, maxLocalDepth: number } | null}
     */
    this._expansionDetails = null

    /**
     * @type {number | null}
     */
    this._xOffset = null

    /**
     * @type {number | null}
     */
    this._baseWidth = null
  }

  /**
   * Navigate to the top range that this event belongs to and build a tree, adding relationships
   * between events of adjacent ranges if their times overlap.
   */
  buildEventTree() {
    let topRange = this.range
    if (!topRange) {
      return
    }

    while (topRange.parentRange) {
      topRange = topRange.parentRange
    }

    let rangesToCheck = [topRange]
    while (rangesToCheck.length > 0) {
      const nextRanges = []

      rangesToCheck.forEach(parentRange => {
        nextRanges.push(...parentRange.childRanges)

        parentRange.events.forEach(parentEvent => {
          parentEvent._childEvents ||= []
          parentEvent._parentEvents ||= []

          parentRange.childRanges.forEach(childRange => {
            childRange.events.forEach(childEvent => {
              if (
                isItemInRange(
                  childEvent,
                  parentEvent,
                  this.minimumStartDifference
                )
              ) {
                parentEvent._childEvents.push(childEvent)

                childEvent._parentEvents ||= []
                childEvent._parentEvents.push(parentEvent)
              }
            })
          })
        })
      })

      rangesToCheck = nextRanges
    }
  }

  get parentEvents() {
    if (this._parentEvents !== null) {
      return this._parentEvents
    }

    this.buildEventTree()
    return this._parentEvents
  }

  get childEvents() {
    if (this._childEvents !== null) {
      return this._childEvents
    }

    this.buildEventTree()
    return this._childEvents
  }

  /**
   * Expansion details describe the open space between this event and the next blocking event.
   * Used to allow events to expand outside of their range in certain cases.
   *
   * For events with children, this returns the most restrictive details from its children.
   *
   * @returns {{ maxLocalDepth: number, openRanges: number }}
   */
  get expansionDetails() {
    if (this._expansionDetails) {
      return this._expansionDetails
    }

    if (this.childEvents.length > 0) {
      let mostRestrictiveCompareFactor = null
      let mostRestrictiveDetails = null
      this.childEvents.forEach(event => {
        const { openRanges, maxLocalDepth } = event.expansionDetails
        const compareFactor = openRanges / (maxLocalDepth + 1)

        if (
          mostRestrictiveDetails === null ||
          compareFactor < mostRestrictiveCompareFactor
        ) {
          mostRestrictiveCompareFactor = compareFactor
          mostRestrictiveDetails = event.expansionDetails
        }
      })

      this._expansionDetails = mostRestrictiveDetails
      return this._expansionDetails
    }

    this._expansionDetails = {
      maxLocalDepth: this.range.depth,
      openRanges: this.openRangesBelow,
    }
    return this._expansionDetails
  }

  get isHiddenEvent() {
    return this.data?.is_hidden || this.data?.is_recurring_event_hidden
  }

  /**
   * Count the number of open ranges below this event.
   * These are used to determine how much this event (and its parents) can expand.
   */
  get openRangesBelow() {
    if (this._openRangesBelow !== null) {
      return this._openRangesBelow
    }

    if (!this.range) {
      this._openRangesBelow = 0
      return this._openRangesBelow
    }

    if (this.range.childRanges.length === 0) {
      this._openRangesBelow = 0
      return this._openRangesBelow
    }

    let count = 0
    let nextRanges = []
    let rangesToCheck = this.range.childRanges

    // Dig through the ranges below this event to find the first blocking event.
    while (rangesToCheck.length > 0) {
      const blockedRanges = rangesToCheck.filter(range => {
        const isBlocked = range.blockedTimes.some(blockedTime =>
          isItemInRange(this, blockedTime, this.minimumStartDifference)
        )
        if (!isBlocked) {
          nextRanges.push(...range.childRanges)
        }
        return isBlocked
      })
      if (blockedRanges.length === 0) {
        count++
        rangesToCheck = nextRanges
        nextRanges = []
      } else {
        if (count > 0) {
          break
        }

        let minimumOpenRanges = null
        blockedRanges.forEach(range => {
          range.events.forEach(event => {
            if (isItemInRange(this, event)) {
              if (
                minimumOpenRanges === null ||
                event.openRangesBelow < minimumOpenRanges
              ) {
                minimumOpenRanges = event.openRangesBelow
              }
            }
          })
        })

        this._openRangesBelow = minimumOpenRanges
        return this._openRangesBelow
      }
    }

    this._openRangesBelow = count
    return this._openRangesBelow
  }

  /**
   * The event's width without any overlap.
   * A range should always be set before rendering an event.
   * A fallback of 100 is provided just in case though instead of raising an error.
   */
  get baseWidth() {
    if (this._baseWidth != null) {
      return this._baseWidth
    }

    if (this.isHiddenEvent) {
      this._baseWidth = HIDDEN_EVENT_WIDTH
      return this._baseWidth
    }

    if (!this.range) {
      this._baseWidth = 100
      return this._baseWidth
    }

    if (this.expansionDetails.openRanges > 0) {
      const { openRanges, maxLocalDepth } = this.expansionDetails
      /**
       * @type {Event | null}
       */
      let rightmostParent = null
      this.parentEvents.forEach(event => {
        if (!rightmostParent) {
          rightmostParent = event
        }

        if (
          event.baseWidth + event.xOffset >
          rightmostParent.baseWidth + rightmostParent.xOffset
        ) {
          rightmostParent = event
        }
      })

      if (
        rightmostParent &&
        _.isEqual(this.expansionDetails, rightmostParent.expansionDetails)
      ) {
        // When the event has the same expansion details as its parent, the two events have the same width.
        this._baseWidth = rightmostParent.baseWidth
        return this._baseWidth
      } else {
        // When the event's expansion details are different from its parents (or it doesn't have a parent),
        // the baseWidth must be calculated.
        const parentExtraWidth = (() => {
          if (!rightmostParent) {
            return 0
          }

          const parentTotalWidth =
            rightmostParent.baseWidth + rightmostParent.xOffset
          // The parent's total width, prior to expansion.
          const parentRangeTotalWidth =
            (rightmostParent.range.depth + 1) * rightmostParent.range.width
          return parentTotalWidth - parentRangeTotalWidth
        })()

        const affectedDepthCount =
          maxLocalDepth - (rightmostParent?.range.depth ?? -1)
        const scaleFactor = 1 + openRanges / affectedDepthCount

        this._baseWidth =
          this.range.width * scaleFactor - parentExtraWidth / affectedDepthCount
        return this._baseWidth
      }
    }

    this._baseWidth = this.range.width
    return this._baseWidth
  }

  /**
   * The event's calculated width, possibly with extra width added for
   * overlapping effect.
   */
  get width() {
    const noOverlap = this.baseWidth
    const overlap = Math.min(100 - this.xOffset, this.baseWidth * 1.7)

    if (this.isHiddenEvent) {
      return noOverlap
    }

    if (!this.range) {
      return noOverlap
    }

    if (this.range.childRanges.length === 0) {
      return noOverlap
    }

    return overlap
  }

  get xOffset() {
    if (this._xOffset != null) {
      return this._xOffset
    }

    if (this.isHiddenEvent) {
      this._xOffset = 0
      return this._xOffset
    }

    if (!this.range) {
      this._xOffset = 0
      return this._xOffset
    }

    // If the event has room to expand, then we base the xOffset off of the
    // widest parent event.
    if (this.expansionDetails.openRanges > 0) {
      const parentsMaxWidth = Math.max(
        0,
        ...this.parentEvents.map(event => {
          return event.xOffset + event.baseWidth
        })
      )
      this._xOffset = parentsMaxWidth
      return this._xOffset
    }

    // If the event does not have room to expand, it simply follows the
    // EventRange it belongs to.
    this._xOffset = this.range.xOffset
    return this._xOffset
  }
}

/**
 * Check if an item overlaps with a range.
 * It is not considered an overlap if the item and range are adjacent.
 * @param {Range} item
 * @param {Range} range
 * @param {number=} minimumStartDifference the minimum duration an event will be rendered as
 */
function isItemInRange(item, range, minimumStartDifference = 0) {
  const itemEnd = Math.max(item.end, item.start + minimumStartDifference)
  const rangeEnd = Math.max(range.end, range.start + minimumStartDifference)

  if (item.start >= range.start && item.start < rangeEnd) {
    return true
  }

  if (itemEnd > range.start && itemEnd <= rangeEnd) {
    return true
  }

  if (item.start < range.start && itemEnd > rangeEnd) {
    return true
  }

  return false
}

/**
 * Sort the events in a way that makes building the ranges easier.
 * First order by start time (earliest first).
 * Break ties by the duration (longer events first).
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
    event =>
      new Event(event, { slotMetrics, accessors, minimumStartDifference })
  )
  const sortedEvents = sortByTime(proxies)
  const eventRanges = createNestedRanges(sortedEvents, minimumStartDifference)
  if (sortedEvents.length > 0) {
    sortedEvents[0].buildEventTree(minimumStartDifference)
  }

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
    eventRange.hiddenEvents.forEach(event => {
      eventsInRenderOrder.push(event)
    })
    eventRange.events.forEach(event => {
      eventsInRenderOrder.push(event)
    })
    eventRange.childRanges.forEach(addEventsFromRange)
  }

  eventRanges.forEach(addEventsFromRange)

  const getWidth = event => {
    const defaultWidth = event.width
    if (defaultWidth === 100 && event.range.hasHiddenEvents) {
      return `calc(100% - ${HIDDEN_EVENT_WIDTH})`
    }
    return defaultWidth
  }

  const getXOffset = event => {
    const defaultOffset = Math.max(0, event.xOffset)
    if (defaultOffset > 0) {
      //if not 0 -> return default offset
      return defaultOffset
    }
    if (event.isHiddenEvent) {
      return 0
    }
    if (event.range.hasHiddenEvents) {
      return HIDDEN_EVENT_WIDTH
    }
    return defaultOffset
  }

  // Return the original events, along with their styles.
  return eventsInRenderOrder.map(event => ({
    event: event.data,
    style: {
      top: event.top,
      height: event.height,
      width: getWidth(event),
      xOffset: getXOffset(event),
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
    if (event.isHiddenEvent) {
      eventRange.hiddenEvents.push(event)
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
