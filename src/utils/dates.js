/* eslint no-fallthrough: off */
import * as dates from 'date-arithmetic'

export {
  milliseconds,
  seconds,
  minutes,
  hours,
  month,
  add,
  min,
  max,
} from 'date-arithmetic'

const MILLI = {
  seconds: 1000,
  minutes: 1000 * 60,
  hours: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
}

const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

export function monthsInYear(year) {
  let date = new Date(year, 0, 1)

  return MONTHS.map(i => dates.month(date, i))
}

export function firstVisibleDay(date, localizer) {
  let firstOfMonth = startOf(date, 'month', localizer)

  return startOfWeek(firstOfMonth, localizer)
}

export function lastVisibleDay(date, localizer) {
  let endOfMonth = endOf(date, 'month', localizer)

  return endOfWeek(endOfMonth, localizer)
}

export function visibleDays(date, localizer) {
  let current = firstVisibleDay(date, localizer),
    last = lastVisibleDay(date, localizer),
    days = []

  while (lte(current, last, 'day')) {
    days.push(current)
    current = dates.add(current, 1, 'day')
  }

  return days
}

export function ceil(date, unit, localizer) {
  let floor = startOf(date, unit, localizer)

  return eq(floor, date, localizer) ? floor : dates.add(floor, 1, unit)
}

export function range(start, end, unit = 'day', localizer) {
  let current = start,
    days = []

  while (lte(current, end, unit, localizer)) {
    days.push(current)
    current = dates.add(current, 1, unit)
  }

  return days
}

export function merge(date, time, localizer = null) {
  if (time == null && date == null) return null

  if (time == null) time = new Date()
  if (date == null) date = new Date()

  date = startOf(date, 'day', localizer)
  const { hours, minutes, seconds, milliseconds } = getTimeUnits(time)

  if (localizer && localizer.localizedDateUtil) {
    return localizer.localizedDateUtil.setTime(
      date,
      hours,
      minutes,
      seconds,
      milliseconds
    )
  }

  date = dates.hours(date, hours)
  date = dates.minutes(date, minutes)
  date = dates.seconds(date, seconds)
  return dates.milliseconds(date, milliseconds)
}

export function getTimeUnits(time) {
  return {
    hours: dates.hours(time),
    minutes: dates.minutes(time),
    seconds: dates.seconds(time),
    milliseconds: dates.milliseconds(time),
  }
}

export function eqTime(dateA, dateB) {
  return (
    dates.hours(dateA) === dates.hours(dateB) &&
    dates.minutes(dateA) === dates.minutes(dateB) &&
    dates.seconds(dateA) === dates.seconds(dateB)
  )
}

export function isJustDate(date, localizer) {
  const utilSource =
    localizer && localizer.localizedDateUtil
      ? localizer.localizedDateUtil
      : dates
  const {
    hours: getHours,
    minutes: getMinutes,
    seconds: getSeconds,
  } = utilSource
  return (
    getHours(date) === 0 &&
    getMinutes(date) === 0 &&
    getSeconds(date) === 0 &&
    dates.milliseconds(date) === 0
  )
}

export function duration(start, end, unit, firstOfWeek) {
  if (unit === 'day') unit = 'date'
  return Math.abs(
    dates[unit](start, undefined, firstOfWeek) -
      dates[unit](end, undefined, firstOfWeek)
  )
}

export function diff(dateA, dateB, unit, localizer) {
  if (!unit || unit === 'milliseconds') return Math.abs(+dateA - +dateB)

  // the .round() handles an edge case
  // with DST where the total won't be exact
  // since one day in the range may be shorter/longer by an hour
  return Math.round(
    Math.abs(
      +startOf(dateA, unit, localizer) / MILLI[unit] -
        +startOf(dateB, unit, localizer) / MILLI[unit]
    )
  )
}

export function total(date, unit) {
  let ms = date.getTime(),
    div = 1

  switch (unit) {
    case 'week':
      div *= 7
    case 'day':
      div *= 24
    case 'hours':
      div *= 60
    case 'minutes':
      div *= 60
    case 'seconds':
      div *= 1000
  }

  return ms / div
}

export function week(date) {
  var d = new Date(date)
  d.setHours(0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7)
}

export function today() {
  return startOf(new Date(), 'day')
}

export function yesterday() {
  return dates.add(startOf(new Date(), 'day'), -1, 'day')
}

export function tomorrow() {
  return dates.add(startOf(new Date(), 'day'), 1, 'day')
}

export function endOf(date, unit, localizer) {
  if (unit === 'week') return endOfWeek(date, localizer)
  if (localizer && localizer.localizedDateUtil) {
    return localizer.localizedDateUtil.endOf(date, 'week')
  }
  return dates.endOf(date, unit)
}

export function endOfWeek(date, localizer) {
  const firstOfWeek = localizer.startOfWeek()
  if (localizer.localizedDateUtil) {
    return localizer.localizedDateUtil.endOf(date, 'week')
  }
  return dates.endOf(date, 'week', firstOfWeek)
}

export function startOfWeek(date, localizer) {
  const firstOfWeek = localizer.startOfWeek()
  if (localizer.localizedDateUtil) {
    return localizer.localizedDateUtil.startOf(date, 'week')
  }
  return dates.startOf(date, 'week', firstOfWeek)
}

export function startOf(date, unit, localizer) {
  if (unit === 'week') {
    return startOfWeek(date, localizer)
  }
  if (localizer && localizer.localizedDateUtil) {
    return localizer.localizedDateUtil.startOf(date, unit)
  }
  return dates.startOf(date, unit)
}

export var eq = createComparer(function(a, b) {
  return a === b
})
export var gt = createComparer(function(a, b) {
  return a > b
})
export var gte = createComparer(function(a, b) {
  return a >= b
})
export var lt = createComparer(function(a, b) {
  return a < b
})
export var lte = createComparer(function(a, b) {
  return a <= b
})
export function inRange(day, min, max, unit, localizer) {
  unit = unit || 'day'

  return (
    (!min || gte(day, min, unit, localizer)) &&
    (!max || lte(day, max, unit, localizer))
  )
}

function createComparer(operator) {
  return function(a, b, unit, localizer) {
    return operator(+startOf(a, unit, localizer), +startOf(b, unit, localizer))
  }
}
