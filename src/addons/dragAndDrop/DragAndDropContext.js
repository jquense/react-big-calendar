import React from 'react'

const DragAndDropContext = React.createContext({
  onStart: null,
  onEnd: null,
  onBeginAction: null,
  onDropFromOutside: null,
  dragFromOutsideItem: null,
  draggableAccessor: null,
  resizableAccessor: null,
  dragAndDropAction: null,
})

export default DragAndDropContext
