'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _localizer = require('../localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _reactPropTypesLibAll = require('react-prop-types/lib/all');

var _reactPropTypesLibAll2 = _interopRequireDefault(_reactPropTypesLibAll);

var _constants = require('./constants');

var _reactPropTypesLibCommon = require('react-prop-types/lib/common');

exports.elementType = _reactPropTypesLibElementType2['default'];
var eventComponent = _react.PropTypes.oneOfType([_reactPropTypesLibElementType2['default'], _react.PropTypes.shape({
  month: _reactPropTypesLibElementType2['default'],
  week: _reactPropTypesLibElementType2['default'],
  day: _reactPropTypesLibElementType2['default'],
  agenda: _reactPropTypesLibElementType2['default']
})]);

exports.eventComponent = eventComponent;
var viewNames = _react.PropTypes.oneOf(Object.keys(_constants.views).map(function (k) {
  return _constants.views[k];
}));

var accessor = _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]);

exports.accessor = accessor;
var stringOrElement = _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]);

exports.stringOrElement = stringOrElement;
var dateFormat = _reactPropTypesLibCommon.createChainableTypeChecker(function () {
  return _localizer2['default'].propType && _localizer2['default'].propType.apply(_localizer2['default'], arguments);
});

exports.dateFormat = dateFormat;
var views = _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(viewNames), _reactPropTypesLibAll2['default']([_react.PropTypes.object, function (props, name, component) {
  var prop = props[name],
      err = undefined;

  Object.keys(prop).every(function (key) {
    return !(err = _reactPropTypesLibElementType2['default'](prop, key, component));
  });

  return err || null;
}])]);
exports.views = views;