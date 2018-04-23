import PropTypes from 'prop-types'
import React from 'react'

class EventWrapper extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div
        ref={this.setEventRef}
        onMouseEnter={
          this.props.event.onMouseEnter
            ? this.props.event.onMouseEnter.bind(null, this.props.event)
            : null
        }
        onMouseLeave={
          this.props.event.onMouseLeave
            ? this.props.event.onMouseLeave.bind(null, this.props.event)
            : null
        }
      >
        {this.props.children}
      </div>
    )
  }
}

export default EventWrapper
