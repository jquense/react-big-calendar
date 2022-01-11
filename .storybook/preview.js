export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    // TODO: refactor jsDocs in Calendar control
    //expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
