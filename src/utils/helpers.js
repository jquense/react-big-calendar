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
export function isSameEvent(event1, event2) {
  if (event1 && event2) {
    // if they both exist
    if (event1.id != null && event2.id != null) {
      // and they have an id
      // they are equal if they have the same id
      return event1.id === event2.id
    }
    // if no id exists
    return (
      // they are equal if they have
      event1.start === event2.start && // the same start time
      event1.end === event2.end && // the same end time
      event1.calendar_id === event2.calendar_id // and the same end calendar id
    )
  }
  return !event1 && !event2
}
