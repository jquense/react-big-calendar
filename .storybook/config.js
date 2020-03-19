import { configure, addParameters } from '@storybook/react'
import rbcTheme from './rbc.theme'
import '@storybook/addon-console'

addParameters({
  options: {
    theme: rbcTheme,
  },
})

function loadStories() {
  require('../stories')
}

configure(loadStories, module)
