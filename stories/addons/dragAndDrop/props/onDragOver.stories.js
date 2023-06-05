import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../../../src'
import Basic from '../../../demos/exampleCode/dndOutsideSource'
import mdx from './onDragOver.mdx'

export default {
  title: 'Addons/Drag and Drop/props',
  component: Calendar,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

const localizer = momentLocalizer(moment)

export function OnDragOver() {
  return <Basic localizer={localizer} />
}
OnDragOver.storyName = 'onDragOver'
