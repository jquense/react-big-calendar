'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var label = _ref.label;

  return _react2.default.createElement(
    'span',
    null,
    label
  );
};

Header.propTypes = {
  label: _react2.default.PropTypes.node
};

exports.default = Header;
module.exports = exports['default'];