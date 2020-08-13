import contains from 'dom-helpers/contains'
import closest from 'dom-helpers/closest'
import listen from 'dom-helpers/listen'

function addEventListener(type, handler, target = document) {
  return listen(target, type, handler, { passive: false })
}

function isOverContainer(container, x, y) {
  return !container || contains(container, document.elementFromPoint(x, y))
}

export function getEventNodeFromPoint(node, { clientX, clientY }) {
  let target = document.elementFromPoint(clientX, clientY)
  return closest(target, '.rbc-event', node)
}

export function isEvent(node, bounds) {
  return !!getEventNodeFromPoint(node, bounds)
}

function getEventCoordinates(e) {
  let target = e

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

const clickTolerance = 5
const clickInterval = 250

class Selection {
  constructor(node, { global = false, longPressThreshold = 250 } = {}) {
    this.isDetached = false
    this.container = node
    this.globalMouse = !node || global
    this.longPressThreshold = longPressThreshold

    this._listeners = Object.create(null)

    this._handleInitialEvent = this._handleInitialEvent.bind(this)
    this._handleMoveEvent = this._handleMoveEvent.bind(this)
    this._handleTerminatingEvent = this._handleTerminatingEvent.bind(this)
    this._keyListener = this._keyListener.bind(this)
    this._dropFromOutsideListener = this._dropFromOutsideListener.bind(this)
    this._dragOverFromOutsideListener = this._dragOverFromOutsideListener.bind(
      this
    )

    // Fixes an iOS 10 bug where scrolling could not be prevented on the window.
    // https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
    this._removeTouchMoveWindowListener = addEventListener(
      'touchmove',
      () => {},
      window
    )
    this._removeKeyDownListener = addEventListener('keydown', this._keyListener)
    this._removeKeyUpListener = addEventListener('keyup', this._keyListener)
    this._removeDropFromOutsideListener = addEventListener(
      'drop',
      this._dropFromOutsideListener
    )
    this._onDragOverfromOutisde = addEventListener(
      'dragover',
      this._dragOverFromOutsideListener
    )
    this._addInitialEventListener()
  }

  on(type, handler) {
    let handlers = this._listeners[type] || (this._listeners[type] = [])

    handlers.push(handler)

    return {
      remove() {
        let idx = handlers.indexOf(handler)
        if (idx !== -1) handlers.splice(idx, 1)
      },
    }
  }

  emit(type, ...args) {
    let result
    let handlers = this._listeners[type] || []
    handlers.forEach(fn => {
      if (result === undefined) result = fn(...args)
    })
    return result
  }

  teardown() {
    this.isDetached = true
    this.listeners = Object.create(null)
    this._removeTouchMoveWindowListener && this._removeTouchMoveWindowListener()
    this._removeInitialEventListener && this._removeInitialEventListener()
    this._removeEndListener && this._removeEndListener()
    this._onEscListener && this._onEscListener()
    this._removeMoveListener && this._removeMoveListener()
    this._removeKeyUpListener && this._removeKeyUpListener()
    this._removeKeyDownListener && this._removeKeyDownListener()
    this._removeDropFromOutsideListener && this._removeDropFromOutsideListener()
  }

  isSelected(node) {
    let box = this._selectRect

    if (!box || !this.selecting) return false

    return objectsCollide(box, getBoundsForNode(node))
  }

  filter(items) {
    let box = this._selectRect

    //not selecting
    if (!box || !this.selecting) return []

    return items.filter(this.isSelected, this)
  }

  // Adds a listener that will call the handler only after the user has pressed on the screen
  // without moving their finger for 250ms.
  _addLongPressListener(handler, initialEvent) {
    let timer = null
    let removeTouchMoveListener = null
    let removeTouchEndListener = null
    const handleTouchStart = initialEvent => {
      timer = setTimeout(() => {
        cleanup()
        handler(initialEvent)
      }, this.longPressThreshold)
      removeTouchMoveListener = addEventListener('touchmove', () => cleanup())
      removeTouchEndListener = addEventListener('touchend', () => cleanup())
    }
    const removeTouchStartListener = addEventListener(
      'touchstart',
      handleTouchStart
    )
    const cleanup = () => {
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

    return () => {
      cleanup()
      removeTouchStartListener()
    }
  }

  // Listen for mousedown and touchstart events. When one is received, disable the other and setup
  // future event handling based on the type of event.
  _addInitialEventListener() {
    const removeMouseDownListener = addEventListener('mousedown', e => {
      this._removeInitialEventListener()
      this._handleInitialEvent(e)
      this._removeInitialEventListener = addEventListener(
        'mousedown',
        this._handleInitialEvent
      )
    })
    const removeTouchStartListener = addEventListener('touchstart', e => {
      this._removeInitialEventListener()
      this._removeInitialEventListener = this._addLongPressListener(
        this._handleInitialEvent,
        e
      )
    })

    this._removeInitialEventListener = () => {
      removeMouseDownListener()
      removeTouchStartListener()
    }
  }

  _dropFromOutsideListener(e) {
    const { pageX, pageY, clientX, clientY } = getEventCoordinates(e)

    this.emit('dropFromOutside', {
      x: pageX,
      y: pageY,
      clientX: clientX,
      clientY: clientY,
    })

    e.preventDefault()
  }

  _dragOverFromOutsideListener(e) {
    const { pageX, pageY, clientX, clientY } = getEventCoordinates(e)

    this.emit('dragOverFromOutside', {
      x: pageX,
      y: pageY,
      clientX: clientX,
      clientY: clientY,
    })

    e.preventDefault()
  }

  _handleInitialEvent(e) {
    if (this.isDetached) {
      return
    }

    const { clientX, clientY, pageX, pageY } = getEventCoordinates(e)
    let node = this.container(),
      collides,
      offsetData

    // Right clicks
    if (
      e.which === 3 ||
      e.button === 2 ||
      !isOverContainer(node, clientX, clientY)
    )
      return

    if (!this.globalMouse && node && !contains(node, e.target)) {
      let { top, left, bottom, right } = normalizeDistance(0)

      offsetData = getBoundsForNode(node)

      collides = objectsCollide(
        {
          top: offsetData.top - top,
          left: offsetData.left - left,
          bottom: offsetData.bottom + bottom,
          right: offsetData.right + right,
        },
        { top: pageY, left: pageX }
      )

      if (!collides) return
    }

    let result = this.emit(
      'beforeSelect',
      (this._initialEventData = {
        isTouch: /^touch/.test(e.type),
        x: pageX,
        y: pageY,
        clientX,
        clientY,
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
  }

  _handleTerminatingEvent(e) {
    const { pageX, pageY } = getEventCoordinates(e)

    this.selecting = false

    this._removeEndListener && this._removeEndListener()
    this._removeMoveListener && this._removeMoveListener()

    if (!this._initialEventData) return

    let inRoot = !this.container || contains(this.container(), e.target)
    let bounds = this._selectRect
    let click = this.isClick(pageX, pageY)

    this._initialEventData = null

    if (e.key === 'Escape') {
      return this.emit('reset')
    }

    if (!inRoot) {
      return this.emit('reset')
    }

    if (click && inRoot) {
      return this._handleClickEvent(e)
    }

    // User drag-clicked in the Selectable area
    if (!click) return this.emit('select', bounds)
  }

  _handleClickEvent(e) {
    const { pageX, pageY, clientX, clientY } = getEventCoordinates(e)
    const now = new Date().getTime()

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
  }

  _handleMoveEvent(e) {
    if (this._initialEventData === null || this.isDetached) {
      return
    }

    let { x, y } = this._initialEventData
    const { pageX, pageY } = getEventCoordinates(e)
    let w = Math.abs(x - pageX)
    let h = Math.abs(y - pageY)

    let left = Math.min(pageX, x),
      top = Math.min(pageY, y),
      old = this.selecting

    // Prevent emitting selectStart event until mouse is moved.
    // in Chrome on Windows, mouseMove event may be fired just after mouseDown event.
    if (this.isClick(pageX, pageY) && !old && !(w || h)) {
      return
    }

    this.selecting = true
    this._selectRect = {
      top,
      left,
      x: pageX,
      y: pageY,
      right: left + w,
      bottom: top + h,
    }

    if (!old) {
      this.emit('selectStart', this._initialEventData)
    }

    if (!this.isClick(pageX, pageY)) this.emit('selecting', this._selectRect)

    e.preventDefault()
  }

  _keyListener(e) {
    this.ctrl = e.metaKey || e.ctrlKey
  }

  isClick(pageX, pageY) {
    let { x, y, isTouch } = this._initialEventData
    return (
      !isTouch &&
      (Math.abs(pageX - x) <= clickTolerance &&
        Math.abs(pageY - y) <= clickTolerance)
    )
  }
}

/**
 * Resolve the disance prop from either an Int or an Object
 * @return {Object}
 */
function normalizeDistance(distance = 0) {
  if (typeof distance !== 'object')
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
export function objectsCollide(nodeA, nodeB, tolerance = 0) {
  let {
    top: aTop,
    left: aLeft,
    right: aRight = aLeft,
    bottom: aBottom = aTop,
  } = getBoundsForNode(nodeA)
  let {
    top: bTop,
    left: bLeft,
    right: bRight = bLeft,
    bottom: bBottom = bTop,
  } = getBoundsForNode(nodeB)

  return !// 'a' bottom doesn't touch 'b' top
  (
    aBottom - tolerance < bTop ||
    // 'a' top doesn't touch 'b' bottom
    aTop + tolerance > bBottom ||
    // 'a' right doesn't touch 'b' left
    aRight - tolerance < bLeft ||
    // 'a' left doesn't touch 'b' right
    aLeft + tolerance > bRight
  )
}

/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
export function getBoundsForNode(node) {
  if (!node.getBoundingClientRect) return node

  let rect = node.getBoundingClientRect(),
    left = rect.left + pageOffset('left'),
    top = rect.top + pageOffset('top')

  return {
    top,
    left,
    right: (node.offsetWidth || 0) + left,
    bottom: (node.offsetHeight || 0) + top,
  }
}

function pageOffset(dir) {
  if (dir === 'left') return window.pageXOffset || document.body.scrollLeft || 0
  if (dir === 'top') return window.pageYOffset || document.body.scrollTop || 0
}
export default Selection
