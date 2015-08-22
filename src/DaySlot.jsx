import React from 'react';
import { findDOMNode } from 'react-dom';
import Selection, { getBoundsForNode } from './Selection';
import cn from 'classnames';
import dates from './utils/dates';
import { isSelected } from './utils/selection';
import localizer from './utils/localizer'

import { accessor } from './utils/propTypes';
import { accessor as get } from './utils/accessors';


var boxStyle = {
  zIndex: 9000,
  position: 'absolute',
  cursor: 'default'
};

var spanStyle = {
  backgroundColor: 'transparent',
  border: '1px dashed #999',
  width: '100%',
  height: '100%',
  float: 'left'
};

function snapToSlot(date, step){
  var roundTo = 1000 * 60 * step;
  return new Date(Math.floor(date.getTime() / roundTo) * roundTo)
}

// function slotFromDate(date, min, step){
//   return Math.ceil(dates.diff(min, snapDate(dates.merge(min, date), step), 'minutes') / step)
// }

function positionFromDate(date, min, step){
  return dates.diff(min, dates.merge(min, date), 'minutes')
}

function overlaps(event, events, { startAccessor, endAccessor }){
  let eStart = get(event, startAccessor)
    , eEnd = get(event, endAccessor);

  function overlap(eventB){
    return (dates.lte(eStart, get(eventB, startAccessor)) && dates.lte(eEnd, get(eventB, endAccessor)))
      || (dates.lte(eventB.start, get(eventB, startAccessor)) && dates.lte(get(eventB, endAccessor), eEnd))
  }

  return events.reduce((sum, otherEvent) => {
    return sum  + (overlap(event, otherEvent) ? 1 : 0)
  }, 0)
}

let DaySlot = React.createClass({

  propTypes: {
    events: React.PropTypes.array,
    step: React.PropTypes.number,
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),

    allDayAccessor: accessor,
    startAccessor: accessor,
    endAccessor: accessor,

    eventOffset: React.PropTypes.number,

    onEventClick: React.PropTypes.func
  },

  getInitialState() {
    return { selecting: false };
  },

  componentDidMount() {
    this._selectable()
  },

  componentWillUnmount() {
    this._selector && this._selector.teardown()
  },

  render() {
    let {
        min, max, step, start, end
      , selectRangeFormat, culture, ...props } = this.props;

    let totalMin = dates.diff(min, max, 'minutes')
    let numSlots = Math.ceil(totalMin / step)
    let children = [];

    for (var i = 0; i < numSlots; i++) {
      children.push(
        <div key={i} className='rbc-time-slot'/>
      )
    }

    this._totalMin = totalMin;

    let { selecting, startSlot, endSlot } = this.state
       , style = this._slotStyle(startSlot, endSlot, 0)

    let selectDates = {
      start: this.state.startDate,
      end: this.state.endDate
    };

    return (
      <div {...props} className={cn('rbc-day-slot', props.className)}>
        { children }
        { this.renderEvents(numSlots, totalMin) }
        {
          selecting &&
            <div className='rbc-slot-selection' style={style}>
              <span>
              { localizer.format(selectDates, selectRangeFormat, culture) }
              </span>
            </div>
        }
      </div>
    );
  },

  renderEvents(numSlots, totalMin) {
    let {
        events, step, min, selected
      , startAccessor, endAccessor } = this.props;

    events.sort((a, b) => +a - +b)

    return events.map((event, idx) => {

      let startSlot = positionFromDate(get(event, startAccessor), min, step);
      let endSlot = positionFromDate(get(event, endAccessor), min, step);

      let leftOffset = overlaps(event, events.slice(0, idx), this.props)

      let style = this._slotStyle(startSlot, endSlot, leftOffset)

      return (
        <div
          key={'evt_' + idx}
          style={style}
          onClick={this._select.bind(null, event)}
          className={cn('rbc-event', {
            'rbc-selected': isSelected(event, selected)
          })}
        >
          { event.start.toLocaleString() }
        </div>
      )
    })
  },

  _slotStyle(startSlot, endSlot, leftOffset){
    let eventOffset = this.props.eventOffset || 10;

    let top = ((startSlot / this._totalMin) * 100);
    let bottom = ((endSlot / this._totalMin) * 100);

    return {
      top: top + '%',
      height: bottom - top + '%',
      left: leftOffset === 0 ? 0 : leftOffset * eventOffset + '%',
      right: 0
    }
  },

  _selectable(){
    let node = findDOMNode(this);
    let selector = this._selector = new Selection(node)

    selector.on('selecting', selectBox => {
      let { date, step, min } = this.props;

      let { top, bottom } = getBoundsForNode(node)

      let mins = this._totalMin;

      let range = Math.abs(top - bottom)
      let start = (selectBox.top - top) / range;
      let end = (selectBox.bottom - top) / range;

      start = snapToSlot(minToDate(mins * start, date), step)
      end = snapToSlot(minToDate(mins * end, date), step)

      if (dates.eq(start, end, 'minutes'))
        end = dates.add(end, step, 'minutes')

      this.setState({
        selecting: true,
        startDate: start,
        endDate: end,
        startSlot: positionFromDate(start, min, step),
        endSlot: positionFromDate(end, min, step)
      })
    })

    selector
      .on('click', () => {
        this._selectSlot(this.state)
        this.setState({ selecting: false })
      })

    selector
      .on('select', () => {
        this._selectSlot(this.state)
        this.setState({ selecting: false })
      })
  },

  _selectSlot({ startDate, endDate, endSlot, startSlot }){
    console.log({ startDate, endDate, endSlot, startSlot })
    this.props.onSelectSlot &&
      this.props.onSelectSlot({
        start: startDate, end: endDate, endSlot, startSlot })
  },

  _select(event){
    this.props.onEventClick &&
      this.props.onEventClick(event);

    this.props.onSelect([event])
  }
});

function minToDate(min, date){
  var dt = new Date(date);
  dt = dates.hours(dt, 0);
  dt = dates.minutes(dt, min);
  dt = dates.seconds(dt, 0)
  return dates.milliseconds(dt, 0)
}
export default DaySlot;
