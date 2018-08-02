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
  timeGutterFormat: {
    hour: 'numeric',
    minute: 'numeric',
  },
}

const jsJodaZonedDtToJsDate = (zdt, timezone) => {
  const jodaFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")
  // timezone loses its meaning here
  const localTzString = jodaFormatter.format(
    zdt.withZoneSameLocal(ZoneId.SYSTEM)
  )
  return new Date(localTzString) // ignore this one
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
    format(value, formatOptions, culture, timezone) {
      const formatter = new Intl.DateTimeFormat(
        [culture || 'en'],
        formatOptions
      )
      return formatter.format(jsJodaZonedDtToJsDate(value, timezone))
    },
  })
}
