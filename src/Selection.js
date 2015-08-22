import contains from 'dom-helpers/query/contains';
import events from 'dom-helpers/events';

const listeners = {};
const dochandlers = {};

function addPooledHandler(type, handler) {
  let handlers = listeners[type] || (listeners[type] = []);

  if (handlers.length === 0) {
    dochandlers[type] = e => handlers.forEach(fn => fn(e));
    events.on(document, type, dochandlers[type]);
  }

  handlers.push(handler);

  return {
    remove(){
      let idx = handlers.indexOf(handler);
      if( idx !== -1) handlers.splice(idx, 1)

      if (handlers.length === 0) {
        events.off(document, type, dochandlers[type]);
        dochandlers[type] = null;
      }
    }
  }
}

class Selection {

  constructor(node, global = false){
    this.container = node;
    this.globalMouse = !node || global;

    this._listeners = Object.create(null);

    this._mouseDown = this._mouseDown.bind(this)
    this._mouseUp = this._mouseUp.bind(this)
    this._openSelector = this._openSelector.bind(this)
    this._keyListener = this._keyListener.bind(this)

    this._onMouseDownListener = addPooledHandler('mousedown', this._mouseDown)
    this._onKeyDownListener = addPooledHandler('keydown', this._keyListener)
    this._onKeyUpListener = addPooledHandler('keyup', this._keyListener)
  }

  on(type, handler) {
    let handlers = this._listeners[type] || (this._listeners[type] = []);

    handlers.push(handler);

    return {
      remove(){
        let idx = handlers.indexOf(handler);
        if( idx !== -1) handlers.splice(idx, 1)
      }
    }
  }

  emit(type, ...args){
    let handlers = this._listeners[type] || [];
    handlers.forEach(fn => fn(...args))
  }

  teardown() {
    this.listeners = Object.create(null)
    this._onMouseDownListener && this._onMouseDownListener.remove()
    this._onMouseUpListener && this._onMouseUpListener.remove();
    this._onMouseMoveListener && this._onMouseMoveListener.remove();
    this._onKeyUpListener && this._onKeyUpListener.remove();
    this._onKeyDownListener && this._onKeyDownListener.remove()
  }

  isSelected(node){
    let box = this._selectRect;

    if (!box || !this.selecting) return false;

    return objectsCollide(box, getBoundsForNode(node))
  }

  filter(items) {
    let box = this._selectRect;

    //not selecting
    if (!box || !this.selecting)
      return [];

    return items.filter(this.isSelected, this)
  }

  _mouseDown (e) {
    var node = this.container
      , collides, offsetData;

    // Right clicks
    if (e.which === 3 || e.button === 2)
      return;

    if (node && !contains(node, e.target) && !this.globalMouse) {

      let { top, left, bottom, right } = normalizeDistance(0);

      offsetData = getBoundsForNode(node);

      collides = objectsCollide({
        top: offsetData.top - top,
        left: offsetData.left - left,
        bottom: offsetData.bottom + bottom,
        right: offsetData.right + right
      },
      { top: e.pageY, left: e.pageX });

      if (!collides) return;
    }

    this._mouseDownData = {
      boxLeft: e.pageX,
      boxTop: e.pageY,
      initialW: e.pageX,
      initialH: e.pageY
    };

    e.preventDefault();

    this._onMouseUpListener = addPooledHandler('mouseup', this._mouseUp)
    this._onMouseMoveListener = addPooledHandler('mousemove', this._openSelector)
  }

  _mouseUp(e) {
    this._onMouseUpListener && this._onMouseUpListener.remove();
    this._onMouseMoveListener && this._onMouseMoveListener.remove();

    if (!this._mouseDownData) return;

    var { initialW, initialH } = this._mouseDownData;
    var inRoot = !this.container || contains(this.container, e.target);
    var bounds = this._selectRect;
    var click = (
      e.pageX === initialW &&
      e.pageY === initialH
    );

    this._mouseDownData = null

    if(click && !inRoot) {
      return this.emit('reset')
    }

    if(click && inRoot)
      return this.emit('click', e.pageX, e.pageY)

    // User drag-clicked in the Selectable area
    if(!click)
      return this.emit('select', bounds)

    this.selecting = false;
  }

  _openSelector(e) {
    var { initialW, initialH } = this._mouseDownData;
    var w = Math.abs(initialW - e.pageX);
    var h = Math.abs(initialH - e.pageY);

    let left = Math.min(e.pageX, initialW)
      , top = Math.min(e.pageY, initialH);

    this.selecting = true;

    this.emit('selecting', this._selectRect = {
      top,
      left,
      right: left + w,
      bottom: top + h
    });
  }

  _keyListener(e) {
    this.ctrl = (e.metaKey || e.ctrlKey)
  }
}

/**
 * Resolve the disance prop from either an Int or an Object
 * @return {Object}
 */
function normalizeDistance(distance = 0) {
  if (typeof distance !== 'object')
    distance = { top: distance, left: distance, right: distance, bottom: distance };

  return distance;
}

/**
 * Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
 * properties, determine if they collide.
 * @param  {Object|HTMLElement} a
 * @param  {Object|HTMLElement} b
 * @return {bool}
 */
function objectsCollide(nodeA, nodeB, tolerance = 0) {
  let { top: aTop, left: aLeft, right: aRight = aLeft, bottom: aBottom = aTop } = getBoundsForNode(nodeA);
  let { top: bTop, left: bLeft, right: bRight = bLeft, bottom: bBottom = bTop } = getBoundsForNode(nodeB);

  return !(
    // 'a' bottom doesn't touch 'b' top
    ((aBottom - tolerance ) < bTop)  ||
    // 'a' top doesn't touch 'b' bottom
    ((aTop + tolerance) > (bBottom)) ||
    // 'a' right doesn't touch 'b' left
    ((aRight - tolerance) < bLeft )  ||
    // 'a' left doesn't touch 'b' right
    ((aLeft + tolerance) > (bRight) )
  );
}

/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
export function getBoundsForNode(node) {
  if (!node.getBoundingClientRect) return node;

  var rect = node.getBoundingClientRect()
    , left = rect.left + (document.body.scrollLeft || 0)
    , top = rect.top + (document.body.scrollTop || 0);

  return {
    top,
    left,
    right: (node.offsetWidth || 0) + left,
    bottom: (node.offsetHeight || 0) + top
  };
}

export default Selection
