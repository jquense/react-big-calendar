import { isValidJSDate, isSameDay } from './dates'
import { useRef, useEffect } from 'react'

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
) {
  // Might need to change for when changing URL is important
  let stateKeys = newState ? Object.keys(newState) : []
  let propKeys = newProps ? Object.keys(newProps) : []

  let hasStateChanged = stateKeys.some(k => {
    if (oldState[k] !== newState[k] && !excludedKeys.includes(k)) {
      if (isValidJSDate(newState[k]) && isValidJSDate(oldState[k])) {
        return !isSameDay(newState[k], oldState[k])
      } else if (
        Array.isArray(oldState[k]) &&
        Array.isArray(newState[k]) &&
        oldState[k].length === 0 &&
        newState[k].length === 0
      ) {
        // empty arrays
        return false
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
      } else if (
        Array.isArray(oldProps[k]) &&
        Array.isArray(newProps[k]) &&
        oldProps[k].length === 0 &&
        newProps[k].length === 0
      ) {
        // empty arrays
        return false
      }

      // shouldPrint &&
      // console.log(`${shouldPrint} Prop ${k}: `, oldProps[k], newProps[k])

      return true
    }
  })

  return hasPropsChanged
}

export function useTraceUpdate(props) {
  const prev = useRef(props)
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v]
      }
      return ps
    }, {})
    if (Object.keys(changedProps).length > 0) {
      // console.log("Changed props:", changedProps);
    }
    prev.current = props
  })
}
