import * as dates from '../utils/dates'
import { DateLocalizer } from '../localizer'

let dateRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'L', culture) + ' – ' + local.format(end, 'L', culture)

let timeRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'LT', culture) + ' – ' + local.format(end, 'LT', culture)

let timeRangeStartFormat = ({ start }, culture, local) =>
  local.format(start, 'LT', culture) + ' – '

let timeRangeEndFormat = ({ end }, culture, local) =>
  ' – ' + local.format(end, 'LT', culture)

let weekRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'MMMM DD', culture) +
  ' – ' +
  local.format(end, dates.eq(start, end, 'month') ? 'DD' : 'MMMM DD', culture)

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

export default function(moment, useLocalizerForDateMath) {
  let locale = (m, c) => (c ? m.locale(c) : m)

  const localizedDateUtil = useLocalizerForDateMath
    ? {
        startOf: function(date, unit) {
          return moment(date)
            .startOf(unit)
            .toDate()
        },
        endOf: function(date, unit) {
          return moment(date)
            .endOf(unit)
            .toDate()
        },
        setTime: function(date, h = 0, m = 0, s = 0, ms = 0) {
          return moment(date)
            .hours(h)
            .minutes(m)
            .seconds(s)
            .milliseconds(ms)
            .toDate()
        },
        hours: buildAccessor(moment, 'hours'),
        minutes: buildAccessor(moment, 'minutes'),
        seconds: buildAccessor(moment, 'seconds'),
        milliseconds: buildAccessor(moment, 'milliseconds'),
      }
    : null

  return new DateLocalizer({
    formats,
    firstOfWeek(culture) {
      let data = culture ? moment.localeData(culture) : moment.localeData()
      return data ? data.firstDayOfWeek() : 0
    },

    format(value, format, culture) {
      return locale(moment(value), culture).format(format)
    },

    localizedDateUtil,
  })
}

function buildAccessor(moment, key) {
  return function(date) {
    return moment(date)[key]()
  }
}
