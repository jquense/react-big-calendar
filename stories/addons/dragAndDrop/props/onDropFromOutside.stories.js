import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../../../src'
import Basic from '../../../demos/exampleCode/dndOutsideSource'

export default {
  title: 'Addons/Drag and Drop/props',
  component: Calendar
}

const localizer = momentLocalizer(moment)

export function OnDropFromOutside() {
  return <Basic localizer={localizer} />
}
OnDropFromOutside.storyName = 'onDropFromOutside'
