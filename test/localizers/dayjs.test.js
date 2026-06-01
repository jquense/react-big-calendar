import dayjs from 'dayjs'
import dayjsLocalizer, { formats } from '../../src/localizers/dayjs'

const localizer = dayjsLocalizer(dayjs)

const d = (y, m, day, h = 0, min = 0) => new Date(y, m, day, h, min)

describe('formats', () => {
  test('dateFormat is defined', () => expect(formats.dateFormat).toBeDefined())
  test('monthHeaderFormat is defined', () => expect(formats.monthHeaderFormat).toBeDefined())
})

describe('dayjs localizer — startOfWeek', () => {
  test('returns a number', () => {
    expect(typeof localizer.startOfWeek()).toBe('number')
  })
})

describe('dayjs localizer — format', () => {
  test('formats a date as a year string', () => {
    const result = localizer.format(d(2023, 0, 15), 'YYYY')
    expect(result).toBe('2023')
  })
})

describe('dayjs localizer — eq / neq', () => {
  test('eq returns true for same day', () => {
    expect(localizer.eq(d(2023, 0, 1, 5), d(2023, 0, 1, 10), 'day')).toBe(true)
  })

  test('eq returns false for different days', () => {
    expect(localizer.eq(d(2023, 0, 1), d(2023, 0, 2), 'day')).toBe(false)
  })

  test('neq returns true for different days', () => {
    expect(localizer.neq(d(2023, 0, 1), d(2023, 0, 2), 'day')).toBe(true)
  })
})

describe('dayjs localizer — gt / lt / gte / lte', () => {
  test('gt returns true when a is after b', () => {
    expect(localizer.gt(d(2023, 0, 5), d(2023, 0, 1), 'day')).toBe(true)
  })

  test('lt returns true when a is before b', () => {
    expect(localizer.lt(d(2023, 0, 1), d(2023, 0, 5), 'day')).toBe(true)
  })

  test('gte returns true for same day', () => {
    expect(localizer.gte(d(2023, 0, 1, 10), d(2023, 0, 1, 20), 'day')).toBe(true)
  })

  test('lte returns true for same day', () => {
    expect(localizer.lte(d(2023, 0, 1, 10), d(2023, 0, 1, 20), 'day')).toBe(true)
  })
})

describe('dayjs localizer — inRange', () => {
  test('returns true for date within range', () => {
    expect(localizer.inRange(d(2023, 0, 5), d(2023, 0, 1), d(2023, 0, 10))).toBe(true)
  })

  test('returns false for date outside range', () => {
    expect(localizer.inRange(d(2023, 0, 15), d(2023, 0, 1), d(2023, 0, 10))).toBe(false)
  })
})

describe('dayjs localizer — startOf / endOf', () => {
  test('startOf day sets time to midnight', () => {
    const result = localizer.startOf(d(2023, 0, 15, 12, 30), 'day')
    expect(result.getHours()).toBe(0)
  })

  test('endOf day sets time to 23:59', () => {
    const result = localizer.endOf(d(2023, 0, 15, 12, 30), 'day')
    expect(result.getHours()).toBe(23)
  })

  test('startOf with null returns a Date', () => {
    expect(localizer.startOf(null, 'day')).toBeInstanceOf(Date)
  })
})

describe('dayjs localizer — min / max / add / diff / range / ceil / merge', () => {
  test('min returns the earlier date', () => {
    const a = d(2023, 0, 1)
    const b = d(2023, 0, 10)
    expect(localizer.min(a, b).getTime()).toBe(a.getTime())
  })

  test('max returns the later date', () => {
    const a = d(2023, 0, 1)
    const b = d(2023, 0, 10)
    expect(localizer.max(a, b).getTime()).toBe(b.getTime())
  })

  test('add adds days', () => {
    expect(localizer.add(d(2023, 0, 1), 5, 'day').getDate()).toBe(6)
  })

  test('diff returns day difference', () => {
    expect(localizer.diff(d(2023, 0, 1), d(2023, 0, 11), 'day')).toBe(10)
  })

  test('range returns array of dates', () => {
    expect(localizer.range(d(2023, 0, 1), d(2023, 0, 5))).toHaveLength(5)
  })

  test('ceil rounds up to next day', () => {
    expect(localizer.ceil(d(2023, 0, 1, 12), 'day').getDate()).toBe(2)
  })

  test('merge returns null for null inputs', () => {
    expect(localizer.merge(null, null)).toBeNull()
  })

  test('merge merges date from first and time from second', () => {
    const result = localizer.merge(d(2023, 0, 15), d(2000, 5, 1, 10, 30))
    expect(result.getFullYear()).toBe(2023)
    expect(result.getHours()).toBe(10)
  })
})

describe('dayjs localizer — minutes', () => {
  test('returns minutes component', () => {
    expect(localizer.minutes(d(2023, 0, 1, 5, 45))).toBe(45)
  })
})

describe('dayjs localizer — firstVisibleDay / lastVisibleDay / visibleDays', () => {
  test('firstVisibleDay is on or before 1st of month', () => {
    expect(localizer.firstVisibleDay(d(2023, 0, 15)).getTime())
      .toBeLessThanOrEqual(new Date(2023, 0, 1).getTime())
  })

  test('lastVisibleDay is on or after last of month', () => {
    expect(localizer.lastVisibleDay(d(2023, 0, 15)).getTime())
      .toBeGreaterThanOrEqual(new Date(2023, 0, 31).getTime())
  })

  test('visibleDays returns an array', () => {
    expect(localizer.visibleDays(d(2023, 0, 15)).length).toBeGreaterThan(28)
  })
})

describe('dayjs localizer — getSlotDate', () => {
  test('returns a Date at the correct offset', () => {
    const result = localizer.getSlotDate(d(2023, 0, 1), 60, 30)
    expect(result.getHours()).toBe(1)
    expect(result.getMinutes()).toBe(30)
  })
})

describe('dayjs localizer — getTotalMin / getMinutesFromMidnight', () => {
  test('getTotalMin returns diff in minutes', () => {
    expect(localizer.getTotalMin(d(2023, 0, 1, 0, 0), d(2023, 0, 1, 2, 0))).toBe(120)
  })

  test('getMinutesFromMidnight returns 0 at midnight', () => {
    expect(localizer.getMinutesFromMidnight(d(2023, 0, 1, 0, 0))).toBe(0)
  })
})

describe('dayjs localizer — getDstOffset / getTimezoneOffset', () => {
  test('getDstOffset returns a number', () => {
    expect(typeof localizer.getDstOffset(d(2023, 0, 1), d(2023, 6, 1))).toBe('number')
  })

  test('getTimezoneOffset returns a number', () => {
    expect(typeof localizer.getTimezoneOffset(d(2023, 0, 1))).toBe('number')
  })
})

describe('dayjs localizer — continuesPrior / continuesAfter / isSameDate', () => {
  test('continuesPrior returns true when before first', () => {
    expect(localizer.continuesPrior(d(2023, 0, 1), d(2023, 0, 5))).toBe(true)
  })

  test('continuesAfter returns true when event ends after last', () => {
    expect(localizer.continuesAfter(d(2023, 0, 8), d(2023, 0, 15), d(2023, 0, 10))).toBe(true)
  })

  test('isSameDate returns true for same day', () => {
    expect(localizer.isSameDate(d(2023, 0, 1, 8), d(2023, 0, 1, 20))).toBe(true)
  })
})

describe('dayjs localizer — sortEvents', () => {
  test('sorts by start date', () => {
    const a = { start: d(2023, 0, 1), end: d(2023, 0, 2), allDay: false }
    const b = { start: d(2023, 0, 5), end: d(2023, 0, 6), allDay: false }
    expect(localizer.sortEvents({ evtA: a, evtB: b })).toBeLessThan(0)
  })
})

describe('dayjs localizer — inEventRange', () => {
  test('returns true for overlapping event', () => {
    const event = { start: d(2023, 0, 5), end: d(2023, 0, 10) }
    const range = { start: d(2023, 0, 8), end: d(2023, 0, 12) }
    expect(localizer.inEventRange({ event, range })).toBe(true)
  })
})

describe('dayjs localizer — format functions', () => {
  test('selectRangeFormat returns a string', () => {
    const result = formats.selectRangeFormat(
      { start: d(2023, 0, 1, 10), end: d(2023, 0, 1, 11) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('eventTimeRangeStartFormat returns a string', () => {
    const result = formats.eventTimeRangeStartFormat(
      { start: d(2023, 0, 1, 9) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('eventTimeRangeEndFormat returns a string', () => {
    const result = formats.eventTimeRangeEndFormat(
      { end: d(2023, 0, 1, 10) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('agendaHeaderFormat (dateRangeFormat) returns a string', () => {
    const result = formats.agendaHeaderFormat(
      { start: d(2023, 0, 1), end: d(2023, 1, 1) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('weekRangeFormat returns a string (same month)', () => {
    const result = formats.dayRangeHeaderFormat(
      { start: d(2023, 0, 1), end: d(2023, 0, 7) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('weekRangeFormat returns a string (different months)', () => {
    const result = formats.dayRangeHeaderFormat(
      { start: d(2023, 0, 29), end: d(2023, 1, 4) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })
})

describe('dayjs localizer — null unit paths', () => {
  test('eq without unit uses full timestamp comparison', () => {
    const a = d(2023, 0, 1, 10, 30)
    expect(localizer.eq(a, a)).toBe(true)
  })

  test('startOf without unit returns a Date', () => {
    expect(localizer.startOf(d(2023, 0, 15))).toBeInstanceOf(Date)
  })

  test('endOf without unit returns a Date', () => {
    expect(localizer.endOf(d(2023, 0, 15))).toBeInstanceOf(Date)
  })
})

describe('dayjs localizer — fixUnit null branch (line 58)', () => {
  test('eq with null unit falls through to fixUnit(null) → undefined', () => {
    // Passing null/undefined as the unit exercises the !datePart branch
    const a = d(2023, 0, 15, 10, 0)
    const b = d(2023, 0, 15, 10, 0)
    // Should not throw — fixUnit(null) returns undefined and comparison falls back
    expect(() => localizer.eq(a, b, null)).not.toThrow()
  })

  test('diff with null unit does not throw', () => {
    const a = d(2023, 0, 15)
    const b = d(2023, 0, 16)
    expect(() => localizer.diff(a, b, null)).not.toThrow()
  })
})

describe('dayjs localizer — minutes-precision comparisons', () => {
  test('diff in minutes returns correct count', () => {
    const a = d(2023, 0, 15, 10, 42)
    const b = d(2023, 0, 15, 10, 0)
    expect(Math.abs(localizer.diff(a, b, 'minutes'))).toBe(42)
  })

  test('lt with minutes precision works correctly', () => {
    const a = d(2023, 0, 15, 9, 30)
    const b = d(2023, 0, 15, 9, 45)
    expect(localizer.lt(a, b, 'minutes')).toBe(true)
  })
})

describe('dayjs localizer — minutes() (lines 232-234)', () => {
  test('returns the minute component of a date', () => {
    expect(localizer.minutes(new Date(2023, 0, 15, 10, 42))).toBe(42)
  })

  test('returns 0 for a date at the top of the hour', () => {
    expect(localizer.minutes(new Date(2023, 0, 15, 9, 0))).toBe(0)
  })

  test('returns 59 for a date at 59 minutes past', () => {
    expect(localizer.minutes(new Date(2023, 0, 15, 14, 59))).toBe(59)
  })
})

describe('dayjs localizer — fixUnit null branch (lines 55-62, line 58)', () => {
  test('startOf with null unit goes through fixUnit null branch', () => {
    // fixUnit(null) → datePart = null → !datePart → datePart = undefined
    // startOf(..., undefined) exercises the else if (!datePart) branch
    expect(() => localizer.startOf(new Date(), null)).not.toThrow()
  })

  test('endOf with null unit exercises fixUnit null → undefined path', () => {
    expect(() => localizer.endOf(new Date(), null)).not.toThrow()
  })
})
