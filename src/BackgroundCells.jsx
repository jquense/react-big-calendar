import React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import { segStyle } from './utils/eventLevels';
import { dateCellSelection } from './utils/selection';
import Selection, { getBoundsForNode } from './Selection';

class DisplayCells extends React.Component {

  static propTypes = {
    selectable: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    slots: React.PropTypes.number
  }

  state = { selecting: false }

  componentDidMount(){
    this.props.selectable
      && this._selectable()
  }

  componentWillUnmount() {
    this._selector && this._selector.teardown()
  }

  render(){
    let { slots } = this.props;
    let { selecting, startIdx, endIdx } = this.state

    let children = [];

    for (var i = 0; i < slots; i++) {
      children.push(
        <div
          key={'bg_' + i}
          style={segStyle(1, slots)}
          className={cn('rbc-day-bg', {
            'rbc-selected-cell': selecting && i >= startIdx && i <= endIdx
          })}
        />
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
    let selector = this._selector = new Selection()

    selector.on('selecting', box => {
      let { slots } = this.props;

      let startIdx = -1;
      let endIdx = -1;

      if (!this.state.selecting)
        this._initial = { x: box.x, y: box.y };

      if (selector.isSelected(node)) {
        let nodeBox = getBoundsForNode(node);

        ({ startIdx, endIdx } = dateCellSelection(
            this._initial
          , nodeBox
          , box
          , slots));
      }

      this.setState({
        selecting: true,
        startIdx, endIdx
      })
    })

    selector
      .on('click', () => {
        this._selectSlot(this.state)
        this._initial = {}
        this.setState({ selecting: false })
      })

    selector
      .on('select', () => {
        this._selectSlot(this.state)
        this._initial = {}
        this.setState({ selecting: false })
      })
  }

  _selectSlot({ endIdx, startIdx }) {
    this.props.onSelectSlot &&
      this.props.onSelectSlot({
        start: startIdx, end: endIdx
      })
  }

}

export default DisplayCells;
