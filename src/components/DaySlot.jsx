import React, { PropTypes, Component } from 'react'
import { findDOMNode } from 'react-dom'

import SelectableTimeGutter from '../containers/SelectableTimeGutter.jsx'

export default class DaySlot extends Component {
  static propTypes = {
    formatter: PropTypes.func
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
  }

  makeFancy(values, slots, valuelist, nodelist) {
    const nodes = nodelist()
    if (!nodes.length) {
      this.setState({
        selectValue: null,
        selecting: false,
        selectBounds: null
      })
    } else {
      this.setState({
        selectValue: { start: valuelist[0], end: valuelist[valuelist.length - 1] },
        selecting: true,
        selectBounds: { start: nodes[0].bounds,
          end: nodes[nodes.length - 1].bounds,
          length: nodes.length }
      })
    }
  }

  selectorStyle({start, length, end}) {
    if (length === 1) {
      return {
        top: start.top,
        left: start.left,
        height: start.bottom - start.top,
        width: Math.ceil(0.8 * (start.right - start.left))
      }
    }
    return {
      top: start.top,
      left: start.left,
      height: end.bottom - start.top,//(start.bottom - start.top)*length,
      width: Math.ceil(0.8 * (start.right - start.left))
    }
  }

  render() {
    const { min, max, step, slices, isNow } = this.props
    return (
      <div className="rbc-day-slot" style={{...this.props.style}} {...this.props.className}>
        <SelectableTimeGutter selectable={true} constantSelect onSelectSlot={this.makeFancy} hidelabels={true}
                              timesliceClassnames="day-slot" slices={slices}
                              now={new Date()} min={min} max={max} step={step} isNow={isNow}
        />
        {this.state.selecting ?
          <div className="rbc-slot-selection" style={this.selectorStyle(this.state.selectBounds)}>
            <span>{this.props.formatter(this.state.selectValue, this.props.step)}</span>
          </div>
          : ''}
      </div>
    )
  }
}

