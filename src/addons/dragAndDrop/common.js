import { wrapAccessor } from '../../utils/accessors'
import { createFactory } from 'react'

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

export function eventTimes(event, accessors, localizer) {
  let start = accessors.start(event)
  let end = accessors.end(event)

  const isZeroDuration =
    localizer.eq(start, end, 'minutes') &&
    localizer.diff(start, end, 'minutes') === 0
  // make zero duration midnight events at least one day long
  if (isZeroDuration) end = localizer.add(end, 1, 'day')
  const duration = localizer.diff(start, end, 'milliseconds')
  return { start, end, duration }
}
