'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EventRowMixin = require('./EventRowMixin');

var _EventRowMixin2 = _interopRequireDefault(_EventRowMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventRow = _react2.default.createClass({

  displayName: 'EventRow',

  propTypes: {
    segments: _react2.default.PropTypes.array
  },

  mixins: [_EventRowMixin2.default],

  render: function render() {
    var _this = this;

    var segments = this.props.segments;


    var lastEnd = 1;

    return _react2.default.createElement(
      'div',
      { className: 'rbc-row' },
      segments.reduce(function (row, _ref, li) {
        var event = _ref.event;
        var left = _ref.left;
        var right = _ref.right;
        var span = _ref.span;

        var key = '_lvl_' + li;
        var gap = left - lastEnd;

        var content = _this.renderEvent(event);

        if (gap) row.push(_this.renderSpan(gap, key + '_gap'));

        row.push(_this.renderSpan(span, key, content));

        lastEnd = right + 1;

        return row;
      }, [])
    );
  }
});

exports.default = EventRow;
module.exports = exports['default'];