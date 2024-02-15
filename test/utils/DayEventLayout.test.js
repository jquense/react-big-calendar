import moment from 'moment'
import momentLocalizer from '../../src/localizers/moment'
// import dayjs from 'dayjs'
// import dayjsLocalizer from '../../src/localizers/dayjs'
//import { DateTime } from 'luxon'
//import luxonLocalizer from '../../src/localizers/luxon'

import { getStyledEvents } from '../../src/utils/DayEventLayout'
import { getSlotMetrics } from '../../src/utils/TimeSlots'
import * as dates from '../../src/utils/dates'

const localizer = momentLocalizer(moment)
// const localizer = dayjsLocalizer(dayjs)
//const localizer = luxonLocalizer(DateTime)

describe('getStyledEvents', () => {
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
  const accessors = { start: (e) => e.start, end: (e) => e.end }

  describe('with overlap dayLayoutAlgorithm', () => {
    it.each([
      [
        'single event',
        [{ start: d(11), end: d(12) }],
        [{ width: 100, xOffset: 0 }],
      ],
      [
        'two consecutive events',
        [
          { start: d(11), end: d(11, 10) },
          { start: d(11, 10), end: d(11, 20) },
        ],
        [
          { width: 100, xOffset: 0 },
          { width: 100, xOffset: 0 },
        ],
      ],
      [
        'two consecutive events too close together',
        [
          { start: d(11), end: d(11, 5) },
          { start: d(11, 5), end: d(11, 10) },
        ],
        [
          { width: 85, xOffset: 0 },
          { width: 50, xOffset: 50 },
        ],
      ],
      [
        'two overlapping events',
        [
          { start: d(11), end: d(12) },
          { start: d(11), end: d(12) },
        ],
        [
          { width: 85, xOffset: 0 },
          { width: 50, xOffset: 50 },
        ],
      ],
      [
        'three overlapping events',
        [
          { start: d(11), end: d(12) },
          { start: d(11), end: d(12) },
          { start: d(11), end: d(12) },
        ],
        [
          { width: 56, xOffset: 0 },
          { width: 56, xOffset: 33 },
          { width: 33, xOffset: 66 },
        ],
      ],
      [
        'one big event overlapping with two consecutive events',
        [
          { start: d(11), end: d(12) },
          { start: d(11), end: d(11, 30) },
          { start: d(11, 30), end: d(12) },
        ],
        [
          { width: 85, xOffset: 0 },
          { width: 50, xOffset: 50 },
          { width: 50, xOffset: 50 },
        ],
      ],
      [
        'one big event overlapping with two consecutive events starting too close together',
        [
          { start: d(11), end: d(12) },
          { start: d(11), end: d(11, 5) },
          { start: d(11, 5), end: d(11, 10) },
        ],
        [
          { width: 56, xOffset: 0 },
          { width: 56, xOffset: 33 },
          { width: 33, xOffset: 66 },
        ],
      ],
    ])('%s', (_, events, expectedStyles) => {
      const dayLayoutAlgorithm = 'overlap'

      const styledEvents = getStyledEvents({
        events,
        accessors,
        slotMetrics,
        minimumStartDifference: 10,
        dayLayoutAlgorithm,
      })

      const results = styledEvents.map((result) => ({
        width: Math.floor(result.style.width),
        xOffset: Math.floor(result.style.xOffset),
      }))

      expect(results).toEqual(expectedStyles)
    })
  })

  describe('with no-overlap dayLayoutAlgorithm', () => {
    it.each([
      [
        'single event',
        [{ start: d(11), end: d(12) }],
        [{ width: 'calc(100% - 0px)', xOffset: 'calc(0% + 0px)' }],
      ],
      [
        'two consecutive events',
        [
          { start: d(11), end: d(11, 10) },
          { start: d(11, 10), end: d(11, 20) },
        ],
        [
          { width: 'calc(100% - 0px)', xOffset: 'calc(0% + 0px)' },
          { width: 'calc(100% - 0px)', xOffset: 'calc(0% + 0px)' },
        ],
      ],
      [
        'two consecutive events too close together',
        [
          { start: d(11), end: d(11, 5) },
          { start: d(11, 5), end: d(11, 10) },
        ],
        [
          { width: 'calc(100% - 0px)', xOffset: 'calc(0% + 0px)' },
          { width: 'calc(100% - 0px)', xOffset: 'calc(0% + 0px)' },
        ],
      ],
      [
        'two overlapping events',
        [
          { start: d(11), end: d(12) },
          { start: d(11), end: d(12) },
        ],
        [
          { width: 'calc(50% - 0px)', xOffset: 'calc(0% + 0px)' },
          { width: 'calc(50% - 3px)', xOffset: 'calc(50% + 3px)' },
        ],
      ],
      [
        'three overlapping events',
        [
          { start: d(11), end: d(12) },
          { start: d(11), end: d(12) },
          { start: d(11), end: d(12) },
        ],
        [
          {
            width: 'calc(33.333333333333336% - 0px)',
            xOffset: 'calc(0% + 0px)',
          },
          {
            width: 'calc(33.333333333333336% - 3px)',
            xOffset: 'calc(33.333333333333336% + 3px)',
          },
          {
            width: 'calc(33.33333333333333% - 3px)',
            xOffset: 'calc(66.66666666666667% + 3px)',
          },
        ],
      ],
      [
        'one big event overlapping with two consecutive events',
        [
          { start: d(11), end: d(12) },
          { start: d(11), end: d(11, 30) },
          { start: d(11, 30), end: d(12) },
        ],
        [
          { width: 'calc(50% - 0px)', xOffset: 'calc(0% + 0px)' },
          { width: 'calc(50% - 3px)', xOffset: 'calc(50% + 3px)' },
          { width: 'calc(50% - 3px)', xOffset: 'calc(50% + 3px)' },
        ],
      ],
      [
        'one big event overlapping with two consecutive events starting too close together',
        [
          { start: d(11), end: d(12) },
          { start: d(11), end: d(11, 5) },
          { start: d(11, 5), end: d(11, 10) },
        ],
        [
          { width: 'calc(50% - 0px)', xOffset: 'calc(0% + 0px)' },
          { width: 'calc(50% - 3px)', xOffset: 'calc(50% + 3px)' },
          { width: 'calc(50% - 3px)', xOffset: 'calc(50% + 3px)' },
        ],
      ],
    ])('%s', (_, events, expectedStyles) => {
      const dayLayoutAlgorithm = 'no-overlap'

      const styledEvents = getStyledEvents({
        events,
        accessors,
        slotMetrics,
        minimumStartDifference: 10,
        dayLayoutAlgorithm,
      })

      const results = styledEvents.map((result) => ({
        width: result.style.width,
        xOffset: result.style.xOffset,
      }))

      expect(results).toEqual(expectedStyles)
    })
  })
})
