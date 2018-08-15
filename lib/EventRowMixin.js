'use strict'

exports.__esModule = true

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _EventCell = require('./EventCell')

var _EventCell2 = _interopRequireDefault(_EventCell)

var _selection = require('./utils/selection')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

/* eslint-disable react/prop-types */
exports.default = {
  propTypes: {
    slotMetrics: _propTypes2.default.object.isRequired,

    selected: _propTypes2.default.object,
    isAllDay: _propTypes2.default.bool,

    accessors: _propTypes2.default.object.isRequired,
    localizer: _propTypes2.default.object.isRequired,
    components: _propTypes2.default.object.isRequired,
    getters: _propTypes2.default.object.isRequired,

    onSelect: _propTypes2.default.func,
    onDoubleClick: _propTypes2.default.func,
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

    return _react2.default.createElement(_EventCell2.default, {
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
  renderSpan: function renderSpan(slots, len, key) {
    var content =
      arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ' '

    var per = Math.abs(len) / slots * 100 + '%'

    return _react2.default.createElement(
      'div',
      {
        key: key,
        className: 'rbc-row-segment',
        // IE10/11 need max-width. flex-basis doesn't respect box-sizing
        style: { WebkitFlexBasis: per, flexBasis: per, maxWidth: per },
      },
      content
    )
  },
}
module.exports = exports['default']
