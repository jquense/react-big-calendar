'use strict';

exports.__esModule = true;
exports.views = exports.dateFormat = exports.accessor = exports.eventComponent = exports.elementType = undefined;

var _react = require('react');

var _localizer = require('../localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _elementType = require('react-prop-types/lib/elementType');

var _elementType2 = _interopRequireDefault(_elementType);

var _all = require('react-prop-types/lib/all');

var _all2 = _interopRequireDefault(_all);

var _constants = require('./constants');

var _common = require('react-prop-types/lib/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.elementType = _elementType2.default;
var eventComponent = exports.eventComponent = _react.PropTypes.oneOfType([_elementType2.default, _react.PropTypes.shape({
  month: _elementType2.default,
  week: _elementType2.default,
  day: _elementType2.default,
  agenda: _elementType2.default
})]);

var viewNames = Object.keys(_constants.views).map(function (k) {
  return _constants.views[k];
});

var accessor = exports.accessor = _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]);

var dateFormat = exports.dateFormat = (0, _common.createChainableTypeChecker)(function () {
  return _localizer2.default.propType && _localizer2.default.propType.apply(_localizer2.default, arguments);
});

var views = exports.views = _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.oneOf(viewNames)), (0, _all2.default)([_react.PropTypes.object, function (props, name, component) {
  var prop = props[name],
      err = void 0;

  Object.keys(prop).every(function (key) {
    var isBuiltinView = viewNames.indexOf(key) !== -1 && typeof prop[key] === 'boolean';

    return isBuiltinView || !(err = (0, _elementType2.default)(prop, key, component));
  });

  return err || null;
}])]);