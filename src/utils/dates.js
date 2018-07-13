/* eslint no-fallthrough: off */
import dateMath from 'joda-date-arithmetic'
import localizer from '../localizer'
import {
  use as jsJodaUse,
  nativeJs,
  ZonedDateTime,
  LocalDateTime,
  ZoneId,
  IsoFields,
} from 'js-joda'
import jsJodaTimeZone from 'js-joda-timezone'
jsJodaUse(jsJodaTimeZone)

const MILLI = {
  seconds: 1000,
  minutes: 1000 * 60,
  hours: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
}

const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

let dates = {
  ...dateMath,

  monthsInYear(year, timezone) {
    const datetime = LocalDateTime.of(year, 1, 1)
    const date = ZonedDateTime.of(datetime, timezone || ZoneId.SYSTEM)

    return MONTHS.map(i => dates.month(zdt, i))
  },

  firstVisibleDay(date, culture) {
    let firstOfMonth = dates.startOf(date, 'month')

    return dates.startOf(firstOfMonth, 'week', localizer.startOfWeek(culture))
  },

  lastVisibleDay(date, culture) {
    let endOfMonth = dates.endOf(date, 'month')

    return dates.endOf(endOfMonth, 'week', localizer.startOfWeek(culture))
  },

  visibleDays(date, culture) {
    let current = dates.firstVisibleDay(date, culture),
      last = dates.lastVisibleDay(date, culture),
      days = []

    while (dates.lte(current, last, 'day')) {
      days.push(current)
      current = dates.add(current, 1, 'day')
    }

    return days
  },

  ceil(date, unit) {
    let floor = dates.startOf(date, unit)

    return dates.eq(floor, date) ? floor : dates.add(floor, 1, unit)
  },

  range(start, end, unit = 'day') {
    let current = start,
      days = []

    while (dates.lte(current, end, unit)) {
      days.push(current)
      current = dates.add(current, 1, unit)
    }

    return days
  },

  merge(date, time, timezone) {
    let tz = timezone || ZoneId.SYSTEM
    if (time == null && date == null) return null

    if (time == null) time = ZonedDateTime.now(tz)
    if (date == null) date = ZonedDateTime.now(tz)

    date = dates.startOf(date, 'day')
    date = dates.hours(date, dates.hours(time))
    date = dates.minutes(date, dates.minutes(time))
    date = dates.seconds(date, dates.seconds(time))
    return dates.milliseconds(date, dates.milliseconds(time))
  },

  eqTime(dateA, dateB) {
    return (
      dates.hours(dateA) === dates.hours(dateB) &&
      dates.minutes(dateA) === dates.minutes(dateB) &&
      dates.seconds(dateA) === dates.seconds(dateB)
    )
  },

  isJustDate(date) {
    return (
      dates.hours(date) === 0 &&
      dates.minutes(date) === 0 &&
      dates.seconds(date) === 0 &&
      dates.milliseconds(date) === 0
    )
  },

  duration(start, end, unit, firstOfWeek) {
    if (unit === 'day') unit = 'date'
    start = dates.nativeTime(dates[unit](start, undefined, firstOfWeek))
    end = dates.nativeTime(dates[unit](end, undefined, firstOfWeek))

    return Math.abs(start - end)
  },

  diff(dateA, dateB, unit) {
    let start, end

    if (!unit || unit === 'milliseconds') {
      start = dates.nativeTime(dateA)
      end = dates.nativeTime(dateB)
      return Math.abs(start - end)
    }

    start = dates.nativeTime(dates.startOf(dateA, unit)) / MILLI[unit]
    end = dates.nativeTime(dates.startOf(dateB, unit)) / MILLI[unit]

    // the .round() handles an edge case
    // with DST where the total won't be exact
    // since one day in the range may be shorter/longer by an hour
    return Math.round(Math.abs(start - end))
  },

  total(date, unit) {
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
  },

  week(date) {
    return date.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR)
  },

  today(timezone) {
    return dates.startOf(ZonedDateTime.now(timezone || ZoneId.SYSTEM), 'day')
  },

  yesterday(timezone) {
    return dates.add(
      dates.startOf(ZonedDateTime.now(timezone || ZoneId.SYSTEM), 'day'),
      -1,
      'day'
    )
  },

  tomorrow(timezone) {
    return dates.add(
      dates.startOf(ZonedDateTime.now(timezone || ZoneId.SYSTEM), 'day'),
      1,
      'day'
    )
  },
}

export default dates
