'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _messages = require('./utils/messages');

var _messages2 = _interopRequireDefault(_messages);

var _constants = require('./utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toolbar = _react2.default.createClass({
  displayName: 'Toolbar',
  render: function render() {
    var _props = this.props;
    var messages = _props.messages;
    var label = _props.label;


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
  },
  navigate: function navigate(action) {
    this.props.onNavigate(action);
  },
  view: function view(_view) {
    this.props.onViewChange(_view);
  },
  viewNamesGroup: function viewNamesGroup(messages) {
    var _this = this;

    var viewNames = this.props.views;
    var view = this.props.view;

    if (viewNames.length > 1) {
      return viewNames.map(function (name) {
        return _react2.default.createElement(
          'button',
          { type: 'button', key: name,
            className: (0, _classnames2.default)({ 'rbc-active': view === name }),
            onClick: _this.view.bind(null, name)
          },
          messages[name]
        );
      });
    }
  }
});

exports.default = Toolbar;
module.exports = exports['default'];