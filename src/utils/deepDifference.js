export function deepDifference(obj1, obj2, ...exclude) {
  var r = {}

  if (!exclude) exclude = []

  for (var prop in obj1) {
    if (obj1.hasOwnProperty(prop) && prop != '__proto__') {
      if (exclude.indexOf(obj1[prop]) == -1) {
        // check if obj2 has prop
        if (!obj2.hasOwnProperty(prop)) r[prop] = obj1[prop]
        // check if prop is object and
        // NOT a JavaScript engine object (i.e. __proto__), if so, recursive diff
        else if (obj1[prop] === Object(obj1[prop])) {
          var difference = deepDifference(obj1[prop], obj2[prop])
          if (Object.keys(difference).length > 0) r[prop] = difference
        }

        // check if obj1 and obj2 are equal
        else if (obj1[prop] !== obj2[prop]) {
          if (obj1[prop] === undefined) r[prop] = 'undefined'
          if (obj1[prop] === null) r[prop] = null
          else if (typeof obj1[prop] === 'function') r[prop] = 'function'
          else if (typeof obj1[prop] === 'object') r[prop] = 'object'
          else r[prop] = obj1[prop]
        }
      }
    }
  }

  return r
}
