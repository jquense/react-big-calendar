'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
var _interopRequireWildcard =
  require('@babel/runtime/helpers/interopRequireWildcard').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireWildcard(require('react'))
var _propTypes = _interopRequireDefault(require('prop-types'))
var _offset = _interopRequireDefault(require('dom-helpers/offset'))
var _useClickOutside = _interopRequireDefault(
  require('./hooks/useClickOutside')
)
var _EventCell = _interopRequireDefault(require('./EventCell'))
var _selection = require('./utils/selection')
/**
 * Changes to react-overlays cause issue with auto positioning,
 * so we need to manually calculate the position of the popper,
 * and constrain it to the Month container.
 */
function getPosition(_ref) {
  var target = _ref.target,
    offset = _ref.offset,
    container = _ref.container,
    box = _ref.box
  var _getOffset = (0, _offset.default)(target),
    top = _getOffset.top,
    left = _getOffset.left,
    width = _getOffset.width,
    height = _getOffset.height
  var _getOffset2 = (0, _offset.default)(container),
    cTop = _getOffset2.top,
    cLeft = _getOffset2.left,
    cWidth = _getOffset2.width,
    cHeight = _getOffset2.height
  var _getOffset3 = (0, _offset.default)(box),
    bWidth = _getOffset3.width,
    bHeight = _getOffset3.height
  var viewBottom = cTop + cHeight
  var viewRight = cLeft + cWidth
  var bottom = top + bHeight
  var right = left + bWidth
  var x = offset.x,
    y = offset.y
  var topOffset = bottom > viewBottom ? top - bHeight - y : top + y + height
  var leftOffset = right > viewRight ? left + x - bWidth + width : left + x
  return {
    topOffset: topOffset,
    leftOffset: leftOffset,
  }
}
function Pop(_ref2) {
  var containerRef = _ref2.containerRef,
    accessors = _ref2.accessors,
    getters = _ref2.getters,
    selected = _ref2.selected,
    components = _ref2.components,
    localizer = _ref2.localizer,
    position = _ref2.position,
    show = _ref2.show,
    events = _ref2.events,
    slotStart = _ref2.slotStart,
    slotEnd = _ref2.slotEnd,
    onSelect = _ref2.onSelect,
    onDoubleClick = _ref2.onDoubleClick,
    onKeyPress = _ref2.onKeyPress,
    handleDragStart = _ref2.handleDragStart,
    popperRef = _ref2.popperRef,
    target = _ref2.target,
    offset = _ref2.offset
  ;(0, _useClickOutside.default)({
    ref: popperRef,
    callback: show,
  })
  ;(0, _react.useLayoutEffect)(
    function () {
      var _getPosition = getPosition({
          target: target,
          offset: offset,
          container: containerRef.current,
          box: popperRef.current,
        }),
        topOffset = _getPosition.topOffset,
        leftOffset = _getPosition.leftOffset
      popperRef.current.style.top = ''.concat(topOffset, 'px')
      popperRef.current.style.left = ''.concat(leftOffset, 'px')
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [offset.x, offset.y, target]
  )
  var width = position.width
  var style = {
    minWidth: width + width / 2,
  }
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      style: style,
      className: 'rbc-overlay',
      ref: popperRef,
    },
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: 'rbc-overlay-header',
      },
      localizer.format(slotStart, 'dayHeaderFormat')
    ),
    events.map(function (event, idx) {
      return /*#__PURE__*/ _react.default.createElement(_EventCell.default, {
        key: idx,
        type: 'popup',
        localizer: localizer,
        event: event,
        getters: getters,
        onSelect: onSelect,
        accessors: accessors,
        components: components,
        onDoubleClick: onDoubleClick,
        onKeyPress: onKeyPress,
        continuesPrior: localizer.lt(accessors.end(event), slotStart, 'day'),
        continuesAfter: localizer.gte(accessors.start(event), slotEnd, 'day'),
        slotStart: slotStart,
        slotEnd: slotEnd,
        selected: (0, _selection.isSelected)(event, selected),
        draggable: true,
        onDragStart: function onDragStart() {
          return handleDragStart(event)
        },
        onDragEnd: function onDragEnd() {
          return show()
        },
      })
    })
  )
}
var Popup = /*#__PURE__*/ _react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/ _react.default.createElement(
    Pop,
    Object.assign({}, props, {
      popperRef: ref,
    })
  )
})
Popup.propTypes = {
  accessors: _propTypes.default.object.isRequired,
  getters: _propTypes.default.object.isRequired,
  selected: _propTypes.default.object,
  components: _propTypes.default.object.isRequired,
  localizer: _propTypes.default.object.isRequired,
  position: _propTypes.default.object.isRequired,
  show: _propTypes.default.func.isRequired,
  events: _propTypes.default.array.isRequired,
  slotStart: _propTypes.default.instanceOf(Date).isRequired,
  slotEnd: _propTypes.default.instanceOf(Date),
  onSelect: _propTypes.default.func,
  onDoubleClick: _propTypes.default.func,
  onKeyPress: _propTypes.default.func,
  handleDragStart: _propTypes.default.func,
  style: _propTypes.default.object,
  offset: _propTypes.default.shape({
    x: _propTypes.default.number,
    y: _propTypes.default.number,
  }),
}
var _default = (exports.default = Popup)
