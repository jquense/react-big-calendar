import { wrapAccessor } from '../../utils/accessors'

export const dragAccessors = {
  start: wrapAccessor(e => e.start),
  end: wrapAccessor(e => e.end),
}
