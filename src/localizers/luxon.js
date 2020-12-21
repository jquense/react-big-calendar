import * as dates from '../utils/dates'
import { DateLocalizer } from '../localizer'

const dateRangeFormat = ({ start, end }, culture, local) =>
  `${local.format(start, 'D', culture)} — ${local.format(end, 'D', culture)}`

const timeRangeFormat = ({ start, end }, culture, local) =>
  `${local.format(start, 't', culture)} — ${local.format(end, 't', culture)}`

const timeRangeStartFormat = ({ start }, culture, local) =>
  `${local.format(start, 't', culture)} — `

const timeRangeEndFormat = ({ end }, culture, local) =>
  ` — ${local.format(end, 't', culture)}`

const weekRangeFormat = ({ start, end }, culture, local) =>
  `${local.format(start, 'MMMM dd', culture)} — ${local.format(
    end,
    dates.eq(start, end, 'month') ? 'dd' : 'MMMM dd',
    culture
  )}`

export const formats = {
  dateFormat: 'dd',
  dayFormat: 'dd EEE',
  weekdayFormat: 'ccc',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,

  timeGutterFormat: 't',

  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'cccc MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'ccc MMM dd',
  agendaTimeFormat: 't',
  agendaTimeRangeFormat: timeRangeFormat,
}

const luxonLocalizer = function(DateTime, { firstDayOfWeek }) {
  const locale = (d, c) => (c ? d.reconfigure(c) : d)

  return new DateLocalizer({
    formats,
    firstOfWeek() {
      return firstDayOfWeek
    },

    format(value, format, culture) {
      return locale(DateTime.fromJSDate(value), culture).toFormat(format)
    },
  })
}

export default luxonLocalizer
