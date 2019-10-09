'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _clsx = _interopRequireDefault(require('clsx'))

var _constants = require('./utils/constants')

var Toolbar =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(Toolbar, _React$Component)

    function Toolbar() {
      var _this

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key]
      }

      _this =
        _React$Component.call.apply(_React$Component, [this].concat(args)) ||
        this

      _this.navigate = function(action) {
        _this.props.onNavigate(action)
      }

      _this.view = function(view) {
        _this.props.onView(view)
      }

      return _this
    }

    var _proto = Toolbar.prototype

    _proto.render = function render() {
      var _this$props = this.props,
        messages = _this$props.localizer.messages,
        label = _this$props.label
      return _react.default.createElement(
        'div',
        {
          className: 'rbc-toolbar',
        },
        _react.default.createElement(
          'span',
          {
            className: 'rbc-btn-group',
          },
          _react.default.createElement(
            'button',
            {
              type: 'button',
              onClick: this.navigate.bind(null, _constants.navigate.TODAY),
            },
            messages.today
          ),
          _react.default.createElement(
            'button',
            {
              type: 'button',
              onClick: this.navigate.bind(null, _constants.navigate.PREVIOUS),
            },
            messages.previous
          ),
          _react.default.createElement(
            'button',
            {
              type: 'button',
              onClick: this.navigate.bind(null, _constants.navigate.NEXT),
            },
            messages.next
          )
        ),
        _react.default.createElement(
          'span',
          {
            className: 'rbc-toolbar-label',
          },
          label
        ),
        _react.default.createElement(
          'span',
          {
            className: 'rbc-btn-group',
          },
          this.viewNamesGroup(messages)
        )
      )
    }

    _proto.viewNamesGroup = function viewNamesGroup(messages) {
      var _this2 = this

      var viewNames = this.props.views
      var view = this.props.view

      if (viewNames.length > 1) {
        return viewNames.map(function(name) {
          return _react.default.createElement(
            'button',
            {
              type: 'button',
              key: name,
              className: (0, _clsx.default)({
                'rbc-active': view === name,
              }),
              onClick: _this2.view.bind(null, name),
            },
            messages[name]
          )
        })
      }
    }

    return Toolbar
  })(_react.default.Component)

Toolbar.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        view: _propTypes.default.string.isRequired,
        views: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
        label: _propTypes.default.node.isRequired,
        localizer: _propTypes.default.object,
        onNavigate: _propTypes.default.func.isRequired,
        onView: _propTypes.default.func.isRequired,
      }
    : {}
var _default = Toolbar
exports.default = _default
module.exports = exports['default']
