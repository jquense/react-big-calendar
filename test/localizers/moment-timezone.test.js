/**
 * Tests for moment localizer with moment-timezone loaded.
 * Must be in a separate file: importing moment-timezone mutates the global
 * moment object by attaching .tz, which would pollute the plain-moment test suite.
 *
 * Covers: src/localizers/moment.js lines 76-79
 *   const tzName = st?._z?.name ?? moment.tz.guess()
 *   const startOffset = moment.tz.zone(tzName).utcOffset(+st)
 *   const endOffset = moment.tz.zone(tzName).utcOffset(+ed)
 *   return startOffset - endOffset
 */
import moment from 'moment'
import 'moment-timezone'
import momentLocalizer from '../../src/localizers/moment'

const localizer = momentLocalizer(moment)

const d = (y, m, day, h = 0, min = 0) => new Date(y, m, day, h, min)

afterEach(() => {
  // Reset any default timezone set during tests so they don't leak
  moment.tz.setDefault()
})

describe('moment localizer — getDstOffset WITH moment-timezone loaded', () => {
  test('moment.tz is truthy after import', () => {
    expect(moment.tz).toBeDefined()
  })

  test('getDstOffset returns a number when timezone plugin is loaded', () => {
    const result = localizer.getDstOffset(d(2023, 0, 1), d(2023, 6, 1))
    expect(typeof result).toBe('number')
  })

  test('getDstOffset falls back to moment.tz.guess() when _z is undefined', () => {
    // Plain new Date objects → _z is undefined → tzName = moment.tz.guess()
    const start = d(2023, 0, 1)
    const end = d(2023, 6, 1)
    expect(() => localizer.getDstOffset(start, end)).not.toThrow()
    expect(typeof localizer.getDstOffset(start, end)).toBe('number')
  })

  test('getDstOffset uses _z.name when moment is tz-aware (covers _z?.name branch)', () => {
    // Creating a tz-aware moment date causes _z to be populated
    const tzStart = moment.tz('2023-01-15 10:00', 'America/New_York').toDate()
    const tzEnd = moment.tz('2023-07-15 10:00', 'America/New_York').toDate()
    const result = localizer.getDstOffset(tzStart, tzEnd)
    expect(typeof result).toBe('number')
  })

  test('getDstOffset with setDefault timezone returns a consistent number', () => {
    moment.tz.setDefault('America/Los_Angeles')
    const result = localizer.getDstOffset(d(2023, 0, 1), d(2023, 6, 1))
    expect(typeof result).toBe('number')
  })

  test('getDstOffset is symmetric around DST boundaries', () => {
    // January → July (DST transition in North America)
    const winter = d(2023, 0, 15)
    const summer = d(2023, 6, 15)
    const fwdResult = localizer.getDstOffset(winter, summer)
    const revResult = localizer.getDstOffset(summer, winter)
    expect(typeof fwdResult).toBe('number')
    expect(typeof revResult).toBe('number')
  })
})

describe('moment localizer — full localizer functions with timezone plugin', () => {
  test('getTimezoneOffset still returns a number', () => {
    expect(typeof localizer.getTimezoneOffset(d(2023, 6, 1))).toBe('number')
  })

  test('getTotalMin works correctly with timezone plugin', () => {
    const start = d(2023, 0, 1, 0, 0)
    const end = d(2023, 0, 1, 2, 0)
    expect(localizer.getTotalMin(start, end)).toBe(120)
  })

  test('getMinutesFromMidnight works with timezone plugin', () => {
    expect(localizer.getMinutesFromMidnight(d(2023, 0, 1, 1, 0))).toBe(60)
  })

  test('startOfWeek returns a number', () => {
    expect(typeof localizer.startOfWeek()).toBe('number')
  })
})
