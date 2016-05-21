import React, { PropTypes, Component } from 'react'
import { findDOMNode } from 'react-dom'
import DayCells from './DayCells.jsx'
import Selection from '../containers/Selection.jsx'
import getBoundsForNode from '../utils/getBoundsForNode.js'

class Div extends Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

const Wrapper = Selection(Div)

export default class DaySlot extends Component {
  static propTypes = {
    ...DayCells.propTypes,
    formatter: PropTypes.func
  }

  static defaultProps = {
    ...DayCells.defaultProps
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
        selectBounds: { start: getBoundsForNode(findDOMNode(nodes[0])),
          end: getBoundsForNode(findDOMNode(nodes[nodes.length - 1])) }
      })
    }
  }

  selectorStyle({start, end}) {
    if (start.top == end.top) {
      return {
        top: start.top,
        left: start.left - 8,
        height: start.bottom - start.top,
        width: Math.ceil(0.8 * (start.right - start.left))
      }
    }
    return {
      top: start.top,
      left: start.left - 8,
      height: end.top - start.top,
      width: Math.ceil(0.8 * (start.right - start.left))
    }
  }

  render() {
    return (
      <div className="rbc-day-slot" style={{...this.props.style}} {...this.props.className}>
        <Wrapper selectable constantSelect onSelectSlot={this.makeFancy}>
          <DayCells {...this.props} />
        </Wrapper>
        {this.state.selecting ?
          <div className="rbc-slot-selection" style={this.selectorStyle(this.state.selectBounds)}>
            <span>{this.props.formatter(this.state.selectValue, this.props.step)}</span>
          </div>
        : ''}
      </div>
    )
  }
}

