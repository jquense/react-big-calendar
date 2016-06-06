import Selectable from './Selectable.jsx'
import TimeSlice from '../components/TimeSlice.jsx'

const SelectableTimeSlice = Selectable(TimeSlice, {
  key: (props) => props.value.toString(),
  value: (props) => props.value
})

export default SelectableTimeSlice
