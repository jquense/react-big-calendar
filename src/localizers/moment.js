import { DateLocalizer } from '../localizer'

let weekRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'MMMM DD', culture) +
  ' – ' +
  // updated to use this localizer 'eq()' method
  local.format(end, local.eq(start, end, 'month') ? 'DD' : 'MMMM DD', culture)

let dateRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'L', culture) + ' – ' + local.format(end, 'L', culture)

let timeRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'LT', culture) + ' – ' + local.format(end, 'LT', culture)

let timeRangeStartFormat = ({ start }, culture, local) =>
  local.format(start, 'LT', culture) + ' – '

let timeRangeEndFormat = ({ end }, culture, local) =>
  ' – ' + local.format(end, 'LT', culture)

export let formats = {
  dateFormat: 'DD',
  dayFormat: 'DD ddd',
  weekdayFormat: 'ddd',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,

  timeGutterFormat: 'LT',

  monthHeaderFormat: 'MMMM YYYY',
  dayHeaderFormat: 'dddd MMM DD',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'ddd MMM DD',
  agendaTimeFormat: 'LT',
  agendaTimeRangeFormat: timeRangeFormat,
}

export default function(moment) {
  let locale = (m, c) => (c ? m.locale(c) : m)

  /*** BEGIN localized date arithmetic methods with moment ***/
  function defineComparators(a, b, unit = '') {
    return [
      moment(a),
      moment(b),
      unit === 'FullYear' ? 'year' : unit.toLowerCase(),
    ]
  }

  function startOf(date = null, unit) {
    if (unit) {
      return moment(date)
        .startOf(unit === 'FullYear' ? 'year' : unit.toLowerCase())
        .toDate()
    }
    return moment(date).toDate()
  }

  function endOf(date = null, unit) {
    if (unit) {
      return moment(date)
        .endOf(unit === 'FullYear' ? 'year' : unit.toLowerCase())
        .toDate()
    }
    return moment(date).toDate()
  }

  function eq(a, b, unit) {
    const [dtA, dtB, comparator] = defineComparators(a, b, unit)
    const first = dtA.startOf(comparator)
    const second = dtB.startOf(comparator)
    return first.isSame(second, comparator)
  }

  function neq(a, b, unit) {
    const [dtA, dtB, comparator] = defineComparators(a, b, unit)
    const first = dtA.startOf(comparator)
    const second = dtB.startOf(comparator)
    return !first.isSame(second, comparator)
  }

  function gt(a, b, unit) {
    const [dtA, dtB, comparator] = defineComparators(a, b, unit)
    const first = dtA.startOf(comparator)
    const second = dtB.startOf(comparator)
    return first.isAfter(second, comparator)
  }

  function lt(a, b, unit) {
    const [dtA, dtB, comparator] = defineComparators(a, b, unit)
    const first = dtA.startOf(comparator)
    const second = dtB.startOf(comparator)
    return first.isBefore(second, comparator)
  }

  function gte(a, b, unit) {
    const [dtA, dtB, comparator] = defineComparators(a, b, unit)
    const first = dtA.startOf(comparator)
    const second = dtB.startOf(comparator)
    return first.isSameOrAfter(second, comparator)
  }

  function lte(a, b, unit) {
    const [dtA, dtB, comparator] = defineComparators(a, b, unit)
    const first = dtA.startOf(comparator)
    const second = dtB.startOf(comparator)
    return first.isSameOrBefore(second, comparator)
  }

  function inRange(day, min, max, unit = 'day') {
    return (!min || gte(day, min, unit)) && (!max || lte(day, max, unit))
  }

  function min(dateA, dateB) {
    const dtA = moment(dateA)
    const dtB = moment(dateB)
    const minDt = moment.min(dtA, dtB)
    return minDt.toDate()
  }

  function max(dateA, dateB) {
    const dtA = moment(dateA)
    const dtB = moment(dateB)
    const maxDt = moment.max(dtA, dtB)
    return maxDt.toDate()
  }

  function merge(date, time) {
    if (!date && !time) return null

    const tm = moment(time).format('HH:mm:ss')
    const dt = moment(date)
      .startOf('day')
      .format('MM/DD/YYYY')
    // We do it this way to avoid issues when timezone switching
    return moment(`${dt} ${tm}`, 'MM/DD/YYYY HH:mm:ss').toDate()
  }

  function add(date, adder, unit) {
    return moment(date)
      .add(adder, unit === 'FullYear' ? 'year' : unit.toLowerCase())
      .toDate()
  }

  function range(start, end, unit = 'day') {
    let current = start
    const days = []

    while (lte(current, end, unit)) {
      days.push(current)
      current = add(current, 1, unit)
    }

    return days
  }

  function ceil(date, unit) {
    let floor = startOf(date, unit)

    return eq(floor, date) ? floor : add(floor, 1, unit)
  }

  function diff(a, b, unit = 'day') {
    const [dtA, dtB, comparator] = defineComparators(a, b, unit)
    return dtB.diff(dtA, comparator)
  }

  function minutes(date) {
    const dt = moment(date)
    return dt.minutes()
  }

  function firstOfWeek(culture) {
    let data = culture ? moment.localeData(culture) : moment.localeData()
    return data ? data.firstDayOfWeek() : 0
  }

  function firstVisibleDay(date) {
    let firstOfMonth = startOf(date, 'month')

    return startOf(firstOfMonth, 'week', firstOfWeek())
  }

  function lastVisibleDay(date) {
    let endOfMonth = endOf(date, 'month')

    return endOf(endOfMonth, 'week')
  }

  function visibleDays(date) {
    let current = firstVisibleDay(date)
    const last = lastVisibleDay(date)
    const days = []

    while (lte(current, last, 'day')) {
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
    return moment(dt)
      .hour(0)
      .minute(minutesFromMidnight + offset)
      .second(0)
      .millisecond(0)
      .toDate()
  }

  return new DateLocalizer({
    formats,

    firstOfWeek,
    firstVisibleDay,
    lastVisibleDay,
    visibleDays,

    format(value, format, culture) {
      return locale(moment(value), culture).format(format)
    },

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
    minutes,

    getSlotDate,
  })
}
