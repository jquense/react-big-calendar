### Drag and Drop

Creates a higher-order component (HOC) supporting drag & drop for moving and/or resizing of events:

```js
import { Calendar } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

const DnDCalendar = withDragAndDrop(Calendar)

/* ... */

return (
  <DnDCalendar
    localizer={myLocalizer}
    events={events}
    draggableAccessor={event => true}
  />
)
```

Set `resizable` to false in your calendar if you don't want events to be resizable.
`resizable` is set to true by default.

The HOC adds `onEventDrop`, `onEventResize`, and `onDragStart` callback properties if the events are
moved or resized. These callbacks are called with these signatures:

```js
   function onEventDrop({ event, start, end, allDay }) {...}
   function onEventResize(type, { event, start, end, allDay }) {...}  // type is always 'drop'
   function onDragStart({ event, action, direction }) {...}
```

Moving and resizing of events has some subtlety which one should be aware of:

- In some situations, non-allDay events are displayed in "row" format where they
  are rendered horizontally. This is the case for ALL events in a month view. It
  is also occurs with multi-day events in a day or week view (unless `showMultiDayTimes`
  is set).

- When dropping or resizing non-allDay events into a the header area or when
  resizing them horizontally because they are displayed in row format, their
  times are preserved, only their date is changed.

- If you care about these corner cases, you can examine the `allDay` param suppled
  in the callback to determine how the user dropped or resized the event.

Additionally, this HOC adds the callback props `onDropFromOutside` and `onDragOver`:

- By default, the calendar will not respond to outside draggable items being dropped
  onto it. However, if `onDropFromOutside` callback is passed, then when draggable
  DOM elements are dropped on the calendar, the callback will fire, receiving an
  object with start and end times, and an allDay boolean.

- If `onDropFromOutside` is passed, but `onDragOver` is not, any draggable event will be
  droppable onto the calendar by default. On the other hand, if an `onDragOver` callback
  _is_ passed, then it can discriminate as to whether a draggable item is droppable on the
  calendar. To designate a draggable item as droppable, call `event.preventDefault`
  inside `onDragOver`. If `event.preventDefault` is not called in the `onDragOver`
  callback, then the draggable item will not be droppable on the calendar.

```js
   function onDropFromOutside({ start, end, allDay }) {...}
   function onDragOver(DragEvent: event) {...}
```
