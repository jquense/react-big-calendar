import { ChronoField, ChronoUnit } from 'js-joda'

const MILI = 'milliseconds',
  SECONDS = 'seconds',
  MINUTES = 'minutes',
  HOURS = 'hours',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  DECADE = 'decade',
  CENTURY = 'century'

const chronoUnitMap = {
  [MILI]: ChronoUnit.MILLIS,
  [SECONDS]: ChronoUnit.SECONDS,
  [MINUTES]: ChronoUnit.MINUTES,
  [HOURS]: ChronoUnit.HOURS,
  [DAY]: ChronoUnit.DAYS,
  [WEEK]: ChronoUnit.WEEKS,
  [MONTH]: ChronoUnit.MONTHS,
  [YEAR]: ChronoUnit.YEARS,
  [DECADE]: ChronoUnit.DECADES,
  [CENTURY]: ChronoUnit.CENTURIES,
}

// Assume all *date* values are joda ZonedDateTime instances
const accessors = {
  milliseconds: (zdt, val) => {
    if (val === undefined) return zdt.get(ChronoField.MILLI_OF_SECOND)
    return zdt.with(ChronoField.MILLI_OF_SECOND, val)
  },
  seconds: (zdt, val) => {
    if (val === undefined) return zdt.second()
    return zdt.withSecond(val)
  },
  minutes: (zdt, val) => {
    if (val === undefined) return zdt.minute()
    return zdt.withMinute(val)
  },
  // DST
  hours: (zdt, val) => {
    if (val === undefined) return zdt.hour()
    return zdt.withHour(val)
  },
  day: (zdt, val) => {
    if (val === undefined) return zdt.dayOfWeek().value()

    // this is 'undefined' behavior
    // original date-math tries to use Date.setDay but that is undefined
    return zdt.with(ChronoField.DAY_OF_WEEK, val)
  },
  weekday: (zdt, val, firstDay) => {
    const weekday = (zdt.dayOfWeek().value() + 7 - firstDay || 0) % 7
    return val === undefined
      ? weekday
      : zdt.plus(val - weekday, ChronoUnit.DAYS)
  },
  date: (zdt, val) => {
    if (val === undefined) return zdt.dayOfMonth()
    return zdt.withDayOfMonth(val)
  },
  month: (zdt, val) => {
    // native javaScript date counts months starting from 0 (january)
    // joda counts months starting from 1 (january)
    if (val === undefined) return zdt.monthValue() - 1
    return zdt.withMonth(val + 1)
  },
  year: (zdt, val) => {
    if (val === undefined) return zdt.year()
    return zdt.withYear(val)
  },
  nativeTime: zdt => {
    const milli = zdt.get(ChronoField.MILLI_OF_SECOND)
    const seconds = zdt.get(ChronoField.INSTANT_SECONDS)
    return seconds * 1000 + milli
  },
}

const maths = {
  add: (zdt, value, unit) => {
    const chronoUnit = chronoUnitMap[unit]
    if (chronoUnit === undefined) {
      throw new TypeError(`Invalid units when adding: "${unit}"`)
    }
    return zdt.plus(value, chronoUnit)
  },
  subtract: (zdt, value, unit) => {
    const chronoUnit = chronoUnitMap[unit]
    if (chronoUnit === undefined) {
      throw new TypeError(`Invalid units when adding: "${unit}"`)
    }
    return zdt.minus(value, chronoUnit)
  },
  eq: createComparer((a, b) => a.toLocalDateTime().equals(b.toLocalDateTime())),
  neq: createComparer((a, b) => !a.equals(b)),
  gte: createComparer((a, b) => a.equals(b) || a.isAfter(b)),
  gt: createComparer((a, b) => a.isAfter(b)),
  lte: createComparer((a, b) => a.equals(b) || a.isBefore(b)),
  lt: createComparer((a, b) => a.isBefore(b)),
  min: function() {
    let min
    ;[...arguments].forEach(zdt => {
      if (!min || zdt.isBefore(min)) {
        min = zdt
      }
    })
    return min
  },
  max: function() {
    let max
    ;[...arguments].forEach(zdt => {
      if (!max || zdt.isAfter(max)) {
        max = zdt
      }
    })
    return max
  },
  diff: function(date1, date2, unit, asFloat) {
    let dividend, divisor, result

    // pre-work
    switch (unit) {
      case MILI:
      case SECONDS:
      case MINUTES:
      case HOURS:
      case DAY:
      case WEEK:
        dividend = accessors.nativeTime(date2) - accessors.nativeTime(date1)
        break
      case MONTH:
      case YEAR:
      case DECADE:
      case CENTURY:
        dividend =
          (accessors.year(date2) - accessors.year(date1)) * 12 +
          accessors.month(date2) -
          accessors.month(date1)
        break
      default:
        throw new TypeError(`Invalid units for diff: "${unit}"`)
    }

    // post-work
    switch (unit) {
      case MILI:
        divisor = 1
        break
      case SECONDS:
        divisor = 1000
        break
      case MINUTES:
        divisor = 1000 * 60
        break
      case HOURS:
        divisor = 1000 * 60 * 60
        break
      case DAY:
        divisor = 1000 * 60 * 60 * 24
        break
      case WEEK:
        divisor = 1000 * 60 * 60 * 24 * 7
        break
      case MONTH:
        divisor = 1
        break
      case YEAR:
        divisor = 12
        break
      case DECADE:
        divisor = 120
        break
      case CENTURY:
        divisor = 1200
        break
      default:
        throw new TypeError(`Invalid units for diff: "${unit}"`)
    }

    result = dividend / divisor

    return asFloat ? result : Math.round(result)
  },
}

const inRange = (day, min, max, unit) => {
  unit = unit || DAY

  return (
    (!min || maths.gte(day, min, unit)) && (!max || maths.lte(day, max, unit))
  )
}

// this is confusing, needs specs
const startOf = (date, unit, firstOfWeek) => {
  let result = date
  // do some pre-work
  switch (unit) {
    case CENTURY:
    case DECADE:
    case YEAR:
      result = accessors.month(date, 0)
      break
    case MONTH:
      result = accessors.date(date, 1)
      break
    case WEEK:
    case DAY:
      result = result
        .toLocalDate()
        .atStartOfDay()
        .atZone(date.zone())
      break
    case HOURS:
      result = accessors.minutes(date, 0)
      break
    case MINUTES:
      result = accessors.seconds(date, 0)
      break
    case SECONDS:
      result = accessors.milliseconds(date, 0)
      break
  }

  // additional post-work
  if (unit === DECADE) {
    result = maths.subtract(result, accessors.year(result) % 10, YEAR)
  }

  if (unit === CENTURY) {
    result = maths.subtract(result, accessors.year(result) % 100, YEAR)
  }

  if (unit === WEEK) {
    result = accessors.weekday(result, 0, firstOfWeek)
  }

  return result
}

// this is confusing, needs specs
const endOf = (date, unit, firstOfWeek) => {
  let result = date
  result = startOf(date, unit, firstOfWeek)
  result = maths.add(result, 1, unit)
  result = maths.subtract(result, 1, MILI)
  return result
}

export default {
  startOf,
  endOf,
  inRange,
  ...accessors,
  ...maths,
}

function createComparer(operator) {
  return function(a, b, unit) {
    return operator(startOf(a, unit), startOf(b, unit))
  }
}
