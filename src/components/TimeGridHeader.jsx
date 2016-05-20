import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import { segStyle } from '../utils/eventLevels';

export default class TimeGridHeader extends Component {
  static propTypes = {
    range: PropTypes.arrayOf(React.PropTypes.instanceOf(Date)).isRequired,
    onClick: PropTypes.func,
    formatter: PropTypes.func,
    gutterwidth: PropTypes.number
  }
  static defaultProps = {
    range: [],
    onClick: () => null,
    formatter: (date) => moment(date).format('ddd D/M'),
    gutterwidth: 70
  }

  render() {
    return (
      <div className="rbc-time-header">
        <div className="rbc-row">
          <div className='rbc-gutter-cell' style={{width: this.props.gutterwidth }} />
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
