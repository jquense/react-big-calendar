import moment from 'moment'
import momentLocalizer from '../../src/localizers/moment'
import * as dates from '../../src/utils/dates'
import getStyledEvents, {
  createNestedRanges,
  Event,
  EventRange,
} from '../../src/utils/layout-algorithms/overlap'
import { getSlotMetrics } from '../../src/utils/TimeSlots'

const FLOAT_PRECISION = 5

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

/**
 * @param {number} start
 * @param {number} end
 */
function buildEvent(start, end) {
  return new Event({ start: d(start), end: d(end) }, { accessors, slotMetrics })
}

/**
 * @param {number[]} start
 * @param {number[]} end
 */
function buildEventWithMinutes(start, end) {
  return new Event(
    { start: d(...start), end: d(...end) },
    { accessors, slotMetrics }
  )
}

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

describe('Event', () => {
  /**
   * ```text
   * ┌─┬─┬─┬─┬─┬─┐
   * │A│B│C│D│E│ │
   * └─┴─┴─┴─┴─┤ │
   *           │ │
   * ┌─┬───────┤F│
   * │ │   H   │ │
   * │G├───┬───┤ │
   * │ │ I │ J │ │
   * └─┴───┴───┤ │
   *           └─┘
   * ```
   */
  const buildComplexExample1 = () => {
    const eventA = buildEvent(0, 1)
    const eventB = buildEvent(0.1, 1)
    const eventC = buildEvent(0.2, 1)
    const eventD = buildEvent(0.3, 1)
    const eventE = buildEvent(0.4, 1)
    const eventF = buildEvent(0.5, 12)
    const eventG = buildEvent(3, 5)
    const eventH = buildEvent(3, 4)
    const eventI = buildEvent(4, 5)
    const eventJ = buildEvent(4, 5)

    createNestedRanges(
      [
        eventA,
        eventB,
        eventC,
        eventD,
        eventE,
        eventF,
        eventG,
        eventH,
        eventI,
        eventJ,
      ],
      15
    )

    return {
      A: eventA,
      B: eventB,
      C: eventC,
      D: eventD,
      E: eventE,
      F: eventF,
      G: eventG,
      H: eventH,
      I: eventI,
      J: eventJ,
    }
  }

  /**
   * In this example, events `G`, `H`, `I`, `J`, and `K` all have room to expand.
   * Events `G` and `H` have more room to grow and expand by different amounts
   * than events `I`, `J`, and `K`.
   *
   * ```text
   * ┌─┬─┬─┬─┬─┬─┐
   * │A│B│C│D│E│ │
   * └─┴─┴─┴─┴─┤ │
   *           │ │
   * ┌────┐    │ │
   * │  G ├────┤F│
   * ├──┬─┤  H │ │
   * │ I├─┴─┬──┤ │
   * │  │ J │ K│ │
   * └──┤   │  ├─┘
   *    └───┴──┘
   * ```
   */
  const buildComplexExample2 = () => {
    const eventA = buildEventWithMinutes([7, 0], [7, 25])
    const eventB = buildEventWithMinutes([7, 1], [7, 25])
    const eventC = buildEventWithMinutes([7, 2], [7, 25])
    const eventD = buildEventWithMinutes([7, 3], [7, 25])
    const eventE = buildEventWithMinutes([7, 4], [7, 25])
    const eventF = buildEventWithMinutes([7, 15], [10, 20])
    const eventG = buildEventWithMinutes([8, 30], [9, 20])
    const eventH = buildEventWithMinutes([9, 0], [9, 40])
    const eventI = buildEventWithMinutes([9, 30], [10, 20])
    const eventJ = buildEventWithMinutes([9, 45], [10, 25])
    const eventK = buildEventWithMinutes([9, 46], [10, 25])

    createNestedRanges(
      [
        eventA,
        eventB,
        eventC,
        eventD,
        eventE,
        eventF,
        eventG,
        eventH,
        eventI,
        eventJ,
        eventK,
      ],
      15
    )

    return {
      A: eventA,
      B: eventB,
      C: eventC,
      D: eventD,
      E: eventE,
      F: eventF,
      G: eventG,
      H: eventH,
      I: eventI,
      J: eventJ,
      K: eventK,
    }
  }

  /**
   * ```text
   * ┌─┬─┬─┬─┬─┬─┬─┐
   * │A│B│C│D│E│F│ │
   * └─┴─┴─┴─┴─┴─┤ │
   *             │ │
   * ┌──┬────┬───┤G│
   * │  │  I │ J │ │
   * │ H├──┬─┴┬──┤ │
   * │  │ K│ L│ M│ │
   * └──┴──┴──┴──┴─┘
   * ```
   */
  const buildComplexExample3 = () => {
    const eventA = buildEventWithMinutes([7, 0], [7, 30])
    const eventB = buildEventWithMinutes([7, 1], [7, 30])
    const eventC = buildEventWithMinutes([7, 2], [7, 30])
    const eventD = buildEventWithMinutes([7, 3], [7, 30])
    const eventE = buildEventWithMinutes([7, 4], [7, 30])
    const eventF = buildEventWithMinutes([7, 5], [7, 30])
    const eventG = buildEventWithMinutes([7, 6], [10, 0])
    const eventH = buildEventWithMinutes([9, 0], [10, 0])
    const eventI = buildEventWithMinutes([9, 0], [9, 30])
    const eventJ = buildEventWithMinutes([9, 1], [9, 30])
    const eventK = buildEventWithMinutes([9, 30], [10, 0])
    const eventL = buildEventWithMinutes([9, 31], [10, 0])
    const eventM = buildEventWithMinutes([9, 32], [10, 0])

    createNestedRanges(
      [
        eventA,
        eventB,
        eventC,
        eventD,
        eventE,
        eventF,
        eventG,
        eventH,
        eventI,
        eventJ,
        eventK,
        eventL,
        eventM,
      ],
      15
    )

    return {
      A: eventA,
      B: eventB,
      C: eventC,
      D: eventD,
      E: eventE,
      F: eventF,
      G: eventG,
      H: eventH,
      I: eventI,
      J: eventJ,
      K: eventK,
      L: eventL,
      M: eventM,
    }
  }

  describe('buildEventTree', () => {
    describe('example 1', () => {
      it('sets the parent and children relationships', () => {
        const events = buildComplexExample1()

        events.H.buildEventTree()

        // Check parent events.
        expect(events.A._parentEvents).toStrictEqual([])
        expect(events.B._parentEvents).toStrictEqual([events.A])
        expect(events.C._parentEvents).toStrictEqual([events.B])
        expect(events.D._parentEvents).toStrictEqual([events.C])
        expect(events.E._parentEvents).toStrictEqual([events.D])
        expect(events.F._parentEvents).toStrictEqual([events.E])
        expect(events.G._parentEvents).toStrictEqual([])
        expect(events.H._parentEvents).toStrictEqual([events.G])
        expect(events.I._parentEvents).toStrictEqual([events.G])
        expect(events.J._parentEvents).toStrictEqual([events.I])

        // Check child events.
        expect(events.A._childEvents).toStrictEqual([events.B])
        expect(events.B._childEvents).toStrictEqual([events.C])
        expect(events.C._childEvents).toStrictEqual([events.D])
        expect(events.D._childEvents).toStrictEqual([events.E])
        expect(events.E._childEvents).toStrictEqual([events.F])
        expect(events.F._childEvents).toStrictEqual([])
        expect(events.G._childEvents).toStrictEqual([events.H, events.I])
        expect(events.H._childEvents).toStrictEqual([])
        expect(events.I._childEvents).toStrictEqual([events.J])
        expect(events.J._childEvents).toStrictEqual([])
      })
    })

    describe('example 2', () => {
      it('sets the parent and children relationships', () => {
        const events = buildComplexExample2()

        events.H.buildEventTree()

        // Check parent events.
        expect(events.A._parentEvents).toStrictEqual([])
        expect(events.B._parentEvents).toStrictEqual([events.A])
        expect(events.C._parentEvents).toStrictEqual([events.B])
        expect(events.D._parentEvents).toStrictEqual([events.C])
        expect(events.E._parentEvents).toStrictEqual([events.D])
        expect(events.F._parentEvents).toStrictEqual([events.E])
        expect(events.G._parentEvents).toStrictEqual([])
        expect(events.H._parentEvents).toStrictEqual([events.G, events.I])
        expect(events.I._parentEvents).toStrictEqual([])
        expect(events.J._parentEvents).toStrictEqual([events.I])
        expect(events.K._parentEvents).toStrictEqual([events.J])

        // Check child events.
        expect(events.A._childEvents).toStrictEqual([events.B])
        expect(events.B._childEvents).toStrictEqual([events.C])
        expect(events.C._childEvents).toStrictEqual([events.D])
        expect(events.D._childEvents).toStrictEqual([events.E])
        expect(events.E._childEvents).toStrictEqual([events.F])
        expect(events.F._childEvents).toStrictEqual([])
        expect(events.G._childEvents).toStrictEqual([events.H])
        expect(events.H._childEvents).toStrictEqual([])
        expect(events.I._childEvents).toStrictEqual([events.H, events.J])
        expect(events.J._childEvents).toStrictEqual([events.K])
        expect(events.K._childEvents).toStrictEqual([])
      })
    })
  })

  describe('expansionDetails', () => {
    describe('example 1', () => {
      it('returns the most restrictive expansion details for the event', () => {
        const events = buildComplexExample1()

        expect(events.A.expansionDetails).toStrictEqual({
          maxLocalDepth: 5,
          openRanges: 0,
        })
        expect(events.B.expansionDetails).toStrictEqual({
          maxLocalDepth: 5,
          openRanges: 0,
        })
        expect(events.C.expansionDetails).toStrictEqual({
          maxLocalDepth: 5,
          openRanges: 0,
        })
        expect(events.D.expansionDetails).toStrictEqual({
          maxLocalDepth: 5,
          openRanges: 0,
        })
        expect(events.E.expansionDetails).toStrictEqual({
          maxLocalDepth: 5,
          openRanges: 0,
        })
        expect(events.F.expansionDetails).toStrictEqual({
          maxLocalDepth: 5,
          openRanges: 0,
        })
        expect(events.G.expansionDetails).toStrictEqual({
          maxLocalDepth: 2,
          openRanges: 2,
        })
        expect(events.H.expansionDetails).toStrictEqual({
          maxLocalDepth: 1,
          openRanges: 3,
        })
        expect(events.I.expansionDetails).toStrictEqual({
          maxLocalDepth: 2,
          openRanges: 2,
        })
        expect(events.J.expansionDetails).toStrictEqual({
          maxLocalDepth: 2,
          openRanges: 2,
        })
      })
    })

    describe('example 2', () => {
      it('returns the most restrictive expansion details for the event', () => {
        const events = buildComplexExample2()

        expect(events.A.expansionDetails).toStrictEqual({
          maxLocalDepth: 5,
          openRanges: 0,
        })
        expect(events.B.expansionDetails).toStrictEqual({
          maxLocalDepth: 5,
          openRanges: 0,
        })
        expect(events.C.expansionDetails).toStrictEqual({
          maxLocalDepth: 5,
          openRanges: 0,
        })
        expect(events.D.expansionDetails).toStrictEqual({
          maxLocalDepth: 5,
          openRanges: 0,
        })
        expect(events.E.expansionDetails).toStrictEqual({
          maxLocalDepth: 5,
          openRanges: 0,
        })
        expect(events.F.expansionDetails).toStrictEqual({
          maxLocalDepth: 5,
          openRanges: 0,
        })
        expect(events.G.expansionDetails).toStrictEqual({
          maxLocalDepth: 1,
          openRanges: 3,
        })
        expect(events.H.expansionDetails).toStrictEqual({
          maxLocalDepth: 1,
          openRanges: 3,
        })
        expect(events.I.expansionDetails).toStrictEqual({
          maxLocalDepth: 2,
          openRanges: 2,
        })
        expect(events.J.expansionDetails).toStrictEqual({
          maxLocalDepth: 2,
          openRanges: 2,
        })
        expect(events.K.expansionDetails).toStrictEqual({
          maxLocalDepth: 2,
          openRanges: 2,
        })
      })
    })
  })

  describe('openRangesBelow', () => {
    describe('example 1', () => {
      it('correctly calculates how many open ranges are under each event', () => {
        const events = buildComplexExample1()

        expect(events.A.openRangesBelow).toBe(0)
        expect(events.B.openRangesBelow).toBe(0)
        expect(events.C.openRangesBelow).toBe(0)
        expect(events.D.openRangesBelow).toBe(0)
        expect(events.E.openRangesBelow).toBe(0)
        expect(events.F.openRangesBelow).toBe(0)
        expect(events.G.openRangesBelow).toBe(2)
        expect(events.H.openRangesBelow).toBe(3)
        expect(events.I.openRangesBelow).toBe(2)
        expect(events.J.openRangesBelow).toBe(2)
      })
    })

    describe('example 2', () => {
      it('correctly calculates how many open ranges are under each event', () => {
        const events = buildComplexExample2()

        expect(events.A.openRangesBelow).toBe(0)
        expect(events.B.openRangesBelow).toBe(0)
        expect(events.C.openRangesBelow).toBe(0)
        expect(events.D.openRangesBelow).toBe(0)
        expect(events.E.openRangesBelow).toBe(0)
        expect(events.F.openRangesBelow).toBe(0)
        expect(events.G.openRangesBelow).toBe(3)
        expect(events.H.openRangesBelow).toBe(3)
        expect(events.I.openRangesBelow).toBe(2)
        expect(events.J.openRangesBelow).toBe(2)
        expect(events.K.openRangesBelow).toBe(2)
      })
    })
  })

  describe('baseWidth', () => {
    const getTotalWidth = events => {
      return events
        .map(event => event.baseWidth)
        .reduce((prev, current) => prev + current, 0)
    }

    describe('example 1', () => {
      const events = buildComplexExample1()

      it('returns the non-overlapping width of the event', () => {
        expect(events.A.baseWidth).toBeCloseTo(100 / 6, FLOAT_PRECISION)
        expect(events.B.baseWidth).toBeCloseTo(100 / 6, FLOAT_PRECISION)
        expect(events.C.baseWidth).toBeCloseTo(100 / 6, FLOAT_PRECISION)
        expect(events.D.baseWidth).toBeCloseTo(100 / 6, FLOAT_PRECISION)
        expect(events.E.baseWidth).toBeCloseTo(100 / 6, FLOAT_PRECISION)
        expect(events.F.baseWidth).toBeCloseTo(100 / 6, FLOAT_PRECISION)
        expect(events.G.baseWidth).toBeCloseTo(250 / 9, FLOAT_PRECISION)
        expect(events.H.baseWidth).toBeCloseTo(500 / 9, FLOAT_PRECISION)
        expect(events.I.baseWidth).toBeCloseTo(250 / 9, FLOAT_PRECISION)
        expect(events.J.baseWidth).toBeCloseTo(250 / 9, FLOAT_PRECISION)
      })

      it('fills up the available width for each path', () => {
        expect(
          getTotalWidth([
            events.A,
            events.B,
            events.C,
            events.D,
            events.E,
            events.F,
          ])
        ).toBeCloseTo(100, FLOAT_PRECISION)

        expect(getTotalWidth([events.G, events.H, events.F])).toBeCloseTo(
          100,
          FLOAT_PRECISION
        )

        expect(
          getTotalWidth([events.G, events.I, events.J, events.F])
        ).toBeCloseTo(100, FLOAT_PRECISION)
      })
    })

    describe('example 2', () => {
      const events = buildComplexExample2()

      it('returns the non-overlapping width of the event', () => {
        expect(events.A.baseWidth).toBeCloseTo(100 / 6, FLOAT_PRECISION)
        expect(events.B.baseWidth).toBeCloseTo(100 / 6, FLOAT_PRECISION)
        expect(events.C.baseWidth).toBeCloseTo(100 / 6, FLOAT_PRECISION)
        expect(events.D.baseWidth).toBeCloseTo(100 / 6, FLOAT_PRECISION)
        expect(events.E.baseWidth).toBeCloseTo(100 / 6, FLOAT_PRECISION)
        expect(events.F.baseWidth).toBeCloseTo(100 / 6, FLOAT_PRECISION)
        expect(events.G.baseWidth).toBeCloseTo(375 / 9, FLOAT_PRECISION)
        expect(events.H.baseWidth).toBeCloseTo(375 / 9, FLOAT_PRECISION)
        expect(events.I.baseWidth).toBeCloseTo(250 / 9, FLOAT_PRECISION)
        expect(events.J.baseWidth).toBeCloseTo(250 / 9, FLOAT_PRECISION)
        expect(events.K.baseWidth).toBeCloseTo(250 / 9, FLOAT_PRECISION)
      })

      it('fills up the available width for each path', () => {
        expect(
          getTotalWidth([
            events.A,
            events.B,
            events.C,
            events.D,
            events.E,
            events.F,
          ])
        ).toBeCloseTo(100, FLOAT_PRECISION)

        expect(getTotalWidth([events.G, events.H, events.F])).toBeCloseTo(
          100,
          FLOAT_PRECISION
        )

        expect(
          getTotalWidth([events.I, events.J, events.K, events.F])
        ).toBeCloseTo(100, FLOAT_PRECISION)
      })
    })

    describe('example 3', () => {
      const events = buildComplexExample3()

      it('returns the non-overlapping width of the event', () => {
        expect(events.A.baseWidth).toBeCloseTo(100 / 7, FLOAT_PRECISION)
        expect(events.B.baseWidth).toBeCloseTo(100 / 7, FLOAT_PRECISION)
        expect(events.C.baseWidth).toBeCloseTo(100 / 7, FLOAT_PRECISION)
        expect(events.D.baseWidth).toBeCloseTo(100 / 7, FLOAT_PRECISION)
        expect(events.E.baseWidth).toBeCloseTo(100 / 7, FLOAT_PRECISION)
        expect(events.F.baseWidth).toBeCloseTo(100 / 7, FLOAT_PRECISION)
        expect(events.G.baseWidth).toBeCloseTo(100 / 7, FLOAT_PRECISION)
        expect(events.H.baseWidth).toBeCloseTo(150 / 7, FLOAT_PRECISION)
        expect(events.I.baseWidth).toBeCloseTo(225 / 7, FLOAT_PRECISION)
        expect(events.J.baseWidth).toBeCloseTo(225 / 7, FLOAT_PRECISION)
        expect(events.K.baseWidth).toBeCloseTo(150 / 7, FLOAT_PRECISION)
        expect(events.L.baseWidth).toBeCloseTo(150 / 7, FLOAT_PRECISION)
        expect(events.M.baseWidth).toBeCloseTo(150 / 7, FLOAT_PRECISION)
      })

      it('fills up the available width for each path', () => {
        expect(
          getTotalWidth([
            events.A,
            events.B,
            events.C,
            events.D,
            events.E,
            events.F,
            events.G,
          ])
        ).toBeCloseTo(100, FLOAT_PRECISION)

        expect(
          getTotalWidth([events.H, events.I, events.J, events.G])
        ).toBeCloseTo(100, FLOAT_PRECISION)

        expect(
          getTotalWidth([events.H, events.K, events.L, events.M, events.G])
        ).toBeCloseTo(100, FLOAT_PRECISION)
      })
    })
  })

  describe('xOffset', () => {
    describe('example 1', () => {
      it('returns the correct xOffset value', () => {
        const events = buildComplexExample1()

        expect(events.A.xOffset).toBeCloseTo(0, 5)
        expect(events.B.xOffset).toBeCloseTo(100 / 6, 5)
        expect(events.C.xOffset).toBeCloseTo(200 / 6, 5)
        expect(events.D.xOffset).toBeCloseTo(300 / 6, 5)
        expect(events.E.xOffset).toBeCloseTo(400 / 6, 5)
        expect(events.F.xOffset).toBeCloseTo(500 / 6, 5)
        expect(events.G.xOffset).toBeCloseTo(0, 5)
        expect(events.H.xOffset).toBeCloseTo(250 / 9, 5)
        expect(events.I.xOffset).toBeCloseTo(250 / 9, 5)
        expect(events.J.xOffset).toBeCloseTo(500 / 9, 5)
      })
    })

    describe('example 2', () => {
      it('returns the correct xOffset value', () => {
        const events = buildComplexExample2()

        expect(events.A.xOffset).toBeCloseTo(0, 5)
        expect(events.B.xOffset).toBeCloseTo(100 / 6, 5)
        expect(events.C.xOffset).toBeCloseTo(200 / 6, 5)
        expect(events.D.xOffset).toBeCloseTo(300 / 6, 5)
        expect(events.E.xOffset).toBeCloseTo(400 / 6, 5)
        expect(events.F.xOffset).toBeCloseTo(500 / 6, 5)
        expect(events.G.xOffset).toBeCloseTo(0, 5)
        expect(events.H.xOffset).toBeCloseTo(375 / 9, 5)
        expect(events.I.xOffset).toBeCloseTo(0, 5)
        expect(events.J.xOffset).toBeCloseTo(250 / 9, 5)
        expect(events.K.xOffset).toBeCloseTo(500 / 9, 5)
      })
    })
  })
})

describe('createNestedRanges', () => {
  /**
   * ```text
   * ┌─┐
   * │ ├─┬─┐
   * │ │B│C│
   * │ │ ├─┘
   * │A├─┘
   * │ │
   * │ │┌──┐
   * ├─┴┤D │
   * │E │  │
   * └──┴──┘
   * ┌─────┐
   * │  F  │
   * └─────┘
   * ```
   */
  const createEvents = () => {
    const eventA = buildEvent(0, 6)
    const eventB = buildEvent(1, 3)
    const eventC = buildEvent(1, 2)
    const eventD = buildEvent(5, 9)
    const eventE = buildEvent(6, 9)
    const eventF = buildEvent(12, 15)

    return {
      A: eventA,
      B: eventB,
      C: eventC,
      D: eventD,
      E: eventE,
      F: eventF,
    }
  }

  it('builds the ranges with the correct hierarchy', () => {
    const events = createEvents()

    const eventRanges = createNestedRanges(Object.values(events), 15)

    expect(eventRanges).toHaveLength(2)
    const [rangeAE, rangeF] = eventRanges

    expect(rangeAE.events).toStrictEqual([events.A, events.E])
    expect(rangeAE.start).toBe(0 * 60)
    expect(rangeAE.end).toBe(9 * 60)
    expect(rangeAE.childRanges).toHaveLength(2)
    const [rangeB, rangeD] = rangeAE.childRanges

    expect(rangeB.events).toStrictEqual([events.B])
    expect(rangeB.start).toBe(1 * 60)
    expect(rangeB.end).toBe(3 * 60)
    expect(rangeB.childRanges).toHaveLength(1)
    const rangeC = rangeB.childRanges[0]

    expect(rangeC.events).toStrictEqual([events.C])
    expect(rangeC.start).toBe(1 * 60)
    expect(rangeC.end).toBe(2 * 60)
    expect(rangeC.childRanges).toHaveLength(0)

    expect(rangeD.events).toStrictEqual([events.D])
    expect(rangeD.start).toBe(5 * 60)
    expect(rangeD.end).toBe(9 * 60)
    expect(rangeD.childRanges).toHaveLength(0)

    expect(rangeF.events).toStrictEqual([events.F])
    expect(rangeF.start).toBe(12 * 60)
    expect(rangeF.end).toBe(15 * 60)
    expect(rangeF.childRanges).toHaveLength(0)
  })
})

describe('getStyledEvents', () => {
  it('does not stall with a large number of deeply nested events', () => {
    const events = []
    for (let i = 0; i < 1000; i++) {
      events.push(buildEvent(12, 13))
    }
    const start = new Date()
    getStyledEvents({
      events,
      accessors,
      slotMetrics,
      minimumStartDifference: 10,
    })
    const end = new Date()
    const difference = (end - start) / 1000
    // Should take less than a second
    expect(difference).toBeLessThan(1)
  })
})
