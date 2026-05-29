import { DateLocalizer, mergeWithDefaults } from '../src/localizer'

function makeSpec(overrides = {}) {
  return {
    format: (value, fmt) => `formatted:${fmt}`,
    firstOfWeek: () => 0,
    ...overrides,
  }
}

describe('DateLocalizer constructor', () => {
  test('creates an instance successfully with valid spec', () => {
    const loc = new DateLocalizer(makeSpec())
    expect(loc).toBeInstanceOf(DateLocalizer)
  })

  test('throws when format is not a function', () => {
    expect(() => new DateLocalizer({ format: 'not-a-fn', firstOfWeek: () => 0 })).toThrow()
  })

  test('throws when firstOfWeek is not a function', () => {
    expect(() => new DateLocalizer({ format: () => '', firstOfWeek: 'not-a-fn' })).toThrow()
  })

  test('assigns startOfWeek from spec.firstOfWeek', () => {
    const loc = new DateLocalizer(makeSpec({ firstOfWeek: () => 1 }))
    expect(loc.startOfWeek()).toBe(1)
  })

  test('format calls spec.format and returns a string', () => {
    const loc = new DateLocalizer(makeSpec())
    const result = loc.format(new Date(2023, 0, 1), 'MM/DD/YYYY')
    expect(typeof result).toBe('string')
  })

  test('format accepts a format function instead of a string', () => {
    const loc = new DateLocalizer(makeSpec())
    const result = loc.format(new Date(2023, 0, 1), () => 'custom')
    expect(result).toBe('custom')
  })

  test('format throws if spec.format returns a non-string non-null value', () => {
    const loc = new DateLocalizer(makeSpec({ format: () => 42 }))
    expect(() => loc.format(new Date(), 'any')).toThrow()
  })

  test('format allows null return from spec.format', () => {
    const loc = new DateLocalizer(makeSpec({ format: () => null }))
    expect(() => loc.format(new Date(), 'any')).not.toThrow()
  })

  test('uses default arithmetic methods when spec does not override them', () => {
    const loc = new DateLocalizer(makeSpec())
    const d1 = new Date(2023, 0, 1)
    const d2 = new Date(2023, 0, 2)
    expect(loc.lt(d1, d2, 'day')).toBe(true)
    expect(loc.gt(d2, d1, 'day')).toBe(true)
  })

  test('uses overridden merge when provided', () => {
    const customMerge = jest.fn(() => new Date(2023, 5, 1))
    const loc = new DateLocalizer(makeSpec({ merge: customMerge }))
    loc.merge(new Date(), new Date())
    expect(customMerge).toHaveBeenCalled()
  })

  test('getSlotDate returns a valid Date', () => {
    const loc = new DateLocalizer(makeSpec())
    const result = loc.getSlotDate(new Date(2023, 0, 1), 60, 30)
    expect(result).toBeInstanceOf(Date)
    expect(result.getMinutes()).toBe(90 % 60)
  })

  test('getDstOffset returns a number', () => {
    const loc = new DateLocalizer(makeSpec())
    const result = loc.getDstOffset(new Date(2023, 0, 1), new Date(2023, 6, 1))
    expect(typeof result).toBe('number')
  })

  test('getTimezoneOffset returns the timezone offset of a date', () => {
    const loc = new DateLocalizer(makeSpec())
    const result = loc.getTimezoneOffset(new Date(2023, 0, 1))
    expect(typeof result).toBe('number')
  })

  test('getTotalMin returns difference in minutes plus DST offset', () => {
    const loc = new DateLocalizer(makeSpec())
    const start = new Date(2023, 0, 1, 0, 0)
    const end = new Date(2023, 0, 1, 1, 0)
    expect(loc.getTotalMin(start, end)).toBe(60)
  })

  test('getMinutesFromMidnight returns 0 at midnight', () => {
    const loc = new DateLocalizer(makeSpec())
    const midnight = new Date(2023, 0, 1, 0, 0, 0, 0)
    expect(loc.getMinutesFromMidnight(midnight)).toBe(0)
  })

  test('continuesPrior returns true when event start is before first visible day', () => {
    const loc = new DateLocalizer(makeSpec())
    const start = new Date(2023, 0, 1)
    const first = new Date(2023, 0, 3)
    expect(loc.continuesPrior(start, first)).toBe(true)
  })

  test('continuesPrior returns false when event start is on or after first', () => {
    const loc = new DateLocalizer(makeSpec())
    const start = new Date(2023, 0, 5)
    const first = new Date(2023, 0, 3)
    expect(loc.continuesPrior(start, first)).toBe(false)
  })

  test('continuesAfter returns true for event ending after last', () => {
    const loc = new DateLocalizer(makeSpec())
    const start = new Date(2023, 0, 8)
    const end = new Date(2023, 0, 15)
    const last = new Date(2023, 0, 10)
    expect(loc.continuesAfter(start, end, last)).toBe(true)
  })

  test('isSameDate returns true for same day', () => {
    const loc = new DateLocalizer(makeSpec())
    expect(loc.isSameDate(new Date(2023, 0, 1, 10), new Date(2023, 0, 1, 20))).toBe(true)
  })

  test('isSameDate returns false for different days', () => {
    const loc = new DateLocalizer(makeSpec())
    expect(loc.isSameDate(new Date(2023, 0, 1), new Date(2023, 0, 2))).toBe(false)
  })

  test('startAndEndAreDateOnly returns true for midnight dates', () => {
    const loc = new DateLocalizer(makeSpec())
    expect(
      loc.startAndEndAreDateOnly(new Date(2023, 0, 1, 0, 0, 0, 0), new Date(2023, 0, 2, 0, 0, 0, 0))
    ).toBe(true)
  })

  test('startAndEndAreDateOnly returns false when time is set', () => {
    const loc = new DateLocalizer(makeSpec())
    expect(
      loc.startAndEndAreDateOnly(new Date(2023, 0, 1, 10), new Date(2023, 0, 2))
    ).toBe(false)
  })

  test('segmentOffset is 0 when browserTZOffset is not provided', () => {
    const loc = new DateLocalizer(makeSpec())
    expect(loc.segmentOffset).toBe(0)
  })

  test('segmentOffset uses browserTZOffset result when provided', () => {
    const loc = new DateLocalizer(makeSpec({ browserTZOffset: () => 1 }))
    expect(loc.segmentOffset).toBe(1)
  })

  test('sortEvents sorts by start date', () => {
    const loc = new DateLocalizer(makeSpec())
    const earlier = { start: new Date(2023, 0, 1), end: new Date(2023, 0, 2), allDay: false }
    const later = { start: new Date(2023, 0, 3), end: new Date(2023, 0, 4), allDay: false }
    const result = loc.sortEvents({ evtA: earlier, evtB: later })
    expect(result).toBeLessThan(0)
  })

  test('inEventRange returns true for overlapping event', () => {
    const loc = new DateLocalizer(makeSpec())
    const event = { start: new Date(2023, 0, 5), end: new Date(2023, 0, 10) }
    const rangeObj = { start: new Date(2023, 0, 8), end: new Date(2023, 0, 12) }
    expect(loc.inEventRange({ event, range: rangeObj })).toBe(true)
  })

  test('inEventRange returns false for non-overlapping event', () => {
    const loc = new DateLocalizer(makeSpec())
    const event = { start: new Date(2023, 0, 1), end: new Date(2023, 0, 3) }
    const rangeObj = { start: new Date(2023, 0, 5), end: new Date(2023, 0, 10) }
    expect(loc.inEventRange({ event, range: rangeObj })).toBe(false)
  })
})

describe('mergeWithDefaults', () => {
  const loc = new DateLocalizer(makeSpec())

  test('returns an object with format and startOfWeek', () => {
    const merged = mergeWithDefaults(loc, null, {}, {})
    expect(typeof merged.format).toBe('function')
    expect(typeof merged.startOfWeek).toBe('function')
  })

  test('merged startOfWeek invokes localizer.startOfWeek with culture', () => {
    const loc2 = new DateLocalizer(makeSpec({ firstOfWeek: (c) => (c === 'fr' ? 1 : 0) }))
    const merged = mergeWithDefaults(loc2, 'fr', {}, {})
    expect(merged.startOfWeek()).toBe(1)
  })

  test('merged format uses formatOverrides over localizer formats', () => {
    const loc3 = new DateLocalizer(makeSpec({ formats: { dayFormat: 'DD' } }))
    const merged = mergeWithDefaults(loc3, null, { dayFormat: 'MM' }, {})
    // format('dayFormat') should use 'MM' override
    const result = merged.format(new Date(2023, 0, 1), 'dayFormat')
    expect(result).toBe('formatted:MM')
  })

  test('includes messages on the merged object', () => {
    const msgs = { today: 'Hoy' }
    const merged = mergeWithDefaults(loc, null, {}, msgs)
    expect(merged.messages).toEqual(msgs)
  })
})
