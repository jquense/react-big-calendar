'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _clsx = _interopRequireDefault(require('clsx'))

var _constants = require('./utils/constants')

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\Toolbar.js'

class Toolbar extends _react.default.Component {
  constructor() {
    super(...arguments)

    this.navigate = action => {
      this.props.onNavigate(action)
    }

    this.view = view => {
      this.props.onView(view)
    }
  }

  render() {
    var {
      localizer: { messages },
      label,
    } = this.props
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: 'rbc-toolbar',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14,
          columnNumber: 7,
        },
      },
      /*#__PURE__*/ _react.default.createElement(
        'span',
        {
          className: 'rbc-btn-group',
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 15,
            columnNumber: 9,
          },
        },
        /*#__PURE__*/ _react.default.createElement(
          'button',
          {
            type: 'button',
            onClick: this.navigate.bind(null, _constants.navigate.TODAY),
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 16,
              columnNumber: 11,
            },
          },
          messages.today
        ),
        /*#__PURE__*/ _react.default.createElement(
          'button',
          {
            type: 'button',
            onClick: this.navigate.bind(null, _constants.navigate.PREVIOUS),
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 22,
              columnNumber: 11,
            },
          },
          messages.previous
        ),
        /*#__PURE__*/ _react.default.createElement(
          'button',
          {
            type: 'button',
            onClick: this.navigate.bind(null, _constants.navigate.NEXT),
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 28,
              columnNumber: 11,
            },
          },
          messages.next
        )
      ),
      /*#__PURE__*/ _react.default.createElement(
        'span',
        {
          className: 'rbc-toolbar-label',
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 36,
            columnNumber: 9,
          },
        },
        label
      ),
      /*#__PURE__*/ _react.default.createElement(
        'span',
        {
          className: 'rbc-btn-group',
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 38,
            columnNumber: 9,
          },
        },
        this.viewNamesGroup(messages)
      )
    )
  }

  viewNamesGroup(messages) {
    var viewNames = this.props.views
    var view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map(name =>
        /*#__PURE__*/ _react.default.createElement(
          'button',
          {
            type: 'button',
            key: name,
            className: (0, _clsx.default)({
              'rbc-active': view === name,
            }),
            onClick: this.view.bind(null, name),
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 57,
              columnNumber: 9,
            },
          },
          messages[name]
        )
      )
    }
  }
}

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
module.exports = exports.default
