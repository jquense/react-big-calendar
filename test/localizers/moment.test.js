import moment from 'moment'
import momentLocalizer, { formats } from '../../src/localizers/moment'
// Note: formats is also tested below in format-functions describe block

const localizer = momentLocalizer(moment)

const d = (y, m, day, h = 0, min = 0) => new Date(y, m, day, h, min)

describe('formats', () => {
  test('dateFormat is defined', () => {
    expect(formats.dateFormat).toBeDefined()
  })

  test('monthHeaderFormat is defined', () => {
    expect(formats.monthHeaderFormat).toBeDefined()
  })
})

describe('moment localizer — startOfWeek', () => {
  test('returns a number (0=Sun by default)', () => {
    const dow = localizer.startOfWeek()
    expect(typeof dow).toBe('number')
  })

  test('returns 1 for fr locale', () => {
    expect(localizer.startOfWeek('fr')).toBe(1)
  })
})

describe('moment localizer — format', () => {
  test('formats a date as a string', () => {
    const result = localizer.format(d(2023, 0, 15), 'YYYY')
    expect(result).toBe('2023')
  })

  test('formats with culture', () => {
    const result = localizer.format(d(2023, 0, 15), 'MMMM', 'en')
    expect(typeof result).toBe('string')
  })
})

describe('moment localizer — eq / neq', () => {
  test('eq returns true for same day', () => {
    expect(localizer.eq(d(2023, 0, 1, 5), d(2023, 0, 1, 10), 'day')).toBe(true)
  })

  test('eq returns false for different days', () => {
    expect(localizer.eq(d(2023, 0, 1), d(2023, 0, 2), 'day')).toBe(false)
  })

  test('neq returns false for same day', () => {
    expect(localizer.neq(d(2023, 0, 1, 5), d(2023, 0, 1, 10), 'day')).toBe(false)
  })

  test('neq returns true for different days', () => {
    expect(localizer.neq(d(2023, 0, 1), d(2023, 0, 2), 'day')).toBe(true)
  })
})

describe('moment localizer — gt / lt / gte / lte', () => {
  const earlier = d(2023, 0, 1)
  const later = d(2023, 0, 5)

  test('gt: later is after earlier', () => {
    expect(localizer.gt(later, earlier, 'day')).toBe(true)
  })

  test('gt: earlier is not after later', () => {
    expect(localizer.gt(earlier, later, 'day')).toBe(false)
  })

  test('lt: earlier is before later', () => {
    expect(localizer.lt(earlier, later, 'day')).toBe(true)
  })

  test('lt: later is not before earlier', () => {
    expect(localizer.lt(later, earlier, 'day')).toBe(false)
  })

  test('gte returns true when a === b (same day)', () => {
    expect(localizer.gte(d(2023, 0, 1, 10), d(2023, 0, 1, 20), 'day')).toBe(true)
  })

  test('lte returns true when a === b (same day)', () => {
    expect(localizer.lte(d(2023, 0, 1, 10), d(2023, 0, 1, 20), 'day')).toBe(true)
  })
})

describe('moment localizer — inRange', () => {
  test('returns true for date within range', () => {
    expect(localizer.inRange(d(2023, 0, 5), d(2023, 0, 1), d(2023, 0, 10))).toBe(true)
  })

  test('returns false for date outside range', () => {
    expect(localizer.inRange(d(2023, 0, 15), d(2023, 0, 1), d(2023, 0, 10))).toBe(false)
  })

  test('returns true for date on boundary', () => {
    expect(localizer.inRange(d(2023, 0, 1), d(2023, 0, 1), d(2023, 0, 10))).toBe(true)
  })
})

describe('moment localizer — startOf / endOf', () => {
  test('startOf day sets time to midnight', () => {
    const result = localizer.startOf(d(2023, 0, 15, 12, 30), 'day')
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
  })

  test('endOf day sets time to 23:59:59', () => {
    const result = localizer.endOf(d(2023, 0, 15, 12, 30), 'day')
    expect(result.getHours()).toBe(23)
    expect(result.getMinutes()).toBe(59)
  })

  test('startOf with null returns current date', () => {
    const result = localizer.startOf(null, 'day')
    expect(result).toBeInstanceOf(Date)
  })

  test('endOf with null returns current date', () => {
    const result = localizer.endOf(null, 'day')
    expect(result).toBeInstanceOf(Date)
  })
})

describe('moment localizer — min / max', () => {
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
})

describe('moment localizer — add / diff / range / ceil', () => {
  test('add adds days correctly', () => {
    const result = localizer.add(d(2023, 0, 1), 5, 'day')
    expect(result.getDate()).toBe(6)
  })

  test('diff returns day difference', () => {
    const result = localizer.diff(d(2023, 0, 1), d(2023, 0, 11), 'day')
    expect(result).toBe(10)
  })

  test('range returns array of dates', () => {
    const result = localizer.range(d(2023, 0, 1), d(2023, 0, 5))
    expect(result).toHaveLength(5)
  })

  test('ceil on exact boundary returns the same date', () => {
    const start = localizer.startOf(d(2023, 0, 1), 'day')
    const result = localizer.ceil(start, 'day')
    expect(localizer.eq(result, start, 'day')).toBe(true)
  })

  test('ceil rounds up to next day', () => {
    const result = localizer.ceil(d(2023, 0, 1, 12), 'day')
    expect(result.getDate()).toBe(2)
  })
})

describe('moment localizer — merge', () => {
  test('returns null when both are falsy', () => {
    expect(localizer.merge(null, null)).toBeNull()
  })

  test('merges date from first and time from second', () => {
    const date = d(2023, 0, 15)
    const time = d(2000, 5, 1, 10, 30)
    const result = localizer.merge(date, time)
    expect(result.getFullYear()).toBe(2023)
    expect(result.getHours()).toBe(10)
    expect(result.getMinutes()).toBe(30)
  })
})

describe('moment localizer — minutes', () => {
  test('returns the minutes component', () => {
    expect(localizer.minutes(d(2023, 0, 1, 5, 45))).toBe(45)
  })
})

describe('moment localizer — firstVisibleDay / lastVisibleDay / visibleDays', () => {
  test('firstVisibleDay is on or before the 1st of the month', () => {
    const result = localizer.firstVisibleDay(d(2023, 0, 15))
    expect(result.getTime()).toBeLessThanOrEqual(new Date(2023, 0, 1).getTime())
  })

  test('lastVisibleDay is on or after the last day of the month', () => {
    const result = localizer.lastVisibleDay(d(2023, 0, 15))
    expect(result.getTime()).toBeGreaterThanOrEqual(new Date(2023, 0, 31).getTime())
  })

  test('visibleDays returns an array spanning first to last visible', () => {
    const days = localizer.visibleDays(d(2023, 0, 15))
    expect(days.length).toBeGreaterThan(28)
  })
})

describe('moment localizer — getSlotDate', () => {
  test('returns a Date at the correct minute offset', () => {
    const result = localizer.getSlotDate(d(2023, 0, 1), 60, 30)
    expect(result.getMinutes()).toBe(30)
    expect(result.getHours()).toBe(1)
  })
})

describe('moment localizer — getTotalMin / getMinutesFromMidnight', () => {
  test('getTotalMin returns difference in minutes', () => {
    const start = d(2023, 0, 1, 0, 0)
    const end = d(2023, 0, 1, 2, 0)
    expect(localizer.getTotalMin(start, end)).toBe(120)
  })

  test('getMinutesFromMidnight returns 0 for midnight', () => {
    expect(localizer.getMinutesFromMidnight(d(2023, 0, 1, 0, 0))).toBe(0)
  })

  test('getMinutesFromMidnight returns 60 for 1am', () => {
    expect(localizer.getMinutesFromMidnight(d(2023, 0, 1, 1, 0))).toBe(60)
  })
})

describe('moment localizer — getDstOffset / getTimezoneOffset', () => {
  test('getDstOffset returns a number', () => {
    expect(typeof localizer.getDstOffset(d(2023, 0, 1), d(2023, 6, 1))).toBe('number')
  })

  test('getTimezoneOffset returns a number', () => {
    expect(typeof localizer.getTimezoneOffset(d(2023, 0, 1))).toBe('number')
  })
})

describe('moment localizer — continuesPrior / continuesAfter', () => {
  test('continuesPrior true when event starts before first visible', () => {
    expect(localizer.continuesPrior(d(2023, 0, 1), d(2023, 0, 5))).toBe(true)
  })

  test('continuesPrior false when event starts on first visible', () => {
    expect(localizer.continuesPrior(d(2023, 0, 5), d(2023, 0, 5))).toBe(false)
  })

  test('continuesAfter true when event ends after last visible', () => {
    expect(localizer.continuesAfter(d(2023, 0, 8), d(2023, 0, 15), d(2023, 0, 10))).toBe(true)
  })

  test('continuesAfter false when event ends before last visible', () => {
    expect(localizer.continuesAfter(d(2023, 0, 8), d(2023, 0, 9), d(2023, 0, 10))).toBe(false)
  })
})

describe('moment localizer — isSameDate', () => {
  test('returns true for same day different times', () => {
    expect(localizer.isSameDate(d(2023, 0, 1, 10), d(2023, 0, 1, 20))).toBe(true)
  })

  test('returns false for different days', () => {
    expect(localizer.isSameDate(d(2023, 0, 1), d(2023, 0, 2))).toBe(false)
  })
})

describe('moment localizer — sortEvents', () => {
  const mkEvent = (start, end, allDay = false) => ({ start, end, allDay })

  test('sorts by start date ascending', () => {
    const earlier = mkEvent(d(2023, 0, 1), d(2023, 0, 2))
    const later = mkEvent(d(2023, 0, 5), d(2023, 0, 6))
    expect(localizer.sortEvents({ evtA: earlier, evtB: later })).toBeLessThan(0)
  })

  test('longer duration event sorts before shorter on same day', () => {
    const longer = mkEvent(d(2023, 0, 1), d(2023, 0, 5))
    const shorter = mkEvent(d(2023, 0, 1), d(2023, 0, 2))
    expect(localizer.sortEvents({ evtA: longer, evtB: shorter })).toBeLessThan(0)
  })

  test('allDay events sort before non-allDay', () => {
    const allDay = mkEvent(d(2023, 0, 1), d(2023, 0, 2), true)
    const timed = mkEvent(d(2023, 0, 1), d(2023, 0, 2), false)
    expect(localizer.sortEvents({ evtA: allDay, evtB: timed })).toBeLessThan(0)
  })
})

describe('moment localizer — inEventRange', () => {
  test('returns true for event overlapping range', () => {
    const event = { start: d(2023, 0, 5), end: d(2023, 0, 10) }
    const range = { start: d(2023, 0, 8), end: d(2023, 0, 12) }
    expect(localizer.inEventRange({ event, range })).toBe(true)
  })

  test('returns false for event outside range', () => {
    const event = { start: d(2023, 0, 1), end: d(2023, 0, 3) }
    const range = { start: d(2023, 0, 5), end: d(2023, 0, 10) }
    expect(localizer.inEventRange({ event, range })).toBe(false)
  })
})

describe('moment localizer — daySpan', () => {
  test('returns day span between two dates', () => {
    expect(localizer.daySpan(d(2023, 0, 1), d(2023, 0, 5))).toBe(4)
  })
})

describe('moment localizer — segmentOffset / browserTZOffset', () => {
  test('segmentOffset is 0 or 1', () => {
    expect([0, 1]).toContain(localizer.segmentOffset)
  })
})

describe('moment localizer — format functions (formats object)', () => {
  test('agendaHeaderFormat (dateRangeFormat) returns a string', () => {
    const result = formats.agendaHeaderFormat(
      { start: d(2023, 0, 1), end: d(2023, 1, 1) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('selectRangeFormat (timeRangeFormat) returns a string', () => {
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

  test('weekRangeFormat (dayRangeHeaderFormat) same month', () => {
    const result = formats.dayRangeHeaderFormat(
      { start: d(2023, 0, 1), end: d(2023, 0, 7) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('weekRangeFormat (dayRangeHeaderFormat) different months', () => {
    const result = formats.dayRangeHeaderFormat(
      { start: d(2023, 0, 29), end: d(2023, 1, 4) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })
})

describe('moment localizer — null unit and FullYear paths', () => {
  test('startOf with no unit returns a date', () => {
    const result = localizer.startOf(d(2023, 0, 15))
    expect(result).toBeInstanceOf(Date)
  })

  test('endOf with no unit returns a date', () => {
    const result = localizer.endOf(d(2023, 0, 15))
    expect(result).toBeInstanceOf(Date)
  })

  test('eq without unit does full-timestamp comparison', () => {
    const a = d(2023, 0, 1, 10, 30)
    expect(localizer.eq(a, a)).toBe(true)
  })
})
