'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _EventCell = _interopRequireDefault(require('./EventCell'))

var _selection = require('./utils/selection')

/* eslint-disable react/prop-types */
var _default = {
  propTypes: {
    slotMetrics: _propTypes.default.object.isRequired,
    selected: _propTypes.default.object,
    isAllDay: _propTypes.default.bool,
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
      components = props.components
    var continuesPrior = slotMetrics.continuesPrior(event)
    var continuesAfter = slotMetrics.continuesAfter(event)
    return _react.default.createElement(_EventCell.default, {
      event: event,
      getters: getters,
      localizer: localizer,
      accessors: accessors,
      components: components,
      onSelect: onSelect,
      onDoubleClick: onDoubleClick,
      continuesPrior: continuesPrior,
      continuesAfter: continuesAfter,
      selected: (0, _selection.isSelected)(event, selected),
    })
  },
  renderSpan: function renderSpan(slots, len, key, content) {
    if (content === void 0) {
      content = ' '
    }

    var per = (Math.abs(len) / slots) * 100 + '%'
    return _react.default.createElement(
      'div',
      {
        key: key,
        className: 'rbc-row-segment', // IE10/11 need max-width. flex-basis doesn't respect box-sizing
        style: {
          WebkitFlexBasis: per,
          flexBasis: per,
          maxWidth: per,
        },
      },
      content
    )
  },
}
exports.default = _default
module.exports = exports['default']
