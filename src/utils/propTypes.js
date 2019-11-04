import PropTypes from 'prop-types'
import { views as Views } from './constants'

let viewNames = Object.keys(Views).map(k => Views[k])

export let accessor = PropTypes.oneOfType([PropTypes.string, PropTypes.func])

export let dateFormat = PropTypes.any

export let dateRangeFormat = PropTypes.func

/**
 * accepts either an array of builtin view names:
 *
 * ```
 * views={['month', 'day', 'agenda']}
 * ```
 *
 * or an object hash of the view name and the component (or boolean for builtin)
 *
 * ```
 * views={{
 *   month: true,
 *   week: false,
 *   workweek: WorkWeekViewComponent,
 * }}
 * ```
 */

export let views = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.oneOf(viewNames)),
  PropTypes.objectOf((prop, key, ...args) => {
    let isBuiltinView =
      viewNames.indexOf(key) !== -1 && typeof prop[key] === 'boolean'
    if (isBuiltinView) {
      return null
    } else {
      return PropTypes.elementType(prop, key, ...args)
    }
  }),
])

export const DayLayoutAlgorithmPropType = PropTypes.oneOfType([
  PropTypes.oneOf(['overlap', 'no-overlap']),
  PropTypes.func,
])
