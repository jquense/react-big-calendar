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

import { notify } from './utils/helpers';
import { navigate } from './utils/constants';

import { accessor as get } from './utils/accessors';

import { inRange, sortEvents, segStyle } from './utils/eventLevels';

export default class TimeGrid extends Component {

  static propTypes = {
    events: React.PropTypes.array.isRequired,

    step: React.PropTypes.number,
    start: React.PropTypes.instanceOf(Date),
    end: React.PropTypes.instanceOf(Date),
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),
    now: React.PropTypes.instanceOf(Date),

    scrollToTime: React.PropTypes.instanceOf(Date),
    eventPropGetter: React.PropTypes.func,
    dayFormat: dateFormat,
    culture: React.PropTypes.string,

    rtl: React.PropTypes.bool,
    width: React.PropTypes.number,

    titleAccessor: accessor.isRequired,
    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,

    selected: React.PropTypes.object,
    selectable: React.PropTypes.oneOf([true, false, 'ignoreEvents']),

    onNavigate: React.PropTypes.func,
    onSelectSlot: React.PropTypes.func,
    onSelectEnd: React.PropTypes.func,
    onSelectStart: React.PropTypes.func,
    onSelectEvent: React.PropTypes.func,

    messages: React.PropTypes.object,
    components: React.PropTypes.object.isRequired,
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

    this.positionTimeIndicator();
    this.triggerTimeIndicatorUpdate();
  }

  componentWillUnmount() {
    window.clearTimeout(this._timeIndicatorTimeout);
  }

  componentDidUpdate() {
    if (this.props.width == null && !this.state.gutterWidth) {
      this.measureGutter()
    }

    this.applyScroll();
    this.positionTimeIndicator();
    //this.checkOverflow()
  }

  componentWillReceiveProps(nextProps) {
    const { start, scrollToTime } = this.props;
    // When paginating, reset scroll
    if (
      !dates.eq(nextProps.start, start, 'minute') ||
      !dates.eq(nextProps.scrollToTime, scrollToTime, 'minute')
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
        let eStart = get(event, startAccessor)
          , eEnd = get(event, endAccessor);

        if (
          get(event, allDayAccessor)
          || (dates.isJustDate(eStart) && dates.isJustDate(eEnd)))
        {
          allDayEvents.push(event)
        }
        else if (!dates.eq(eStart, eEnd, 'day'))
        {
          const numberOfEvents = dates.diff(eStart, dates.ceil(eEnd, 'day'), 'day')
          let tempStart = eStart
            , tempEnd = dates.endOf(eStart, 'day')
          rangeEvents.push({
            id: event.id,
            title: event.title,
            start: tempStart,
            end: tempEnd,
          })
          for (let i = 0; i < numberOfEvents - 1; i++) {
            tempStart = dates.startOf(new Date(new Date(tempStart).setDate(tempStart.getDate() + 1)), 'day');
            if (i === numberOfEvents - 2) {
              tempEnd = eEnd;
            } else {
              tempEnd = dates.endOf(new Date(new Date(eStart).setDate(eStart.getDate() + (i + 1))), 'day');
            }
            rangeEvents.push({
              id: event.id,
              title: event.title,
              start: tempStart,
              end: tempEnd,
            })
          }
        }
        else
          rangeEvents.push(event)
      }
    })

    allDayEvents.sort((a, b) => sortEvents(a, b, this.props))

    let gutterRef = ref => this._gutters[1] = ref && findDOMNode(ref);

    return (
      <div className='rbc-time-view'>

        {this.renderHeader(range, allDayEvents, width)}

        <div ref='content' className='rbc-time-content'>
          <div ref='timeIndicator' className='rbc-current-time-indicator' />

          <TimeColumn
            {...this.props}
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
      let daysEvents = events.filter(
        event => dates.inRange(date,
          get(event, startAccessor),
          get(event, endAccessor), 'day')
      )

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
    let { messages, rtl, selectable, components } = this.props;
    let { isOverflowing } = this.state || {};

    let style = {};
    if (isOverflowing)
      style[rtl ? 'marginLeft' : 'marginRight'] = scrollbarSize() + 'px';

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
            className='rbc-label rbc-header-gutter'
            style={{ width }}
          />
          { this.renderHeaderCells(range) }
        </div>
        <div className='rbc-row'>
          <div
            ref={ref => this._gutters[0] = ref}
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
      </div>
    )
  }

  renderHeaderCells(range){
    let { dayFormat, culture, components } = this.props;
    let HeaderComponent = components.header || Header

    return range.map((date, i) =>
      <div
        key={i}
        className={cn(
          'rbc-header',
          dates.isToday(date) && 'rbc-today',
        )}
        style={segStyle(1, this.slots)}
      >
        <a href='#' onClick={this.handleHeaderClick.bind(null, date)}>
          <HeaderComponent
            date={date}
            label={localizer.format(date, dayFormat, culture)}
            localizer={localizer}
            format={dayFormat}
            culture={culture}
          />
        </a>
      </div>
    )
  }

  handleHeaderClick(date, e){
    e.preventDefault()
    notify(this.props.onNavigate, [navigate.DATE, date])
  }

  handleSelectEvent(...args){
    notify(this.props.onSelectEvent, args)
  }

  handleSelectAlldayEvent(...args){
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

  positionTimeIndicator() {
    const { rtl, min, max } = this.props
    const now = new Date();

    const secondsGrid = dates.diff(max, min, 'seconds');
    const secondsPassed = dates.diff(now, min, 'seconds');

    const timeIndicator = this.refs.timeIndicator;
    const factor = secondsPassed / secondsGrid;
    const timeGutter = this._gutters[this._gutters.length - 1];

    if (timeGutter && now >= min && now <= max) {
      const pixelHeight = timeGutter.offsetHeight;
      const offset = Math.floor(factor * pixelHeight);

      timeIndicator.style.display = 'block';
      timeIndicator.style[rtl ? 'left' : 'right'] = 0;
      timeIndicator.style[rtl ? 'right' : 'left'] = timeGutter.offsetWidth + 'px';
      timeIndicator.style.top = offset + 'px';
    } else {
      timeIndicator.style.display = 'none';
    }
  }

  triggerTimeIndicatorUpdate() {
    // Update the position of the time indicator every minute
    this._timeIndicatorTimeout = window.setTimeout(() => {
      this.positionTimeIndicator();

      this.triggerTimeIndicatorUpdate();
    }, 60000)
  }
}
