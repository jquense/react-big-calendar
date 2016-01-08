'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsDates = require('./utils/dates');

var _utilsDates2 = _interopRequireDefault(_utilsDates);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var TimeGutter = _react2['default'].createClass({
  displayName: 'TimeGutter',

  propTypes: {
    step: _react2['default'].PropTypes.number.isRequired,
    min: _react2['default'].PropTypes.instanceOf(Date).isRequired,
    max: _react2['default'].PropTypes.instanceOf(Date).isRequired
  },

  render: function render() {
    var _props = this.props;
    var min = _props.min;
    var max = _props.max;
    var step = _props.step;
    var timeGutterFormat = _props.timeGutterFormat;
    var culture = _props.culture;

    var today = new Date();
    var totalMin = _utilsDates2['default'].diff(min, max, 'minutes');
    var numSlots = Math.ceil(totalMin / step);
    var date = min;
    var children = []; //<div key={-1} className='rbc-time-slot rbc-day-header'>&nbsp;</div>

    for (var i = 0; i < numSlots; i++) {
      var isEven = i % 2 === 0;
      var next = _utilsDates2['default'].add(date, step, 'minutes');
      children.push(_react2['default'].createElement(
        'div',
        { key: i,
          className: _classnames2['default']('rbc-time-slot', {
            'rbc-now': _utilsDates2['default'].inRange(today, date, next, 'minutes')
          })
        },
        isEven && _react2['default'].createElement(
          'span',
          null,
          _localizer2['default'].format(date, timeGutterFormat, culture)
        )
      ));

      date = next;
    }

    return _react2['default'].createElement(
      'div',
      { className: 'rbc-time-gutter' },
      children
    );
  }
});

exports['default'] = TimeGutter;
module.exports = exports['default'];