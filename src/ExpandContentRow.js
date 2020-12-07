import React, { useState } from 'react'

const ExpandContentRow = props => {
  const [maxRows, setMaxRows] = useState(3)

  const handleShowMore = () => {
    setMaxRows(Infinity)
  }

  return React.cloneElement(props.children, {
    onShowMore: handleShowMore,
    maxRows,
  })
}

export default ExpandContentRow
