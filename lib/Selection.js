'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
exports.getBoundsForNode = getBoundsForNode
exports.getEventNodeFromPoint = getEventNodeFromPoint
exports.getShowMoreNodeFromPoint = getShowMoreNodeFromPoint
exports.isEvent = isEvent
exports.isShowMore = isShowMore
exports.objectsCollide = objectsCollide
var _typeof2 = _interopRequireDefault(require('@babel/runtime/helpers/typeof'))
var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
)
var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
)
var _contains = _interopRequireDefault(require('dom-helpers/contains'))
var _closest = _interopRequireDefault(require('dom-helpers/closest'))
var _listen = _interopRequireDefault(require('dom-helpers/listen'))
function addEventListener(type, handler) {
  var target =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document
  return (0, _listen.default)(target, type, handler, {
    passive: false,
  })
}
function isOverContainer(container, x, y) {
  return (
    !container ||
    (0, _contains.default)(container, document.elementFromPoint(x, y))
  )
}
function getEventNodeFromPoint(node, _ref) {
  var clientX = _ref.clientX,
    clientY = _ref.clientY
  var target = document.elementFromPoint(clientX, clientY)
  return (0, _closest.default)(target, '.rbc-event', node)
}
function getShowMoreNodeFromPoint(node, _ref2) {
  var clientX = _ref2.clientX,
    clientY = _ref2.clientY
  var target = document.elementFromPoint(clientX, clientY)
  return (0, _closest.default)(target, '.rbc-show-more', node)
}
function isEvent(node, bounds) {
  return !!getEventNodeFromPoint(node, bounds)
}
function isShowMore(node, bounds) {
  return !!getShowMoreNodeFromPoint(node, bounds)
}
function getEventCoordinates(e) {
  var target = e
  if (e.touches && e.touches.length) {
    target = e.touches[0]
  }
  return {
    clientX: target.clientX,
    clientY: target.clientY,
    pageX: target.pageX,
    pageY: target.pageY,
  }
}
var clickTolerance = 5
var clickInterval = 250
var Selection = /*#__PURE__*/ (function () {
  function Selection(node) {
    var _ref3 =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref3$global = _ref3.global,
      global = _ref3$global === void 0 ? false : _ref3$global,
      _ref3$longPressThresh = _ref3.longPressThreshold,
      longPressThreshold =
        _ref3$longPressThresh === void 0 ? 250 : _ref3$longPressThresh,
      _ref3$validContainers = _ref3.validContainers,
      validContainers =
        _ref3$validContainers === void 0 ? [] : _ref3$validContainers
    ;(0, _classCallCheck2.default)(this, Selection)
    this.isDetached = false
    this.container = node
    this.globalMouse = !node || global
    this.longPressThreshold = longPressThreshold
    this.validContainers = validContainers
    this._listeners = Object.create(null)
    this._handleInitialEvent = this._handleInitialEvent.bind(this)
    this._handleMoveEvent = this._handleMoveEvent.bind(this)
    this._handleTerminatingEvent = this._handleTerminatingEvent.bind(this)
    this._keyListener = this._keyListener.bind(this)
    this._dropFromOutsideListener = this._dropFromOutsideListener.bind(this)
    this._dragOverFromOutsideListener =
      this._dragOverFromOutsideListener.bind(this)

    // Fixes an iOS 10 bug where scrolling could not be prevented on the window.
    // https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
    this._removeTouchMoveWindowListener = addEventListener(
      'touchmove',
      function () {},
      window
    )
    this._removeKeyDownListener = addEventListener('keydown', this._keyListener)
    this._removeKeyUpListener = addEventListener('keyup', this._keyListener)
    this._removeDropFromOutsideListener = addEventListener(
      'drop',
      this._dropFromOutsideListener
    )
    this._removeDragOverFromOutsideListener = addEventListener(
      'dragover',
      this._dragOverFromOutsideListener
    )
    this._addInitialEventListener()
  }
  ;(0, _createClass2.default)(Selection, [
    {
      key: 'on',
      value: function on(type, handler) {
        var handlers = this._listeners[type] || (this._listeners[type] = [])
        handlers.push(handler)
        return {
          remove: function remove() {
            var idx = handlers.indexOf(handler)
            if (idx !== -1) handlers.splice(idx, 1)
          },
        }
      },
    },
    {
      key: 'emit',
      value: function emit(type) {
        for (
          var _len = arguments.length,
            args = new Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key]
        }
        var result
        var handlers = this._listeners[type] || []
        handlers.forEach(function (fn) {
          if (result === undefined) result = fn.apply(void 0, args)
        })
        return result
      },
    },
    {
      key: 'teardown',
      value: function teardown() {
        this.isDetached = true
        this._listeners = Object.create(null)
        this._removeTouchMoveWindowListener &&
          this._removeTouchMoveWindowListener()
        this._removeInitialEventListener && this._removeInitialEventListener()
        this._removeEndListener && this._removeEndListener()
        this._onEscListener && this._onEscListener()
        this._removeMoveListener && this._removeMoveListener()
        this._removeKeyUpListener && this._removeKeyUpListener()
        this._removeKeyDownListener && this._removeKeyDownListener()
        this._removeDropFromOutsideListener &&
          this._removeDropFromOutsideListener()
        this._removeDragOverFromOutsideListener &&
          this._removeDragOverFromOutsideListener()
      },
    },
    {
      key: 'isSelected',
      value: function isSelected(node) {
        var box = this._selectRect
        if (!box || !this.selecting) return false
        return objectsCollide(box, getBoundsForNode(node))
      },
    },
    {
      key: 'filter',
      value: function filter(items) {
        var box = this._selectRect

        //not selecting
        if (!box || !this.selecting) return []
        return items.filter(this.isSelected, this)
      },

      // Adds a listener that will call the handler only after the user has pressed on the screen
      // without moving their finger for 250ms.
    },
    {
      key: '_addLongPressListener',
      value: function _addLongPressListener(handler, initialEvent) {
        var _this = this
        var timer = null
        var removeTouchMoveListener = null
        var removeTouchEndListener = null
        var handleTouchStart = function handleTouchStart(initialEvent) {
          timer = setTimeout(function () {
            cleanup()
            handler(initialEvent)
          }, _this.longPressThreshold)
          removeTouchMoveListener = addEventListener('touchmove', function () {
            return cleanup()
          })
          removeTouchEndListener = addEventListener('touchend', function () {
            return cleanup()
          })
        }
        var removeTouchStartListener = addEventListener(
          'touchstart',
          handleTouchStart
        )
        var cleanup = function cleanup() {
          if (timer) {
            clearTimeout(timer)
          }
          if (removeTouchMoveListener) {
            removeTouchMoveListener()
          }
          if (removeTouchEndListener) {
            removeTouchEndListener()
          }
          timer = null
          removeTouchMoveListener = null
          removeTouchEndListener = null
        }
        if (initialEvent) {
          handleTouchStart(initialEvent)
        }
        return function () {
          cleanup()
          removeTouchStartListener()
        }
      },

      // Listen for mousedown and touchstart events. When one is received, disable the other and setup
      // future event handling based on the type of event.
    },
    {
      key: '_addInitialEventListener',
      value: function _addInitialEventListener() {
        var _this2 = this
        var removeMouseDownListener = addEventListener(
          'mousedown',
          function (e) {
            _this2._removeInitialEventListener()
            _this2._handleInitialEvent(e)
            _this2._removeInitialEventListener = addEventListener(
              'mousedown',
              _this2._handleInitialEvent
            )
          }
        )
        var removeTouchStartListener = addEventListener(
          'touchstart',
          function (e) {
            _this2._removeInitialEventListener()
            _this2._removeInitialEventListener = _this2._addLongPressListener(
              _this2._handleInitialEvent,
              e
            )
          }
        )
        this._removeInitialEventListener = function () {
          removeMouseDownListener()
          removeTouchStartListener()
        }
      },
    },
    {
      key: '_dropFromOutsideListener',
      value: function _dropFromOutsideListener(e) {
        var _getEventCoordinates = getEventCoordinates(e),
          pageX = _getEventCoordinates.pageX,
          pageY = _getEventCoordinates.pageY,
          clientX = _getEventCoordinates.clientX,
          clientY = _getEventCoordinates.clientY
        this.emit('dropFromOutside', {
          x: pageX,
          y: pageY,
          clientX: clientX,
          clientY: clientY,
        })
        e.preventDefault()
      },
    },
    {
      key: '_dragOverFromOutsideListener',
      value: function _dragOverFromOutsideListener(e) {
        var _getEventCoordinates2 = getEventCoordinates(e),
          pageX = _getEventCoordinates2.pageX,
          pageY = _getEventCoordinates2.pageY,
          clientX = _getEventCoordinates2.clientX,
          clientY = _getEventCoordinates2.clientY
        this.emit('dragOverFromOutside', {
          x: pageX,
          y: pageY,
          clientX: clientX,
          clientY: clientY,
        })
        e.preventDefault()
      },
    },
    {
      key: '_handleInitialEvent',
      value: function _handleInitialEvent(e) {
        if (this.isDetached) {
          return
        }
        var _getEventCoordinates3 = getEventCoordinates(e),
          clientX = _getEventCoordinates3.clientX,
          clientY = _getEventCoordinates3.clientY,
          pageX = _getEventCoordinates3.pageX,
          pageY = _getEventCoordinates3.pageY
        var node = this.container(),
          collides,
          offsetData

        // Right clicks
        if (
          e.which === 3 ||
          e.button === 2 ||
          !isOverContainer(node, clientX, clientY)
        )
          return
        if (
          !this.globalMouse &&
          node &&
          !(0, _contains.default)(node, e.target)
        ) {
          var _normalizeDistance = normalizeDistance(0),
            top = _normalizeDistance.top,
            left = _normalizeDistance.left,
            bottom = _normalizeDistance.bottom,
            right = _normalizeDistance.right
          offsetData = getBoundsForNode(node)
          collides = objectsCollide(
            {
              top: offsetData.top - top,
              left: offsetData.left - left,
              bottom: offsetData.bottom + bottom,
              right: offsetData.right + right,
            },
            {
              top: pageY,
              left: pageX,
            }
          )
          if (!collides) return
        }
        var result = this.emit(
          'beforeSelect',
          (this._initialEventData = {
            isTouch: /^touch/.test(e.type),
            x: pageX,
            y: pageY,
            clientX: clientX,
            clientY: clientY,
          })
        )
        if (result === false) return
        switch (e.type) {
          case 'mousedown':
            this._removeEndListener = addEventListener(
              'mouseup',
              this._handleTerminatingEvent
            )
            this._onEscListener = addEventListener(
              'keydown',
              this._handleTerminatingEvent
            )
            this._removeMoveListener = addEventListener(
              'mousemove',
              this._handleMoveEvent
            )
            break
          case 'touchstart':
            this._handleMoveEvent(e)
            this._removeEndListener = addEventListener(
              'touchend',
              this._handleTerminatingEvent
            )
            this._removeMoveListener = addEventListener(
              'touchmove',
              this._handleMoveEvent
            )
            break
          default:
            break
        }
      },

      // Check whether provided event target element
      // - is contained within a valid container
    },
    {
      key: '_isWithinValidContainer',
      value: function _isWithinValidContainer(e) {
        var eventTarget = e.target
        var containers = this.validContainers
        if (!containers || !containers.length || !eventTarget) {
          return true
        }
        return containers.some(function (target) {
          return !!eventTarget.closest(target)
        })
      },
    },
    {
      key: '_handleTerminatingEvent',
      value: function _handleTerminatingEvent(e) {
        var _getEventCoordinates4 = getEventCoordinates(e),
          pageX = _getEventCoordinates4.pageX,
          pageY = _getEventCoordinates4.pageY
        this.selecting = false
        this._removeEndListener && this._removeEndListener()
        this._removeMoveListener && this._removeMoveListener()
        if (!this._initialEventData) return
        var inRoot =
          !this.container || (0, _contains.default)(this.container(), e.target)
        var isWithinValidContainer = this._isWithinValidContainer(e)
        var bounds = this._selectRect
        var click = this.isClick(pageX, pageY)
        this._initialEventData = null
        if (e.key === 'Escape' || !isWithinValidContainer) {
          return this.emit('reset')
        }
        if (click && inRoot) {
          return this._handleClickEvent(e)
        }

        // User drag-clicked in the Selectable area
        if (!click) return this.emit('select', bounds)
        return this.emit('reset')
      },
    },
    {
      key: '_handleClickEvent',
      value: function _handleClickEvent(e) {
        var _getEventCoordinates5 = getEventCoordinates(e),
          pageX = _getEventCoordinates5.pageX,
          pageY = _getEventCoordinates5.pageY,
          clientX = _getEventCoordinates5.clientX,
          clientY = _getEventCoordinates5.clientY
        var now = new Date().getTime()
        if (
          this._lastClickData &&
          now - this._lastClickData.timestamp < clickInterval
        ) {
          // Double click event
          this._lastClickData = null
          return this.emit('doubleClick', {
            x: pageX,
            y: pageY,
            clientX: clientX,
            clientY: clientY,
          })
        }

        // Click event
        this._lastClickData = {
          timestamp: now,
        }
        return this.emit('click', {
          x: pageX,
          y: pageY,
          clientX: clientX,
          clientY: clientY,
        })
      },
    },
    {
      key: '_handleMoveEvent',
      value: function _handleMoveEvent(e) {
        if (this._initialEventData === null || this.isDetached) {
          return
        }
        var _this$_initialEventDa = this._initialEventData,
          x = _this$_initialEventDa.x,
          y = _this$_initialEventDa.y
        var _getEventCoordinates6 = getEventCoordinates(e),
          pageX = _getEventCoordinates6.pageX,
          pageY = _getEventCoordinates6.pageY
        var w = Math.abs(x - pageX)
        var h = Math.abs(y - pageY)
        var left = Math.min(pageX, x),
          top = Math.min(pageY, y),
          old = this.selecting

        // Prevent emitting selectStart event until mouse is moved.
        // in Chrome on Windows, mouseMove event may be fired just after mouseDown event.
        if (this.isClick(pageX, pageY) && !old && !(w || h)) {
          return
        }
        this.selecting = true
        this._selectRect = {
          top: top,
          left: left,
          x: pageX,
          y: pageY,
          right: left + w,
          bottom: top + h,
        }
        if (!old) {
          this.emit('selectStart', this._initialEventData)
        }
        if (!this.isClick(pageX, pageY))
          this.emit('selecting', this._selectRect)
        e.preventDefault()
      },
    },
    {
      key: '_keyListener',
      value: function _keyListener(e) {
        this.ctrl = e.metaKey || e.ctrlKey
      },
    },
    {
      key: 'isClick',
      value: function isClick(pageX, pageY) {
        var _this$_initialEventDa2 = this._initialEventData,
          x = _this$_initialEventDa2.x,
          y = _this$_initialEventDa2.y,
          isTouch = _this$_initialEventDa2.isTouch
        return (
          !isTouch &&
          Math.abs(pageX - x) <= clickTolerance &&
          Math.abs(pageY - y) <= clickTolerance
        )
      },
    },
  ])
  return Selection
})()
/**
 * Resolve the disance prop from either an Int or an Object
 * @return {Object}
 */
function normalizeDistance() {
  var distance =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
  if ((0, _typeof2.default)(distance) !== 'object')
    distance = {
      top: distance,
      left: distance,
      right: distance,
      bottom: distance,
    }
  return distance
}

/**
 * Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
 * properties, determine if they collide.
 * @param  {Object|HTMLElement} a
 * @param  {Object|HTMLElement} b
 * @return {bool}
 */
function objectsCollide(nodeA, nodeB) {
  var tolerance =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
  var _getBoundsForNode = getBoundsForNode(nodeA),
    aTop = _getBoundsForNode.top,
    aLeft = _getBoundsForNode.left,
    _getBoundsForNode$rig = _getBoundsForNode.right,
    aRight = _getBoundsForNode$rig === void 0 ? aLeft : _getBoundsForNode$rig,
    _getBoundsForNode$bot = _getBoundsForNode.bottom,
    aBottom = _getBoundsForNode$bot === void 0 ? aTop : _getBoundsForNode$bot
  var _getBoundsForNode2 = getBoundsForNode(nodeB),
    bTop = _getBoundsForNode2.top,
    bLeft = _getBoundsForNode2.left,
    _getBoundsForNode2$ri = _getBoundsForNode2.right,
    bRight = _getBoundsForNode2$ri === void 0 ? bLeft : _getBoundsForNode2$ri,
    _getBoundsForNode2$bo = _getBoundsForNode2.bottom,
    bBottom = _getBoundsForNode2$bo === void 0 ? bTop : _getBoundsForNode2$bo
  return !(
    // 'a' bottom doesn't touch 'b' top

    (
      aBottom - tolerance < bTop ||
      // 'a' top doesn't touch 'b' bottom
      aTop + tolerance > bBottom ||
      // 'a' right doesn't touch 'b' left
      aRight - tolerance < bLeft ||
      // 'a' left doesn't touch 'b' right
      aLeft + tolerance > bRight
    )
  )
}

/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
function getBoundsForNode(node) {
  if (!node.getBoundingClientRect) return node
  var rect = node.getBoundingClientRect(),
    left = rect.left + pageOffset('left'),
    top = rect.top + pageOffset('top')
  return {
    top: top,
    left: left,
    right: (node.offsetWidth || 0) + left,
    bottom: (node.offsetHeight || 0) + top,
  }
}
function pageOffset(dir) {
  if (dir === 'left') return window.pageXOffset || document.body.scrollLeft || 0
  if (dir === 'top') return window.pageYOffset || document.body.scrollTop || 0
}
var _default = Selection
exports.default = _default
