"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getEventNodeFromPoint = getEventNodeFromPoint;
exports.isEvent = isEvent;
exports.objectsCollide = objectsCollide;
exports.getBoundsForNode = getBoundsForNode;
exports.default = void 0;

var _contains = _interopRequireDefault(require("dom-helpers/contains"));

var _closest = _interopRequireDefault(require("dom-helpers/closest"));

var _listen = _interopRequireDefault(require("dom-helpers/listen"));

function addEventListener(type, handler, target) {
  if (target === void 0) {
    target = document;
  }

  return (0, _listen.default)(target, type, handler, {
    passive: false
  });
}

function isOverContainer(container, x, y) {
  return !container || (0, _contains.default)(container, document.elementFromPoint(x, y));
}

function getEventNodeFromPoint(node, _ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;
  var target = document.elementFromPoint(clientX, clientY);
  return (0, _closest.default)(target, '.rbc-event', node);
}

function isEvent(node, bounds) {
  return !!getEventNodeFromPoint(node, bounds);
}

function getEventCoordinates(e) {
  var target = e;

  if (e.touches && e.touches.length) {
    target = e.touches[0];
  }

  return {
    clientX: target.clientX,
    clientY: target.clientY,
    pageX: target.pageX,
    pageY: target.pageY
  };
}

var clickTolerance = 5;
var clickInterval = 250;

var Selection =
/*#__PURE__*/
function () {
  function Selection(node, _temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
        _ref2$global = _ref2.global,
        global = _ref2$global === void 0 ? false : _ref2$global,
        _ref2$longPressThresh = _ref2.longPressThreshold,
        longPressThreshold = _ref2$longPressThresh === void 0 ? 250 : _ref2$longPressThresh;

    this.isDetached = false;
    this.container = node;
    this.globalMouse = !node || global;
    this.longPressThreshold = longPressThreshold;
    this._listeners = Object.create(null);
    this._handleInitialEvent = this._handleInitialEvent.bind(this);
    this._handleMoveEvent = this._handleMoveEvent.bind(this);
    this._handleTerminatingEvent = this._handleTerminatingEvent.bind(this);
    this._keyListener = this._keyListener.bind(this);
    this._dropFromOutsideListener = this._dropFromOutsideListener.bind(this);
    this._dragOverFromOutsideListener = this._dragOverFromOutsideListener.bind(this); // Fixes an iOS 10 bug where scrolling could not be prevented on the window.
    // https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356

    this._removeTouchMoveWindowListener = addEventListener('touchmove', function () {}, window);
    this._removeKeyDownListener = addEventListener('keydown', this._keyListener);
    this._removeKeyUpListener = addEventListener('keyup', this._keyListener);
    this._removeDropFromOutsideListener = addEventListener('drop', this._dropFromOutsideListener);
    this._onDragOverfromOutisde = addEventListener('dragover', this._dragOverFromOutsideListener);

    this._addInitialEventListener();
  }

  var _proto = Selection.prototype;

  _proto.on = function on(type, handler) {
    var handlers = this._listeners[type] || (this._listeners[type] = []);
    handlers.push(handler);
    return {
      remove: function remove() {
        var idx = handlers.indexOf(handler);
        if (idx !== -1) handlers.splice(idx, 1);
      }
    };
  };

  _proto.emit = function emit(type) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var result;
    var handlers = this._listeners[type] || [];
    handlers.forEach(function (fn) {
      if (result === undefined) result = fn.apply(void 0, args);
    });
    return result;
  };

  _proto.teardown = function teardown() {
    this.isDetached = true;
    this.listeners = Object.create(null);
    this._removeTouchMoveWindowListener && this._removeTouchMoveWindowListener();
    this._removeInitialEventListener && this._removeInitialEventListener();
    this._removeEndListener && this._removeEndListener();
    this._onEscListener && this._onEscListener();
    this._removeMoveListener && this._removeMoveListener();
    this._removeKeyUpListener && this._removeKeyUpListener();
    this._removeKeyDownListener && this._removeKeyDownListener();
    this._removeDropFromOutsideListener && this._removeDropFromOutsideListener();
  };

  _proto.isSelected = function isSelected(node) {
    var box = this._selectRect;
    if (!box || !this.selecting) return false;
    return objectsCollide(box, getBoundsForNode(node));
  };

  _proto.filter = function filter(items) {
    var box = this._selectRect; //not selecting

    if (!box || !this.selecting) return [];
    return items.filter(this.isSelected, this);
  } // Adds a listener that will call the handler only after the user has pressed on the screen
  // without moving their finger for 250ms.
  ;

  _proto._addLongPressListener = function _addLongPressListener(handler, initialEvent) {
    var _this = this;

    var timer = null;
    var removeTouchMoveListener = null;
    var removeTouchEndListener = null;

    var handleTouchStart = function handleTouchStart(initialEvent) {
      timer = setTimeout(function () {
        cleanup();
        handler(initialEvent);
      }, _this.longPressThreshold);
      removeTouchMoveListener = addEventListener('touchmove', function () {
        return cleanup();
      });
      removeTouchEndListener = addEventListener('touchend', function () {
        return cleanup();
      });
    };

    var removeTouchStartListener = addEventListener('touchstart', handleTouchStart);

    var cleanup = function cleanup() {
      if (timer) {
        clearTimeout(timer);
      }

      if (removeTouchMoveListener) {
        removeTouchMoveListener();
      }

      if (removeTouchEndListener) {
        removeTouchEndListener();
      }

      timer = null;
      removeTouchMoveListener = null;
      removeTouchEndListener = null;
    };

    if (initialEvent) {
      handleTouchStart(initialEvent);
    }

    return function () {
      cleanup();
      removeTouchStartListener();
    };
  } // Listen for mousedown and touchstart events. When one is received, disable the other and setup
  // future event handling based on the type of event.
  ;

  _proto._addInitialEventListener = function _addInitialEventListener() {
    var _this2 = this;

    var removeMouseDownListener = addEventListener('mousedown', function (e) {
      _this2._removeInitialEventListener();

      _this2._handleInitialEvent(e);

      _this2._removeInitialEventListener = addEventListener('mousedown', _this2._handleInitialEvent);
    });
    var removeTouchStartListener = addEventListener('touchstart', function (e) {
      _this2._removeInitialEventListener();

      _this2._removeInitialEventListener = _this2._addLongPressListener(_this2._handleInitialEvent, e);
    });

    this._removeInitialEventListener = function () {
      removeMouseDownListener();
      removeTouchStartListener();
    };
  };

  _proto._dropFromOutsideListener = function _dropFromOutsideListener(e) {
    var _getEventCoordinates = getEventCoordinates(e),
        pageX = _getEventCoordinates.pageX,
        pageY = _getEventCoordinates.pageY,
        clientX = _getEventCoordinates.clientX,
        clientY = _getEventCoordinates.clientY;

    this.emit('dropFromOutside', {
      x: pageX,
      y: pageY,
      clientX: clientX,
      clientY: clientY
    });
    e.preventDefault();
  };

  _proto._dragOverFromOutsideListener = function _dragOverFromOutsideListener(e) {
    var _getEventCoordinates2 = getEventCoordinates(e),
        pageX = _getEventCoordinates2.pageX,
        pageY = _getEventCoordinates2.pageY,
        clientX = _getEventCoordinates2.clientX,
        clientY = _getEventCoordinates2.clientY;

    this.emit('dragOverFromOutside', {
      x: pageX,
      y: pageY,
      clientX: clientX,
      clientY: clientY
    });
    e.preventDefault();
  };

  _proto._handleInitialEvent = function _handleInitialEvent(e) {
    if (this.isDetached) {
      return;
    }

    var _getEventCoordinates3 = getEventCoordinates(e),
        clientX = _getEventCoordinates3.clientX,
        clientY = _getEventCoordinates3.clientY,
        pageX = _getEventCoordinates3.pageX,
        pageY = _getEventCoordinates3.pageY;

    var node = this.container(),
        collides,
        offsetData; // Right clicks

    if (e.which === 3 || e.button === 2 || !isOverContainer(node, clientX, clientY)) return;

    if (!this.globalMouse && node && !(0, _contains.default)(node, e.target)) {
      var _normalizeDistance = normalizeDistance(0),
          top = _normalizeDistance.top,
          left = _normalizeDistance.left,
          bottom = _normalizeDistance.bottom,
          right = _normalizeDistance.right;

      offsetData = getBoundsForNode(node);
      collides = objectsCollide({
        top: offsetData.top - top,
        left: offsetData.left - left,
        bottom: offsetData.bottom + bottom,
        right: offsetData.right + right
      }, {
        top: pageY,
        left: pageX
      });
      if (!collides) return;
    }

    var result = this.emit('beforeSelect', this._initialEventData = {
      isTouch: /^touch/.test(e.type),
      x: pageX,
      y: pageY,
      clientX: clientX,
      clientY: clientY
    });
    if (result === false) return;

    switch (e.type) {
      case 'mousedown':
        this._removeEndListener = addEventListener('mouseup', this._handleTerminatingEvent);
        this._onEscListener = addEventListener('keydown', this._handleTerminatingEvent);
        this._removeMoveListener = addEventListener('mousemove', this._handleMoveEvent);
        break;

      case 'touchstart':
        this._handleMoveEvent(e);

        this._removeEndListener = addEventListener('touchend', this._handleTerminatingEvent);
        this._removeMoveListener = addEventListener('touchmove', this._handleMoveEvent);
        break;

      default:
        break;
    }
  };

  _proto._handleTerminatingEvent = function _handleTerminatingEvent(e) {
    var _getEventCoordinates4 = getEventCoordinates(e),
        pageX = _getEventCoordinates4.pageX,
        pageY = _getEventCoordinates4.pageY;

    this.selecting = false;
    this._removeEndListener && this._removeEndListener();
    this._removeMoveListener && this._removeMoveListener();
    if (!this._initialEventData) return;
    var inRoot = !this.container || (0, _contains.default)(this.container(), e.target);
    var bounds = this._selectRect;
    var click = this.isClick(pageX, pageY);
    this._initialEventData = null;

    if (e.key === 'Escape') {
      return this.emit('reset');
    }

    if (!inRoot) {
      return this.emit('reset');
    }

    if (click && inRoot) {
      return this._handleClickEvent(e);
    } // User drag-clicked in the Selectable area


    if (!click) return this.emit('select', bounds);
  };

  _proto._handleClickEvent = function _handleClickEvent(e) {
    var _getEventCoordinates5 = getEventCoordinates(e),
        pageX = _getEventCoordinates5.pageX,
        pageY = _getEventCoordinates5.pageY,
        clientX = _getEventCoordinates5.clientX,
        clientY = _getEventCoordinates5.clientY;

    var now = new Date().getTime();

    if (this._lastClickData && now - this._lastClickData.timestamp < clickInterval) {
      // Double click event
      this._lastClickData = null;
      return this.emit('doubleClick', {
        x: pageX,
        y: pageY,
        clientX: clientX,
        clientY: clientY
      });
    } // Click event


    this._lastClickData = {
      timestamp: now
    };
    return this.emit('click', {
      x: pageX,
      y: pageY,
      clientX: clientX,
      clientY: clientY
    });
  };

  _proto._handleMoveEvent = function _handleMoveEvent(e) {
    if (this._initialEventData === null || this.isDetached) {
      return;
    }

    var _this$_initialEventDa = this._initialEventData,
        x = _this$_initialEventDa.x,
        y = _this$_initialEventDa.y;

    var _getEventCoordinates6 = getEventCoordinates(e),
        pageX = _getEventCoordinates6.pageX,
        pageY = _getEventCoordinates6.pageY;

    var w = Math.abs(x - pageX);
    var h = Math.abs(y - pageY);
    var left = Math.min(pageX, x),
        top = Math.min(pageY, y),
        old = this.selecting; // Prevent emitting selectStart event until mouse is moved.
    // in Chrome on Windows, mouseMove event may be fired just after mouseDown event.

    if (this.isClick(pageX, pageY) && !old && !(w || h)) {
      return;
    }

    this.selecting = true;
    this._selectRect = {
      top: top,
      left: left,
      x: pageX,
      y: pageY,
      right: left + w,
      bottom: top + h
    };

    if (!old) {
      this.emit('selectStart', this._initialEventData);
    }

    if (!this.isClick(pageX, pageY)) this.emit('selecting', this._selectRect);
    e.preventDefault();
  };

  _proto._keyListener = function _keyListener(e) {
    this.ctrl = e.metaKey || e.ctrlKey;
  };

  _proto.isClick = function isClick(pageX, pageY) {
    var _this$_initialEventDa2 = this._initialEventData,
        x = _this$_initialEventDa2.x,
        y = _this$_initialEventDa2.y,
        isTouch = _this$_initialEventDa2.isTouch;
    return !isTouch && Math.abs(pageX - x) <= clickTolerance && Math.abs(pageY - y) <= clickTolerance;
  };

  return Selection;
}();
/**
 * Resolve the disance prop from either an Int or an Object
 * @return {Object}
 */


function normalizeDistance(distance) {
  if (distance === void 0) {
    distance = 0;
  }

  if (typeof distance !== 'object') distance = {
    top: distance,
    left: distance,
    right: distance,
    bottom: distance
  };
  return distance;
}
/**
 * Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
 * properties, determine if they collide.
 * @param  {Object|HTMLElement} a
 * @param  {Object|HTMLElement} b
 * @return {bool}
 */


function objectsCollide(nodeA, nodeB, tolerance) {
  if (tolerance === void 0) {
    tolerance = 0;
  }

  var _getBoundsForNode = getBoundsForNode(nodeA),
      aTop = _getBoundsForNode.top,
      aLeft = _getBoundsForNode.left,
      _getBoundsForNode$rig = _getBoundsForNode.right,
      aRight = _getBoundsForNode$rig === void 0 ? aLeft : _getBoundsForNode$rig,
      _getBoundsForNode$bot = _getBoundsForNode.bottom,
      aBottom = _getBoundsForNode$bot === void 0 ? aTop : _getBoundsForNode$bot;

  var _getBoundsForNode2 = getBoundsForNode(nodeB),
      bTop = _getBoundsForNode2.top,
      bLeft = _getBoundsForNode2.left,
      _getBoundsForNode2$ri = _getBoundsForNode2.right,
      bRight = _getBoundsForNode2$ri === void 0 ? bLeft : _getBoundsForNode2$ri,
      _getBoundsForNode2$bo = _getBoundsForNode2.bottom,
      bBottom = _getBoundsForNode2$bo === void 0 ? bTop : _getBoundsForNode2$bo;

  return !( // 'a' bottom doesn't touch 'b' top
  aBottom - tolerance < bTop || // 'a' top doesn't touch 'b' bottom
  aTop + tolerance > bBottom || // 'a' right doesn't touch 'b' left
  aRight - tolerance < bLeft || // 'a' left doesn't touch 'b' right
  aLeft + tolerance > bRight);
}
/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */


function getBoundsForNode(node) {
  if (!node.getBoundingClientRect) return node;
  var rect = node.getBoundingClientRect(),
      left = rect.left + pageOffset('left'),
      top = rect.top + pageOffset('top');
  return {
    top: top,
    left: left,
    right: (node.offsetWidth || 0) + left,
    bottom: (node.offsetHeight || 0) + top
  };
}

function pageOffset(dir) {
  if (dir === 'left') return window.pageXOffset || document.body.scrollLeft || 0;
  if (dir === 'top') return window.pageYOffset || document.body.scrollTop || 0;
}

var _default = Selection;
exports.default = _default;