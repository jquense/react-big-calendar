import React from 'react';
import cn from 'classnames';
import dates from './utils/dates';
import localizer from './utils/localizer'
import chunk from 'lodash/array/chunk';
import omit from 'lodash/object/omit';

import { instanceId } from './utils/helpers';
import getHeight from 'dom-helpers/query/height';

import EventRow from './EventRow';
import BackgroundCells from './BackgroundCells';
import { accessor, elementType, dateFormat } from './utils/propTypes';
import { segStyle, inRange, eventSegments, eventLevels, sortEvents } from './utils/eventLevels';

function eventsForWeek(evts, start, end){
  return evts.filter( e => inRange(e, start, end))
}

let propTypes = {
  culture: React.PropTypes.string,

  date: React.PropTypes.instanceOf(Date),

  min: React.PropTypes.instanceOf(Date),
  max: React.PropTypes.instanceOf(Date),

  dateFormat,
  weekdayFormat: dateFormat,

  onChange: React.PropTypes.func.isRequired
};


let MonthView = React.createClass({

  displayName: 'MonthView',

  propTypes,

  getDefaultProps() {
    return {
      allDayField: 'allDay'
    };
  },

  getInitialState(){
    return { rowLimit: 5 }
  },

  componentWillMount() {
    this._needLimitMeasure = true;
  },

  componentDidMount() {
    this._measureRowLimit(this.props)
  },

  render(){
    var { date, culture, weekdayFormat } = this.props
      , month = dates.visibleDays(date, culture)
      , rows  = chunk(month, 7);

    let measure = this._needLimitMeasure

    this._rowCount = rows.length;

    var elementProps = omit(this.props, Object.keys(propTypes));

    return (
      <div
        {...elementProps}
        className={cn('rbc-month-view', elementProps.className)}
      >
        <div className='rbc-row rbc-month-header'>
          {this._headers(weekdayFormat, culture)}
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
    let evts = eventsForWeek(this.props.events, row[0], row[row.length - 1])

    evts.sort(sortEvents, this.props.allDayField)

    let segments = evts = evts.map(evt => eventSegments(evt, first, last))
    let levels = eventLevels(segments)

    let limit = this.state.rowLimit;
    let renderableLevels = levels.slice(0, limit)
    let hiddenLevels = levels.slice(limit)

    return (
      <div key={'week_' + rowIdx}
        className='rbc-month-row'
        ref={!rowIdx && (r => this._firstRow = r)}
      >
        <div className='rbc-row-bg'>
          {this.renderBackground()}
        </div>

        <div className='rbc-row-content'>
          <div
            className='rbc-row'
            ref={!rowIdx && (r => this._firstDateRow = r)}
          >
            { this._dates(row) }
          </div>
          {
            content
              ? content(renderableLevels, row, rowIdx)
              : renderableLevels.map((l, idx) => this.renderRowLevel(l, row, idx))
          }
          {
            !!hiddenLevels.length
              && this.renderShowMore(hiddenLevels)
          }
        </div>
      </div>
    )
  },

  renderRowLevel(segments, week, idx){
    let first = week[0]
    let last = week[week.length - 1]

    return (
      <EventRow
        key={idx}
        segments={segments}
        start={first}
        end={last}
        onEventClick={this.props.onEventClick}
      />
    )
  },

  renderBackground(row){
    return <BackgroundCells slots={7}/>
  },

  renderShowMore(levels){
    let slots = [1, 3, 4, 5, 6, 7];

    return slots.map((slot, idx) => {
      let sum = levels.reduce((cnt, level) => {
        if (level.some(seg => seg.left <= slot && seg.right >= slot))
          return cnt + 1;
        return cnt
      }, 0)

      return sum
        ? <a key={'sm_' + idx} href='#' className={'rbc-show-more rbc-show-offset-' + slot}>{'show ' + sum + ' more'}</a>
        : false
    })
  },

  _dates(row){
    return row.map((day, colIdx) => {
      var offRange = dates.month(day) !== dates.month(this.props.date);

      return (
        <div
          key={'header_' + colIdx}
          className={cn('rbc-date-cell', {'rbc-off-range': offRange })}
        >
          {
            localizer.format(day, this.props.dateFormat, this.props.culture)
          }
        </div>
      )
    })
  },

  _headers(format, culture){
    return [0, 1, 2, 3, 4, 5, 6].map( (day) =>
      <div
        key={'header_' + day }
        className='rbc-month-header-cell'
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
        <div style={segStyle(1, 7)}>
          <div ref={r => this._measureEvent = r} className={cn('rbc-measure-event')}>&nbsp;</div>
        </div>
      </div>
    ) : <span/>
  },

  _measureRowLimit(props) {
    let eventHeight = getHeight(this._measureEvent);
    let labelHeight = getHeight(this._firstDateRow);
    let eventSpace = getHeight(this._firstRow) - labelHeight;

    this._needLimitMeasure = false;

    this.setState({
      rowLimit: Math.max(
        Math.floor(eventSpace / eventHeight), 1)
    })
  }

});

export default MonthView
