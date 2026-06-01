import { getSlotMetrics } from '../../src/utils/DateSlotMetrics'
import moment from 'moment'
import momentLocalizer from '../../src/localizers/moment'

const localizer = momentLocalizer(moment)

const accessors = {
  start: (e) => e.start,
  end: (e) => e.end,
}

const range = [
  new Date(2023, 0, 8),
  new Date(2023, 0, 9),
  new Date(2023, 0, 10),
  new Date(2023, 0, 11),
  new Date(2023, 0, 12),
  new Date(2023, 0, 13),
  new Date(2023, 0, 14),
]

const events = [
  { start: new Date(2023, 0, 9), end: new Date(2023, 0, 11) },
  { start: new Date(2023, 0, 12), end: new Date(2023, 0, 13) },
]

function buildMetrics(overrides = {}) {
  return getSlotMetrics()({
    range,
    events,
    maxRows: 5,
    minRows: 0,
    accessors,
    localizer,
    ...overrides,
  })
}

describe('getSlotMetrics', () => {
  test('returns a metrics object', () => {
    const metrics = buildMetrics()
    expect(metrics).toBeDefined()
    expect(metrics.first).toBeInstanceOf(Date)
    expect(metrics.last).toBeInstanceOf(Date)
  })

  test('sets first and last from the range', () => {
    const metrics = buildMetrics()
    expect(metrics.first.getTime()).toBe(range[0].getTime())
  })

  test('levels contains event rows', () => {
    const metrics = buildMetrics()
    expect(Array.isArray(metrics.levels)).toBe(true)
  })

  test('extra is an array', () => {
    const metrics = buildMetrics()
    expect(Array.isArray(metrics.extra)).toBe(true)
  })

  test('slots equals range length', () => {
    const metrics = buildMetrics()
    expect(metrics.slots).toBe(range.length)
  })

  test('getDateForSlot returns the date at the given index', () => {
    const metrics = buildMetrics()
    expect(metrics.getDateForSlot(0).getTime()).toBe(range[0].getTime())
    expect(metrics.getDateForSlot(3).getTime()).toBe(range[3].getTime())
  })

  test('getSlotForDate returns the date that matches', () => {
    const metrics = buildMetrics()
    const found = metrics.getSlotForDate(new Date(2023, 0, 10))
    expect(found).toBeDefined()
    expect(found.getDate()).toBe(10)
  })

  test('getSlotForDate returns undefined for a date not in range', () => {
    const metrics = buildMetrics()
    expect(metrics.getSlotForDate(new Date(2023, 0, 20))).toBeUndefined()
  })

  test('getEventsForSlot returns events overlapping that slot', () => {
    const metrics = buildMetrics()
    const slotEvents = metrics.getEventsForSlot(2) // slot 2 = Jan 9 (1-based)
    expect(slotEvents.length).toBeGreaterThanOrEqual(1)
  })

  test('continuesPrior returns true when event starts before range', () => {
    const metrics = buildMetrics()
    const earlyEvent = { start: new Date(2023, 0, 1), end: new Date(2023, 0, 9) }
    expect(metrics.continuesPrior(earlyEvent)).toBe(true)
  })

  test('continuesPrior returns false when event starts within range', () => {
    const metrics = buildMetrics()
    const inRangeEvent = events[0]
    expect(metrics.continuesPrior(inRangeEvent)).toBe(false)
  })

  test('continuesAfter returns true when event ends after range', () => {
    const metrics = buildMetrics()
    const lateEvent = { start: new Date(2023, 0, 13), end: new Date(2023, 0, 20) }
    expect(metrics.continuesAfter(lateEvent)).toBe(true)
  })

  test('clone creates a new metrics object with overridden options', () => {
    const metrics = buildMetrics()
    const cloned = metrics.clone({ events: [] })
    expect(cloned.levels.every((l) => l.length === 0)).toBe(true)
  })

  test('pads levels up to minRows when there are fewer events', () => {
    const metrics = buildMetrics({ events: [], minRows: 3, maxRows: 5 })
    expect(metrics.levels.length).toBeGreaterThanOrEqual(3)
  })

  test('memoizes results for the same range and events array', () => {
    const slotMetrics = getSlotMetrics()
    const opts = { range, events, maxRows: 5, minRows: 0, accessors, localizer }
    const m1 = slotMetrics(opts)
    const m2 = slotMetrics(opts)
    expect(m1).toBe(m2)
  })
})
