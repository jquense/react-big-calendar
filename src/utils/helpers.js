import { isValidJSDate, isSameDay } from './dates'

var idCount = 0

function uniqueId(prefix) {
  return '' + ((prefix == null ? '' : prefix) + ++idCount)
}

export function notify(handler, args) {
  handler && handler.apply(null, [].concat(args))
}

export function instanceId(component, suffix = '') {
  component.__id || (component.__id = uniqueId('rw_'))
  return (component.props.id || component.__id) + suffix
}

export function isFirstFocusedRender(component) {
  return (
    component._firstFocus ||
    (component.state.focused && (component._firstFocus = true))
  )
}

export function hasStateOrPropsChanged(
  oldState,
  newState,
  oldProps,
  newProps,
  excludedKeys = []
  // shouldPrint = false
) {
  // Might need to change for when changing URL is important
  let stateKeys = newState ? Object.keys(newState) : []
  let propKeys = newProps ? Object.keys(newProps) : []

  let hasStateChanged = stateKeys.some(k => {
    if (oldState[k] !== newState[k] && !excludedKeys.includes(k)) {
      if (isValidJSDate(newState[k]) && isValidJSDate(oldState[k])) {
        return !isSameDay(newState[k], oldState[k])
      }

      // shouldPrint &&
      //   console.log(`${shouldPrint} State ${k}: `, oldState[k], newState[k])

      return true
    }
  })

  if (hasStateChanged) {
    return true
  }

  let hasPropsChanged = propKeys.some(k => {
    if (oldProps[k] !== newProps[k] && !excludedKeys.includes(k)) {
      if (isValidJSDate(newProps[k]) && isValidJSDate(oldProps[k])) {
        return !isSameDay(newProps[k], oldProps[k])
      }
      // shouldPrint &&
      // console.log(`${shouldPrint} Prop ${k}: `, oldProps[k], newProps[k])

      return true
    }
  })

  return hasPropsChanged
}
