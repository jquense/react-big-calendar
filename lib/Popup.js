'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _offset = _interopRequireDefault(require('dom-helpers/offset'))

var _scrollTop = _interopRequireDefault(require('dom-helpers/scrollTop'))

var _scrollLeft = _interopRequireDefault(require('dom-helpers/scrollLeft'))

var dates = _interopRequireWildcard(require('./utils/dates'))

var _EventCell = _interopRequireDefault(require('./EventCell'))

var _selection = require('./utils/selection')

var Popup =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(Popup, _React$Component)

    function Popup() {
      return _React$Component.apply(this, arguments) || this
    }

    var _proto = Popup.prototype

    _proto.componentDidMount = function componentDidMount() {
      var _this$props = this.props,
        _this$props$popupOffs = _this$props.popupOffset,
        popupOffset =
          _this$props$popupOffs === void 0 ? 5 : _this$props$popupOffs,
        popperRef = _this$props.popperRef,
        _getOffset = (0, _offset.default)(popperRef.current),
        top = _getOffset.top,
        left = _getOffset.left,
        width = _getOffset.width,
        height = _getOffset.height,
        viewBottom = window.innerHeight + (0, _scrollTop.default)(window),
        viewRight = window.innerWidth + (0, _scrollLeft.default)(window),
        bottom = top + height,
        right = left + width

      if (bottom > viewBottom || right > viewRight) {
        var topOffset, leftOffset
        if (bottom > viewBottom)
          topOffset = bottom - viewBottom + (popupOffset.y || +popupOffset || 0)
        if (right > viewRight)
          leftOffset = right - viewRight + (popupOffset.x || +popupOffset || 0)
        this.setState({
          topOffset: topOffset,
          leftOffset: leftOffset,
        }) //eslint-disable-line
      }
    }

    _proto.render = function render() {
      var _this = this

      var _this$props2 = this.props,
        events = _this$props2.events,
        selected = _this$props2.selected,
        getters = _this$props2.getters,
        accessors = _this$props2.accessors,
        components = _this$props2.components,
        onSelect = _this$props2.onSelect,
        onDoubleClick = _this$props2.onDoubleClick,
        onKeyPress = _this$props2.onKeyPress,
        slotStart = _this$props2.slotStart,
        slotEnd = _this$props2.slotEnd,
        localizer = _this$props2.localizer,
        popperRef = _this$props2.popperRef
      var width = this.props.position.width,
        topOffset = (this.state || {}).topOffset || 0,
        leftOffset = (this.state || {}).leftOffset || 0
      var style = {
        top: -topOffset,
        left: -leftOffset,
        minWidth: width + width / 2,
      }
      return _react.default.createElement(
        'div',
        {
          style: (0, _extends2.default)({}, this.props.style, style),
          className: 'rbc-overlay',
          ref: popperRef,
        },
        _react.default.createElement(
          'div',
          {
            className: 'rbc-overlay-header',
          },
          localizer.format(slotStart, 'dayHeaderFormat')
        ),
        events.map(function(event, idx) {
          return _react.default.createElement(_EventCell.default, {
            key: idx,
            type: 'popup',
            event: event,
            getters: getters,
            onSelect: onSelect,
            accessors: accessors,
            components: components,
            onDoubleClick: onDoubleClick,
            onKeyPress: onKeyPress,
            continuesPrior: dates.lt(accessors.end(event), slotStart, 'day'),
            continuesAfter: dates.gte(accessors.start(event), slotEnd, 'day'),
            slotStart: slotStart,
            slotEnd: slotEnd,
            selected: (0, _selection.isSelected)(event, selected),
            draggable: true,
            onDragStart: function onDragStart() {
              return _this.props.handleDragStart(event)
            },
            onDragEnd: function onDragEnd() {
              return _this.props.show()
            },
          })
        })
      )
    }

    return Popup
  })(_react.default.Component)

Popup.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        position: _propTypes.default.object,
        popupOffset: _propTypes.default.oneOfType([
          _propTypes.default.number,
          _propTypes.default.shape({
            x: _propTypes.default.number,
            y: _propTypes.default.number,
          }),
        ]),
        events: _propTypes.default.array,
        selected: _propTypes.default.object,
        accessors: _propTypes.default.object.isRequired,
        components: _propTypes.default.object.isRequired,
        getters: _propTypes.default.object.isRequired,
        localizer: _propTypes.default.object.isRequired,
        onSelect: _propTypes.default.func,
        onDoubleClick: _propTypes.default.func,
        onKeyPress: _propTypes.default.func,
        handleDragStart: _propTypes.default.func,
        show: _propTypes.default.func,
        slotStart: _propTypes.default.instanceOf(Date),
        slotEnd: _propTypes.default.number,
        popperRef: _propTypes.default.oneOfType([
          _propTypes.default.func,
          _propTypes.default.shape({
            current: _propTypes.default.Element,
          }),
        ]),
        /**
         * The Overlay component, of react-overlays, creates a ref that is passed to the Popup, and
         * requires proper ref forwarding to be used without error
         */
      }
    : {}

var _default = _react.default.forwardRef(function(props, ref) {
  return _react.default.createElement(
    Popup,
    (0, _extends2.default)(
      {
        popperRef: ref,
      },
      props
    )
  )
})

exports.default = _default
module.exports = exports['default']
