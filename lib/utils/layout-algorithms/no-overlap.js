'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = _default

var _overlap = _interopRequireDefault(require('./overlap'))

function getMaxIdxDFS(node, maxIdx, visited) {
  for (var i = 0; i < node.friends.length; ++i) {
    if (visited.indexOf(node.friends[i]) > -1) continue
    maxIdx = maxIdx > node.friends[i].idx ? maxIdx : node.friends[i].idx // TODO : trace it by not object but kinda index or something for performance

    visited.push(node.friends[i])
    var newIdx = getMaxIdxDFS(node.friends[i], maxIdx, visited)
    maxIdx = maxIdx > newIdx ? maxIdx : newIdx
  }

  return maxIdx
}

function _default(_ref) {
  var events = _ref.events,
    minimumStartDifference = _ref.minimumStartDifference,
    slotMetrics = _ref.slotMetrics,
    accessors = _ref.accessors
  var styledEvents = (0, _overlap.default)({
    events: events,
    minimumStartDifference: minimumStartDifference,
    slotMetrics: slotMetrics,
    accessors: accessors,
  })
  styledEvents.sort(function(a, b) {
    a = a.style
    b = b.style
    if (a.top !== b.top) return a.top > b.top ? 1 : -1
    else return a.top + a.height < b.top + b.height ? 1 : -1
  })

  for (var i = 0; i < styledEvents.length; ++i) {
    styledEvents[i].friends = []
    delete styledEvents[i].style.left
    delete styledEvents[i].style.left
    delete styledEvents[i].idx
    delete styledEvents[i].size
  }

  for (var _i = 0; _i < styledEvents.length - 1; ++_i) {
    var se1 = styledEvents[_i]
    var y1 = se1.style.top
    var y2 = se1.style.top + se1.style.height

    for (var j = _i + 1; j < styledEvents.length; ++j) {
      var se2 = styledEvents[j]
      var y3 = se2.style.top
      var y4 = se2.style.top + se2.style.height // be friends when overlapped

      if ((y3 <= y1 && y1 < y4) || (y1 <= y3 && y3 < y2)) {
        // TODO : hashmap would be effective for performance
        se1.friends.push(se2)
        se2.friends.push(se1)
      }
    }
  }

  for (var _i2 = 0; _i2 < styledEvents.length; ++_i2) {
    var se = styledEvents[_i2]
    var bitmap = []

    for (var _j = 0; _j < 100; ++_j) {
      bitmap.push(1)
    } // 1 means available

    for (var _j2 = 0; _j2 < se.friends.length; ++_j2) {
      if (se.friends[_j2].idx !== undefined) bitmap[se.friends[_j2].idx] = 0
    } // 0 means reserved

    se.idx = bitmap.indexOf(1)
  }

  for (var _i3 = 0; _i3 < styledEvents.length; ++_i3) {
    var size = 0
    if (styledEvents[_i3].size) continue
    var allFriends = []
    var maxIdx = getMaxIdxDFS(styledEvents[_i3], 0, allFriends)
    size = 100 / (maxIdx + 1)
    styledEvents[_i3].size = size

    for (var _j3 = 0; _j3 < allFriends.length; ++_j3) {
      allFriends[_j3].size = size
    }
  }

  for (var _i4 = 0; _i4 < styledEvents.length; ++_i4) {
    var e = styledEvents[_i4]
    e.style.left = e.idx * e.size // stretch to maximum

    var _maxIdx = 0

    for (var _j4 = 0; _j4 < e.friends.length; ++_j4) {
      var idx = e.friends[_j4]
      _maxIdx = _maxIdx > idx ? _maxIdx : idx
    }

    if (_maxIdx <= e.idx) e.size = 100 - e.idx * e.size // padding between events
    // for this feature, `width` is not percentage based unit anymore
    // it will be used with calc()

    var padding = e.idx === 0 ? 0 : 3
    e.style.width = 'calc(' + e.size + '% - ' + padding + 'px)'
    e.style.height = 'calc(' + e.style.height + '% - 2px)'
    e.style.xOffset = 'calc(' + e.style.left + '% + ' + padding + 'px)'
  }

  return styledEvents
}

module.exports = exports['default']
