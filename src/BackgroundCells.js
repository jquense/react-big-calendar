import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import dates from './utils/dates';
import { segStyle } from './utils/eventLevels';
import { notify } from './utils/helpers';
import { elementType } from './utils/propTypes';
import { dateCellSelection, slotWidth, getCellAtX, pointInBox } from './utils/selection';
import Selection, { getBoundsForNode, isEvent } from './Selection';

class BackgroundCells extends React.Component {

  static propTypes = {
    date: PropTypes.instanceOf(Date),
    cellWrapperComponent: elementType,
    container: PropTypes.func,
    dayPropGetter: PropTypes.func,
    selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
    longPressThreshold: PropTypes.number,

    onSelectSlot: PropTypes.func.isRequired,
    onSelectEnd: PropTypes.func,
    onSelectStart: PropTypes.func,

    range: PropTypes.arrayOf(
      PropTypes.instanceOf(Date)
    ),
    rtl: PropTypes.bool,
    type: PropTypes.string,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      selecting: false
    };
  }

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
    let { range, cellWrapperComponent: Wrapper, dayPropGetter, date: currentDate } = this.props;
    let { selecting, startIdx, endIdx } = this.state;

    return (
      <div className='rbc-row-bg'>
        {range.map((date, index) => {
          let selected =  selecting && index >= startIdx && index <= endIdx;
          const { className, style: dayStyles } = (dayPropGetter && dayPropGetter(date)) || {};
          const segmStyles = segStyle(1, range.length)
          const styles = Object.assign({}, dayStyles, segmStyles)

          return (
            <Wrapper
              key={index}
              value={date}
              range={range}
            >
              <div
                style={styles}
                className={cn(
                  'rbc-day-bg',
                  className,
                  selected && 'rbc-selected-cell',
                  dates.isToday(date) && 'rbc-today',
                  currentDate && dates.month(currentDate) !== dates.month(date) && 'rbc-off-range-bg',
                )}
              />
            </Wrapper>
          )
        })}
      </div>
    )
  }

  _selectable(){
    let node = findDOMNode(this);
    let selector = this._selector = new Selection(this.props.container, {
      longPressThreshold: this.props.longPressThreshold,
    })

    let selectorClicksHandler = (point, actionType) => {
      if (!isEvent(findDOMNode(this), point)) {
        let rowBox = getBoundsForNode(node)
        let { range, rtl } = this.props;

        if (pointInBox(rowBox, point)) {
          let width = slotWidth(getBoundsForNode(node),  range.length);
          let currentCell = getCellAtX(rowBox, point.x, width, rtl, range.length);

          this._selectSlot({
            startIdx: currentCell,
            endIdx: currentCell,
            action: actionType,
          })
        }
      }

      this._initial = {}
      this.setState({ selecting: false })
    };

    selector.on('selecting', box => {
      let { range, rtl } = this.props;

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
          , range.length
          , rtl));
      }

      this.setState({
        selecting: true,
        startIdx, endIdx
      })
    })

    selector.on('beforeSelect', (box) => {
      if (this.props.selectable !== 'ignoreEvents') return

      return !isEvent(findDOMNode(this), box)
    })

    selector
      .on('click', point => selectorClicksHandler(point, 'click'))

    selector
      .on('doubleClick', point => selectorClicksHandler(point, 'doubleClick'))

    selector
      .on('select', () => {
        this._selectSlot({ ...this.state, action: 'select' })
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

  _selectSlot({ endIdx, startIdx, action }) {
    if (endIdx !== -1 && startIdx !== -1)
      this.props.onSelectSlot &&
        this.props.onSelectSlot({
          start: startIdx,
          end: endIdx,
          action
        })
  }
}

export default BackgroundCells;
