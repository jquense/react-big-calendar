"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _addClass = _interopRequireDefault(require("dom-helpers/addClass"));

var _removeClass = _interopRequireDefault(require("dom-helpers/removeClass"));

var _width = _interopRequireDefault(require("dom-helpers/width"));

var _scrollbarSize = _interopRequireDefault(require("dom-helpers/scrollbarSize"));

var dates = _interopRequireWildcard(require("./utils/dates"));

var _constants = require("./utils/constants");

var _eventLevels = require("./utils/eventLevels");

var _selection = require("./utils/selection");

var Agenda =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Agenda, _React$Component);

  function Agenda(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.renderDay = function (day, events, dayKey) {
      var _this$props = _this.props,
          selected = _this$props.selected,
          getters = _this$props.getters,
          accessors = _this$props.accessors,
          localizer = _this$props.localizer,
          _this$props$component = _this$props.components,
          Event = _this$props$component.event,
          AgendaDate = _this$props$component.date;
      events = events.filter(function (e) {
        return (0, _eventLevels.inRange)(e, dates.startOf(day, 'day'), dates.endOf(day, 'day'), accessors);
      });
      return events.map(function (event, idx) {
        var title = accessors.title(event);
        var end = accessors.end(event);
        var start = accessors.start(event);
        var userProps = getters.eventProp(event, start, end, (0, _selection.isSelected)(event, selected));
        var dateLabel = idx === 0 && localizer.format(day, 'agendaDateFormat');
        var first = idx === 0 ? _react.default.createElement("td", {
          rowSpan: events.length,
          className: "rbc-agenda-date-cell"
        }, AgendaDate ? _react.default.createElement(AgendaDate, {
          day: day,
          label: dateLabel
        }) : dateLabel) : false;
        return _react.default.createElement("tr", {
          key: dayKey + '_' + idx,
          className: userProps.className,
          style: userProps.style
        }, first, _react.default.createElement("td", {
          className: "rbc-agenda-time-cell"
        }, _this.timeRangeLabel(day, event)), _react.default.createElement("td", {
          className: "rbc-agenda-event-cell"
        }, Event ? _react.default.createElement(Event, {
          event: event,
          title: title
        }) : title));
      }, []);
    };

    _this.timeRangeLabel = function (day, event) {
      var _this$props2 = _this.props,
          accessors = _this$props2.accessors,
          localizer = _this$props2.localizer,
          components = _this$props2.components;
      var labelClass = '',
          TimeComponent = components.time,
          label = localizer.messages.allDay;
      var end = accessors.end(event);
      var start = accessors.start(event);

      if (!accessors.allDay(event)) {
        if (dates.eq(start, end)) {
          label = localizer.format(start, 'agendaTimeFormat');
        } else if (dates.eq(start, end, 'day')) {
          label = localizer.format({
            start: start,
            end: end
          }, 'agendaTimeRangeFormat');
        } else if (dates.eq(day, start, 'day')) {
          label = localizer.format(start, 'agendaTimeFormat');
        } else if (dates.eq(day, end, 'day')) {
          label = localizer.format(end, 'agendaTimeFormat');
        }
      }

      if (dates.gt(day, start, 'day')) labelClass = 'rbc-continues-prior';
      if (dates.lt(day, end, 'day')) labelClass += ' rbc-continues-after';
      return _react.default.createElement("span", {
        className: labelClass.trim()
      }, TimeComponent ? _react.default.createElement(TimeComponent, {
        event: event,
        day: day,
        label: label
      }) : label);
    };

    _this._adjustHeader = function () {
      if (!_this.tbodyRef.current) return;
      var header = _this.headerRef.current;
      var firstRow = _this.tbodyRef.current.firstChild;
      if (!firstRow) return;
      var isOverflowing = _this.contentRef.current.scrollHeight > _this.contentRef.current.clientHeight;
      var widths = _this._widths || [];
      _this._widths = [(0, _width.default)(firstRow.children[0]), (0, _width.default)(firstRow.children[1])];

      if (widths[0] !== _this._widths[0] || widths[1] !== _this._widths[1]) {
        _this.dateColRef.current.style.width = _this._widths[0] + 'px';
        _this.timeColRef.current.style.width = _this._widths[1] + 'px';
      }

      if (isOverflowing) {
        (0, _addClass.default)(header, 'rbc-header-overflowing');
        header.style.marginRight = (0, _scrollbarSize.default)() + 'px';
      } else {
        (0, _removeClass.default)(header, 'rbc-header-overflowing');
      }
    };

    _this.headerRef = _react.default.createRef();
    _this.dateColRef = _react.default.createRef();
    _this.timeColRef = _react.default.createRef();
    _this.contentRef = _react.default.createRef();
    _this.tbodyRef = _react.default.createRef();
    return _this;
  }

  var _proto = Agenda.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._adjustHeader();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this._adjustHeader();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        length = _this$props3.length,
        date = _this$props3.date,
        events = _this$props3.events,
        accessors = _this$props3.accessors,
        localizer = _this$props3.localizer;
    var messages = localizer.messages;
    var end = dates.add(date, length, 'day');
    var range = dates.range(date, end, 'day');
    events = events.filter(function (event) {
      return (0, _eventLevels.inRange)(event, date, end, accessors);
    });
    events.sort(function (a, b) {
      return +accessors.start(a) - +accessors.start(b);
    });
    return _react.default.createElement("div", {
      className: "rbc-agenda-view"
    }, events.length !== 0 ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("table", {
      ref: this.headerRef,
      className: "rbc-agenda-table"
    }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("th", {
      className: "rbc-header",
      ref: this.dateColRef
    }, messages.date), _react.default.createElement("th", {
      className: "rbc-header",
      ref: this.timeColRef
    }, messages.time), _react.default.createElement("th", {
      className: "rbc-header"
    }, messages.event)))), _react.default.createElement("div", {
      className: "rbc-agenda-content",
      ref: this.contentRef
    }, _react.default.createElement("table", {
      className: "rbc-agenda-table"
    }, _react.default.createElement("tbody", {
      ref: this.tbodyRef
    }, range.map(function (day, idx) {
      return _this2.renderDay(day, events, idx);
    }))))) : _react.default.createElement("span", {
      className: "rbc-agenda-empty"
    }, messages.noEventsInRange));
  };

  return Agenda;
}(_react.default.Component);

Agenda.propTypes = process.env.NODE_ENV !== "production" ? {
  events: _propTypes.default.array,
  date: _propTypes.default.instanceOf(Date),
  length: _propTypes.default.number.isRequired,
  selected: _propTypes.default.object,
  accessors: _propTypes.default.object.isRequired,
  components: _propTypes.default.object.isRequired,
  getters: _propTypes.default.object.isRequired,
  localizer: _propTypes.default.object.isRequired
} : {};
Agenda.defaultProps = {
  length: 30
};

Agenda.range = function (start, _ref) {
  var _ref$length = _ref.length,
      length = _ref$length === void 0 ? Agenda.defaultProps.length : _ref$length;
  var end = dates.add(start, length, 'day');
  return {
    start: start,
    end: end
  };
};

Agenda.navigate = function (date, action, _ref2) {
  var _ref2$length = _ref2.length,
      length = _ref2$length === void 0 ? Agenda.defaultProps.length : _ref2$length;

  switch (action) {
    case _constants.navigate.PREVIOUS:
      return dates.add(date, -length, 'day');

    case _constants.navigate.NEXT:
      return dates.add(date, length, 'day');

    default:
      return date;
  }
};

Agenda.title = function (start, _ref3) {
  var _ref3$length = _ref3.length,
      length = _ref3$length === void 0 ? Agenda.defaultProps.length : _ref3$length,
      localizer = _ref3.localizer;
  var end = dates.add(start, length, 'day');
  return localizer.format({
    start: start,
    end: end
  }, 'agendaHeaderFormat');
};

var _default = Agenda;
exports.default = _default;
module.exports = exports["default"];