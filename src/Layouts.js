import { layouts } from './utils/constants'
import defaultLayout from './layouts/default'
import packedLayout from './layouts/packed'

const LAYOUTS = {
  [layouts.DEFAULT]: defaultLayout,
  [layouts.PACKED]: packedLayout,
}

export default LAYOUTS
