import React, { PropTypes, Component } from 'react'
import { findDOMNode } from 'react-dom'
import cn from 'classnames';

import SelectableTimeGutter from '../containers/SelectableTimeGutter.jsx'
import EventRow from '../EventRow.jsx'

import dates from '../utils/dates';
import { isSelected } from '../utils/selection';
import { notify } from '../utils/helpers';
import { accessor } from '../utils/propTypes';
import { accessor as get } from '../utils/accessors';
import localizer from '../localizer'

export default class DaySlot extends Component {
  static propTypes = {
    formatter: PropTypes.func,
    eventTimeRangeFormat: PropTypes.func.isRequired,
    
    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,

    selectable: PropTypes.bool,
    eventOffset: PropTypes.number,

    onSelecting: PropTypes.func,
    onSelectSlot: PropTypes.func.isRequired,
    onSelectEvent: PropTypes.func.isRequired,

    events: PropTypes.array,
    eventComponent: PropTypes.element
  }

  static defaultProps = {
    events: [],
    eventComponent: EventRow,
    startAccessor: 'start',
    endAccessor: 'end'
  }

  constructor(props) {
    super(props)
    this.state = {
      selectValue: null,
      selecting: false,
      selectBounds: null
    }
    this.makeFancy = this.makeFancy.bind(this)
    this.selectorStyle = this.selectorStyle.bind(this)
    this._select = this._select.bind(this)
  }

  positionFromDate(date, min){
    return dates.diff(min, dates.merge(min, date), 'minutes')
  }

  overlaps(event, events, { startAccessor, endAccessor }, last) {
    let eStart = get(event, startAccessor);
    let offset = last;

    function overlap(eventB){
      return dates.lt(eStart, get(eventB, endAccessor))
    }

    if (!events.length) return last - 1
    events.reverse().some(prevEvent => {
      if (overlap(prevEvent)) return true
      offset = offset - 1
    })

    return offset
  }

  makeFancy(values, slots, valuelist, nodelist, containerbounds) {
    const nodes = nodelist()
    if (!nodes.length) {
      this.setState({
        selectValue: null,
        selecting: false,
        selectBounds: null,
        containerBounds: containerbounds
      })
    } else {
      this.setState({
        selectValue: { start: valuelist[0], end: valuelist[valuelist.length - 1] },
        selecting: true,
        selectBounds: {
          start: nodes[0].bounds,
          end: nodes[nodes.length - 1].bounds,
          length: nodes.length
        },
        containerBounds: containerbounds
      })
    }
  }

  selectorStyle({start, length, end}, containerBounds) {
    if (length === 1) {
      return {
        top: start.top - containerBounds.top,
        left: start.left - containerBounds.left,
        height: start.bottom - start.top,
        width: Math.ceil(0.8 * (start.right - start.left))
      }
    }
    return {
      top: start.top - containerBounds.top,
      left: start.left - containerBounds.left,
      height: end.bottom - start.top,//(start.bottom - start.top)*length,
      width: Math.ceil(0.8 * (start.right - start.left))
    }
  }

  _select(event){
    notify(this.props.onSelectEvent, event)
  }

  _slotStyle(startSlot, endSlot, leftOffset){

    endSlot = Math.max(endSlot, startSlot + this.props.step) //must be at least one `step` high

    let eventOffset = this.props.eventOffset || 10
      , isRtl = this.props.rtl;

    let top = ((startSlot / this._totalMin) * 100);
    let bottom = ((endSlot / this._totalMin) * 100);
    let per = leftOffset === 0 ? 0 : leftOffset * eventOffset;
    let rightDiff = (eventOffset / (leftOffset + 1));

    return {
      top: top + '%',
      height: bottom - top + '%',
      [isRtl ? 'right' : 'left']: per + '%',
      width: (leftOffset === 0 ? (100 - eventOffset) : (100 - per) - rightDiff) + '%'
    }
  }

  renderEvents() {
    let {
      events, step, min, culture, eventPropGetter
      , selected, eventTimeRangeFormat, eventComponent
      , startAccessor, endAccessor, titleAccessor } = this.props;

    let EventComponent = eventComponent
      , lastLeftOffset = 0;

    events.sort((a, b) => +get(a, startAccessor) - +get(b, startAccessor))

    return events.map((event, idx) => {
      let start = get(event, startAccessor)
      let end = get(event, endAccessor)
      let startSlot = this.positionFromDate(start, min, step);
      let endSlot = this.positionFromDate(end, min, step);

      lastLeftOffset = Math.max(0,
        this.overlaps(event, events.slice(0, idx), this.props, lastLeftOffset + 1))

      let style = this._slotStyle(startSlot, endSlot, lastLeftOffset)

      let title = get(event, titleAccessor)
      let label = localizer.format({ start, end }, eventTimeRangeFormat, culture);
      let _isSelected = isSelected(event, selected);

      if (eventPropGetter)
        var { style: xStyle, className } = eventPropGetter(event, start, end, _isSelected);

      return (
        <div
          key={'evt_' + idx}
          style={{...xStyle, ...style}}
          title={label + ': ' + title }
          onClick={this._select.bind(null, event)}
          className={cn('rbc-event', className, {
            'rbc-selected': _isSelected,
            'rbc-event-overlaps': lastLeftOffset !== 0
          })}
        >
          <div className='rbc-event-label'>{label}</div>
          <div className='rbc-event-content'>
            { EventComponent
              ? <EventComponent event={event} title={title}/>
              : title
            }
          </div>
        </div>
      )
    })
  }

  render() {
    const { min, max, step, slices, isNow } = this.props
    this._totalMin = dates.diff(min, max, 'minutes')
    return (
      <div className={cn('rbc-day-slot',this.props.className)} style={{...this.props.style}}>
        <SelectableTimeGutter selectable={true}
                              constantSelect
                              onSelectSlot={this.makeFancy}
                              hidelabels={true}
                              timesliceClassnames="day-slot"
                              slices={slices}
                              now={new Date()}
                              min={min}
                              max={max}
                              step={step}
                              isNow={isNow}
        />
        {this.renderEvents()}
        {this.state.selecting ?
          <div className="rbc-slot-selection" style={this.selectorStyle(this.state.selectBounds, this.state.containerBounds)}>
            <span>{this.props.formatter(this.state.selectValue, this.props.step)}</span>
          </div>
          : ''}
      </div>
    )
  }
}

