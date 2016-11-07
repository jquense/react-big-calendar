import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import { elementType } from './utils/propTypes';
import { segStyle } from './utils/eventLevels';
import { notify } from './utils/helpers';
import dates from './utils/dates';
import { dateCellSelection, slotWidth, getCellAtX, pointInBox } from './utils/selection';
import Selection, { getBoundsForNode } from './Selection';

class DisplayCells extends React.Component {

  static propTypes = {
    selectable: PropTypes.bool,
    onSelect: PropTypes.func,
    slots: PropTypes.number,
    week: PropTypes.array,
    backgroundEvents: PropTypes.array,
    backgroundEventComponent: elementType,
    backgroundEventPropGetter: PropTypes.func
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
    let { slots, week, backgroundEvents, backgroundEventComponent,
          backgroundEventPropGetter, ...props } = this.props;
    let { selecting, startIdx, endIdx } = this.state

    let children = [];

    for (var i = 0; i < slots; i++) {
      let backgroundEvent = backgroundEvents.find(event => {
        return dates.sameDay(event.start, week[i])
      })

      let Component = backgroundEventComponent;
      let title = (backgroundEvent || {}).title;

      var style, xClassName;
      if (backgroundEvent && backgroundEventPropGetter)
        ({ style, className: xClassName } = backgroundEventPropGetter(backgroundEvent));
      else
        ({ style, className: xClassName } = {});

      children.push(
        <div
          key={'bg_' + i}
          style={{...segStyle(1, slots), ...style, ...props.style}}
          className={cn('rbc-day-bg', xClassName, {
            'rbc-selected-cell': selecting && i >= startIdx && i <= endIdx
          })}
        >
        { Component && backgroundEvent
          ? <Component
              event={backgroundEvent}
              eventPropGetter={backgroundEventPropGetter}
            />
          : title
        }

        </div>
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
      let { slots } = this.props;

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
          , slots));
      }

      this.setState({
        selecting: true,
        startIdx, endIdx
      })
    })

    selector
      .on('click', point => {
        let rowBox = getBoundsForNode(node)

        if (pointInBox(rowBox, point)) {
          let width = slotWidth(getBoundsForNode(node),  this.props.slots);
          let currentCell = getCellAtX(rowBox, point.x, width);

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

export default DisplayCells;
