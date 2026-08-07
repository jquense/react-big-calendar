import * as dates from '../utils/dates'
import { DateLocalizer } from '../localizer'

let dateRangeFormat = ({ start, end }, culture, local) =>
  `${local.format(start, 'P', culture)} – ${local.format(end, 'P', culture)}`

let timeRangeFormat = ({ start, end }, culture, local) =>
  `${local.format(start, 'p', culture)} – ${local.format(end, 'p', culture)}`

let timeRangeStartFormat = ({ start }, culture, local) =>
  `${local.format(start, 'h:mma', culture)} – `

let timeRangeEndFormat = ({ end }, culture, local) =>
  ` – ${local.format(end, 'h:mma', culture)}`

let weekRangeFormat = ({ start, end }, culture, local) =>
  `${local.format(start, 'MMMM dd', culture)} – ${local.format(
    end,
    dates.eq(start, end, 'month') ? 'dd' : 'MMMM dd',
    culture
  )}`

export let formats = {
  dateFormat: 'dd',
  dayFormat: 'dd eee',
  weekdayFormat: 'ccc',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,

  timeGutterFormat: 'p',

  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'cccc MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'ccc MMM dd',
  agendaTimeFormat: 'p',
  agendaTimeRangeFormat: timeRangeFormat,
}

const MILLIS_PER = {
  milliseconds: 1,
  seconds: 1000,
  minutes: 60 * 1000,
  hours: 60 * 60 * 1000,
}

/**
 * Adds calendar units by their components rather than by elapsed time.
 *
 * The default arithmetic (`date-arithmetic`) advances a day by adding 24h and
 * then correcting the offset so the wall-clock time is preserved. In zones
 * where DST starts at midnight the corrected target — 00:00 on the transition
 * day — does not exist, so the result lands an hour earlier, back on the
 * previous day. `visibleDays` then emits that day twice: the month grid draws
 * it in two columns, every later day shifts one column out of its weekday
 * header, and the extra cell spills into a seventh row.
 *
 * Thirteen zones in the IANA database transition at midnight, among them
 * America/Santiago, America/Havana, Asia/Beirut, Africa/Cairo and
 * Atlantic/Azores, so the grid breaks there once a year, every year.
 *
 * Adding by components — "the day after the 5th is the 6th" — is correct in
 * every zone whether that day ran 23, 24 or 25 hours. Time units keep using
 * elapsed time, and month/year keep delegating to `dates.add`, which is
 * already component-based.
 *
 * The moment, luxon and dayjs localizers all define their own arithmetic;
 * date-fns was the only one inheriting the default, and it needs no new
 * runtime dependency to stop doing so.
 */
function add(date, num, unit) {
  const millis = MILLIS_PER[unit]
  if (millis) return new Date(date.getTime() + num * millis)

  if (unit === 'day' || unit === 'week') {
    const days = unit === 'week' ? num * 7 : num
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + days,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  }

  return dates.add(date, num, unit)
}

function range(start, end, unit = 'day') {
  let current = start
  const days = []

  while (dates.lte(current, end, unit)) {
    days.push(current)
    current = add(current, 1, unit)
  }

  return days
}

// `startOf`/`endOf` walk to the week boundary through `weekday()`, which is
// itself built on the default `add`, so week boundaries land a day early in the
// same zones. Every other unit is set directly and already correct.
function startOf(date, unit, firstOfWeek) {
  if (unit !== 'week') return dates.startOf(date, unit)

  const offset = (date.getDay() + 7 - (firstOfWeek || 0)) % 7
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - offset)
}

function endOf(date, unit, firstOfWeek) {
  if (unit !== 'week') return dates.endOf(date, unit)

  const start = startOf(date, 'week', firstOfWeek)
  return new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate() + 6,
    23,
    59,
    59,
    999
  )
}

function firstVisibleDay(date, localizer) {
  return startOf(dates.startOf(date, 'month'), 'week', localizer.startOfWeek())
}

function lastVisibleDay(date, localizer) {
  return endOf(dates.endOf(date, 'month'), 'week', localizer.startOfWeek())
}

// `dates.visibleDays` calls `dates.add` directly rather than going through the
// localizer, so overriding `add` alone would not reach the month grid.
function visibleDays(date, localizer) {
  return range(
    firstVisibleDay(date, localizer),
    lastVisibleDay(date, localizer),
    'day'
  )
}

const dateFnsLocalizer = function ({
  startOfWeek,
  getDay,
  format: _format,
  locales,
}) {
  return new DateLocalizer({
    formats,
    firstOfWeek(culture) {
      return getDay(startOfWeek(new Date(), { locale: locales[culture] }))
    },

    format(value, formatString, culture) {
      return _format(new Date(value), formatString, {
        locale: locales[culture],
      })
    },

    add,
    range,
    startOf,
    endOf,
    firstVisibleDay,
    lastVisibleDay,
    visibleDays,
  })
}

export default dateFnsLocalizer
