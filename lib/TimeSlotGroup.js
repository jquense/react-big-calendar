'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TimeSlot = require('./TimeSlot');

var _TimeSlot2 = _interopRequireDefault(_TimeSlot);

var _dates = require('./utils/dates.js');

var _dates2 = _interopRequireDefault(_dates);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _propTypes = require('./utils/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeSlotGroup = function (_Component) {
  _inherits(TimeSlotGroup, _Component);

  function TimeSlotGroup() {
    _classCallCheck(this, TimeSlotGroup);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TimeSlotGroup.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps /* , nextState */) {
    if (this.props.dayWrapperComponent !== nextProps.dayWrapperComponent || this.props.timeslots !== nextProps.timeslots || this.props.step !== nextProps.step ||
    /* highly experimental comment-out, based on the fact that value doesn't seem to be
       used anywhere, even for slot selection events. */
    // date.neq(this.props.value, nextProps.value) ||
    this.props.showLabels !== nextProps.showLabels || this.props.isNow !== nextProps.isNow || this.props.timeGutterFormat !== nextProps.timeGutterFormat || this.props.culture !== nextProps.culture || this.props.height !== nextProps.height) {
      return true;
    }

    return false;
  };

  TimeSlotGroup.prototype.renderSlice = function renderSlice(slotNumber, content, value) {
    var _props = this.props,
        dayWrapperComponent = _props.dayWrapperComponent,
        showLabels = _props.showLabels,
        isNow = _props.isNow,
        culture = _props.culture;

    return _react2.default.createElement(_TimeSlot2.default, {
      key: slotNumber,
      dayWrapperComponent: dayWrapperComponent,
      showLabel: showLabels,
      content: content,
      culture: culture,
      isNow: isNow,
      value: value
    });
  };

  TimeSlotGroup.prototype.renderSlices = function renderSlices() {
    var ret = [];
    var sliceLength = this.props.step;
    var sliceValue = this.props.value;
    var stepInterval = 0;
    for (var i = 0; i < this.props.timeslots; i++) {
      var content = void 0;
      if (i === 0) {
        content = _localizer2.default.format(sliceValue, this.props.timeGutterFormat, this.props.culture);
      } else {
        content = ':' + stepInterval;
      }
      ret.push(this.renderSlice(i, content, sliceValue));
      sliceValue = _dates2.default.add(sliceValue, sliceLength, 'minutes');
      stepInterval += this.props.step;
    }
    return ret;
  };

  TimeSlotGroup.prototype.render = function render() {
    // note that style is currently not passed to this component, but we're handling
    // height so it doesn't break styling if style IS passed in.
    var _props2 = this.props,
        style = _props2.style,
        height = _props2.height;


    var groupStyle = _extends({}, style);
    if (height) {
      groupStyle.minHeight = height;
    }

    return _react2.default.createElement(
      'div',
      { className: 'rbc-timeslot-group', style: groupStyle },
      this.renderSlices()
    );
  };

  return TimeSlotGroup;
}(_react.Component);

TimeSlotGroup.propTypes = {
  dayWrapperComponent: _propTypes.elementType,
  timeslots: _react.PropTypes.number.isRequired,
  step: _react.PropTypes.number.isRequired,
  value: _react.PropTypes.instanceOf(Date).isRequired,
  showLabels: _react.PropTypes.bool,
  isNow: _react.PropTypes.bool,
  timeGutterFormat: _react.PropTypes.string,
  culture: _react.PropTypes.string,
  height: _react.PropTypes.number
};
TimeSlotGroup.defaultProps = {
  timeslots: 2,
  step: 30,
  isNow: false,
  showLabels: false
};
exports.default = TimeSlotGroup;
module.exports = exports['default'];