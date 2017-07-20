'use strict';

exports.__esModule = true;
exports.set = set;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var localePropType = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]);

function _format(localizer, formatter, value, format, culture) {
  var result = typeof format === 'function' ? format(value, culture, localizer) : formatter.call(localizer, value, format, culture);

  !(result == null || typeof result === 'string') ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '`localizer format(..)` must return a string, null, or undefined') : (0, _invariant2.default)(false) : void 0;

  return result;
}

var DateLocalizer = function DateLocalizer(spec) {
  var _this = this;

  _classCallCheck(this, DateLocalizer);

  !(typeof spec.format === 'function') ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'date localizer `format(..)` must be a function') : (0, _invariant2.default)(false) : void 0;
  !(typeof spec.parse === 'function') ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'date localizer `parse(..)` must be a function') : (0, _invariant2.default)(false) : void 0;
  !(typeof spec.firstOfWeek === 'function') ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'date localizer `firstOfWeek(..)` must be a function') : (0, _invariant2.default)(false) : void 0;

  this.propType = spec.propType || localePropType;

  this.formats = spec.formats;
  this.startOfWeek = spec.firstOfWeek;

  this.format = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _format.apply(undefined, [_this, spec.format].concat(args));
  };

  this.parse = function (value, format, culture) {
    var result = spec.parse.call(_this, value, format, culture);

    !(result == null || result instanceof Date && !isNaN(result.getTime())) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'date localizer `parse(..)` must return a valid Date, null, or undefined') : (0, _invariant2.default)(false) : void 0;

    return result;
  };
};

var localizer = {
  parse: error,
  format: error,
  startOfWeek: error
};

function set(newLocalizer) {
  if (!newLocalizer.__isLocalizer__) {
    newLocalizer = new DateLocalizer(newLocalizer);
    newLocalizer.__isLocalizer__ = true;
  }

  localizer = newLocalizer;
  return localizer;
}

var exp = {
  parse: function parse() {
    var _localizer;

    return (_localizer = localizer).parse.apply(_localizer, arguments);
  },
  format: function format() {
    var _localizer2;

    return (_localizer2 = localizer).format.apply(_localizer2, arguments);
  },
  startOfWeek: function startOfWeek() {
    var _localizer3;

    return (_localizer3 = localizer).startOfWeek.apply(_localizer3, arguments);
  }
};

exports.default = exp;


function error() {
  throw new Error('You have not selected a localization strategy for Big Calendar. ' + 'Please use either of the two included.');
}