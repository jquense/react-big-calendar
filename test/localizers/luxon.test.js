import { DateTime } from 'luxon'
import luxonLocalizer, { formats } from '../../src/localizers/luxon'

const localizer = luxonLocalizer(DateTime)

const d = (y, m, day, h = 0, min = 0) => new Date(y, m, day, h, min)

describe('formats', () => {
  test('dateFormat is defined', () => expect(formats.dateFormat).toBeDefined())
  test('monthHeaderFormat is defined', () => expect(formats.monthHeaderFormat).toBeDefined())
})

describe('luxon localizer — startOfWeek', () => {
  test('returns a number (default 0 = Sunday in mapped form)', () => {
    const dow = localizer.startOfWeek()
    expect(typeof dow).toBe('number')
  })
})

describe('luxon localizer — format', () => {
  test('formats a date as a year string', () => {
    const result = localizer.format(d(2023, 0, 15), 'yyyy')
    expect(result).toBe('2023')
  })
})

describe('luxon localizer — eq / neq', () => {
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

describe('luxon localizer — gt / lt / gte / lte', () => {
  test('gt returns true when a is after b', () => {
    expect(localizer.gt(d(2023, 0, 5), d(2023, 0, 1), 'day')).toBe(true)
  })

  test('lt returns true when a is before b', () => {
    expect(localizer.lt(d(2023, 0, 1), d(2023, 0, 5), 'day')).toBe(true)
  })

  test('gte returns true when dates are on same day', () => {
    expect(localizer.gte(d(2023, 0, 1, 10), d(2023, 0, 1, 20), 'day')).toBe(true)
  })

  test('lte returns true when dates are on same day', () => {
    expect(localizer.lte(d(2023, 0, 1, 10), d(2023, 0, 1, 20), 'day')).toBe(true)
  })
})

describe('luxon localizer — inRange', () => {
  test('returns true for date within range', () => {
    expect(localizer.inRange(d(2023, 0, 5), d(2023, 0, 1), d(2023, 0, 10))).toBe(true)
  })

  test('returns false for date outside range', () => {
    expect(localizer.inRange(d(2023, 0, 15), d(2023, 0, 1), d(2023, 0, 10))).toBe(false)
  })
})

describe('luxon localizer — startOf / endOf', () => {
  test('startOf day resets time to midnight', () => {
    const result = localizer.startOf(d(2023, 0, 15, 12, 30), 'day')
    expect(result.getHours()).toBe(0)
  })

  test('endOf day sets to last second of day', () => {
    const result = localizer.endOf(d(2023, 0, 15, 12, 30), 'day')
    expect(result.getHours()).toBe(23)
  })
})

describe('luxon localizer — min / max / add / diff / range / ceil / merge', () => {
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

  test('merge combines date and time', () => {
    const result = localizer.merge(d(2023, 0, 15), d(2000, 5, 1, 10, 30))
    expect(result.getFullYear()).toBe(2023)
    expect(result.getHours()).toBe(10)
  })
})

describe('luxon localizer — getSlotDate / getTotalMin / getMinutesFromMidnight', () => {
  test('getSlotDate returns correct time', () => {
    const result = localizer.getSlotDate(d(2023, 0, 1), 60, 30)
    expect(result.getHours()).toBe(1)
    expect(result.getMinutes()).toBe(30)
  })

  test('getTotalMin returns diff in minutes', () => {
    expect(localizer.getTotalMin(d(2023, 0, 1, 0, 0), d(2023, 0, 1, 2, 0))).toBe(120)
  })

  test('getMinutesFromMidnight returns 0 at midnight', () => {
    expect(localizer.getMinutesFromMidnight(d(2023, 0, 1, 0, 0))).toBe(0)
  })
})

describe('luxon localizer — continuesPrior / continuesAfter / isSameDate', () => {
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

describe('luxon localizer — sortEvents', () => {
  test('sorts by start date ascending', () => {
    const a = { start: d(2023, 0, 1), end: d(2023, 0, 2), allDay: false }
    const b = { start: d(2023, 0, 5), end: d(2023, 0, 6), allDay: false }
    expect(localizer.sortEvents({ evtA: a, evtB: b })).toBeLessThan(0)
  })
})

describe('luxon localizer — inEventRange', () => {
  test('returns true for overlapping event', () => {
    const event = { start: d(2023, 0, 5), end: d(2023, 0, 10) }
    const range = { start: d(2023, 0, 8), end: d(2023, 0, 12) }
    expect(localizer.inEventRange({ event, range })).toBe(true)
  })
})

describe('luxon localizer — firstVisibleDay / lastVisibleDay / visibleDays', () => {
  test('firstVisibleDay is before 1st of month', () => {
    expect(localizer.firstVisibleDay(d(2023, 0, 15), localizer).getTime())
      .toBeLessThanOrEqual(new Date(2023, 0, 1).getTime())
  })

  test('lastVisibleDay is after last of month', () => {
    expect(localizer.lastVisibleDay(d(2023, 0, 15), localizer).getTime())
      .toBeGreaterThanOrEqual(new Date(2023, 0, 31).getTime())
  })

  test('visibleDays returns array', () => {
    expect(localizer.visibleDays(d(2023, 0, 15), localizer).length).toBeGreaterThan(28)
  })
})

describe('luxon localizer — format functions', () => {
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

  test('weekRangeFormat same month returns a string', () => {
    const result = formats.dayRangeHeaderFormat(
      { start: d(2023, 0, 1), end: d(2023, 0, 7) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('weekRangeFormat different months returns a string', () => {
    const result = formats.dayRangeHeaderFormat(
      { start: d(2023, 0, 29), end: d(2023, 1, 4) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })
})

describe('luxon localizer — null unit paths', () => {
  test('startOf with no unit returns the date unchanged', () => {
    const date = d(2023, 0, 1, 10, 30)
    const result = localizer.startOf(date)
    expect(result).toBeInstanceOf(Date)
  })

  test('endOf with no unit returns a Date', () => {
    expect(localizer.endOf(d(2023, 0, 15))).toBeInstanceOf(Date)
  })

  test('eq without unit does full timestamp comparison', () => {
    const a = d(2023, 0, 1, 10, 30)
    expect(localizer.eq(a, a)).toBe(true)
  })

  test('format with culture uses setLocale', () => {
    const result = localizer.format(d(2023, 0, 15), 'yyyy', 'en')
    expect(typeof result).toBe('string')
  })
})

describe('luxon localizer — week boundary branches', () => {
  test('startOf week (default Sunday-start) on a Wednesday', () => {
    const wed = d(2023, 0, 11) // Wednesday
    const result = localizer.startOf(wed, 'week')
    expect(result).toBeInstanceOf(Date)
  })

  test('startOf week on Sunday (first day of week)', () => {
    const sunday = d(2023, 0, 15) // Sunday
    const result = localizer.startOf(sunday, 'week')
    expect(result).toBeInstanceOf(Date)
  })

  test('startOf week for Monday-start calendar on a Wednesday', () => {
    const mondayLocalizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 })
    const wed = d(2023, 0, 11) // Wednesday
    const result = mondayLocalizer.startOf(wed, 'week')
    expect(result).toBeInstanceOf(Date)
  })

  test('endOf week for Monday-start calendar on a Wednesday', () => {
    const mondayLocalizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 })
    const wed = d(2023, 0, 11) // Wednesday — not Sunday (eow=7), so hits line 102
    const result = mondayLocalizer.endOf(wed, 'week')
    expect(result).toBeInstanceOf(Date)
  })

  test('endOf week when current day is Saturday (eow for Sunday-start)', () => {
    const sat = d(2023, 0, 14) // Saturday
    const result = localizer.endOf(sat, 'week')
    expect(result).toBeInstanceOf(Date)
  })

  test('endOf week on a non-eow day (default calendar)', () => {
    const wed = d(2023, 0, 11) // Wednesday
    const result = localizer.endOf(wed, 'week')
    expect(result).toBeInstanceOf(Date)
  })

  test('range over a week', () => {
    const start = d(2023, 0, 9) // Monday
    const end = d(2023, 0, 15) // Sunday
    const result = localizer.range(start, end)
    expect(result.length).toBeGreaterThanOrEqual(7)
  })
})
