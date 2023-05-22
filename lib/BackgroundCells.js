"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _clsx = _interopRequireDefault(require("clsx"));

var _helpers = require("./utils/helpers");

var _selection = require("./utils/selection");

var _Selection = _interopRequireWildcard(require("./Selection"));

var BackgroundCells = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(BackgroundCells, _React$Component);

  var _super = (0, _createSuper2.default)(BackgroundCells);

  function BackgroundCells(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, BackgroundCells);
    _this = _super.call(this, props, context);
    _this.state = {
      selecting: false
    };
    return _this;
  }

  (0, _createClass2.default)(BackgroundCells, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.selectable && this._selectable();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._teardownSelectable();
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.selectable && !this.props.selectable) this._selectable();
      if (!nextProps.selectable && this.props.selectable) this._teardownSelectable();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          range = _this$props.range,
          getNow = _this$props.getNow,
          getters = _this$props.getters,
          currentDate = _this$props.date,
          Wrapper = _this$props.components.dateCellWrapper,
          localizer = _this$props.localizer;
      var _this$state = this.state,
          selecting = _this$state.selecting,
          startIdx = _this$state.startIdx,
          endIdx = _this$state.endIdx;
      var current = getNow();
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "rbc-row-bg"
      }, range.map(function (date, index) {
        var selected = selecting && index >= startIdx && index <= endIdx;

        var _getters$dayProp = getters.dayProp(date),
            className = _getters$dayProp.className,
            style = _getters$dayProp.style;

        return /*#__PURE__*/_react.default.createElement(Wrapper, {
          key: index,
          value: date,
          range: range
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: style,
          className: (0, _clsx.default)('rbc-day-bg', className, selected && 'rbc-selected-cell', localizer.isSameDate(date, current) && 'rbc-today', currentDate && localizer.neq(currentDate, date, 'month') && 'rbc-off-range-bg')
        }));
      }));
    }
  }, {
    key: "_selectable",
    value: function _selectable() {
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
        _this2._selectSlot((0, _objectSpread2.default)((0, _objectSpread2.default)({}, _this2.state), {}, {
          action: 'select',
          bounds: bounds
        }));

        _this2._initial = {};

        _this2.setState({
          selecting: false
        });

        (0, _helpers.notify)(_this2.props.onSelectEnd, [_this2.state]);
      });
    }
  }, {
    key: "_teardownSelectable",
    value: function _teardownSelectable() {
      if (!this._selector) return;

      this._selector.teardown();

      this._selector = null;
    }
  }, {
    key: "_selectSlot",
    value: function _selectSlot(_ref) {
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
        box: box,
        resourceId: this.props.resourceId
      });
    }
  }]);
  return BackgroundCells;
}(_react.default.Component);

var _default = BackgroundCells;
exports.default = _default;