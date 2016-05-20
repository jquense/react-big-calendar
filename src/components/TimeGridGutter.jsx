import React, { PropTypes, Component } from 'react'
import TimeGutter from './TimeGutter.jsx'

export default class TimeGridGutter extends Component {
  static propTypes = {
    gutterProps: PropTypes.shape({...TimeGutter.propTypes})
  }
  
  render() {
    return (
      <div className='rbc-time-content'>
        <TimeGutter {...this.props.gutterProps}/>
      </div>
    )
  }
}

