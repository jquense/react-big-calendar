import { set } from '../formats'
import { set as setLocalizer } from '../localizer'
import { DateTimeFormatter, ZonedDateTime, ZoneId, nativeJs } from 'js-joda'

const jsJodaZonedDtToJsDate = zdt => {
  // Format into a correct UTC string with trailing Z and parse with new Date()
  const jodaFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'")
  const utcStr = jodaFormatter.format(zdt.withZoneSameInstant(ZoneId.of('UTC')))
  return new Date(utcStr) // this Date is safe
}

export default function() {
  set({})

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
