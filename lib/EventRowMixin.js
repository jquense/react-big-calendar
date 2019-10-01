'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _EventCell = _interopRequireDefault(require('./EventCell'))

var _selection = require('./utils/selection')

var _default = {
  propTypes: {
    slotMetrics: _propTypes.default.object.isRequired,
    selected: _propTypes.default.object,
    isAllDay: _propTypes.default.bool,
    isBooking: _propTypes.default.bool,
    accessors: _propTypes.default.object.isRequired,
    localizer: _propTypes.default.object.isRequired,
    components: _propTypes.default.object.isRequired,
    getters: _propTypes.default.object.isRequired,
    onSelect: _propTypes.default.func,
    onDoubleClick: _propTypes.default.func,
  },
  defaultProps: {
    segments: [],
    selected: {},
  },
  renderEvent: function renderEvent(props, event) {
    var selected = props.selected,
      _ = props.isAllDay,
      accessors = props.accessors,
      getters = props.getters,
      onSelect = props.onSelect,
      onDoubleClick = props.onDoubleClick,
      localizer = props.localizer,
      slotMetrics = props.slotMetrics,
      components = props.components,
      isBooking = props.isBooking
    var continuesPrior = slotMetrics.continuesPrior(event)
    var continuesAfter = slotMetrics.continuesAfter(event)
    return _react.default.createElement(_EventCell.default, {
      event: event,
      getters: getters,
      localizer: localizer,
      accessors: accessors,
      isBooking: isBooking,
      components: components,
      onSelect: onSelect,
      onDoubleClick: onDoubleClick,
      continuesPrior: continuesPrior,
      continuesAfter: continuesAfter,
      slotStart: slotMetrics.first,
      slotEnd: slotMetrics.last,
      selected: (0, _selection.isSelected)(event, selected),
    })
  },
  renderSpan: function renderSpan(
    isBooking,
    slots,
    len,
    left,
    right,
    key,
    content
  ) {
    if (content === void 0) {
      content = ' '
    }

    var per,
      mar = 0

    if (isBooking) {
      // if (content !== ' ') {
      //   if (right == 7) {
      //     per = (Math.abs(len) / slots) * 100 - 7 + '%'
      //   } else if (left == 1) {
      //     mar = 30
      //   } else if (len == 1) {
      //     per = (Math.abs(len) / slots) * 100 + '%'
      //   } else {
      //     per = (Math.abs(len) / slots) * 100 + 3 + '%'
      //   }
      // } else {
      //   console.log('no-content', len)
      //   per = (Math.abs(len) / slots) * 100 + 10 + '%'
      // }
      per = (Math.abs(len) / slots) * 100 + '%'
    } else {
      per = (Math.abs(len) / slots) * 100 + '%'
    }

    return _react.default.createElement(
      'div',
      {
        key: key,
        className: 'rbc-row-segment', // IE10/11 need max-width. flex-basis doesn't respect box-sizing
        style: {
          WebkitFlexBasis: per,
          flexBasis: per,
          maxWidth: per,
          marginLeft: mar,
        },
      },
      content
    )
  },
}
exports.default = _default
module.exports = exports['default']
