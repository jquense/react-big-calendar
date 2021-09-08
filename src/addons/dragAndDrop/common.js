import { wrapAccessor } from '../../utils/accessors'
import { createFactory } from 'react'
import { eq, minutes, add, diff } from '../../utils/dates'

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

export function eventTimes(event, accessors) {
  let start = accessors.start(event)
  let end = accessors.end(event)

  const isZeroDuration = eq(start, end, 'minutes') && minutes(start) === 0
  // make zero duration midnight events at least one day long
  if (isZeroDuration) end = add(end, 1, 'day')
  const duration = diff(end, start, 'milliseconds')
  return { start, end, duration }
}
