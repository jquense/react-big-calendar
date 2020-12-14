import React, { useState } from 'react'

const ExpandContentRow = props => {
  const [maxRows, setMaxRows] = useState(6)

  const handleShowMore = () => {
    setMaxRows(Infinity)
  }

  return React.cloneElement(props.children, {
    onShowMore: handleShowMore,
    maxRows,
  })
}

export default ExpandContentRow
