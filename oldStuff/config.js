import { configure, addParameters } from '@storybook/react'
import rbcTheme from './rbc.theme'

addParameters({
  options: {
    theme: rbcTheme,
  },
})

function loadStories() {
  require('../stories')
}

configure(loadStories, module)
