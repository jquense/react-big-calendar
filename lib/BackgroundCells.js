"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _clsx = _interopRequireDefault(require("clsx"));

var dates = _interopRequireWildcard(require("./utils/dates"));

var _helpers = require("./utils/helpers");

var _selection = require("./utils/selection");

var _Selection = _interopRequireWildcard(require("./Selection"));

var BackgroundCells =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(BackgroundCells, _React$Component);

  function BackgroundCells(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.state = {
      selecting: false
    };
    return _this;
  }

  var _proto = BackgroundCells.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.selectable && this._selectable();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this._teardownSelectable();
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable) this._selectable();
    if (!nextProps.selectable && this.props.selectable) this._teardownSelectable();
  };

  _proto.render = function render() {
    var _this$props = this.props,
        range = _this$props.range,
        getNow = _this$props.getNow,
        getters = _this$props.getters,
        currentDate = _this$props.date,
        Wrapper = _this$props.components.dateCellWrapper;
    var _this$state = this.state,
        selecting = _this$state.selecting,
        startIdx = _this$state.startIdx,
        endIdx = _this$state.endIdx;
    var current = getNow();
    return _react.default.createElement("div", {
      className: "rbc-row-bg"
    }, range.map(function (date, index) {
      var selected = selecting && index >= startIdx && index <= endIdx;

      var _getters$dayProp = getters.dayProp(date),
          className = _getters$dayProp.className,
          style = _getters$dayProp.style;

      return _react.default.createElement(Wrapper, {
        key: index,
        value: date,
        range: range
      }, _react.default.createElement("div", {
        style: style,
        className: (0, _clsx.default)('rbc-day-bg', className, selected && 'rbc-selected-cell', dates.eq(date, current, 'day') && 'rbc-today', currentDate && dates.month(currentDate) !== dates.month(date) && 'rbc-off-range-bg')
      }));
    }));
  };

  _proto._selectable = function _selectable() {
    var _this2 = this;

    var node = (0, _reactDom.findDOMNode)(this);
    var selector = this._selector = new _Selection.default(this.props.container, {
      longPressThreshold: this.props.longPressThreshold
    });

    var selectorClicksHandler = function selectorClicksHandler(point, actionType) {
      if (!(0, _Selection.isEvent)((0, _reactDom.findDOMNode)(_this2), point)) {
        var rowBox = (0, _Selection.getBoundsForNode)(node);
        var _this2$props = _this2.props,
            range = _this2$props.range,
            rtl = _this2$props.rtl;

        if ((0, _selection.pointInBox)(rowBox, point)) {
          var currentCell = (0, _selection.getSlotAtX)(rowBox, point.x, rtl, range.length);

          _this2._selectSlot({
            startIdx: currentCell,
            endIdx: currentCell,
            action: actionType,
            box: point
          });
        }
      }

      _this2._initial = {};

      _this2.setState({
        selecting: false
      });
    };

    selector.on('selecting', function (box) {
      var _this2$props2 = _this2.props,
          range = _this2$props2.range,
          rtl = _this2$props2.rtl;
      var startIdx = -1;
      var endIdx = -1;

      if (!_this2.state.selecting) {
        (0, _helpers.notify)(_this2.props.onSelectStart, [box]);
        _this2._initial = {
          x: box.x,
          y: box.y
        };
      }

      if (selector.isSelected(node)) {
        var nodeBox = (0, _Selection.getBoundsForNode)(node);

        var _dateCellSelection = (0, _selection.dateCellSelection)(_this2._initial, nodeBox, box, range.length, rtl);

        startIdx = _dateCellSelection.startIdx;
        endIdx = _dateCellSelection.endIdx;
      }

      _this2.setState({
        selecting: true,
        startIdx: startIdx,
        endIdx: endIdx
      });
    });
    selector.on('beforeSelect', function (box) {
      if (_this2.props.selectable !== 'ignoreEvents') return;
      return !(0, _Selection.isEvent)((0, _reactDom.findDOMNode)(_this2), box);
    });
    selector.on('click', function (point) {
      return selectorClicksHandler(point, 'click');
    });
    selector.on('doubleClick', function (point) {
      return selectorClicksHandler(point, 'doubleClick');
    });
    selector.on('select', function (bounds) {
      _this2._selectSlot((0, _extends2.default)({}, _this2.state, {
        action: 'select',
        bounds: bounds
      }));

      _this2._initial = {};

      _this2.setState({
        selecting: false
      });

      (0, _helpers.notify)(_this2.props.onSelectEnd, [_this2.state]);
    });
  };

  _proto._teardownSelectable = function _teardownSelectable() {
    if (!this._selector) return;

    this._selector.teardown();

    this._selector = null;
  };

  _proto._selectSlot = function _selectSlot(_ref) {
    var endIdx = _ref.endIdx,
        startIdx = _ref.startIdx,
        action = _ref.action,
        bounds = _ref.bounds,
        box = _ref.box;
    if (endIdx !== -1 && startIdx !== -1) this.props.onSelectSlot && this.props.onSelectSlot({
      start: startIdx,
      end: endIdx,
      action: action,
      bounds: bounds,
      box: box
    });
  };

  return BackgroundCells;
}(_react.default.Component);

BackgroundCells.propTypes = process.env.NODE_ENV !== "production" ? {
  date: _propTypes.default.instanceOf(Date),
  getNow: _propTypes.default.func.isRequired,
  getters: _propTypes.default.object.isRequired,
  components: _propTypes.default.object.isRequired,
  container: _propTypes.default.func,
  dayPropGetter: _propTypes.default.func,
  selectable: _propTypes.default.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: _propTypes.default.number,
  onSelectSlot: _propTypes.default.func.isRequired,
  onSelectEnd: _propTypes.default.func,
  onSelectStart: _propTypes.default.func,
  range: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  rtl: _propTypes.default.bool,
  type: _propTypes.default.string
} : {};
var _default = BackgroundCells;
exports.default = _default;
module.exports = exports["default"];