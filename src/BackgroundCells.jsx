import React from 'react';
import { segStyle } from './utils/eventLevels';

class DisplayCells {
  render(){
    let { slots } = this.props;

    let children = [];

    for (var i = 0; i < slots; i++) {
      children.push(
        <div
          key={'bg_' + i}
          className={'rbc-day-bg'}
          style={segStyle(1, slots)}
        />
      )
    }

    return (
      <div className='rbc-row-bg'>
        { children }
      </div>
    )
  }
}

export default DisplayCells;
