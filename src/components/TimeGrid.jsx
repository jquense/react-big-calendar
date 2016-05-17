import React, {PropTypes} from 'react'

const TimeGrid = ({param = 'default'}) => {
  return (
    <div>
      {param}
    </div>
  )
}


TimeGrid.propTypes = {
  param: PropTypes.string.isRequired
}

export default TimeGrid
