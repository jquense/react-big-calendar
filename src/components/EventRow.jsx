import React, { PropTypes, Component } from 'react'

export default class EventRow extends Component {
  static propTypes = {
    param: PropTypes.string.isRequired
  }
  
  render() {
    return (
      <div>
        {param}
      </div>
    )
  }
}

