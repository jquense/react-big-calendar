'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventWrapper = _react2.default.createClass({
  displayName: 'EventWrapper',
  render: function render() {
    return this.props.children;
  }
});

exports.default = EventWrapper;
module.exports = exports['default'];