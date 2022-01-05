import { DateLocalizer } from '../localizer'

function pluralizeUnit(unit) {
  return /s$/.test(unit) ? unit : unit + 's'
}

const weekRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'MMMM dd', culture) +
  ' – ' +
  // updated to use this localizer 'eq()' method
  local.format(end, local.eq(start, end, 'month') ? 'dd' : 'MMMM dd', culture)

const dateRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'D', culture) + ' – ' + local.format(end, 'D', culture)

const timeRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 't', culture) + ' – ' + local.format(end, 't', culture)

const timeRangeStartFormat = ({ start }, culture, local) =>
  local.format(start, 't', culture) + ' – '

const timeRangeEndFormat = ({ end }, culture, local) =>
  ' – ' + local.format(end, 't', culture)

export const formats = {
  dateFormat: 'dd',
  dayFormat: 'dd EEE',
  weekdayFormat: 'EEE',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,

  timeGutterFormat: 't',

  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'EEEE MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'EEE MMM dd',
  agendaTimeFormat: 't',
  agendaTimeRangeFormat: timeRangeFormat,
}

function fixUnit(unit) {
  let datePart = unit ? pluralizeUnit(unit.toLowerCase()) : unit
  if (datePart === 'FullYear') {
    datePart = 'year'
  } else if (!datePart) {
    datePart = undefined
  }
  return datePart
}

// Luxon does not currently have weekInfo by culture
// Luxon uses 1 based values for month and weekday
// So we default to Sunday (7)
export default function(DateTime, { firstDayOfWeek = 7 } = {}) {
  function formatDate(value, format) {
    return DateTime.fromJSDate(value).toFormat(format)
  }

  function formatDateWithCulture(value, culture, format) {
    return DateTime.fromJSDate(value)
      .setLocale(culture)
      .format(format)
  }

  /*** BEGIN localized date arithmetic methods with Luxon ***/
  function defineComparators(a, b, unit) {
    const datePart = fixUnit(unit)
    const dtA = datePart
      ? DateTime.fromJSDate(a).startOf(datePart)
      : DateTime.fromJSDate(a)
    const dtB = datePart
      ? DateTime.fromJSDate(b).startOf(datePart)
      : DateTime.fromJSDate(b)
    return [dtA, dtB, datePart]
  }

  // Since Luxon (and current Intl API) has no support
  // for culture based weekInfo, we need to handle
  // the start of the week differently
  // depending on locale, the firstDayOfWeek could also be Saturday, Sunday or Monday
  function startOfDTWeek(dtObj) {
    const weekday = dtObj.weekday
    if (weekday === firstDayOfWeek) {
      return dtObj.startOf('day') // already beginning of week
    } else if (firstDayOfWeek === 1) {
      return dtObj.startOf('week') // fow is Monday, which is Luxon default
    }
    const diff = firstDayOfWeek === 7 ? weekday : weekday + (7 - firstDayOfWeek)
    return dtObj.minus({ day: diff }).startOf('day')
  }

  function endOfDTWeek(dtObj) {
    const weekday = dtObj.weekday
    const eow = firstDayOfWeek === 1 ? 7 : firstDayOfWeek - 1
    if (weekday === eow) {
      return dtObj.endOf('day') // already last day of the week
    } else if (firstDayOfWeek === 1) {
      return dtObj.endOf('week') // use Luxon default (Sunday)
    }
    const fromDate =
      firstDayOfWeek > eow ? dtObj.plus({ day: firstDayOfWeek - eow }) : dtObj
    return fromDate.set({ weekday: eow }).endOf('day')
  }

  // This returns a DateTime instance
  function startOfDT(date = new Date(), unit) {
    const datePart = fixUnit(unit)
    if (datePart) {
      const dt = DateTime.fromJSDate(date)
      return datePart.includes('week')
        ? startOfDTWeek(dt)
        : dt.startOf(datePart)
    }
    return DateTime.fromJSDate(date)
  }

  function firstOfWeek() {
    return firstDayOfWeek
  }

  // This returns a JS Date from a DateTime instance
  function startOf(date = new Date(), unit) {
    return startOfDT(date, unit).toJSDate()
  }

  // This returns a DateTime instance
  function endOfDT(date = new Date(), unit) {
    const datePart = fixUnit(unit)
    if (datePart) {
      const dt = DateTime.fromJSDate(date)
      return datePart.includes('week') ? endOfDTWeek(dt) : dt.endOf(datePart)
    }
    return DateTime.fromJSDate(date)
  }

  function endOf(date = new Date(), unit) {
    return endOfDT(date, unit).toJSDate()
  }

  function eq(a, b, unit) {
    const [dtA, dtB] = defineComparators(a, b, unit)
    return +dtA == +dtB
  }

  function neq(a, b, unit) {
    return !eq(a, b, unit)
  }

  function gt(a, b, unit) {
    const [dtA, dtB] = defineComparators(a, b, unit)
    return +dtA > +dtB
  }

  function lt(a, b, unit) {
    const [dtA, dtB] = defineComparators(a, b, unit)
    return +dtA < +dtB
  }

  function gte(a, b, unit) {
    const [dtA, dtB] = defineComparators(a, b, unit)
    return +dtA >= +dtB
  }

  function lte(a, b, unit) {
    const [dtA, dtB] = defineComparators(a, b, unit)
    return +dtA <= +dtB
  }

  function inRange(day, min, max, unit = 'day') {
    const datePart = fixUnit(unit)
    const mDay = startOfDT(day, datePart)
    const mMin = startOfDT(min, datePart)
    const mMax = startOfDT(max, datePart)
    return +mDay >= +mMin && +mDay <= +mMax
  }

  function min(dateA, dateB) {
    const dtA = DateTime.fromJSDate(dateA)
    const dtB = DateTime.fromJSDate(dateB)
    const minDt = DateTime.min(dtA, dtB)
    return minDt.toJSDate()
  }

  function max(dateA, dateB) {
    const dtA = DateTime.fromJSDate(dateA)
    const dtB = DateTime.fromJSDate(dateB)
    const maxDt = DateTime.max(dtA, dtB)
    return maxDt.toJSDate()
  }

  function merge(date, time) {
    if (!date && !time) return null

    const tm = DateTime.fromJSDate(time)
    const dt = startOfDT(date, 'day')
    return dt
      .set({
        hour: tm.hour,
        minute: tm.minute,
        second: tm.second,
        millisecond: tm.millisecond,
      })
      .toJSDate()
  }

  function add(date, adder, unit) {
    const datePart = fixUnit(unit)
    return DateTime.fromJSDate(date)
      .plus({ [datePart]: adder })
      .toJSDate()
  }

  function range(start, end, unit = 'day') {
    const datePart = fixUnit(unit)
    let current = DateTime.fromJSDate(start).toJSDate() // this is to get it to tz
    const days = []

    while (lte(current, end)) {
      days.push(current)
      current = add(current, 1, datePart)
    }

    return days
  }

  function ceil(date, unit) {
    const datePart = fixUnit(unit)
    const floor = startOf(date, datePart)

    return eq(floor, date) ? floor : add(floor, 1, datePart)
  }

  function diff(a, b, unit = 'day') {
    const datePart = fixUnit(unit)
    // don't use 'defineComparators' here, as we don't want to mutate the values
    const dtA = DateTime.fromJSDate(a)
    const dtB = DateTime.fromJSDate(b)
    return Math.round(
      dtB.diff(dtA, datePart, { conversionAccuracy: 'longterm' }).toObject()[
        datePart
      ]
    )
  }

  function firstVisibleDay(date) {
    const startOfMonth = startOfDT(date, 'month')
    return startOfDTWeek(startOfMonth).toJSDate()
  }

  function lastVisibleDay(date) {
    const endOfMonth = endOfDT(date, 'month')
    return endOfDTWeek(endOfMonth).toJSDate()
  }

  function visibleDays(date) {
    let current = firstVisibleDay(date)
    const last = lastVisibleDay(date)
    const days = []

    while (lte(current, last)) {
      days.push(current)
      current = add(current, 1, 'day')
    }

    return days
  }
  /*** END localized date arithmetic methods with moment ***/

  /**
   * Moved from TimeSlots.js, this method overrides the method of the same name
   * in the localizer.js, using moment to construct the js Date
   * @param {Date} dt - date to start with
   * @param {Number} minutesFromMidnight
   * @param {Number} offset
   * @returns {Date}
   */
  function getSlotDate(dt, minutesFromMidnight, offset) {
    return startOfDT(dt, 'day')
      .set({ minutes: minutesFromMidnight + offset })
      .toJSDate()
  }

  // Luxon will automatically handle DST differences in it's calculations
  function getTotalMin(start, end) {
    return diff(start, end, 'minutes')
  }

  function getMinutesFromMidnight(start) {
    const dayStart = startOfDT(start, 'day')
    const day = DateTime.fromJSDate(start)
    return Math.round(
      day
        .diff(dayStart, 'minutes', { conversionAccuracy: 'longterm' })
        .toObject().minutes
    )
  }

  // These two are used by DateSlotMetrics
  function continuesPrior(start, first) {
    return lt(start, first)
  }

  function continuesAfter(start, end, last) {
    return gte(end, last)
  }

  // These two are used by eventLevels
  function sortEvents({
    evtA: { start: aStart, end: aEnd, allDay: aAllDay },
    evtB: { start: bStart, end: bEnd, allDay: bAllDay },
  }) {
    const startSort = +startOf(aStart, 'day') - +startOf(bStart, 'day')

    const durA = diff(aStart, ceil(aEnd, 'day'), 'day')

    const durB = diff(bStart, ceil(bEnd, 'day'), 'day')

    return (
      startSort || // sort by start Day first
      Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
      !!bAllDay - !!aAllDay || // then allDay single day events
      +aStart - +bStart || // then sort by start time *don't need moment conversion here
      +aEnd - +bEnd // then sort by end time *don't need moment conversion here either
    )
  }

  function inEventRange({
    event: { start, end },
    range: { start: rangeStart, end: rangeEnd },
  }) {
    const eStart = startOf(start, 'day')

    const startsBeforeEnd = lte(eStart, rangeEnd, 'day')
    // when the event is zero duration we need to handle a bit differently
    const sameMin = neq(eStart, end, 'minutes')
    const endsAfterStart = sameMin
      ? gt(end, rangeStart, 'minutes')
      : gte(end, rangeStart, 'minutes')
    return startsBeforeEnd && endsAfterStart
  }

  // moment treats 'day' and 'date' equality very different
  // moment(date1).isSame(date2, 'day') would test that they were both the same day of the week
  // moment(date1).isSame(date2, 'date') would test that they were both the same date of the month of the year
  function isSameDate(date1, date2) {
    const dt = DateTime.fromJSDate(date1)
    const dt2 = DateTime.fromJSDate(date2)
    return dt.hasSame(dt2, 'day')
  }

  /**
   * This method, called once in the localizer constructor, is used by eventLevels
   * 'eventSegments()' to assist in determining the 'span' of the event in the display,
   * specifically when using a timezone that is greater than the browser native timezone.
   * @returns number
   */
  function browserTZOffset() {
    /**
     * Date.prototype.getTimezoneOffset horrifically flips the positive/negative from
     * what you see in it's string, so we have to jump through some hoops to get a value
     * we can actually compare.
     */
    const dt = new Date()
    const neg = /-/.test(dt.toString()) ? '-' : ''
    const dtOffset = dt.getTimezoneOffset()
    const comparator = Number(`${neg}${Math.abs(dtOffset)}`)
    // moment correctly provides positive/negative offset, as expected
    const mtOffset = DateTime.local().offset
    return mtOffset > comparator ? 1 : 0
  }

  return new DateLocalizer({
    format(value, format, culture) {
      if (culture) {
        return formatDateWithCulture(value, culture, format)
      }
      return formatDate(value, format)
    },

    formats,

    firstOfWeek,
    firstVisibleDay,
    lastVisibleDay,
    visibleDays,

    lt,
    lte,
    gt,
    gte,
    eq,
    neq,
    merge,
    inRange,
    startOf,
    endOf,
    range,
    add,
    diff,
    ceil,
    min,
    max,

    getSlotDate,
    getTotalMin,
    getMinutesFromMidnight,
    continuesPrior,
    continuesAfter,
    sortEvents,
    inEventRange,
    isSameDate,
    browserTZOffset,
  })
}
