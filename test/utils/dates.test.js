import {
  monthsInYear,
  firstVisibleDay,
  lastVisibleDay,
  visibleDays,
  ceil,
  range,
  merge,
  eqTime,
  isJustDate,
  duration,
  diff,
  total,
  week,
  today,
  yesterday,
  tomorrow,
} from '../../src/utils/dates'
import moment from 'moment'
import momentLocalizer from '../../src/localizers/moment'

const localizer = momentLocalizer(moment)

describe('monthsInYear', () => {
  test('returns 12 months for a given year', () => {
    const result = monthsInYear(2023)
    expect(result).toHaveLength(12)
    expect(result[0].getMonth()).toBe(0)
    expect(result[11].getMonth()).toBe(11)
  })

  test('each month has the correct year', () => {
    const result = monthsInYear(2023)
    result.forEach((m) => expect(m.getFullYear()).toBe(2023))
  })
})

describe('firstVisibleDay', () => {
  test('returns the start of the week containing the first of the month', () => {
    const date = new Date(2023, 0, 15) // mid-Jan 2023
    const result = firstVisibleDay(date, localizer)
    expect(result).toBeInstanceOf(Date)
    expect(result.getDay()).toBe(localizer.startOfWeek())
  })

  test('is on or before the 1st of the month', () => {
    const date = new Date(2023, 2, 1) // March 2023
    const result = firstVisibleDay(date, localizer)
    expect(result.getTime()).toBeLessThanOrEqual(new Date(2023, 2, 1).getTime())
  })
})

describe('lastVisibleDay', () => {
  test('returns the end of the week containing the last of the month', () => {
    const date = new Date(2023, 0, 15)
    const result = lastVisibleDay(date, localizer)
    expect(result).toBeInstanceOf(Date)
  })

  test('is on or after the last day of the month', () => {
    const date = new Date(2023, 0, 1) // Jan 2023, last day = Jan 31
    const result = lastVisibleDay(date, localizer)
    expect(result.getTime()).toBeGreaterThanOrEqual(
      new Date(2023, 0, 31).getTime()
    )
  })
})

describe('visibleDays', () => {
  test('returns an array of dates', () => {
    const result = visibleDays(new Date(2023, 0, 15), localizer)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  test('starts on firstVisibleDay and ends on lastVisibleDay', () => {
    const date = new Date(2023, 0, 15)
    const first = firstVisibleDay(date, localizer)
    const last = lastVisibleDay(date, localizer)
    const days = visibleDays(date, localizer)
    expect(days[0].toDateString()).toBe(first.toDateString())
    expect(days[days.length - 1].toDateString()).toBe(last.toDateString())
  })

  test('each consecutive day is 1 day apart', () => {
    const days = visibleDays(new Date(2023, 0, 15), localizer)
    for (let i = 1; i < days.length; i++) {
      const delta = days[i].getTime() - days[i - 1].getTime()
      expect(delta).toBe(24 * 60 * 60 * 1000)
    }
  })
})

describe('ceil', () => {
  test('returns the same date when it is already at the start of the unit', () => {
    const date = new Date(2023, 0, 1, 0, 0, 0, 0)
    const result = ceil(date, 'day')
    expect(result.getTime()).toBe(date.getTime())
  })

  test('rounds up to next unit when not at the start', () => {
    const date = new Date(2023, 0, 1, 12, 0, 0, 0) // noon
    const result = ceil(date, 'day')
    expect(result.getTime()).toBe(new Date(2023, 0, 2, 0, 0, 0, 0).getTime())
  })
})

describe('range', () => {
  test('returns an array of dates from start to end inclusive', () => {
    const start = new Date(2023, 0, 1)
    const end = new Date(2023, 0, 5)
    const result = range(start, end)
    expect(result).toHaveLength(5)
    expect(result[0].getTime()).toBe(start.getTime())
    expect(result[4].getTime()).toBe(end.getTime())
  })

  test('returns a single date when start equals end', () => {
    const date = new Date(2023, 0, 1)
    const result = range(date, date)
    expect(result).toHaveLength(1)
  })

  test('uses day as the default unit', () => {
    const start = new Date(2023, 0, 1)
    const end = new Date(2023, 0, 3)
    const result = range(start, end)
    expect(result).toHaveLength(3)
  })
})

describe('merge', () => {
  test('returns null when both date and time are null', () => {
    expect(merge(null, null)).toBeNull()
  })

  test('uses current time when time is null', () => {
    const date = new Date(2023, 0, 15)
    const result = merge(date, null)
    expect(result).toBeInstanceOf(Date)
    expect(result.getFullYear()).toBe(2023)
  })

  test('uses current date when date is null', () => {
    const time = new Date(2023, 0, 15, 10, 30, 0)
    const result = merge(null, time)
    expect(result).toBeInstanceOf(Date)
  })

  test('merges date parts from date and time parts from time', () => {
    const date = new Date(2023, 0, 15)
    const time = new Date(2000, 5, 1, 10, 30, 45)
    const result = merge(date, time)
    expect(result.getFullYear()).toBe(2023)
    expect(result.getMonth()).toBe(0)
    expect(result.getDate()).toBe(15)
    expect(result.getHours()).toBe(10)
    expect(result.getMinutes()).toBe(30)
    expect(result.getSeconds()).toBe(45)
  })
})

describe('eqTime', () => {
  test('returns true when hours, minutes, and seconds match', () => {
    const a = new Date(2023, 0, 1, 10, 30, 45)
    const b = new Date(2023, 5, 15, 10, 30, 45)
    expect(eqTime(a, b)).toBe(true)
  })

  test('returns false when hours differ', () => {
    const a = new Date(2023, 0, 1, 10, 30, 45)
    const b = new Date(2023, 0, 1, 11, 30, 45)
    expect(eqTime(a, b)).toBe(false)
  })

  test('returns false when minutes differ', () => {
    const a = new Date(2023, 0, 1, 10, 30, 45)
    const b = new Date(2023, 0, 1, 10, 31, 45)
    expect(eqTime(a, b)).toBe(false)
  })

  test('returns false when seconds differ', () => {
    const a = new Date(2023, 0, 1, 10, 30, 45)
    const b = new Date(2023, 0, 1, 10, 30, 46)
    expect(eqTime(a, b)).toBe(false)
  })
})

describe('isJustDate', () => {
  test('returns true when time is midnight', () => {
    const date = new Date(2023, 0, 1, 0, 0, 0, 0)
    expect(isJustDate(date)).toBe(true)
  })

  test('returns false when hours are set', () => {
    expect(isJustDate(new Date(2023, 0, 1, 1, 0, 0, 0))).toBe(false)
  })

  test('returns false when minutes are set', () => {
    expect(isJustDate(new Date(2023, 0, 1, 0, 1, 0, 0))).toBe(false)
  })

  test('returns false when seconds are set', () => {
    expect(isJustDate(new Date(2023, 0, 1, 0, 0, 1, 0))).toBe(false)
  })

  test('returns false when milliseconds are set', () => {
    expect(isJustDate(new Date(2023, 0, 1, 0, 0, 0, 1))).toBe(false)
  })
})

describe('duration', () => {
  test('returns the absolute difference in days', () => {
    const start = new Date(2023, 0, 1)
    const end = new Date(2023, 0, 6)
    expect(duration(start, end, 'day')).toBe(5)
  })

  test('is symmetric (absolute value)', () => {
    const a = new Date(2023, 0, 1)
    const b = new Date(2023, 0, 6)
    expect(duration(a, b, 'day')).toBe(duration(b, a, 'day'))
  })
})

describe('diff', () => {
  test('returns millisecond diff when no unit given', () => {
    const a = new Date(2023, 0, 1)
    const b = new Date(2023, 0, 2)
    expect(diff(a, b)).toBe(86400000)
  })

  test('returns millisecond diff when unit is milliseconds', () => {
    const a = new Date(2023, 0, 1)
    const b = new Date(2023, 0, 1, 0, 0, 0, 500)
    expect(diff(a, b, 'milliseconds')).toBe(500)
  })

  test('returns day diff', () => {
    const a = new Date(2023, 0, 1)
    const b = new Date(2023, 0, 4)
    expect(diff(a, b, 'day')).toBe(3)
  })

  test('returns minute diff', () => {
    const a = new Date(2023, 0, 1, 0, 0)
    const b = new Date(2023, 0, 1, 1, 0)
    expect(diff(a, b, 'minutes')).toBe(60)
  })

  test('is always positive (absolute value)', () => {
    const a = new Date(2023, 0, 5)
    const b = new Date(2023, 0, 1)
    expect(diff(a, b, 'day')).toBe(4)
  })
})

describe('total', () => {
  test('returns raw timestamp when unit is milliseconds (no divisor applied)', () => {
    const date = new Date(1000)
    expect(total(date, 'milliseconds')).toBe(1000)
  })

  test('returns seconds', () => {
    const date = new Date(2000)
    expect(total(date, 'seconds')).toBe(2)
  })

  test('returns minutes', () => {
    const date = new Date(60 * 1000)
    expect(total(date, 'minutes')).toBe(1)
  })

  test('returns hours', () => {
    const date = new Date(2 * 60 * 60 * 1000)
    expect(total(date, 'hours')).toBe(2)
  })

  test('returns days', () => {
    const date = new Date(3 * 24 * 60 * 60 * 1000)
    expect(total(date, 'day')).toBe(3)
  })

  test('returns weeks', () => {
    const date = new Date(2 * 7 * 24 * 60 * 60 * 1000)
    expect(total(date, 'week')).toBe(2)
  })
})

describe('week', () => {
  test('returns a week number between 1 and 53', () => {
    const result = week(new Date(2023, 0, 1))
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(53)
  })

  test('returns the correct ISO week number', () => {
    // Jan 1 2023 is in ISO week 52 of 2022
    expect(week(new Date(2023, 0, 2))).toBe(1)
    expect(week(new Date(2023, 0, 9))).toBe(2)
  })
})

describe('today, yesterday, tomorrow', () => {
  test('today returns start of current day', () => {
    const result = today()
    const now = new Date()
    expect(result.getFullYear()).toBe(now.getFullYear())
    expect(result.getMonth()).toBe(now.getMonth())
    expect(result.getDate()).toBe(now.getDate())
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
  })

  test('yesterday is one day before today', () => {
    const t = today()
    const y = yesterday()
    expect(t.getTime() - y.getTime()).toBe(24 * 60 * 60 * 1000)
  })

  test('tomorrow is one day after today', () => {
    const t = today()
    const tom = tomorrow()
    expect(tom.getTime() - t.getTime()).toBe(24 * 60 * 60 * 1000)
  })
})
