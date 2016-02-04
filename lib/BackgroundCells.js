'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsEventLevels = require('./utils/eventLevels');

var _utilsHelpers = require('./utils/helpers');

var _utilsSelection = require('./utils/selection');

var _Selection = require('./Selection');

var _Selection2 = _interopRequireDefault(_Selection);

var DisplayCells = (function (_React$Component) {
  _inherits(DisplayCells, _React$Component);

  function DisplayCells() {
    _classCallCheck(this, DisplayCells);

    _React$Component.apply(this, arguments);

    this.state = { selecting: false };
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
      children.push(_react2['default'].createElement('div', {
        key: 'bg_' + i,
        style: _utilsEventLevels.segStyle(1, slots),
        className: _classnames2['default']('rbc-day-bg', {
          'rbc-selected-cell': selecting && i >= startIdx && i <= endIdx
        })
      }));
    }

    return _react2['default'].createElement(
      'div',
      { className: 'rbc-row-bg' },
      children
    );
  };

  DisplayCells.prototype._selectable = function _selectable() {
    var _this = this;

    var node = _reactDom.findDOMNode(this);
    var selector = this._selector = new _Selection2['default'](this.props.container);

    selector.on('selecting', function (box) {
      var slots = _this.props.slots;

      var startIdx = -1;
      var endIdx = -1;

      if (!_this.state.selecting) {
        _utilsHelpers.notify(_this.props.onSelectStart, [box]);
        _this._initial = { x: box.x, y: box.y };
      }
      if (selector.isSelected(node)) {
        var nodeBox = _Selection.getBoundsForNode(node);

        var _dateCellSelection = _utilsSelection.dateCellSelection(_this._initial, nodeBox, box, slots);

        startIdx = _dateCellSelection.startIdx;
        endIdx = _dateCellSelection.endIdx;
      }

      _this.setState({
        selecting: true,
        startIdx: startIdx, endIdx: endIdx
      });
    });

    selector.on('click', function (point) {
      var rowBox = _Selection.getBoundsForNode(node);

      if (_utilsSelection.pointInBox(rowBox, point)) {
        var width = _utilsSelection.slotWidth(_Selection.getBoundsForNode(node), _this.props.slots);
        var currentCell = _utilsSelection.getCellAtX(rowBox, point.x, width);

        _this._selectSlot({
          startIdx: currentCell,
          endIdx: currentCell
        });
      }

      _this._initial = {};
      _this.setState({ selecting: false });
    });

    selector.on('select', function () {
      _this._selectSlot(_this.state);
      _this._initial = {};
      _this.setState({ selecting: false });
      _utilsHelpers.notify(_this.props.onSelectEnd, [_this.state]);
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

  _createClass(DisplayCells, null, [{
    key: 'propTypes',
    value: {
      selectable: _react2['default'].PropTypes.bool,
      onSelect: _react2['default'].PropTypes.func,
      slots: _react2['default'].PropTypes.number
    },
    enumerable: true
  }]);

  return DisplayCells;
})(_react2['default'].Component);

exports['default'] = DisplayCells;
module.exports = exports['default'];