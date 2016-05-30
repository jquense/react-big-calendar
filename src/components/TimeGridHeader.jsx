import React, {Component, PropTypes} from 'react'

import localizer from '../localizer'
import { segStyle } from '../utils/eventLevels';
import formats from '../formats.js'

export default class TimeGridHeader extends Component {
  static propTypes = {
    range: PropTypes.arrayOf(React.PropTypes.instanceOf(Date)).isRequired,
    onClick: PropTypes.func,
    formatter: PropTypes.func,
    gutterWidth: PropTypes.number,
    gutterRef: PropTypes.func,
    headerRef: PropTypes.func,
    culture: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired
  }
  static defaultProps = {
    range: [],
    onClick: () => null,
    format: formats.dayFormat,
    gutterRef: () => null
  }

  render() {
    return (
      <div className="rbc-time-header" ref={this.props.headerRef}>
        <div className="rbc-row">
          <div ref={this.props.gutterRef} className='rbc-gutter-cell' style={this.props.gutterWidth ?
          {width: this.props.gutterWidth} : {}} />
          {this.props.range.map((date, i) =>
            <div key={i}
                 className='rbc-header'
                 style={segStyle(1, this.props.range.length)}
            >
              <a href='#' onClick={this.props.onClick.bind(null, date)}>
                { localizer.format(date, this.props.format, this.props.culture) }
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }
}
