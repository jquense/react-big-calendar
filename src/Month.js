import React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import dates from './utils/dates';
import localizer from './localizer'
import chunk from 'lodash/chunk';

import { navigate, views } from './utils/constants';
import { notify } from './utils/helpers';
import getPosition from 'dom-helpers/query/position';
import raf from 'dom-helpers/util/requestAnimationFrame';

import Popup from './Popup';
import Overlay from 'react-overlays/lib/Overlay';
import DateContentRow from './DateContentRow';
import Header from './Header';

import { accessor, dateFormat } from './utils/propTypes';
import { segStyle, inRange, sortEvents } from './utils/eventLevels';

let eventsForWeek = (evts, start, end, props) =>
  evts.filter(e => inRange(e, start, end, props));


let propTypes = {
  events: React.PropTypes.array.isRequired,
  date: React.PropTypes.instanceOf(Date),

  min: React.PropTypes.instanceOf(Date),
  max: React.PropTypes.instanceOf(Date),

  step: React.PropTypes.number,
  now: React.PropTypes.instanceOf(Date),

  scrollToTime: React.PropTypes.instanceOf(Date),
  eventPropGetter: React.PropTypes.func,

  culture: React.PropTypes.string,
  dayFormat: dateFormat,

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
  onSelectEvent: React.PropTypes.func,
  onShowMore: React.PropTypes.func,
  onDrillDown: React.PropTypes.func,
  getDrilldownView: React.PropTypes.func.isRequired,

  dateFormat,

  weekdayFormat: dateFormat,
  popup: React.PropTypes.bool,

  messages: React.PropTypes.object,
  components: React.PropTypes.object.isRequired,
  popupOffset: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number
    })
  ]),
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
      this.measureRowLimit(this.props)

    window.addEventListener('resize', this._resizeListener = ()=> {
      if (!running) {
        raf(()=> {
          running = false
          this.setState({ needLimitMeasure: true }) //eslint-disable-line
        })
      }
    }, false)
  },

  componentDidUpdate() {
    if (this.state.needLimitMeasure)
      this.measureRowLimit(this.props)
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeListener, false)
  },

  getContainer() {
    return findDOMNode(this)
  },

  render() {
    let { date, culture, weekdayFormat, className } = this.props
      , month = dates.visibleDays(date, culture)
      , weeks  = chunk(month, 7);

    this._weekCount = weeks.length;

    return (
      <div className={cn('rbc-month-view', className)}>
        <div className='rbc-row rbc-month-header'>
          {this._headers(weeks[0], weekdayFormat, culture)}
        </div>
        { weeks.map((week, idx) =>
            this.renderWeek(week, idx))
        }
        { this.props.popup &&
            this._renderOverlay()
        }
      </div>
    )
  },

  renderWeek(week, weekIdx) {
    let {
      events,
      components,
      selectable,
      titleAccessor,
      startAccessor,
      endAccessor,
      allDayAccessor,
      eventPropGetter,
      messages,
      selected } = this.props;

    const { needLimitMeasure, rowLimit } = this.state;

    events = eventsForWeek(events, week[0], week[week.length - 1], this.props)
    events.sort((a, b) => sortEvents(a, b, this.props))

    return (
      <DateContentRow
        key={weekIdx}
        ref={weekIdx === 0
          ? 'slotRow' : undefined
        }
        container={this.getContainer}
        className='rbc-month-row'
        range={week}
        events={events}
        maxRows={rowLimit}
        selected={selected}
        selectable={selectable}
        messages={messages}

        titleAccessor={titleAccessor}
        startAccessor={startAccessor}
        endAccessor={endAccessor}
        allDayAccessor={allDayAccessor}
        eventPropGetter={eventPropGetter}

        renderHeader={this.readerDateHeading}
        renderForMeasure={needLimitMeasure}

        onShowMore={this.handleShowMore}
        onSelect={this.handleSelectEvent}
        onSelectSlot={this.handleSelectSlot}

        eventComponent={components.event}
        eventWrapperComponent={components.eventWrapper}
        dateCellWrapper={components.dateCellWrapper}
      />
    )
  },

  readerDateHeading({ date, className, ...props }) {
    let { date: currentDate, getDrilldownView, dateFormat, culture  } = this.props;

    let isOffRange = dates.month(date) !== dates.month(currentDate);
    let isCurrent = dates.eq(date, currentDate, 'day');
    let drilldownView = getDrilldownView(date);
    let label = localizer.format(date, dateFormat, culture);

    return (
      <div
        {...props}
        className={cn(
          className,
          isOffRange && 'rbc-off-range',
          isCurrent && 'rbc-current'
        )}
      >
        {drilldownView ? (
          <a
            href='#'
            onClick={e => this.handleHeadingClick(date, drilldownView, e)}
          >
            {label}
          </a>
        ) : (
          <span>
            {label}
          </span>
        )}
      </div>
    )
  },

  _headers(row, format, culture) {
    let first = row[0]
    let last = row[row.length - 1]
    let HeaderComponent = this.props.components.header || Header

    return dates.range(first, last, 'day').map((day, idx) =>
      <div
        key={'header_' + idx}
        className='rbc-header'
        style={segStyle(1, 7)}
      >
        <HeaderComponent
          date={day}
          label={localizer.format(day, format, culture)}
          localizer={localizer}
          format={format}
          culture={culture}
        />
      </div>
    )
  },

  _renderOverlay() {
    let overlay = (this.state && this.state.overlay) || {};
    let { components } = this.props;

    return (
      <Overlay
        rootClose
        placement='bottom'
        container={this}
        show={!!overlay.position}
        onHide={() => this.setState({ overlay: null })}
      >
        <Popup
          {...this.props}
          eventComponent={components.event}
          eventWrapperComponent={components.eventWrapper}
          position={overlay.position}
          events={overlay.events}
          slotStart={overlay.date}
          slotEnd={overlay.end}
          onSelect={this.handleSelectEvent}
        />
      </Overlay>
    )
  },

  measureRowLimit() {
    this.setState({
      needLimitMeasure: false,
      rowLimit: this.refs.slotRow.getRowLimit(),
    })
  },

  handleSelectSlot(range) {
    this._pendingSelection = this._pendingSelection
      .concat(range)

    clearTimeout(this._selectTimer)
    this._selectTimer = setTimeout(()=> this._selectDates())
  },

  handleHeadingClick(date, view, e){
    e.preventDefault();
    this.clearSelection()
    notify(this.props.onDrillDown, [date, view])
  },

  handleSelectEvent(...args){
    this.clearSelection()
    notify(this.props.onSelectEvent, args)
  },

  _selectDates() {
    let slots = this._pendingSelection.slice()

    this._pendingSelection = []

    slots.sort((a, b) => +a - +b)

    notify(this.props.onSelectSlot, {
      slots,
      start: slots[0],
      end: slots[slots.length - 1]
    })
  },

  handleShowMore(events, date, cell, slot) {
    const { popup, onDrillDown, onShowMore, getDrilldownView } = this.props
    //cancel any pending selections so only the event click goes through.
    this.clearSelection()

    if (popup) {
      let position = getPosition(cell, findDOMNode(this));

      this.setState({
        overlay: { date, events, position }
      })
    }
    else {
      notify(onDrillDown, [date, getDrilldownView(date) || views.DAY])
    }

    notify(onShowMore, [events, date, slot])
  },

  clearSelection(){
    clearTimeout(this._selectTimer)
    this._pendingSelection = [];
  }

});

MonthView.navigate = (date, action)=> {
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
