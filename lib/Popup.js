'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _offset = _interopRequireDefault(require('dom-helpers/offset'))

var _scrollTop = _interopRequireDefault(require('dom-helpers/scrollTop'))

var _scrollLeft = _interopRequireDefault(require('dom-helpers/scrollLeft'))

var dates = _interopRequireWildcard(require('./utils/dates'))

var _EventCell = _interopRequireDefault(require('./EventCell'))

var _selection = require('./utils/selection')

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\Popup.js'

class Popup extends _react.default.Component {
  componentDidMount() {
    var { popupOffset = 5, popperRef } = this.props,
      { top, left, width, height } = (0, _offset.default)(popperRef.current),
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
        topOffset,
        leftOffset,
      }) //eslint-disable-line
    }
  }

  render() {
    var {
      events,
      selected,
      getters,
      accessors,
      components,
      onSelect,
      onDoubleClick,
      onKeyPress,
      slotStart,
      slotEnd,
      localizer,
      popperRef,
    } = this.props
    var { width } = this.props.position,
      topOffset = (this.state || {}).topOffset || 0,
      leftOffset = (this.state || {}).leftOffset || 0
    var style = {
      top: -topOffset,
      left: -leftOffset,
      minWidth: width + width / 2,
    }
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        style: (0, _extends2.default)({}, this.props.style, style),
        className: 'rbc-overlay',
        ref: popperRef,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59,
          columnNumber: 7,
        },
      },
      /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          className: 'rbc-overlay-header',
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 64,
            columnNumber: 9,
          },
        },
        localizer.format(slotStart, 'dayHeaderFormat')
      ),
      events.map((event, idx) =>
        /*#__PURE__*/ _react.default.createElement(_EventCell.default, {
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
          onDragStart: () => this.props.handleDragStart(event),
          onDragEnd: () => this.props.show(),
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 68,
            columnNumber: 11,
          },
        })
      )
    )
  }
}

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
      }
    : {}
/**
 * The Overlay component, of react-overlays, creates a ref that is passed to the Popup, and
 * requires proper ref forwarding to be used without error
 */

var _default = /*#__PURE__*/ _react.default.forwardRef((props, ref) =>
  /*#__PURE__*/ _react.default.createElement(
    Popup,
    (0, _extends2.default)(
      {
        popperRef: ref,
      },
      props,
      {
        __self: void 0,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127,
          columnNumber: 3,
        },
      }
    )
  )
)

exports.default = _default
module.exports = exports.default
