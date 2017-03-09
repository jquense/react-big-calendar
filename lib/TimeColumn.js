'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _propTypes = require('./utils/propTypes');

var _BackgroundWrapper = require('./BackgroundWrapper');

var _BackgroundWrapper2 = _interopRequireDefault(_BackgroundWrapper);

var _TimeSlotGroup = require('./TimeSlotGroup');

var _TimeSlotGroup2 = _interopRequireDefault(_TimeSlotGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeColumn = function (_Component) {
  _inherits(TimeColumn, _Component);

  function TimeColumn() {
    _classCallCheck(this, TimeColumn);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TimeColumn.prototype.renderTimeSliceGroup = function renderTimeSliceGroup(key, isNow, date) {
    var _props = this.props,
        dayWrapperComponent = _props.dayWrapperComponent,
        timeslots = _props.timeslots,
        showLabels = _props.showLabels,
        step = _props.step,
        timeGutterFormat = _props.timeGutterFormat,
        culture = _props.culture,
        groupHeight = _props.groupHeight;


    return _react2.default.createElement(_TimeSlotGroup2.default, {
      key: key,
      isNow: isNow,
      value: date,
      step: step,
      culture: culture,
      timeslots: timeslots,
      showLabels: showLabels,
      timeGutterFormat: timeGutterFormat,
      dayWrapperComponent: dayWrapperComponent,
      height: groupHeight
    });
  };

  TimeColumn.prototype.render = function render() {
    var _props2 = this.props,
        className = _props2.className,
        children = _props2.children,
        style = _props2.style,
        now = _props2.now,
        min = _props2.min,
        max = _props2.max,
        step = _props2.step,
        timeslots = _props2.timeslots,
        isMultiGrid = _props2.isMultiGrid;

    var totalMin = _dates2.default.diff(min, max, 'minutes');
    var numGroups = Math.ceil(totalMin / (step * timeslots));
    var renderedSlots = [];
    var groupLengthInMinutes = step * timeslots;

    var date = min;
    var next = date;
    var isNow = false;

    for (var i = 0; i < numGroups; i++) {
      isNow = _dates2.default.inRange(now, date, _dates2.default.add(next, groupLengthInMinutes - 1, 'minutes'), 'minutes');

      next = _dates2.default.add(date, groupLengthInMinutes, 'minutes');
      renderedSlots.push(this.renderTimeSliceGroup(i, isNow, date));

      date = next;
    }

    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(className, 'rbc-time-column'),
        style: style
      },
      isMultiGrid ? children : renderedSlots,
      isMultiGrid ? renderedSlots : children
    );
  };

  return TimeColumn;
}(_react.Component);

TimeColumn.propTypes = {
  step: _react.PropTypes.number.isRequired,
  culture: _react.PropTypes.string,
  timeslots: _react.PropTypes.number.isRequired,
  now: _react.PropTypes.instanceOf(Date).isRequired,
  min: _react.PropTypes.instanceOf(Date).isRequired,
  max: _react.PropTypes.instanceOf(Date).isRequired,
  showLabels: _react.PropTypes.bool,
  timeGutterFormat: _react.PropTypes.string,
  type: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string,
  groupHeight: _react.PropTypes.number,
  dayWrapperComponent: _propTypes.elementType,

  // internal prop used to make slight changes in rendering
  isMultiGrid: _react.PropTypes.bool
};
TimeColumn.defaultProps = {
  step: 30,
  timeslots: 2,
  showLabels: false,
  type: 'day',
  className: '',
  dayWrapperComponent: _BackgroundWrapper2.default,

  isMultiGrid: false
};
exports.default = TimeColumn;
module.exports = exports['default'];