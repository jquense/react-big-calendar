import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../../../src'
import Basic from '../../../demos/exampleCode/resizable'

export default {
  title: 'Addons/Drag and Drop/props',
  component: Calendar
}

const localizer = momentLocalizer(moment)

export function ResizableAccessor() {
  return <Basic localizer={localizer} />
}
ResizableAccessor.storyName = 'resizableAccessor'
