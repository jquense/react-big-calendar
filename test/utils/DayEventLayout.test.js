import { getStyledEvents } from '../../src/utils/DayEventLayout'
import { getSlotMetrics } from '../../src/utils/TimeSlots'
import dates from '../../src/utils/dates'

describe('getStyledEvents', () => {
  const d = (...args) => new Date(2015, 3, 1, ...args)
  const min = dates.startOf(d(), 'day')
  const max = dates.endOf(d(), 'day')
  const slotMetrics = getSlotMetrics({ min, max, step: 30, timeslots: 4 })
  const accessors = { start: e => e.start, end: e => e.end }
  const dayLayoutAlgorithmOverlap = 'overlap'
  const dayLayoutAlgorithmNoOverlap = 'no-overlap'

  function compare(dayLayoutAlgorithm, title, events, expectedResults) {
    it(title, () => {
      const styledEvents = getStyledEvents({
        events,
        accessors,
        slotMetrics,
        minimumStartDifference: 10,
        dayLayoutAlgorithm,
      })
      const results = styledEvents.map(result => ({
        width: Math.floor(result.style.width),
        xOffset: Math.floor(result.style.xOffset),
        id: result.event.id,
      }))
      expect(results).toEqual(expectedResults)
    })
  }

  describe('matrix overlap', () => {
    const toCheck = [
      [
        dayLayoutAlgorithmOverlap,
        'single event',
        [{ start: d(11), end: d(12) }],
        [{ width: 100, xOffset: 0 }],
      ],
      [
        dayLayoutAlgorithmOverlap,
        'two consecutive events',
        [
          { start: d(11), end: d(11, 10) },
          { start: d(11, 10), end: d(11, 20) },
        ],
        [{ width: 100, xOffset: 0 }, { width: 100, xOffset: 0 }],
      ],
      [
        dayLayoutAlgorithmOverlap,
        'two consecutive events too close together',
        [{ start: d(11), end: d(11, 5) }, { start: d(11, 5), end: d(11, 10) }],
        [{ width: 50, xOffset: 0 }, { width: 50, xOffset: 50 }],
      ],
      [
        dayLayoutAlgorithmOverlap,
        'two overlapping events',
        [{ start: d(11), end: d(12) }, { start: d(11), end: d(12) }],
        [{ width: 50, xOffset: 0 }, { width: 50, xOffset: 50 }],
      ],
      [
        dayLayoutAlgorithmOverlap,
        'three overlapping events',
        [
          { start: d(11), end: d(12) },
          { start: d(11), end: d(12) },
          { start: d(11), end: d(12) },
        ],
        [
          { width: 33, xOffset: 0 },
          { width: 33, xOffset: 33 },
          { width: 33, xOffset: 66 },
        ],
      ],
      [
        dayLayoutAlgorithmOverlap,
        'one big event overlapping with two consecutive events',
        [
          { start: d(11), end: d(12) },
          { start: d(11), end: d(11, 30) },
          { start: d(11, 30), end: d(12) },
        ],
        [
          { width: 50, xOffset: 0 },
          { width: 50, xOffset: 50 },
          { width: 50, xOffset: 50 },
        ],
      ],
      [
        dayLayoutAlgorithmOverlap,
        'one big event overlapping with two consecutive events starting too close together',
        [
          { start: d(11), end: d(12) },
          { start: d(11), end: d(11, 5) },
          { start: d(11, 5), end: d(11, 10) },
        ],
        [
          { width: 33, xOffset: 0 },
          { width: 33, xOffset: 33 },
          { width: 33, xOffset: 66 },
        ],
      ],
      [
        dayLayoutAlgorithmOverlap,
        'cascade of overlapping events',
        [
          { start: d(11), end: d(12), id: 'test1' },
          { start: d(11, 30), end: d(15, 30), id: 'test2' },
          { start: d(13), end: d(13, 30), id: 'test3' },
          { start: d(14), end: d(14, 30), id: 'test4' },
          { start: d(12), end: d(13, 0), id: 'test5' },
        ],
        [
          { width: 50, xOffset: 0, id: 'test1' },
          { width: 100, xOffset: 0, id: 'test5' },
          { width: 50, xOffset: 50, id: 'test2' },
          { width: 100, xOffset: 0, id: 'test3' },
          { width: 100, xOffset: 0, id: 'test4' },
        ],
      ],
      [
        dayLayoutAlgorithmOverlap,
        'cascade of overlapping events with stair stepping overlap',
        [
          { start: d(11), end: d(12, 30), id: 'test1' },
          { start: d(11, 30), end: d(15, 30), id: 'test2' },
          { start: d(11, 30), end: d(12, 30), id: 'test3' },
          { start: d(12, 30), end: d(13, 0), id: 'test4' },
          { start: d(14), end: d(15, 30), id: 'test5' },
        ],
        [
          { width: 33, xOffset: 0, id: 'test1' },
          { width: 100, xOffset: 0, id: 'test4' },
          { width: 33, xOffset: 33, id: 'test2' },
          { width: 33, xOffset: 66, id: 'test3' },
          { width: 100, xOffset: 0, id: 'test5' },
        ],
      ],
    ]
    toCheck.forEach(args => compare(...args))
  })

  describe('matrix no overlap', () => {
    const toCheck = [
      [
        dayLayoutAlgorithmNoOverlap,
        'single event',
        [{ start: d(11), end: d(12), id: 'test1' }],
        [{ width: 100, xOffset: 0, id: 'test1' }],
      ],
      [
        dayLayoutAlgorithmNoOverlap,
        'two consecutive events',
        [
          { start: d(11), end: d(11, 10), id: 'test1' },
          { start: d(11, 10), end: d(11, 20), id: 'test2' },
        ],
        [
          { width: 100, xOffset: 0, id: 'test1' },
          { width: 100, xOffset: 0, id: 'test2' },
        ],
      ],
      [
        dayLayoutAlgorithmNoOverlap,
        'two consecutive events too close together',
        [
          { start: d(11), end: d(11, 5), id: 'test1' },
          { start: d(11, 5), end: d(11, 10), id: 'test2' },
        ],
        [
          { width: 100, xOffset: 0, id: 'test1' },
          { width: 100, xOffset: 0, id: 'test2' },
        ],
      ],
      [
        dayLayoutAlgorithmNoOverlap,
        'two overlapping events',
        [{ start: d(11), end: d(12) }, { start: d(11), end: d(12) }],
        [{ width: 50, xOffset: 0 }, { width: 50, xOffset: 50 }],
      ],
      [
        dayLayoutAlgorithmNoOverlap,
        'three overlapping events',
        [
          { start: d(11), end: d(12) },
          { start: d(11), end: d(12) },
          { start: d(11), end: d(12) },
        ],
        [
          { width: 33, xOffset: 0 },
          { width: 33, xOffset: 33 },
          { width: 33, xOffset: 66 },
        ],
      ],
      [
        dayLayoutAlgorithmNoOverlap,
        'one big event overlapping with two consecutive events',
        [
          { start: d(11), end: d(12), id: 'test1' },
          { start: d(11), end: d(11, 30), id: 'test2' },
          { start: d(11, 30), end: d(12), id: 'test3' },
        ],
        [
          { width: 50, xOffset: 0, id: 'test1' },
          { width: 50, xOffset: 50, id: 'test2' },
          { width: 50, xOffset: 50, id: 'test3' },
        ],
      ],
      [
        dayLayoutAlgorithmNoOverlap,
        'one big event overlapping with two consecutive events starting too close together',
        [
          { start: d(11), end: d(12), id: 'test1' },
          { start: d(11), end: d(11, 5), id: 'test2' },
          { start: d(11, 5), end: d(11, 10), id: 'test3' },
        ],
        [
          { width: 50, xOffset: 0, id: 'test1' },
          { width: 50, xOffset: 50, id: 'test2' },
          { width: 50, xOffset: 50, id: 'test3' },
        ],
      ],
      [
        dayLayoutAlgorithmNoOverlap,
        'cascade of overlapping events',
        [
          { start: d(11), end: d(12), id: 'test1' },
          { start: d(11, 30), end: d(15, 30), id: 'test2' },
          { start: d(13), end: d(13, 30), id: 'test3' },
          { start: d(14), end: d(14, 30), id: 'test4' },
          { start: d(12), end: d(13, 0), id: 'test5' },
        ],
        [
          { width: 50, xOffset: 0, id: 'test1' },
          { width: 50, xOffset: 50, id: 'test2' },
          { width: 50, xOffset: 0, id: 'test5' },
          { width: 50, xOffset: 0, id: 'test3' },
          { width: 50, xOffset: 0, id: 'test4' },
        ],
      ],
      [
        dayLayoutAlgorithmNoOverlap,
        'cascade of overlapping events with stair stepping overlap',
        [
          { start: d(11), end: d(12, 30), id: 'test1' },
          { start: d(11, 30), end: d(15, 30), id: 'test2' },
          { start: d(11, 30), end: d(12, 30), id: 'test3' },
          { start: d(12, 30), end: d(13, 0), id: 'test4' },
          { start: d(14), end: d(15, 30), id: 'test5' },
        ],
        [
          { width: 33, xOffset: 0, id: 'test1' },
          { width: 33, xOffset: 33, id: 'test2' },
          { width: 33, xOffset: 66, id: 'test3' },
          { width: 33, xOffset: 0, id: 'test4' },
          { width: 33, xOffset: 0, id: 'test5' },
        ],
      ],
    ]
    toCheck.forEach(args => compare(...args))
  })
})
