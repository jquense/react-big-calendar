'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _messages = require('./utils/messages');

var _messages2 = _interopRequireDefault(_messages);

var _constants = require('./utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar() {
    var _temp, _this, _ret;

    _classCallCheck(this, Toolbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.navigate = function (action) {
      _this.props.onNavigate(action);
    }, _this.view = function (view) {
      _this.props.onViewChange(view);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Toolbar.prototype.render = function render() {
    var _props = this.props,
        messages = _props.messages,
        label = _props.label;


    messages = (0, _messages2.default)(messages);

    return _react2.default.createElement(
      'div',
      { className: 'rbc-toolbar' },
      _react2.default.createElement(
        'span',
        { className: 'rbc-btn-group' },
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            onClick: this.navigate.bind(null, _constants.navigate.TODAY)
          },
          messages.today
        ),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            onClick: this.navigate.bind(null, _constants.navigate.PREVIOUS)
          },
          messages.previous
        ),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            onClick: this.navigate.bind(null, _constants.navigate.NEXT)
          },
          messages.next
        )
      ),
      _react2.default.createElement(
        'span',
        { className: 'rbc-toolbar-label' },
        label
      ),
      _react2.default.createElement(
        'span',
        { className: 'rbc-btn-group' },
        this.viewNamesGroup(messages)
      )
    );
  };

  Toolbar.prototype.viewNamesGroup = function viewNamesGroup(messages) {
    var _this2 = this;

    var viewNames = this.props.views;
    var view = this.props.view;

    if (viewNames.length > 1) {
      return viewNames.map(function (name) {
        return _react2.default.createElement(
          'button',
          { type: 'button', key: name,
            className: (0, _classnames2.default)({ 'rbc-active': view === name }),
            onClick: _this2.view.bind(null, name)
          },
          messages[name]
        );
      });
    }
  };

  return Toolbar;
}(_react2.default.Component);

Toolbar.propTypes = {
  view: _propTypes2.default.string.isRequired,
  views: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  label: _propTypes2.default.node.isRequired,
  messages: _propTypes2.default.object,
  onNavigate: _propTypes2.default.func.isRequired,
  onViewChange: _propTypes2.default.func.isRequired
};
exports.default = Toolbar;