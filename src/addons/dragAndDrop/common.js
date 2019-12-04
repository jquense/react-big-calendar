import { wrapAccessor } from '../../utils/accessors'
import { createFactory } from 'react'

export const dragAccessors = {
  start: wrapAccessor(e => e.start),
  end: wrapAccessor(e => e.end),
}

export const nest = (...Components) => {
  const factories = Components.filter(Boolean).map(createFactory)
  const Nest = ({ children, ...props }) =>
    factories.reduceRight((child, factory) => factory(props, child), children)

  return Nest
}

export const mergeComponents = (components = {}, addons) => {
  const keys = Object.keys(addons)
  const result = { ...components }

  keys.forEach(key => {
    result[key] = components[key] ? nest(components[key], addons[key]) : addons[key]
  })
  return result
}
