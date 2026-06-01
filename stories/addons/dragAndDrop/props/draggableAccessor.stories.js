import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../../../src'
import Basic from '../../../demos/exampleCode/dndOutsideSource'

export default {
  title: 'Addons/Drag and Drop/props',
  component: Calendar
}

const localizer = momentLocalizer(moment)

export function DraggableAccessor() {
  return <Basic localizer={localizer} />
}
DraggableAccessor.storyName = 'draggableAccessor'
