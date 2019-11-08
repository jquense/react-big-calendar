import contains from 'dom-helpers/query/contains'
import closest from 'dom-helpers/query/closest'
import events from 'dom-helpers/events'

function addEventListener(type, handler, target = document) {
  events.on(target, type, handler, { passive: false })
  return {
    remove() {
      events.off(target, type, handler)
    },
  }
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
  constructor(
    node,
    { global = false, longPressThreshold = 250, resourceId = null } = {}
  ) {
    this.isDetached = false
    this.container = node
    this.globalMouse = !node || global
    this.longPressThreshold = longPressThreshold
    this.resourceId = resourceId
    this.activeResource = null

    this._listeners = Object.create(null)

    this._handleInitialEvent = this._handleInitialEvent.bind(this)
    this._handleMoveEvent = this._handleMoveEvent.bind(this)
    this._handleTerminatingEvent = this._handleTerminatingEvent.bind(this)
    this._keyDownListener = this._keyDownListener.bind(this)
    this._keyUpListener = this._keyUpListener.bind(this)
    this._dropFromOutsideListener = this._dropFromOutsideListener.bind(this)

    // Fixes an iOS 10 bug where scrolling could not be prevented on the window.
    // https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
    this._onTouchMoveWindowListener = addEventListener(
      'touchmove',
      () => {},
      window
    )
    this._onKeyDownListener = addEventListener('keydown', this._keyDownListener)
    this._onKeyUpListener = addEventListener('keyup', this._keyUpListener)
    this._onDropFromOutsideListener = addEventListener(
      'drop',
      this._dropFromOutsideListener
    )
    this._addInitialEventListener()

    this.activeSlots = [-1]
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
    this._onTouchMoveWindowListener && this._onTouchMoveWindowListener.remove()
    this._onInitialEventListener && this._onInitialEventListener.remove()
    this._onEndListener && this._onEndListener.remove()
    this._onEscListener && this._onEscListener.remove()
    this._onMoveListener && this._onMoveListener.remove()
    this._onKeyUpListener && this._onKeyUpListener.remove()
    this._onKeyDownListener && this._onKeyDownListener.remove()
    this.clearActiveSlots()
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
    let touchMoveListener = null
    let touchEndListener = null
    const handleTouchStart = initialEvent => {
      timer = setTimeout(() => {
        cleanup()
        handler(initialEvent)
      }, this.longPressThreshold)
      touchMoveListener = addEventListener('touchmove', () => cleanup())
      touchEndListener = addEventListener('touchend', () => cleanup())
    }
    const touchStartListener = addEventListener('touchstart', handleTouchStart)
    const cleanup = () => {
      if (timer) {
        clearTimeout(timer)
      }
      if (touchMoveListener) {
        touchMoveListener.remove()
      }
      if (touchEndListener) {
        touchEndListener.remove()
      }

      timer = null
      touchMoveListener = null
      touchEndListener = null
    }

    if (initialEvent) {
      handleTouchStart(initialEvent)
    }

    return {
      remove() {
        cleanup()
        touchStartListener.remove()
      },
    }
  }

  // Listen for mousedown and touchstart events. When one is received, disable the other and setup
  // future event handling based on the type of event.
  _addInitialEventListener() {
    const mouseDownListener = addEventListener('mousedown', e => {
      this._onInitialEventListener.remove()
      this._handleInitialEvent(e)
      this._onInitialEventListener = addEventListener(
        'mousedown',
        this._handleInitialEvent
      )
    })
    const touchStartListener = addEventListener('touchstart', e => {
      this._onInitialEventListener.remove()
      this._onInitialEventListener = this._addLongPressListener(
        this._handleInitialEvent,
        e
      )
    })

    this._onInitialEventListener = {
      remove() {
        mouseDownListener.remove()
        touchStartListener.remove()
      },
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

    this.clearActiveSlots()

    if (result === false) return

    switch (e.type) {
      case 'mousedown':
        this._onEndListener = addEventListener(
          'mouseup',
          this._handleTerminatingEvent
        )
        this._onEscListener = addEventListener(
          'keydown',
          this._handleTerminatingEvent
        )
        this._onMoveListener = addEventListener(
          'mousemove',
          this._handleMoveEvent
        )
        break
      case 'touchstart':
        if (this._initialEventData === null || this.isDetached) {
          return
        }
        this._handleMoveEvent(e)
        this._onEndListener = addEventListener(
          'touchend',
          this._handleTerminatingEvent
        )
        this._onMoveListener = addEventListener(
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

    this._onEndListener && this._onEndListener.remove()
    this._onMoveListener && this._onMoveListener.remove()

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

  isClick(pageX, pageY) {
    let { x, y, isTouch } = this._initialEventData
    return (
      !isTouch &&
      (Math.abs(pageX - x) <= clickTolerance &&
        Math.abs(pageY - y) <= clickTolerance)
    )
  }

  triggerMouseEvent(node, eventType) {
    var clickEvent = document.createEvent('MouseEvents')
    clickEvent.initEvent(eventType, true, true)
    node.dispatchEvent(clickEvent)
  }

  _keyDownListener(e) {
    if (e.keyCode == '40' /** down arrow */) {
      this.moveDown(e)
    } else if (e.keyCode == '38' /** up arrow */) {
      this.moveUp(e)
    }

    this._keyListener(e)
  }

  _keyUpListener(e) {
    if (e.keyCode == '27' || e.keyCode == '9') {
      this.clearActiveSlots()
    } else if (e.keyCode == '13' || e.keyCode == '32') {
      const events = this.activeEventSlots()
      this.emit('keyboardSelect', {
        events,
      })
      this.clearActiveSlots()
    }
  }

  activeEventSlots() {
    if (this.activeSlots == null || this.activeSlots.length === 0) {
      return null
    }

    const sortedEventSlots = this.activeSlots
      .filter(as => as != -1)
      .sort((a, b) => {
        return +a - +b
      })

    const slotElement = this.getSlotById(sortedEventSlots[0])

    if (slotElement != null) {
      const startTime = slotElement.dataset.time

      return {
        startDate: new Date(startTime),
        numberOfSlots: sortedEventSlots.length,
      }
    }

    return null
  }

  _keyListener(e) {
    this.ctrl = e.metaKey || e.ctrlKey
  }

  clearActiveSlots() {
    const activeSlotElements = document.querySelectorAll('.active-slot')

    activeSlotElements.forEach(as => {
      as.classList.remove('active-slot')
    })

    this.activeSlots = [-1]
  }

  moveDown(e) {
    e.preventDefault()

    const activeElement = document.activeElement
    const dataTimeHeaderId = activeElement.dataset.timeHeaderId
    const dataResourceId = activeElement.dataset.resourceId

    if (
      dataTimeHeaderId != this.resourceId &&
      dataResourceId != this.resourceId
    ) {
      return
    }

    // if moving off of an event handle and bypass the regular navigation
    const eventId = activeElement.dataset.eventId
    if (eventId != null) {
      this.activateSlotByTime(activeElement.dataset.nextSlotTime)
      return
    }

    const lastSlot = this.activeSlots[this.activeSlots.length - 1]
    let newSlot
    let newElement
    let lastElement
    //if this the move down from the resource row
    if (lastSlot === -1) {
      //get the first slot with business hour
      newElement = document.querySelector(
        `.business-slot[data-resource-id='${this.resourceId}']`
      )
      const defaultDataTimeSlotId = parseInt(
        newElement.getAttribute('data-timeslot-id'),
        10
      )
      lastElement = this.getSlotById(defaultDataTimeSlotId - 1)
      newSlot = defaultDataTimeSlotId
    } else {
      newSlot = lastSlot + 1
      newElement = this.getSlotById(newSlot)
      lastElement = this.getSlotById(lastSlot)
    }

    if (newElement != null) {
      if (e.shiftKey) {
        if (newElement.classList.contains('active-slot')) {
          this.activeSlots.pop()
          lastElement.classList.remove('active-slot')
          newElement.focus()
        } else {
          this.activeSlots.push(newSlot)
          newElement.classList.add('active-slot')
          newElement.focus()
        }
      } else {
        this.clearActiveSlots()
        this.activeSlots = [newSlot]
        newElement.classList.add('active-slot')
        newElement.focus()
      }
    }
  }

  moveUp(e) {
    e.preventDefault()

    const activeElement = document.activeElement
    const dataTimeHeaderId = activeElement.dataset.timeHeaderId
    const dataResourceId = activeElement.dataset.resourceId

    if (
      dataTimeHeaderId != this.resourceId &&
      dataResourceId != this.resourceId
    ) {
      return
    }

    // if moving off of an event handle and bypass the regular navigation
    const eventId = activeElement.dataset.eventId
    if (eventId != null) {
      this.activateSlotByTime(activeElement.dataset.previousSlotTime)
      return
    }

    const lastSlot = this.activeSlots[this.activeSlots.length - 1]
    const newSlot = lastSlot - 1
    let lastElement = this.getSlotById(lastSlot)
    let newElement = this.getSlotById(newSlot)

    if (newElement != null) {
      if (e.shiftKey) {
        if (newElement.classList.contains('active-slot')) {
          lastElement.classList.remove('active-slot')
          this.activeSlots.pop()
          newElement.focus()
        } else {
          newElement.classList.add('active-slot')
          this.activeSlots.push(newSlot)
          newElement.focus()
        }
      } else {
        this.clearActiveSlots()
        this.activeSlots = [newSlot]
        newElement.classList.add('active-slot')
        newElement.focus()
      }
    } else {
      let newElement = document.querySelector(
        `[data-resource-id='${dataResourceId}']`
      )
      this.clearActiveSlots()
      newElement.focus()
    }
  }

  activateSlotByTime(eventTime) {
    const slotElement = document.querySelector(
      `[data-resource-id='${this.resourceId}'][data-time='${eventTime}']`
    )

    if (slotElement != null) {
      this.clearActiveSlots()
      this.activeSlots.push(+slotElement.dataset.timeslotId)
      slotElement.classList.add('active-slot')
      slotElement.focus()
    }
  }

  getSlotById(slotId) {
    try {
      return document.querySelector(
        `[data-resource-id='${this.resourceId}'][data-timeslot-id='${slotId}']`
      )
    } catch {
      return null
    }
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
