'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isEvent = isEvent;
exports.objectsCollide = objectsCollide;
exports.getBoundsForNode = getBoundsForNode;

var _contains = require('dom-helpers/query/contains');

var _contains2 = _interopRequireDefault(_contains);

var _closest = require('dom-helpers/query/closest');

var _closest2 = _interopRequireDefault(_closest);

var _events = require('dom-helpers/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function addEventListener(type, handler) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

  _events2.default.on(target, type, handler);
  return {
    remove: function remove() {
      _events2.default.off(target, type, handler);
    }
  };
}

function isOverContainer(container, x, y) {
  return !container || (0, _contains2.default)(container, document.elementFromPoint(x, y));
}

function isEvent(node, _ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;

  var target = document.elementFromPoint(clientX, clientY);
  return !!(0, _closest2.default)(target, '.rbc-event', node);
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

var Selection = function () {
  function Selection(node) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$global = _ref2.global,
        global = _ref2$global === undefined ? false : _ref2$global,
        _ref2$longPressThresh = _ref2.longPressThreshold,
        longPressThreshold = _ref2$longPressThresh === undefined ? 250 : _ref2$longPressThresh;

    _classCallCheck(this, Selection);

    this.container = node;
    this.globalMouse = !node || global;
    this.longPressThreshold = longPressThreshold;

    this._listeners = Object.create(null);

    this._handleInitialEvent = this._handleInitialEvent.bind(this);
    this._handleMoveEvent = this._handleMoveEvent.bind(this);
    this._handleTerminatingEvent = this._handleTerminatingEvent.bind(this);
    this._keyListener = this._keyListener.bind(this);

    // Fixes an iOS 10 bug where scrolling could not be prevented on the window.
    // https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
    this._onTouchMoveWindowListener = addEventListener('touchmove', function () {}, window);
    this._onKeyDownListener = addEventListener('keydown', this._keyListener);
    this._onKeyUpListener = addEventListener('keyup', this._keyListener);
    this._addInitialEventListener();
  }

  Selection.prototype.on = function on(type, handler) {
    var handlers = this._listeners[type] || (this._listeners[type] = []);

    handlers.push(handler);

    return {
      remove: function remove() {
        var idx = handlers.indexOf(handler);
        if (idx !== -1) handlers.splice(idx, 1);
      }
    };
  };

  Selection.prototype.emit = function emit(type) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var result = void 0;
    var handlers = this._listeners[type] || [];
    handlers.forEach(function (fn) {
      if (result === undefined) result = fn.apply(undefined, args);
    });
    return result;
  };

  Selection.prototype.teardown = function teardown() {
    this.listeners = Object.create(null);
    this._onTouchMoveWindowListener && this._onTouchMoveWindowListener.remove();
    this._onInitialEventListener && this._onInitialEventListener.remove();
    this._onEndListener && this._onEndListener.remove();
    this._onMoveListener && this._onMoveListener.remove();
    this._onKeyUpListener && this._onKeyUpListener.remove();
    this._onKeyDownListener && this._onKeyDownListener.remove();
  };

  Selection.prototype.isSelected = function isSelected(node) {
    var box = this._selectRect;

    if (!box || !this.selecting) return false;

    return objectsCollide(box, getBoundsForNode(node));
  };

  Selection.prototype.filter = function filter(items) {
    var box = this._selectRect;

    //not selecting
    if (!box || !this.selecting) return [];

    return items.filter(this.isSelected, this);
  };

  // Adds a listener that will call the handler only after the user has pressed on the screen
  // without moving their finger for 250ms.


  Selection.prototype._addLongPressListener = function _addLongPressListener(handler, initialEvent) {
    var _this = this;

    var timer = null;
    var touchMoveListener = null;
    var touchEndListener = null;
    var handleTouchStart = function handleTouchStart(initialEvent) {
      timer = setTimeout(function () {
        cleanup();
        handler(initialEvent);
      }, _this.longPressThreshold);
      touchMoveListener = addEventListener('touchmove', function () {
        return cleanup();
      });
      touchEndListener = addEventListener('touchend', function () {
        return cleanup();
      });
    };
    var touchStartListener = addEventListener('touchstart', handleTouchStart);
    var cleanup = function cleanup() {
      if (timer) {
        clearTimeout(timer);
      }
      if (touchMoveListener) {
        touchMoveListener.remove();
      }
      if (touchEndListener) {
        touchEndListener.remove();
      }

      timer = null;
      touchMoveListener = null;
      touchEndListener = null;
    };

    if (initialEvent) {
      handleTouchStart(initialEvent);
    }

    return {
      remove: function remove() {
        cleanup();
        touchStartListener.remove();
      }
    };
  };

  // Listen for mousedown and touchstart events. When one is received, disable the other and setup
  // future event handling based on the type of event.


  Selection.prototype._addInitialEventListener = function _addInitialEventListener() {
    var _this2 = this;

    var mouseDownListener = addEventListener('mousedown', function (e) {
      _this2._onInitialEventListener.remove();
      _this2._handleInitialEvent(e);
      _this2._onInitialEventListener = addEventListener('mousedown', _this2._handleInitialEvent);
    });
    var touchStartListener = addEventListener('touchstart', function (e) {
      _this2._onInitialEventListener.remove();
      _this2._onInitialEventListener = _this2._addLongPressListener(_this2._handleInitialEvent, e);
    });

    this._onInitialEventListener = {
      remove: function remove() {
        mouseDownListener.remove();
        touchStartListener.remove();
      }
    };
  };

  Selection.prototype._handleInitialEvent = function _handleInitialEvent(e) {
    var _getEventCoordinates = getEventCoordinates(e),
        clientX = _getEventCoordinates.clientX,
        clientY = _getEventCoordinates.clientY,
        pageX = _getEventCoordinates.pageX,
        pageY = _getEventCoordinates.pageY;

    var node = this.container(),
        collides = void 0,
        offsetData = void 0;

    // Right clicks
    if (e.which === 3 || e.button === 2 || !isOverContainer(node, clientX, clientY)) return;

    if (!this.globalMouse && node && !(0, _contains2.default)(node, e.target)) {
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
      }, { top: pageY, left: pageX });

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
        this._onEndListener = addEventListener('mouseup', this._handleTerminatingEvent);
        this._onMoveListener = addEventListener('mousemove', this._handleMoveEvent);
        break;
      case 'touchstart':
        this._handleMoveEvent(e);
        this._onEndListener = addEventListener('touchend', this._handleTerminatingEvent);
        this._onMoveListener = addEventListener('touchmove', this._handleMoveEvent);
        break;
      default:
        break;
    }
  };

  Selection.prototype._handleTerminatingEvent = function _handleTerminatingEvent(e) {
    var _getEventCoordinates2 = getEventCoordinates(e),
        pageX = _getEventCoordinates2.pageX,
        pageY = _getEventCoordinates2.pageY,
        clientX = _getEventCoordinates2.clientX,
        clientY = _getEventCoordinates2.clientY;

    this.selecting = false;

    this._onEndListener && this._onEndListener.remove();
    this._onMoveListener && this._onMoveListener.remove();

    if (!this._initialEventData) return;

    var inRoot = !this.container || (0, _contains2.default)(this.container(), e.target);
    var bounds = this._selectRect;
    var click = this.isClick(pageX, pageY);

    this._initialEventData = null;

    if (click && !inRoot) {
      return this.emit('reset');
    }

    if (click && inRoot) return this.emit('click', {
      x: pageX,
      y: pageY,
      clientX: clientX,
      clientY: clientY
    });

    // User drag-clicked in the Selectable area
    if (!click) return this.emit('select', bounds);
  };

  Selection.prototype._handleMoveEvent = function _handleMoveEvent(e) {
    var _initialEventData = this._initialEventData,
        x = _initialEventData.x,
        y = _initialEventData.y;

    var _getEventCoordinates3 = getEventCoordinates(e),
        pageX = _getEventCoordinates3.pageX,
        pageY = _getEventCoordinates3.pageY;

    var w = Math.abs(x - pageX);
    var h = Math.abs(y - pageY);

    var left = Math.min(pageX, x),
        top = Math.min(pageY, y),
        old = this.selecting;

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

  Selection.prototype._keyListener = function _keyListener(e) {
    this.ctrl = e.metaKey || e.ctrlKey;
  };

  Selection.prototype.isClick = function isClick(pageX, pageY) {
    var _initialEventData2 = this._initialEventData,
        x = _initialEventData2.x,
        y = _initialEventData2.y,
        isTouch = _initialEventData2.isTouch;

    return !isTouch && Math.abs(pageX - x) <= clickTolerance && Math.abs(pageY - y) <= clickTolerance;
  };

  return Selection;
}();

/**
 * Resolve the disance prop from either an Int or an Object
 * @return {Object}
 */


function normalizeDistance() {
  var distance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  if ((typeof distance === 'undefined' ? 'undefined' : _typeof(distance)) !== 'object') distance = { top: distance, left: distance, right: distance, bottom: distance };

  return distance;
}

/**
 * Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
 * properties, determine if they collide.
 * @param  {Object|HTMLElement} a
 * @param  {Object|HTMLElement} b
 * @return {bool}
 */
function objectsCollide(nodeA, nodeB) {
  var tolerance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var _getBoundsForNode = getBoundsForNode(nodeA),
      aTop = _getBoundsForNode.top,
      aLeft = _getBoundsForNode.left,
      _getBoundsForNode$rig = _getBoundsForNode.right,
      aRight = _getBoundsForNode$rig === undefined ? aLeft : _getBoundsForNode$rig,
      _getBoundsForNode$bot = _getBoundsForNode.bottom,
      aBottom = _getBoundsForNode$bot === undefined ? aTop : _getBoundsForNode$bot;

  var _getBoundsForNode2 = getBoundsForNode(nodeB),
      bTop = _getBoundsForNode2.top,
      bLeft = _getBoundsForNode2.left,
      _getBoundsForNode2$ri = _getBoundsForNode2.right,
      bRight = _getBoundsForNode2$ri === undefined ? bLeft : _getBoundsForNode2$ri,
      _getBoundsForNode2$bo = _getBoundsForNode2.bottom,
      bBottom = _getBoundsForNode2$bo === undefined ? bTop : _getBoundsForNode2$bo;

  return !(
  // 'a' bottom doesn't touch 'b' top
  aBottom - tolerance < bTop ||
  // 'a' top doesn't touch 'b' bottom
  aTop + tolerance > bBottom ||
  // 'a' right doesn't touch 'b' left
  aRight - tolerance < bLeft ||
  // 'a' left doesn't touch 'b' right
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
exports.default = Selection;