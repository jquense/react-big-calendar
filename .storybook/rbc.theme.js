import { create } from '@storybook/theming'

export default create({
  base: 'dark',

  // UI
  appBg: 'rgb(49, 116, 173)',
  appContentBg: 'rgba(49, 116, 173, .2)',

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Toolbar default and active colors
  barTextColor: 'white',
  barBg: 'rgb(49, 116, 173)',

  // Form colors
  inputBg: '#FFF',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'Big Calendar',
  brandUrl: 'http://jquense.github.io/react-big-calendar/examples',
})
