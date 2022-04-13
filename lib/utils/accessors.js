"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessor = accessor;
exports.wrapAccessor = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

/**
 * Retrieve via an accessor-like property
 *
 *    accessor(obj, 'name')   // => retrieves obj['name']
 *    accessor(data, func)    // => retrieves func(data)
 *    ... otherwise null
 */
function accessor(data, field) {
  var value = null;
  if (typeof field === 'function') value = field(data);else if (typeof field === 'string' && (0, _typeof2.default)(data) === 'object' && data != null && field in data) value = data[field];
  return value;
}

var wrapAccessor = function wrapAccessor(acc) {
  return function (data) {
    return accessor(data, acc);
  };
};

exports.wrapAccessor = wrapAccessor;