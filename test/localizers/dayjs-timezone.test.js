/**
 * Tests for dayjs localizer with the timezone plugin loaded.
 * Must be in a separate file to avoid polluting the plain-dayjs test suite.
 *
 * Covers in src/localizers/dayjs.js:
 *   Line 80: const dayjs = dayjsLib.tz ? dayjsLib.tz : dayjsLib
 *     When dayjsLib.tz is truthy, dayjs = dayjsLib.tz (the timezone-aware factory).
 *
 *   Lines 100-104 NOTE: These lines contain a logical bug.
 *     Line 80 sets `dayjs = dayjsLib.tz` when the plugin is loaded.
 *     Line 92 then checks `if (!dayjs.tz)` which is `!(dayjsLib.tz.tz)` — always undefined.
 *     This means lines 100-104 are unreachable dead code. Documented here for visibility.
 *
 *   Lines 246-249: firstVisibleDay leap-year special handling
 *     Line 246: if (dayjs(firstDayOfMonth).isLeapYear())
 *     Lines 247-249: run when year IS a leap year (but result is discarded — also a bug:
 *       firstDayOfWeek.date(diff) creates a new immutable dayjs object without reassigning)
 */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import dayjsLocalizer from '../../src/localizers/dayjs'

// Extend dayjs BEFORE calling dayjsLocalizer so that dayjsLib.tz is truthy
// at construction time (line 80 reads dayjsLib.tz at setup)
dayjs.extend(utc)
dayjs.extend(timezone)

const localizer = dayjsLocalizer(dayjs)

const d = (y, m, day, h = 0, min = 0) => new Date(y, m, day, h, min)

afterEach(() => {
  // Reset any default timezone set during tests
  try { dayjs.tz.setDefault() } catch (_) {console.log('dayjs.tz.setDefault() not supported in this environment, skipping reset') }
})

describe('dayjs localizer — constructed with timezone plugin', () => {
  test('dayjs.tz is truthy after extending', () => {
    expect(dayjs.tz).toBeDefined()
  })

  test('localizer is created without throwing', () => {
    expect(localizer).toBeDefined()
  })

  test('format returns a string', () => {
    const result = localizer.format(d(2023, 0, 15), 'YYYY')
    expect(typeof result).toBe('string')
  })

  test('startOfWeek returns a number', () => {
    expect(typeof localizer.startOfWeek()).toBe('number')
  })
})

describe('dayjs localizer — getDstOffset with timezone plugin (line 80 branch)', () => {
  test('getDstOffset returns a number', () => {
    expect(typeof localizer.getDstOffset(d(2023, 0, 1), d(2023, 6, 1))).toBe('number')
  })

  test('getDstOffset with setDefault timezone returns a number', () => {
    dayjs.tz.setDefault('America/New_York')
    const result = localizer.getDstOffset(d(2023, 0, 1), d(2023, 6, 1))
    expect(typeof result).toBe('number')
  })

  test('getTimezoneOffset returns a number', () => {
    expect(typeof localizer.getTimezoneOffset(d(2023, 6, 1))).toBe('number')
  })

  test('getTotalMin returns diff in minutes', () => {
    const start = d(2023, 0, 1, 0, 0)
    const end = d(2023, 0, 1, 2, 0)
    expect(localizer.getTotalMin(start, end)).toBe(120)
  })
})

describe('dayjs localizer — firstVisibleDay leap-year path (lines 246-249)', () => {
  // Lines 246-249 are reached whenever the first day of the visible month
  // falls within a leap year. The code contains a bug (result is discarded),
  // but the lines ARE executed and thus counted as covered.

  test('firstVisibleDay for February 2024 (leap year) returns a Date', () => {
    const result = localizer.firstVisibleDay(d(2024, 1, 15))
    expect(result).toBeInstanceOf(Date)
    expect(result.getTime()).toBeLessThanOrEqual(new Date(2024, 1, 1).getTime())
  })

  test('firstVisibleDay for January 2024 (leap year) returns a Date', () => {
    const result = localizer.firstVisibleDay(d(2024, 0, 15))
    expect(result).toBeInstanceOf(Date)
  })

  test('firstVisibleDay for March 2024 (leap year) returns a Date', () => {
    const result = localizer.firstVisibleDay(d(2024, 2, 15))
    expect(result).toBeInstanceOf(Date)
  })

  test('firstVisibleDay for year 2000 (leap year) returns a Date', () => {
    const result = localizer.firstVisibleDay(d(2000, 1, 15))
    expect(result).toBeInstanceOf(Date)
  })

  test('firstVisibleDay for non-leap year 2023 returns a Date', () => {
    // Ensure non-leap path also works (for comparison)
    const result = localizer.firstVisibleDay(d(2023, 1, 15))
    expect(result).toBeInstanceOf(Date)
  })
})

describe('dayjs localizer — full arithmetic with timezone plugin', () => {
  test('startOf day returns midnight', () => {
    const result = localizer.startOf(d(2023, 0, 15, 12, 30), 'day')
    expect(result.getHours()).toBe(0)
  })

  test('add days works', () => {
    expect(localizer.add(d(2023, 0, 1), 5, 'day').getDate()).toBe(6)
  })

  test('isSameDate works', () => {
    expect(localizer.isSameDate(d(2023, 0, 1, 8), d(2023, 0, 1, 20))).toBe(true)
  })

  test('visibleDays returns array', () => {
    expect(localizer.visibleDays(d(2023, 0, 15)).length).toBeGreaterThan(28)
  })
})
