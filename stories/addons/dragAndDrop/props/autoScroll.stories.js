import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../../../src'
import Basic from '../../../demos/exampleCode/autoScroll'
import mdx from './autoScroll.mdx'

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

export function AutoScrollAccessor() {
  return <Basic localizer={localizer} />
}
AutoScrollAccessor.storyName = 'autoScroll'
