import PropTypes from 'prop-types'
import invariant from 'invariant'

const localePropType = PropTypes.oneOfType([PropTypes.string, PropTypes.func])

function _format(localizer, formatter, value, format, culture) {
  let result =
    typeof format === 'function'
      ? format(value, culture, localizer)
      : formatter.call(localizer, value, format, culture)

  invariant(
    result == null || typeof result === 'string',
    '`localizer format(..)` must return a string, null, or undefined'
  )

  return result
}

export class DateLocalizer {
  constructor(spec) {
    invariant(
      typeof spec.format === 'function',
      'date localizer `format(..)` must be a function'
    )
    invariant(
      typeof spec.firstOfWeek === 'function',
      'date localizer `firstOfWeek(..)` must be a function'
    )

    this.propType = spec.propType || localePropType

    this.startOfWeek = spec.firstOfWeek
    this.formats = spec.formats
    this.format = (...args) => _format(this, spec.format, ...args)
  }
}

export function mergeWithDefaults(
  localizer,
  culture,
  formatOverrides,
  messages
) {
  const formats = {
    ...localizer.formats,
    ...formatOverrides,
  }

  return {
    ...localizer,
    messages,
    startOfWeek: () => localizer.startOfWeek(culture),
    format: (value, format) =>
      localizer.format(value, formats[format] || format, culture),
  }
}
