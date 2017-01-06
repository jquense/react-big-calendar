'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _eventLevels = require('./utils/eventLevels');

var _helpers = require('./utils/helpers');

var _selection = require('./utils/selection');

var _Selection = require('./Selection');

var _Selection2 = _interopRequireDefault(_Selection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisplayCells = function (_React$Component) {
  _inherits(DisplayCells, _React$Component);

  function DisplayCells() {
    var _temp, _this, _ret;

    _classCallCheck(this, DisplayCells);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = { selecting: false }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  DisplayCells.prototype.componentDidMount = function componentDidMount() {
    this.props.selectable && this._selectable();
  };

  DisplayCells.prototype.componentWillUnmount = function componentWillUnmount() {
    this._teardownSelectable();
  };

  DisplayCells.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable) this._selectable();
    if (!nextProps.selectable && this.props.selectable) this._teardownSelectable();
  };

  DisplayCells.prototype.render = function render() {
    var slots = this.props.slots;
    var _state = this.state;
    var selecting = _state.selecting;
    var startIdx = _state.startIdx;
    var endIdx = _state.endIdx;


    var children = [];

    for (var i = 0; i < slots; i++) {
      children.push(_react2.default.createElement('div', {
        key: 'bg_' + i,
        style: (0, _eventLevels.segStyle)(1, slots),
        className: (0, _classnames2.default)('rbc-day-bg', {
          'rbc-selected-cell': selecting && i >= startIdx && i <= endIdx
        })
      }));
    }

    return _react2.default.createElement(
      'div',
      { className: 'rbc-row-bg' },
      children
    );
  };

  DisplayCells.prototype._selectable = function _selectable() {
    var _this2 = this;

    var node = (0, _reactDom.findDOMNode)(this);
    var selector = this._selector = new _Selection2.default(this.props.container);

    selector.on('selecting', function (box) {
      var slots = _this2.props.slots;


      var startIdx = -1;
      var endIdx = -1;

      if (!_this2.state.selecting) {
        (0, _helpers.notify)(_this2.props.onSelectStart, [box]);
        _this2._initial = { x: box.x, y: box.y };
      }
      if (selector.isSelected(node)) {
        var nodeBox = (0, _Selection.getBoundsForNode)(node);

        var _dateCellSelection = (0, _selection.dateCellSelection)(_this2._initial, nodeBox, box, slots);

        startIdx = _dateCellSelection.startIdx;
        endIdx = _dateCellSelection.endIdx;
      }

      _this2.setState({
        selecting: true,
        startIdx: startIdx, endIdx: endIdx
      });
    });

    selector.on('click', function (point) {
      var rowBox = (0, _Selection.getBoundsForNode)(node);

      if ((0, _selection.pointInBox)(rowBox, point)) {
        var width = (0, _selection.slotWidth)((0, _Selection.getBoundsForNode)(node), _this2.props.slots);
        var currentCell = (0, _selection.getCellAtX)(rowBox, point.x, width);

        _this2._selectSlot({
          startIdx: currentCell,
          endIdx: currentCell
        });
      }

      _this2._initial = {};
      _this2.setState({ selecting: false });
    });

    selector.on('select', function () {
      _this2._selectSlot(_this2.state);
      _this2._initial = {};
      _this2.setState({ selecting: false });
      (0, _helpers.notify)(_this2.props.onSelectEnd, [_this2.state]);
    });
  };

  DisplayCells.prototype._teardownSelectable = function _teardownSelectable() {
    if (!this._selector) return;
    this._selector.teardown();
    this._selector = null;
  };

  DisplayCells.prototype._selectSlot = function _selectSlot(_ref) {
    var endIdx = _ref.endIdx;
    var startIdx = _ref.startIdx;

    this.props.onSelectSlot && this.props.onSelectSlot({
      start: startIdx, end: endIdx
    });
  };

  return DisplayCells;
}(_react2.default.Component);

DisplayCells.propTypes = {
  selectable: _react2.default.PropTypes.bool,
  onSelect: _react2.default.PropTypes.func,
  slots: _react2.default.PropTypes.number
};
exports.default = DisplayCells;
module.exports = exports['default'];