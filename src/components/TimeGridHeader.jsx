import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import { segStyle } from '../utils/eventLevels';


export default class TimeGridHeader extends Component {
  render() {
    return (
      <div className="rbc-time-header">
        <div className="rbc-row">
          {this.props.range.map((date, i) =>
            <div key={i}
                 className='rbc-header'
                 style={segStyle(1, this.props.range.length)}
            >
              <a href='#' onClick={this.props.onClick.bind(null, date)}>
                { this.props.formatter(date) }
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }
}

TimeGridHeader.defaultProps = {
  range: [],
  onClick: () => null,
  formatter: (date) => moment(date).format('ddd D/M')
}

TimeGridHeader.propTypes = {
  range: PropTypes.arrayOf(React.PropTypes.instanceOf(Date)).isRequired,
  onClick: PropTypes.func,
  formatter: PropTypes.func
}

export default TimeGridHeader
