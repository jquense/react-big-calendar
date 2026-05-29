import globalizeLocalizer, { formats } from '../../src/localizers/globalize'
import { DateLocalizer } from '../../src/localizer'

const d = (y, m, day, h = 0, min = 0) => new Date(y, m, day, h, min)

function makeLocaleInstance() {
  return {
    cldr: {
      attributes: { territory: 'US' },
      get: () => ({
        weekData: { firstDay: { US: 'sun', '001': 'mon' } },
      }),
    },
    formatDate: (value, format) => {
      if (format && format.raw === 'e') return '1'
      return value.getFullYear().toString()
    },
  }
}

function makeGlobalize1x() {
  const localeInstance = makeLocaleInstance()

  function globalize(_culture) {
    return localeInstance
  }
  // locale(null) returns globalize itself, so it needs formatDate too
  globalize.formatDate = localeInstance.formatDate
  globalize.cldr = localeInstance.cldr
  globalize.load = true
  globalize.format = (value, _format, _culture) => value.getFullYear().toString()

  return globalize
}

function makeOldGlobalize() {
  const culture = { calendar: { firstDay: 0 } }
  function globalize(_cult) {
    return globalize
  }
  globalize.findClosestCulture = () => culture
  globalize.culture = () => culture
  globalize.format = (value, _fmt, _cult) => value.getFullYear().toString()
  // No .load property → triggers oldGlobalize path
  return globalize
}

describe('formats', () => {
  test('dateFormat is defined', () => expect(formats.dateFormat).toBeDefined())
  test('monthHeaderFormat is defined', () => expect(formats.monthHeaderFormat).toBeDefined())
})

describe('globalize localizer (1.x path — has .load)', () => {
  const globalizeInstance = makeGlobalize1x()
  const localizer = globalizeLocalizer(globalizeInstance)

  test('creates a DateLocalizer instance', () => {
    expect(localizer).toBeInstanceOf(DateLocalizer)
  })

  test('startOfWeek returns a number', () => {
    expect(typeof localizer.startOfWeek()).toBe('number')
  })

  test('format returns a string', () => {
    const result = localizer.format(d(2023, 0, 15), 'YYYY')
    expect(typeof result).toBe('string')
  })

  test('format passes object format through', () => {
    const result = localizer.format(d(2023, 0, 15), { date: 'short' })
    expect(typeof result).toBe('string')
  })
})

describe('globalize localizer (1.x) — firstOfWeek CLDR fallback', () => {
  test('falls back gracefully when CLDR supplemental is not loaded', () => {
    const failingLocaleInstance = {
      cldr: {
        attributes: { territory: 'US' },
        get: () => { throw new Error('no cldr') },
      },
      formatDate: (value, format) => {
        if (format && format.raw === 'e') return '1'
        return value.getFullYear().toString()
      },
    }
    function globalize(_culture) { return failingLocaleInstance }
    globalize.formatDate = failingLocaleInstance.formatDate
    globalize.cldr = failingLocaleInstance.cldr
    globalize.load = true
    globalize.format = (value, _fmt, _culture) => value.getFullYear().toString()

    const loc = globalizeLocalizer(globalize)
    expect(typeof loc.startOfWeek()).toBe('number')
  })
})

describe('globalize localizer (old/0.x path — no .load)', () => {
  const oldGlob = makeOldGlobalize()
  const localizer = globalizeLocalizer(oldGlob)

  test('creates a DateLocalizer instance', () => {
    expect(localizer).toBeInstanceOf(DateLocalizer)
  })

  test('startOfWeek returns 0 (Sunday)', () => {
    expect(localizer.startOfWeek()).toBe(0)
  })

  test('format returns a string', () => {
    expect(typeof localizer.format(d(2023, 0, 15), 'YYYY')).toBe('string')
  })
})

describe('formats object — agendaHeaderFormat', () => {
  test('agendaHeaderFormat (dateRangeFormat) returns a string', () => {
    const globalizeInstance = makeGlobalize1x()
    const localizer = globalizeLocalizer(globalizeInstance)
    const result = formats.agendaHeaderFormat(
      { start: new Date(2023, 0, 1), end: new Date(2023, 1, 1) },
      null,
      localizer
    )
    expect(typeof result).toBe('string')
  })
})

describe('format functions in formats object', () => {
  const globalizeInstance = makeGlobalize1x()
  const localizer = globalizeLocalizer(globalizeInstance)

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
