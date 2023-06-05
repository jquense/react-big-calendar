import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../../../src'
import Basic from '../../../demos/exampleCode/dndOutsideSource'
import mdx from './onDropFromOutside.mdx'

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

export function OnDropFromOutside() {
  return <Basic localizer={localizer} />
}
OnDropFromOutside.storyName = 'onDropFromOutside'
