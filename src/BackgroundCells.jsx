import React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import closest from 'dom-helpers/query/closest';

import { segStyle } from './utils/eventLevels';
import { notify } from './utils/helpers';
import { elementType } from './utils/propTypes';
import { dateCellSelection, slotWidth, getCellAtX, pointInBox } from './utils/selection';
import Selection, { getBoundsForNode } from './Selection';

class BackgroundCells extends React.Component {

  static propTypes = {
    cellWrapperComponent: elementType,
    selectable: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    slots: React.PropTypes.number,
    rtl: React.PropTypes.bool,
    type: React.PropTypes.string,
    values: React.PropTypes.arrayOf(
      React.PropTypes.instanceOf(Date)
    ),
  }

  state = { selecting: false }

  componentDidMount(){
    this.props.selectable
      && this._selectable()
  }

  componentWillUnmount() {
    this._teardownSelectable();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable)
      this._selectable();
    if (!nextProps.selectable && this.props.selectable)
      this._teardownSelectable();
  }

  render(){
    let { slots, values, cellWrapperComponent: Wrapper } = this.props;
    let { selecting, startIdx, endIdx } = this.state;

    let children = [];

    for (var i = 0; i < slots; i++) {
      children.push(
        <Wrapper key={'bg_' + i} value={values[i]}>
          <div
            style={segStyle(1, slots)}
            className={cn('rbc-day-bg', {
              'rbc-selected-cell': selecting && i >= startIdx && i <= endIdx
            })}
          />
        </Wrapper>
      )
    }

    return (
      <div className='rbc-row-bg'>
        { children }
      </div>
    )
  }

  _selectable(){
    let node = findDOMNode(this);
    let selector = this._selector = new Selection(this.props.container)

    selector.on('selecting', box => {
      let { slots, rtl } = this.props;

      let startIdx = -1;
      let endIdx = -1;

      if (!this.state.selecting) {
        notify(this.props.onSelectStart, [box]);
        this._initial = { x: box.x, y: box.y };
      }
      if (selector.isSelected(node)) {
        let nodeBox = getBoundsForNode(node);

        ({ startIdx, endIdx } = dateCellSelection(
            this._initial
          , nodeBox
          , box
          , slots
          , rtl));
      }

      this.setState({
        selecting: true,
        startIdx, endIdx
      })
    })

    selector.on('mousedown', ({ clientX, clientY }) => {
      if (this.props.selectable !== 'ignoreEvents') return

      let target = document.elementFromPoint(clientX, clientY);
      return !closest(target, '.rbc-event', findDOMNode(this))
    })

    selector
      .on('click', point => {
        let rowBox = getBoundsForNode(node)
        let { slots, rtl } = this.props;

        if (pointInBox(rowBox, point)) {
          let width = slotWidth(getBoundsForNode(node),  this.props.slots);
          let currentCell = getCellAtX(rowBox, point.x, width, rtl, slots);

          this._selectSlot({
            startIdx: currentCell,
            endIdx: currentCell
          })
        }

        this._initial = {}
        this.setState({ selecting: false })
      })

    selector
      .on('select', () => {
        this._selectSlot(this.state)
        this._initial = {}
        this.setState({ selecting: false })
        notify(this.props.onSelectEnd, [this.state]);
      })
  }

  _teardownSelectable() {
    if (!this._selector) return
    this._selector.teardown();
    this._selector = null;
  }

  _selectSlot({ endIdx, startIdx }) {
    this.props.onSelectSlot &&
      this.props.onSelectSlot({
        start: startIdx, end: endIdx
      })
  }
}

export default BackgroundCells;
