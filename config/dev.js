import config from './shared'

export default {
  ...config,
  output: {
    ...config.output,
    sourcemap: true,
  },
}
