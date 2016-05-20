import Selectable from './Selectable.jsx'
import TimeSlice from '../components/TimeSlice.jsx'

const SelectableTimeSlice = Selectable(TimeSlice, {
  key: (props) => props.time().toString(),
  value: (props) => props.time()
})

export default SelectableTimeSlice
