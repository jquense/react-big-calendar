import { wrapAccessor } from '../../utils/accessors'
import { createFactory } from 'react'
import * as dates from '../../utils/dates'

export const dragAccessors = {
  start: wrapAccessor(e => e.start),
  end: wrapAccessor(e => e.end),
}

function nest(...Components) {
  const factories = Components.filter(Boolean).map(createFactory)
  const Nest = ({ children, ...props }) =>
    factories.reduceRight((child, factory) => factory(props, child), children)

  return Nest
}

export function mergeComponents(components = {}, addons) {
  const keys = Object.keys(addons)
  const result = { ...components }

  keys.forEach(key => {
    result[key] = components[key]
      ? nest(components[key], addons[key])
      : addons[key]
  })
  return result
}

export function pointInColumn(bounds, point) {
  const { left, right, top } = bounds
  const { x, y } = point
  return x < right + 10 && x > left && y > top
}

/**
 * Get start, end, allDay and duration of an event using the provided accessors.
 * Fixes up problematic case of malformed allDay events (those missing
 * allDay=true or allDay events where the end date isn't exclusive)
 */
export function eventTimes(event, accessors) {
  const start = accessors.start(event)
  let end = accessors.end(event)
  let allDay = accessors.allDay(event)
  const duration = dates.diff(start, end, 'milliseconds')

  // make zero duration midnight events at least one day long
  if (duration === 0 && start.getMinutes() === 0) {
    end = dates.add(end, 1, 'day')
    allDay = true
  }
  return { start, end, allDay, duration }
}
