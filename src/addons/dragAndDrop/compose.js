// Exact copy over from recompose library
// https://github.com/acdlite/recompose/blob/master/src/packages/recompose/compose.js

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
