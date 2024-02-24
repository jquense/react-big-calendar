'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = useClickOutside
var _react = require('react')
function useClickOutside(_ref) {
  var ref = _ref.ref,
    callback = _ref.callback
  ;(0, _react.useEffect)(
    function () {
      var handleClickOutside = function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          callback()
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return function () {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    },
    [ref, callback]
  )
}
