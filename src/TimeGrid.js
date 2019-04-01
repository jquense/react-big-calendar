import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cn from 'classnames';
import { findDOMNode } from 'react-dom';

import dates from './utils/dates';
import localizer from './localizer'
import DayColumn from './DayColumn';
import TimeColumn from './TimeColumn';
import DateContentRow from './DateContentRow';
import Header from './Header';

import getWidth from 'dom-helpers/query/width';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import message from './utils/messages';

import { accessor, dateFormat } from './utils/propTypes';

import { notify, isAllDayEvent, makeEventFilter } from './utils/helpers';

import { inRange, sortEvents, segStyle } from './utils/eventLevels';

export default class TimeGrid extends Component {

  static propTypes = {
    view: PropTypes.string.isRequired,
    events: PropTypes.array.isRequired,
    singleDayEventsOnly: PropTypes.bool,

    step: PropTypes.number,
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    now: PropTypes.instanceOf(Date),
    nowTimezone: PropTypes.string,

    scrollToTime: PropTypes.instanceOf(Date),
    eventPropGetter: PropTypes.func,
    dayFormat: dateFormat,
    culture: PropTypes.string,

    rtl: PropTypes.bool,
    width: PropTypes.number,

    titleAccessor: accessor.isRequired,
    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,

    selected: PropTypes.object,
    selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),

    onNavigate: PropTypes.func,
    onSelectSlot: PropTypes.func,
    onSelectEnd: PropTypes.func,
    onSelectStart: PropTypes.func,
    onSelectEvent: PropTypes.func,
    onDrillDown: PropTypes.func,
    getDrilldownView: PropTypes.func.isRequired,

    messages: PropTypes.object,
    components: PropTypes.object.isRequired,
  }

  static defaultProps = {
    step: 30,
    min: dates.startOf(new Date(), 'day'),
    max: dates.endOf(new Date(), 'day'),
    scrollToTime: dates.startOf(new Date(), 'day'),
    /* these 2 are needed to satisfy requirements from TimeColumn required props
     * There is a strange bug in React, using ...TimeColumn.defaultProps causes weird crashes
     */
    type: 'gutter',
    now: new Date()
  }

  constructor(props) {
    super(props)
    this.state = { gutterWidth: undefined, isOverflowing: null };
    this.handleSelectEvent = this.handleSelectEvent.bind(this)
    this.handleHeaderClick = this.handleHeaderClick.bind(this)
  }

  componentWillMount() {
    this._gutters = [];
    this.calculateScroll();
  }

  componentDidMount() {
    this.checkOverflow();

    if (this.props.width == null) {
      this.measureGutter()
    }
    this.applyScroll();
  }

  componentDidUpdate() {
    if (this.props.width == null && !this.state.gutterWidth) {
      this.measureGutter()
    }

    this.applyScroll();
    //this.checkOverflow()
  }

  componentWillReceiveProps(nextProps) {
    const { start, scrollToTime } = this.props;
    // When paginating, reset scroll
    if (
      nextProps.view !== this.props.view &&
      (!dates.eq(nextProps.start, start, 'minute') ||
       !dates.eq(nextProps.scrollToTime, scrollToTime, 'minute'))
    ) {
      this.calculateScroll();
    }
  }

  handleSelectAllDaySlot = (slots) => {
    const { onSelectSlot } = this.props;
    notify(onSelectSlot, {
      slots,
      start: slots[0],
      end: slots[slots.length - 1]
    })
  }

  render() {
    let {
        events
      , singleDayEventsOnly
      , start
      , end
      , width
      , startAccessor
      , endAccessor
      , allDayAccessor } = this.props;

    width = width || this.state.gutterWidth;

    let range = dates.range(start, end, 'day')

    this.slots = range.length;

    let allDayEvents = []
      , rangeEvents = [];

    events.forEach(event => {
      if (inRange(event, start, end, this.props)) {
        if (isAllDayEvent(event, { startAccessor, endAccessor, allDayAccessor })) {
          if (!singleDayEventsOnly) {
            allDayEvents.push(event);
          }
        } else {
          rangeEvents.push(event);
        }
      }
    })

    allDayEvents.sort((a, b) => sortEvents(a, b, this.props))

    let gutterRef = ref => this._gutters[1] = ref && findDOMNode(ref);

    return (
      <div className={`rbc-time-view rbc-time-view-${this.props.view}`}>

        {this.renderHeader(range, allDayEvents, width)}

        <div ref='content' className='rbc-time-content'>
          {/* dummy div replacement for timeIndicator to keep css working */}
          <div style={{ display: 'none' }} />

          <TimeColumn
            {...this.props}
            min={dates.merge(start, this.props.min)}
            max={dates.merge(start, this.props.max)}
            showLabels
            style={{ width }}
            ref={gutterRef}
            className='rbc-time-gutter'
          />

          {this.renderEvents(range, rangeEvents, this.props.now)}

        </div>
      </div>
    );
  }

  renderEvents(range, events, today){
    let { min, max, endAccessor, startAccessor, components } = this.props;

    return range.map((date, idx) => {
      let daysEvents = events.filter(makeEventFilter(date, { startAccessor, endAccessor }));

      return (
        <DayColumn
          {...this.props }
          min={dates.merge(date, min)}
          max={dates.merge(date, max)}
          eventComponent={components.event}
          eventWrapperComponent={components.eventWrapper}
          dayWrapperComponent={components.dayWrapper}
          className={cn({ 'rbc-now': dates.eq(date, today, 'day') })}
          style={segStyle(1, this.slots)}
          key={idx}
          date={date}
          events={daysEvents}
        />
      )
    })
  }

  renderHeader(range, events, width) {
    let { messages, rtl, selectable, components, singleDayEventsOnly } = this.props;
    let { isOverflowing } = this.state || {};

    let style = {};
    if (isOverflowing)
      style[rtl ? 'marginLeft' : 'marginRight'] = scrollbarSize() + 'px';

    const firstGutterRef = ref => this._gutters[0] = ref;
    const headerProps = {};
    const messageProps = {};
    if (singleDayEventsOnly) {
      headerProps.ref = firstGutterRef;
    } else {
      messageProps.ref = firstGutterRef;
    }

    return (
      <div
        ref='headerCell'
        className={cn(
          'rbc-time-header',
          isOverflowing && 'rbc-overflowing'
        )}
        style={style}
      >
        <div className='rbc-row'>
          <div
            {...headerProps}
            className='rbc-label rbc-header-gutter'
            style={{ width }}
          />
          { this.renderHeaderCells(range) }
        </div>
        {!singleDayEventsOnly &&
          <div className='rbc-row'>
            <div
              {...messageProps}
              className='rbc-label rbc-header-gutter'
              style={{ width }}
            >
              { message(messages).allDay }
            </div>
            <DateContentRow
              minRows={2}
              range={range}
              rtl={this.props.rtl}
              events={events}
              className='rbc-allday-cell'
              selectable={selectable}
              onSelectSlot={this.handleSelectAllDaySlot}
              dateCellWrapper={components.dateCellWrapper}
              eventComponent={this.props.components.event}
              eventWrapperComponent={this.props.components.eventWrapper}
              titleAccessor={this.props.titleAccessor}
              startAccessor={this.props.startAccessor}
              endAccessor={this.props.endAccessor}
              allDayAccessor={this.props.allDayAccessor}
              eventPropGetter={this.props.eventPropGetter}
              selected={this.props.selected}
              onSelect={this.handleSelectEvent}
            />
          </div>
        }
      </div>
    )
  }

  renderHeaderCells(range){
    let { dayFormat, culture, components, getDrilldownView, nowTimezone } = this.props;
    let HeaderComponent = components.header || Header

    return range.map((date, i) => {
      let drilldownView = getDrilldownView(date);

      let label = localizer.format(date, dayFormat, culture);

      let header = (
        <HeaderComponent
          date={date}
          label={label}
          localizer={localizer}
          format={dayFormat}
          culture={culture}
        />
      )

      return (
        <div
          key={i}
          className={cn(
            'rbc-header',
            dates.isToday(date, nowTimezone) && 'rbc-today',
          )}
          style={segStyle(1, this.slots)}
        >
          {drilldownView ? (
            <a
              href='#'
              onClick={e => this.handleHeaderClick(date, drilldownView, e)}
            >
              {header}
            </a>
          ) : header}
        </div>
      )
    })
  }

  handleHeaderClick(date, view, e){
    e.preventDefault()
    notify(this.props.onDrillDown, [date, view])
  }

  handleSelectEvent(...args) {
    notify(this.props.onSelectEvent, args)
  }

  handleSelectAlldayEvent(...args) {
    //cancel any pending selections so only the event click goes through.
    this.clearSelection()
    notify(this.props.onSelectEvent, args)
  }

  clearSelection(){
    clearTimeout(this._selectTimer)
    this._pendingSelection = [];
  }

  measureGutter() {
    let width = this.state.gutterWidth;
    let gutterCells = this._gutters;

    if (!width) {
      width = Math.max(...gutterCells.map(getWidth));

      if (width) {
        this.setState({ gutterWidth: width })
      }
    }
  }

  applyScroll() {
    if (this._scrollRatio) {
      const { content } = this.refs;
      content.scrollTop = content.scrollHeight * this._scrollRatio;
      // Only do this once
      this._scrollRatio = null;
    }
  }

  calculateScroll() {
    const { min, max, scrollToTime } = this.props;

    const diffMillis = scrollToTime - dates.startOf(scrollToTime, 'day');
    const totalMillis = dates.diff(max, min);

    this._scrollRatio = diffMillis / totalMillis;
  }

  checkOverflow() {
    if (this._updatingOverflow) return;

    let isOverflowing = this.refs.content.scrollHeight > this.refs.content.clientHeight;

    if (this.state.isOverflowing !== isOverflowing) {
      this._updatingOverflow = true;
      this.setState({ isOverflowing }, () => {
        this._updatingOverflow = false;
      })
    }
  }
}
