import moment from 'moment'
import momentLocalizer from '../../src/localizers/moment'
import * as dates from '../../src/utils/dates'
import {
  createNestedRanges,
  Event,
  EventRange,
} from '../../src/utils/layout-algorithms/overlap'
import { getSlotMetrics } from '../../src/utils/TimeSlots'

const localizer = momentLocalizer(moment)
const d = (...args) => new Date(2015, 3, 1, ...args)
const min = dates.startOf(d(), 'day')
const max = dates.endOf(d(), 'day')
const slotMetrics = getSlotMetrics({
  min,
  max,
  step: 30,
  timeslots: 4,
  localizer,
})
const accessors = { start: e => e.start, end: e => e.end }

describe('EventRange', () => {
  /**
   * Create a group of nested ranges with different max depths.
   */
  const createTestRanges = () => {
    const rangeA = new EventRange(1, 10)
    const rangeAA = new EventRange(1, 5)
    const rangeAB = new EventRange(5, 10)
    const rangeAAA = new EventRange(2, 3)
    const rangeABA = new EventRange(5, 8)
    const rangeABAA = new EventRange(6, 7)

    rangeA.addRanges([rangeAA, rangeAB])
    rangeAA.addRanges([rangeAAA])
    rangeAB.addRanges([rangeABA])
    rangeABA.addRanges([rangeABAA])

    return {
      rangeA,
      rangeAA,
      rangeAB,
      rangeAAA,
      rangeABA,
      rangeABAA,
    }
  }

  describe('constructor', () => {
    it('initializes the range', () => {
      const eventRange = new EventRange(1, 2)
      expect(eventRange.start).toBe(1)
      expect(eventRange.end).toBe(2)
      expect(eventRange.depth).toBe(0)
      expect(eventRange.parentRange).toBeNull()
      expect(eventRange.childRanges).toStrictEqual([])
      expect(eventRange._maxDepth).toBeNull()
      expect(eventRange._width).toBeNull()
      expect(eventRange._xOffset).toBeNull()
    })
  })

  describe('depth', () => {
    const {
      rangeA,
      rangeAA,
      rangeAB,
      rangeAAA,
      rangeABA,
      rangeABAA,
    } = createTestRanges()

    it('returns the depth of the range', () => {
      // The memoized value should be null before using the getter.
      expect(rangeA._depth).toBeNull()
      expect(rangeAB._depth).toBeNull()
      expect(rangeABA._depth).toBeNull()
      expect(rangeABAA._depth).toBeNull()

      expect(rangeABAA.depth).toBe(3)

      // The memoized value should now be set, including the recursively checked ranges.
      expect(rangeA._depth).toBe(0)
      expect(rangeAB._depth).toBe(1)
      expect(rangeABA._depth).toBe(2)
      expect(rangeABAA._depth).toBe(3)

      // Check the other ranges.
      expect(rangeAA._depth).toBeNull()
      expect(rangeAAA._depth).toBeNull()
      expect(rangeAA.depth).toBe(1)
      expect(rangeAAA.depth).toBe(2)
    })
  })

  describe('maxDepth', () => {
    const {
      rangeA,
      rangeAA,
      rangeAB,
      rangeAAA,
      rangeABA,
      rangeABAA,
    } = createTestRanges()

    it('returns the global max depth for a top-level range', () => {
      // Check that it also memoizes the value.
      expect(rangeA._maxDepth).toBeNull()
      expect(rangeA.maxDepth).toBe(3)
      expect(rangeA._maxDepth).toBe(3)
    })

    it('returns the local max depth for a mid-level range', () => {
      expect(rangeAA.maxDepth).toBe(2)
      expect(rangeAB.maxDepth).toBe(3)
      expect(rangeABA.maxDepth).toBe(3)
    })

    it("returns the range's depth for a childless range", () => {
      expect(rangeAAA.maxDepth).toBe(2)
      expect(rangeABAA.maxDepth).toBe(3)
    })
  })

  describe('width', () => {
    const {
      rangeA,
      rangeAA,
      rangeAB,
      rangeAAA,
      rangeABA,
      rangeABAA,
    } = createTestRanges()

    it("returns the width available for the range's column", () => {
      // Check that it also memoizes the value.
      expect(rangeA._width).toBeNull()
      expect(rangeA.width).toBe(25)
      expect(rangeA._width).toBe(25)

      expect(rangeAA.width).toBe(37.5)
      expect(rangeAB.width).toBe(25)
      expect(rangeAAA.width).toBe(37.5)
      expect(rangeABA.width).toBe(25)
      expect(rangeABAA.width).toBe(25)
    })
  })

  describe('xOffset', () => {
    const {
      rangeA,
      rangeAA,
      rangeAB,
      rangeAAA,
      rangeABA,
      rangeABAA,
    } = createTestRanges()

    it("returns the xOffset available for the range's column", () => {
      // Check that it also memoizes the value.
      expect(rangeA._xOffset).toBeNull()
      expect(rangeA.xOffset).toBe(0)
      expect(rangeA._xOffset).toBe(0)

      expect(rangeAA.xOffset).toBe(25)
      expect(rangeAB.xOffset).toBe(25)
      expect(rangeAAA.xOffset).toBe(62.5)
      expect(rangeABA.xOffset).toBe(50)
      expect(rangeABAA.xOffset).toBe(75)
    })
  })

  describe('addRanges', () => {
    const parentRange = new EventRange(1, 2)
    const childRange = new EventRange(3, 4)
    const grandchildRange = new EventRange(5, 6)
    const otherGrandchildRange = new EventRange(5, 6)

    it('updates both references on both ranges', () => {
      parentRange.addRanges([childRange])
      expect(parentRange.childRanges).toStrictEqual([childRange])
      expect(childRange.parentRange).toBe(parentRange)

      childRange.addRanges([grandchildRange, otherGrandchildRange])
      expect(childRange.childRanges).toStrictEqual([
        grandchildRange,
        otherGrandchildRange,
      ])
      expect(grandchildRange.parentRange).toBe(childRange)
      expect(otherGrandchildRange.parentRange).toBe(childRange)
    })
  })

  describe('addEvent', () => {
    it('updates the references of the range and the event', () => {
      const range = new EventRange(1, 5)
      const event = new Event({ start: 3, end: 5 }, { accessors, slotMetrics })

      expect(range.events).toStrictEqual([])
      expect(event.range).toBeNull()

      range.addEvent(event)

      expect(range.events).toStrictEqual([event])
      expect(event.range).toBe(range)
    })
  })

  describe('isEventInRange', () => {
    const range = new EventRange(4 * 60, 8 * 60)

    it('returns true if the event is completely within the range', () => {
      const event = new Event(
        { start: d(5), end: d(7) },
        { accessors, slotMetrics }
      )
      expect(range.isEventInRange(event)).toBe(true)
    })

    it('returns true if the event starts inside the range', () => {
      const event = new Event(
        { start: d(5), end: d(10) },
        { accessors, slotMetrics }
      )
      expect(range.isEventInRange(event)).toBe(true)
    })

    it('returns true if the event ends inside the range', () => {
      const event = new Event(
        { start: d(0), end: d(7) },
        { accessors, slotMetrics }
      )
      expect(range.isEventInRange(event)).toBe(true)
    })

    it('returns true if the event is spans the range', () => {
      const event = new Event(
        { start: d(0), end: d(10) },
        { accessors, slotMetrics }
      )
      expect(range.isEventInRange(event)).toBe(true)
    })

    it('returns false if the event is before the range', () => {
      const event = new Event(
        { start: d(0), end: d(4) },
        { accessors, slotMetrics }
      )
      expect(range.isEventInRange(event)).toBe(false)
    })

    it('returns false if the event is after the range', () => {
      const event = new Event(
        { start: d(8), end: d(10) },
        { accessors, slotMetrics }
      )
      expect(range.isEventInRange(event)).toBe(false)
    })
  })
})

describe('createNestedRanges', () => {
  it('builds the ranges with the correct hierarchy', () => {
    const eventA1 = new Event(
      { start: d(0), end: d(6) },
      { accessors, slotMetrics }
    )
    const eventAA1 = new Event(
      { start: d(1), end: d(3) },
      { accessors, slotMetrics }
    )
    const eventAAA1 = new Event(
      { start: d(1), end: d(2) },
      { accessors, slotMetrics }
    )
    const eventAB1 = new Event(
      { start: d(5), end: d(9) },
      { accessors, slotMetrics }
    )
    const eventA2 = new Event(
      { start: d(6), end: d(9) },
      { accessors, slotMetrics }
    )
    const eventB1 = new Event(
      { start: d(12), end: d(15) },
      { accessors, slotMetrics }
    )
    const eventRanges = createNestedRanges([
      eventA1,
      eventAA1,
      eventAAA1,
      eventAB1,
      eventA2,
      eventB1,
    ])

    expect(eventRanges).toHaveLength(2)
    const [rangeA, rangeB] = eventRanges

    expect(rangeA.events).toStrictEqual([eventA1, eventA2])
    expect(rangeA.start).toBe(0 * 60)
    expect(rangeA.end).toBe(9 * 60)
    expect(rangeA.childRanges).toHaveLength(2)
    const [rangeAA, rangeAB] = rangeA.childRanges

    expect(rangeAA.events).toStrictEqual([eventAA1])
    expect(rangeAA.start).toBe(1 * 60)
    expect(rangeAA.end).toBe(3 * 60)
    expect(rangeAA.childRanges).toHaveLength(1)
    const rangeAAA = rangeAA.childRanges[0]

    expect(rangeAAA.events).toStrictEqual([eventAAA1])
    expect(rangeAAA.start).toBe(1 * 60)
    expect(rangeAAA.end).toBe(2 * 60)
    expect(rangeAAA.childRanges).toHaveLength(0)

    expect(rangeAB.events).toStrictEqual([eventAB1])
    expect(rangeAB.start).toBe(5 * 60)
    expect(rangeAB.end).toBe(9 * 60)
    expect(rangeAB.childRanges).toHaveLength(0)

    expect(rangeB.events).toStrictEqual([eventB1])
    expect(rangeB.start).toBe(12 * 60)
    expect(rangeB.end).toBe(15 * 60)
    expect(rangeB.childRanges).toHaveLength(0)
  })
})
