import React, { Component } from 'react';
import cn from 'classnames';
import { findDOMNode } from 'react-dom';

import dates from './utils/dates';
import localizer from './localizer'
import DayColumn from './DayColumn';
import TimeColumn from './TimeColumn';
import Header from './Header';

import getWidth from 'dom-helpers/query/width';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';

import { accessor, dateFormat } from './utils/propTypes';

import { notify } from './utils/helpers';

import { accessor as get } from './utils/accessors';

import { inRange, segStyle, multiSegStyle } from './utils/eventLevels';

export default class MultiTimeGrid extends Component {

  static propTypes = {
    eventMap: React.PropTypes.object.isRequired,
    entities: React.PropTypes.array.isRequired,
    entityKeyAccessor: React.PropTypes.string.isRequired,
    entityNameAccessor: accessor.isRequired,

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
    onDrillDown: React.PropTypes.func,
    getDrilldownView: React.PropTypes.func.isRequired,

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
    this.state = {
      gutterWidth: undefined,
      isOverflowing: null,
      selectedEntityKeys: this.props.entities.map(entity => entity[this.props.entityKeyAccessor])
    };
    this.handleSelectEvent = this.handleSelectEvent.bind(this)
    this.handleHeaderClick = this.handleHeaderClick.bind(this)
    this.setEntityKeyTypeIfNecessary();
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

    this.setEntityKeyTypeIfNecessary();

    // When paginating, reset scroll
    if (
      !dates.eq(nextProps.start, start, 'minute') ||
      !dates.eq(nextProps.scrollToTime, scrollToTime, 'minute')
    ) {
      this.calculateScroll();
    }

  }

  onHeaderSelectChange = ({ target }) => {
    const index = Number(target.getAttribute('data-header-index'));
    const value = this._entityKeyIsNumber ? Number(target.value) : target.value;
    this.setState({ selectedEntityKeys: this.state.selectedEntityKeys.map(
      (selectedEntityKey, i) => i === index ? value : selectedEntityKey
    )});
  }

  render() {
    let {
        eventMap
      , start: date
      , width
      , startAccessor
      , endAccessor
      , allDayAccessor } = this.props;

    const { selectedEntityKeys, gutterWidth } = this.state;

    width = width || gutterWidth;

    this.slots = selectedEntityKeys.length;
    this.rangeEventsMap = {};
    for (const key in eventMap) {
      if (!eventMap.hasOwnProperty(key)) continue;

      const eventsForCurrentKey = eventMap[key];
      eventsForCurrentKey.forEach(event => {
        if (inRange(event, date, date, this.props)) {
          let eStart = get(event, startAccessor)
            , eEnd = get(event, endAccessor);

          if (get(event, allDayAccessor)
              || !dates.eq(eStart, eEnd, 'day')
              || (dates.isJustDate(eStart) && dates.isJustDate(eEnd))) {
            // is an all day event - removed support for all day events for now,
            // but may add it back in the future
            //
          } else {
            if (this.rangeEventsMap[key] === undefined) {
              this.rangeEventsMap[key] = [];
            }
            this.rangeEventsMap[key].push(event);
          }
        }
      });
    }

    let gutterRef = ref => this._gutters[1] = ref && findDOMNode(ref);

    return (
      <div className='rbc-time-view'>
        {this.renderHeader(width, date)}
        <div ref='content' className='rbc-time-content'>
          <div ref='timeIndicator' className='rbc-current-time-indicator' />
          <TimeColumn
            {...this.props}
            showLabels
            style={{ width }}
            ref={gutterRef}
            className='rbc-time-gutter'
          />
          {this.renderEvents(date, this.rangeEventsMap, this.props.now)}
        </div>
      </div>
    );
  }

  renderEvents(date, rangeEventsMap, today){
    let { min, max, endAccessor, startAccessor, components } = this.props;

    return this.state.selectedEntityKeys.map((selectedEntityKey, idx) => {
      let daysEvents = rangeEventsMap[selectedEntityKey] || [];
      daysEvents = daysEvents.filter(
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
          entityKey={selectedEntityKey}
          date={date}
          events={daysEvents}
        />
      )
    })
  }

  renderHeader(width, date) {
    let { rtl } = this.props;
    let { isOverflowing } = this.state || {};

    let style = {};
    if (isOverflowing) {
      style[rtl ? 'marginLeft' : 'marginRight'] = `${scrollbarSize()}px`;
    }

    return (
      <div
        ref={(div) => { this.headerCell = div; }}
        className={cn(
          'rbc-time-header',
          isOverflowing && 'rbc-overflowing'
        )}
        style={style}
      >
        <div className='rbc-row'>
          <div
            ref={(ref) => { this._gutters[0] = ref; }}
            className='rbc-label rbc-header-gutter'
            style={{ width }}
          />
          {this.renderHeaderCells(date)}
        </div>
      </div>
    )
  }

  renderHeaderCells(date) {
    const {
      entities, entityKeyAccessor, entityNameAccessor, dayFormat, culture, components
    } = this.props;

    const HeaderComponent = components.header || Header;

    const entityOptions = entities.map((entity) => (
      <option key={entity[entityKeyAccessor]} value={entity[entityKeyAccessor]}>
        {get(entity, entityNameAccessor)}
      </option>
    ));

    return this.state.selectedEntityKeys.map((selectedEntityKey, i) => {
      const label = (
        <select
          value={selectedEntityKey}
          onChange={this.onHeaderSelectChange}
          data-header-index={i}
        >
          {entityOptions}
        </select>
      );

      return (
        <div
          key={i}
          className={cn(
            'rbc-header',
            dates.isToday(date) && 'rbc-today',
          )}
          style={multiSegStyle(1, this.slots)}
        >
          <span>
            <HeaderComponent
              date={date}
              label={label}
              localizer={localizer}
              format={dayFormat}
              culture={culture}
            />
          </span>
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

  setEntityKeyTypeIfNecessary() {
    if (this._entityKeyIsNumber === undefined) {
      const { entities, entityKeyAccessor } = this.props;

      if (entities.length > 0) {
        const entityKey = entities[0][entityKeyAccessor];
        this._entityKeyIsNumber = typeof entityKey === 'number';
      }
    }
  }
}
