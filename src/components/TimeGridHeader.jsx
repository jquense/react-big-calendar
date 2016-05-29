import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import { segStyle } from '../utils/eventLevels';

export default class TimeGridHeader extends Component {
  static propTypes = {
    range: PropTypes.arrayOf(React.PropTypes.instanceOf(Date)).isRequired,
    onClick: PropTypes.func,
    formatter: PropTypes.func,
    gutterWidth: PropTypes.number,
    gutterRef: PropTypes.func
  }
  static defaultProps = {
    range: [],
    onClick: () => null,
    formatter: (date) => moment(date).format('ddd D/M'),
    gutterRef: () => null
  }

  render() {
    return (
      <div className="rbc-time-header">
        <div className="rbc-row">
          <div ref={this.props.gutterRef} className='rbc-gutter-cell' style={this.props.gutterWidth ?
          {width: this.props.gutterWidth} : {}} />
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
