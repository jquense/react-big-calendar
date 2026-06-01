import oldGlobalize, { formats } from '../../src/localizers/oldGlobalize'
import { DateLocalizer } from '../../src/localizer'

const d = (y, m, day, h = 0, min = 0) => new Date(y, m, day, h, min)

function makeOldGlobalize() {
  const culture = { calendar: { firstDay: 1 } }
  function globalize(_cult) {
    return globalize
  }
  globalize.findClosestCulture = (_c) => culture
  globalize.culture = () => culture
  globalize.format = (value, _fmt, _culture) => value.getFullYear().toString()
  return globalize
}

const localizer = oldGlobalize(makeOldGlobalize())

describe('formats', () => {
  test('dateFormat is defined', () => expect(formats.dateFormat).toBeDefined())
  test('monthHeaderFormat is defined', () => expect(formats.monthHeaderFormat).toBeDefined())
})

describe('oldGlobalize localizer', () => {
  test('creates a DateLocalizer instance', () => {
    expect(localizer).toBeInstanceOf(DateLocalizer)
  })

  test('startOfWeek returns 1 (Monday) from culture', () => {
    expect(localizer.startOfWeek('en')).toBe(1)
  })

  test('startOfWeek with no culture uses globalize.culture()', () => {
    expect(typeof localizer.startOfWeek()).toBe('number')
  })

  test('format returns a string', () => {
    expect(typeof localizer.format(d(2023, 0, 15), 'YYYY')).toBe('string')
  })
})

describe('oldGlobalize — getCulture branches', () => {
  test('getCulture returns culture when culture is provided', () => {
    // Accessing indirectly via startOfWeek
    expect(localizer.startOfWeek('fr')).toBe(1)
  })

  test('getCulture uses globalize.culture() when no culture is given', () => {
    expect(localizer.startOfWeek()).toBe(1)
  })

  test('firstOfWeek returns 0 when culture has no calendar.firstDay', () => {
    const fallbackGlob = makeOldGlobalize()
    fallbackGlob.culture = () => null
    fallbackGlob.findClosestCulture = () => null
    const loc = oldGlobalize(fallbackGlob)
    expect(loc.startOfWeek()).toBe(0)
  })
})

describe('oldGlobalize — agendaHeaderFormat', () => {
  test('agendaHeaderFormat (dateRangeFormat) returns a string', () => {
    const result = formats.agendaHeaderFormat(
      { start: new Date(2023, 0, 1), end: new Date(2023, 1, 1) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })
})

describe('oldGlobalize — format functions', () => {
  test('selectRangeFormat returns a string', () => {
    const result = formats.selectRangeFormat(
      { start: d(2023, 0, 1, 10), end: d(2023, 0, 1, 11) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('eventTimeRangeStartFormat returns a string', () => {
    const result = formats.eventTimeRangeStartFormat(
      { start: d(2023, 0, 1, 9) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('eventTimeRangeEndFormat returns a string', () => {
    const result = formats.eventTimeRangeEndFormat(
      { end: d(2023, 0, 1, 10) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('weekRangeFormat same month returns a string', () => {
    const result = formats.dayRangeHeaderFormat(
      { start: d(2023, 0, 1), end: d(2023, 0, 7) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })

  test('weekRangeFormat different months returns a string', () => {
    const result = formats.dayRangeHeaderFormat(
      { start: d(2023, 0, 29), end: d(2023, 1, 4) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })
})
