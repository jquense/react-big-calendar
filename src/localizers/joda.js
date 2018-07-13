import { set } from '../formats'
import { set as setLocalizer } from '../localizer'
import {
  DateTimeFormatter,
  convert,
  ZonedDateTime,
  ZoneId,
  nativeJs,
} from 'js-joda'

const formats = {
  // dateFormat: {
  // dayFormat: 'ddd DD/MM',
  // weekdayFormat: 'ddd',
  // selectRangeFormat: timeRangeFormat,
  // eventTimeRangeFormat: timeRangeFormat,
  // eventTimeRangeStartFormat: timeRangeStartFormat,
  // eventTimeRangeEndFormat: timeRangeEndFormat,
  // timeGutterFormat: 'LT',
  // monthHeaderFormat: 'MMMM YYYY',
  // dayHeaderFormat: 'dddd MMM DD',
  // dayRangeHeaderFormat: weekRangeFormat,
  // agendaHeaderFormat: dateRangeFormat,
  // agendaDateFormat: 'ddd MMM DD',
  // agendaTimeFormat: 'LT',
  // agendaTimeRangeFormat: timeRangeFormat,

  //   dateFormat: {

  //   },

  timeGutterFormat: {
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  },
}

const jsJodaZonedDtToJsDate = (zdt, timezone) => {
  // Format into a correct UTC string with trailing Z and parse with new Date()
  const jodaFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'")
  const utcStr = jodaFormatter.format(
    zdt.withZoneSameInstant(ZoneId.of(timezone || 'UTC'))
  )
  return new Date(utcStr) // ignore this one
}

export default function() {
  set(formats)

  // NB: we only care about the english (EN) locale
  return setLocalizer({
    firstOfWeek() {
      return 0 // in english locale, start of week is always 0
    },
    parse(value) {
      // CavEmpt: only works for javascript date and moment
      return ZonedDateTime.from(nativeJs(value))
    },
    format(value, formatOptions, culture) {
      const formatter = new Intl.DateTimeFormat(
        [culture || 'en'],
        formatOptions
      )
      return formatter.format(jsJodaZonedDtToJsDate(value))
    },
  })
}
