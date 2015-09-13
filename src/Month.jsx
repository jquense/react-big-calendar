import React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import dates from './utils/dates';
import localizer from './localizer'
import chunk from 'lodash/array/chunk';
import omit from 'lodash/object/omit';

import { navigate } from './utils/constants';
import { notify } from './utils/helpers';
import getHeight from 'dom-helpers/query/height';
import getPosition from 'dom-helpers/query/position';
import raf from 'dom-helpers/util/requestAnimationFrame';

import EventRow from './EventRow';
import Popup from './Popup';
import Overlay from 'react-overlays/lib/Overlay';
import BackgroundCells from './BackgroundCells';

import { dateFormat } from './utils/propTypes';
import { segStyle, inRange, eventSegments, eventLevels, sortEvents } from './utils/eventLevels';

let isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot;

let eventsForWeek = (evts, start, end, props) =>
  evts.filter(e => inRange(e, start, end, props));


let propTypes = {
  ...EventRow.PropTypes,

  culture: React.PropTypes.string,

  date: React.PropTypes.instanceOf(Date),

  min: React.PropTypes.instanceOf(Date),
  max: React.PropTypes.instanceOf(Date),

  dateFormat,

  weekdayFormat: dateFormat,

  onSelectEvent: React.PropTypes.func,
  onSelectSlot: React.PropTypes.func
};


let MonthView = React.createClass({

  displayName: 'MonthView',

  propTypes,

  getInitialState(){
    return {
      rowLimit: 5,
      needLimitMeasure: true
    }
  },

  componentWillMount() {
    this._bgRows = []
    this._pendingSelection = []
  },

  componentWillReceiveProps({ date }) {
    this.setState({
      needLimitMeasure: !dates.eq(date, this.props.date)
    })
  },

  componentDidMount() {
    let running;

    if (this.state.needLimitMeasure)
      this._measureRowLimit(this.props)

    window.addEventListener('resize', this._resizeListener = ()=> {
      if (!running) {
        raf(()=> {
          running = false
          this.setState({ needLimitMeasure: true }) //eslint-disable-line
        })
      }
    }, false)
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.needLimitMeasure)
      this._measureRowLimit(this.props)
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeListener, false)
  },

  render(){
    var { date, culture, weekdayFormat } = this.props
      , month = dates.visibleDays(date, culture)
      , rows  = chunk(month, 7);

    let measure = this.state.needLimitMeasure

    this._rowCount = rows.length;

    var elementProps = omit(this.props, Object.keys(propTypes));

    return (
      <div
        {...elementProps}
        className={cn('rbc-month-view', elementProps.className)}
      >
        <div className='rbc-row rbc-month-header'>
          {this._headers(rows[0], weekdayFormat, culture)}
        </div>
        { rows.map((row, idx) =>
            this._row(row, idx, measure && this._renderMeasureRows))
        }
      </div>
    )
  },

  _row(row, rowIdx, content) {
    let first = row[0]
    let last = row[row.length - 1]
    let evts = eventsForWeek(this.props.events, row[0], row[row.length - 1], this.props)

    evts.sort((a, b) => sortEvents(a, b, this.props))

    let segments = evts = evts.map(evt => eventSegments(evt, first, last, this.props))
    let limit = this.state.rowLimit;

    let { levels, extra } = eventLevels(segments, limit)

    return (
      <div key={'week_' + rowIdx}
        className='rbc-month-row'
        ref={!rowIdx && (r => this._firstRow = r)}
      >
        {
          this.renderBackground(row, rowIdx)
        }
        <div
          className='rbc-row-content'
        >
          <div
            className='rbc-row'
            ref={!rowIdx && (r => this._firstDateRow = r)}
          >
            { this._dates(row) }
          </div>
          {
            content
              ? content(levels, row, rowIdx)
              : levels.map((l, idx) => this.renderRowLevel(l, row, idx))
          }
        </div>
        {
          this.renderShowMore(segments, extra, row, rowIdx)
        }
        { this.props.popup
            && this._renderOverlay()
        }
      </div>
    )
  },

  renderRowLevel(segments, week, idx){
    let first = week[0]
    let last = week[week.length - 1]

    return (
      <EventRow
        {...this.props}
        eventComponent={this.props.components.event}
        onSelect={this._selectEvent}
        key={idx}
        segments={segments}
        start={first}
        end={last}
      />
    )
  },

  renderBackground(row, idx){
    let self = this;

    function onSelectSlot({ start, end }) {
      self._pendingSelection = self._pendingSelection
        .concat(row.slice(start, end + 1))

      clearTimeout(self._selectTimer)
      self._selectTimer = setTimeout(()=> self._selectDates())
    }

    return (
    <BackgroundCells
      selectable={this.props.selectable}
      slots={7}
      ref={r => this._bgRows[idx] = r}
      onSelectSlot={onSelectSlot}
    />
    )
  },

  renderShowMore(segments, extraSegments, row, rowIdx) {
    return row.map((date, idx) => {
      let slot = idx + 1;

      let count = extraSegments
        .filter(seg => isSegmentInSlot(seg, slot)).length

      let events = segments
        .filter(seg => isSegmentInSlot(seg, slot))
        .map(seg => seg.event)

      let onClick = ()=> this._showMore(events, date, rowIdx, idx)

      return count
        ? (
          <a
            key={'sm_' + idx}
            href='#'
            className={'rbc-show-more rbc-show-offset-' + slot}
            onClick={onClick}
          >
            {'show ' + count + ' more'}
          </a>
        ) : false
    })
  },

  _dates(row){
    return row.map((day, colIdx) => {
      var offRange = dates.month(day) !== dates.month(this.props.date);

      return (
        <div
          key={'header_' + colIdx}
          style={segStyle(1, 7)}
          className={cn('rbc-date-cell', {
            'rbc-off-range': offRange,
            'rbc-now': dates.eq(day, new Date(), 'day')
          })}
        >
          <a href='#' onClick={this._dateClick.bind(null, day)}>
            { localizer.format(day, this.props.dateFormat, this.props.culture) }
          </a>
        </div>
      )
    })
  },

  _headers(row, format, culture){
    let first = row[0]
    let last = row[row.length - 1]

    return dates.range(first, last, 'day').map((day, idx) =>
      <div
        key={'header_' + idx}
        className='rbc-header'
        style={segStyle(1, 7)}
      >
        { localizer.format(day, format, culture) }
      </div>
    )
  },

  _renderMeasureRows(levels, row, idx) {
    let first = idx === 0;

    return first ? (
      <div className='rbc-row'>
        <div className='rbc-row-segment' style={segStyle(1, 7)}>
          <div ref={r => this._measureEvent = r} className={cn('rbc-event')}>
            <div className='rbc-event-content'>&nbsp;</div>
          </div>
        </div>
      </div>
    ) : <span/>
  },

  _renderOverlay(){
    let overlay = (this.state && this.state.overlay) || {};

    return (
      <Overlay
        rootClose
        placement='bottom'
        container={this}
        show={!!overlay.position}
        onHide={() => this.setState({ overlay: null })}
      >
        <Popup
          position={overlay.position}
          events={overlay.events}
          slotStart={overlay.date}
          slotEnd={overlay.end}
          selected={this.props.selected}
          onSelect={this._selectEvent}
          eventPropGetter={this.props.eventPropGetter}
          startAccessor={this.props.startAccessor}
          endAccessor={this.props.endAccessor}
          titleAccessor={this.props.titleAccessor}
        />
      </Overlay>
    )
  },

  _measureRowLimit(props) {
    let eventHeight = getHeight(this._measureEvent);
    let labelHeight = getHeight(this._firstDateRow);
    let eventSpace = getHeight(this._firstRow) - labelHeight;

    this._needLimitMeasure = false;

    this.setState({
      needLimitMeasure: false,
      rowLimit: Math.max(
        Math.floor(eventSpace / eventHeight), 1)
    })
  },

  _dateClick(date){
    this.clearSelection()
    notify(this.props.onNavigate, [navigate.DATE, date])
  },

  _selectEvent(...args){
    //cancel any pending selections so only the event click goes through.
    this.clearSelection()

    notify(this.props.onSelectEvent, args)
  },

  _selectDates(){
    let slots = this._pendingSelection.slice()

    this._pendingSelection = []

    slots.sort((a, b) => +a - +b)

    notify(this.props.onSelectSlot, {
      slots,
      start: slots[0],
      end: slots[slots.length - 1]
    })
  },

  _showMore(events, date, row, slot){
    let cell = findDOMNode(this._bgRows[row]).children[slot];

    if (this.props.popup) {
      let position = getPosition(cell, findDOMNode(this));

      this.setState({
        overlay: { date, events, position }
      })
    }

    notify(this.props.onShowMore, [events, date, slot])
  },

  clearSelection(){
    clearTimeout(this._selectTimer)
    this._pendingSelection = [];
  }

});

MonthView.navigate = (date, action)=>{
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'month');

    case navigate.NEXT:
      return dates.add(date, 1, 'month')

    default:
      return date;
  }
}

MonthView.range = (date, { culture }) => {
  let start = dates.firstVisibleDay(date, culture)
  let end = dates.lastVisibleDay(date, culture)
  return { start, end }
}

export default MonthView
