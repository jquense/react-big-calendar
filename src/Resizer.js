import React                from 'react';
import { findDOMNode }      from 'react-dom';
import events               from 'dom-helpers/events';
import { notify }           from './utils/helpers';
import dates                from './utils/dates';
import { positionFromDate } from './utils/dayViewLayout';

let addEventListener = (type, handler) => {
  events.on(document, type, handler)
  return {
    remove(){ events.off(document, type, handler) }
  }
}
let snapToSlot = (date, step) => {
  var roundTo = 1000 * 60 * step;
  return new Date(Math.floor(date.getTime() / roundTo) * roundTo)
}

let minToDate = (min, date) => {
  var dt = new Date(date)
    , totalMins = dates.diff(dates.startOf(date, 'day'), date, 'minutes');

  dt = dates.hours(dt, 0);
  dt = dates.minutes(dt, totalMins + min);
  dt = dates.seconds(dt, 0)
  return dates.milliseconds(dt, 0)
}

const clickTolerance = 5;

class Resizer extends React.Component {

  constructor({resizable}){
    super();

    if(!resizable){
      return;
    }

    this._mouseDown = this._mouseDown.bind(this)
    this._mouseMove = this._mouseMove.bind(this)
    this._mouseUp   = this._mouseUp.bind(this)
  }

  componentWillUnmount(){
    this._onMouseUpListener && this._onMouseUpListener.remove();
    this._onMouseMoveListener && this._onMouseMoveListener.remove();
  }

  _mouseDown (e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    // Right clicks
    if(e.which === 3 || e.button === 2){
      return;
    }

    this._mouseDownData = {
      x: e.pageX,
      y: e.pageY,
      clientX: e.clientX,
      clientY: e.clientY
    }

    if(typeof this.props.onResizeInit === 'function'){
      let result = this.props.onResizeInit({
        eventData:    this.props.event,
        boundingNode: this.props.boundingNode,
        mouseData:    this._mouseDownData
      });

      if (result === false)
        return;
    }

    this._onMouseUpListener   = addEventListener('mouseup',   this._mouseUp)
    this._onMouseMoveListener = addEventListener('mousemove', this._mouseMove)
  }
  _mouseUp(e) {

    this._onMouseUpListener && this._onMouseUpListener.remove();
    this._onMouseMoveListener && this._onMouseMoveListener.remove();

    if (!this._mouseDownData) return;

    var inRoot = !this.container || contains(this.container(), e.target);
    var bounds = this._resizeRect;
    var click = this.isClick(e.pageX, e.pageY);

    this._mouseDownData = null

    if(!click){
      if(typeof this.props.onResizeEnd === 'function'){
        this.props.onResizeEnd({
          eventData:    this.props.event,
          boundingNode: this.props.boundingNode,
          mouseData:    this._mouseDownData
        });
      }
    }
  }

  _mouseMove(e) {
    var { x, y } = this._mouseDownData;
    var w = Math.abs(x - e.pageX);
    var h = Math.abs(y - e.pageY);

    let left = Math.min(e.pageX, x)
      , top = Math.min(e.pageY, y);

    if (!this.isClick(e.pageX, e.pageY)){
      let box = {
        top,
        left,
        x: e.pageX,
        y: e.pageY,
        right: left + w,
        bottom: top + h
      };

      let resizingUpdate = ({ y }) => {
        let { step, min, max } = this.props;
        let { top, bottom } = getBoundsForNode(findDOMNode(this.props.boundingNode))

        let mins = this._totalMin;

        let range = Math.abs(top - bottom)

        let current = (y - top) / range;

        current = snapToSlot(minToDate(mins * current, min), step)

        let end = dates.min(max, dates.max(current))
        // this is what gets passed to the onResizing prop
        return {
          originalEvent: this.props.event,
          startDate:     this.props.event.start,
          endDate:       end
        };
      }

      if(typeof this.props.onResizing === 'function'){
        let udpate     = resizingUpdate(box);

        this.props.onResizing({
          ...udpate
        });
      }
    }
  }

  isClick(pageX, pageY){
    var { x, y } = this._mouseDownData;
    return (
      Math.abs(pageX - x) <= clickTolerance &&
      Math.abs(pageY - y) <= clickTolerance
    );
  }

  render(){

    const {
      min,
      max
    } = this.props

    this._totalMin = dates.diff(min, max, 'minutes')

    return (
      <span className='rbc-event-risizer' onMouseDown={this._mouseDown}>=</span>
    );
  }
}



/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
export function getBoundsForNode(node) {
  if (!node.getBoundingClientRect) return node;

  var rect = node.getBoundingClientRect()
    , left = rect.left + pageOffset('left')
    , top = rect.top + pageOffset('top');

  return {
    top,
    left,
    right: (node.offsetWidth || 0) + left,
    bottom: (node.offsetHeight || 0) + top
  };
}

function pageOffset(dir) {
  if (dir === 'left')
    return (window.pageXOffset || document.body.scrollLeft || 0)
  if (dir === 'top')
    return (window.pageYOffset || document.body.scrollTop || 0)
}

export default Resizer
