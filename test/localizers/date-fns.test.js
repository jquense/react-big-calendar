import { format, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import dateFnsLocalizer, { formats } from '../../src/localizers/date-fns'

const localizer = dateFnsLocalizer({
  format,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
})

const d = (y, m, day, h = 0, min = 0) => new Date(y, m, day, h, min)

describe('formats', () => {
  test('dateFormat is defined', () => expect(formats.dateFormat).toBeDefined())
  test('monthHeaderFormat is defined', () => expect(formats.monthHeaderFormat).toBeDefined())
})

describe('date-fns localizer — startOfWeek', () => {
  test('returns a number', () => {
    expect(typeof localizer.startOfWeek('en-US')).toBe('number')
  })

  test('returns 0 for en-US (Sunday start)', () => {
    expect(localizer.startOfWeek('en-US')).toBe(0)
  })
})

describe('date-fns localizer — format', () => {
  test('formats a date as a string', () => {
    const result = localizer.format(d(2023, 0, 15), 'yyyy')
    expect(result).toBe('2023')
  })
})

describe('date-fns localizer — arithmetic (inherited defaults)', () => {
  test('eq returns true for same day', () => {
    expect(localizer.eq(d(2023, 0, 1, 5), d(2023, 0, 1, 10), 'day')).toBe(true)
  })

  test('lt returns true when a is before b', () => {
    expect(localizer.lt(d(2023, 0, 1), d(2023, 0, 5), 'day')).toBe(true)
  })

  test('gt returns true when a is after b', () => {
    expect(localizer.gt(d(2023, 0, 5), d(2023, 0, 1), 'day')).toBe(true)
  })

  test('add adds days', () => {
    const result = localizer.add(d(2023, 0, 1), 5, 'day')
    expect(result.getDate()).toBe(6)
  })

  test('diff returns day difference', () => {
    expect(localizer.diff(d(2023, 0, 1), d(2023, 0, 6), 'day')).toBe(5)
  })

  test('inRange returns true for in-range date', () => {
    expect(localizer.inRange(d(2023, 0, 5), d(2023, 0, 1), d(2023, 0, 10))).toBe(true)
  })

  test('merge returns null for null inputs', () => {
    expect(localizer.merge(null, null)).toBeNull()
  })

  test('continuesPrior returns true before first', () => {
    expect(localizer.continuesPrior(d(2023, 0, 1), d(2023, 0, 5))).toBe(true)
  })

  test('isSameDate returns true for same day', () => {
    expect(localizer.isSameDate(d(2023, 0, 1, 8), d(2023, 0, 1, 20))).toBe(true)
  })

  test('range returns array', () => {
    const result = localizer.range(d(2023, 0, 1), d(2023, 0, 5))
    expect(result).toHaveLength(5)
  })

  test('firstVisibleDay is before 1st of month', () => {
    const result = localizer.firstVisibleDay(d(2023, 0, 15), localizer)
    expect(result.getTime()).toBeLessThanOrEqual(new Date(2023, 0, 1).getTime())
  })

  test('lastVisibleDay is after last of month', () => {
    const result = localizer.lastVisibleDay(d(2023, 0, 15), localizer)
    expect(result.getTime()).toBeGreaterThanOrEqual(new Date(2023, 0, 31).getTime())
  })
})

describe('date-fns localizer — format functions in formats object', () => {
  test('selectRangeFormat returns a string', () => {
    const result = formats.selectRangeFormat(
      { start: d(2023, 0, 1, 10), end: d(2023, 0, 1, 11) },
      'en-US',
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('eventTimeRangeStartFormat returns a string', () => {
    const result = formats.eventTimeRangeStartFormat(
      { start: d(2023, 0, 1, 9) },
      'en-US',
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('eventTimeRangeEndFormat returns a string', () => {
    const result = formats.eventTimeRangeEndFormat(
      { end: d(2023, 0, 1, 10) },
      'en-US',
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('weekRangeFormat returns a string (same month)', () => {
    const result = formats.dayRangeHeaderFormat(
      { start: d(2023, 0, 1), end: d(2023, 0, 7) },
      'en-US',
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('weekRangeFormat returns a string (different months)', () => {
    const result = formats.dayRangeHeaderFormat(
      { start: d(2023, 0, 29), end: d(2023, 1, 4) },
      'en-US',
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('agendaHeaderFormat (dateRangeFormat) returns a string', () => {
    const result = formats.agendaHeaderFormat(
      { start: d(2023, 0, 1), end: d(2023, 1, 1) },
      'en-US',
      localizer
    )
    expect(typeof result).toBe('string')
  })
})
