'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.set = set;
exports.result = result;
exports.default = messages;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultMessages = {
  date: 'Date',
  time: 'Time',
  event: 'Event',
  allDay: 'all day',
  week: 'week',
  day: 'day',
  month: 'month',
  previous: 'back',
  next: 'next',
  yesterday: 'yesterday',
  tomorrow: 'tomorrow',
  today: 'today',
  agenda: 'agenda',

  showMore: function showMore(total) {
    return '+' + total + ' more';
  }
};

function set(key, msg) {
  (0, _invariant2.default)(messages.hasOwnProperty(key), 'The message key: "' + key + '" is not a valid message name. ' + ('valid keys are: ' + Object.keys(messages).join(', ')));

  messages[key] = msg;
}

function result(msg) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return typeof msg === 'function' ? msg(args) : msg;
}

function messages(msgs) {
  return _extends({}, defaultMessages, msgs);
}