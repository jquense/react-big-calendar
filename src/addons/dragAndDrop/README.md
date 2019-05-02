### Drag and Drop

```js
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

const DraggableCalendar = withDragAndDrop(BigCalendar)

/* ... */

return (
  <DraggableCalendar
    localizer={myLocalizer}
    events={events}
    draggableAccessor={event => true}
  />
)
```
