// dummy colors - not necessarily actual elation colors
const BLUE = '#3174ad';
const LIGHTBLUE = '#ebf3f9';
const MEDBLUE = '#bfdfff';
const DEEPBLUE = '#b4d8ff';

const styles = {
  regularAppointment: {
    color: '#333',
    backgroundColor: BLUE,
    borderRadius: 0,
    paddingLeft: 20
  },

  openSlot: {
    color: '#333',
    background: `repeating-linear-gradient(-45deg, ${LIGHTBLUE}, ${LIGHTBLUE} 7px, #fff 7px, #fff 14px)`,
    borderRadius: 0,
    paddingLeft: 20
  },

  filledSlot: {
    color: '#333',
    background: `repeating-linear-gradient(-45deg, ${DEEPBLUE}, ${DEEPBLUE} 7px, ${MEDBLUE} 7px, ${MEDBLUE} 14px)`,
    borderRadius: 0,
    paddingLeft: 20
  }
}

function isOpenSlot(event) {
  // dummy condition just for demo
  return event._patientName === 'Kevin Durant';
}

function isFilledSlot(event) {
  // dummy condition just for demo
  return event._patientName === 'Savannah Banana';
}

export default function eventStyler(event, start, end, isSelected) {
  if (isOpenSlot(event)) {
    return { style: styles.openSlot };
  } else if (isFilledSlot(event)) {
    return { style: styles.filledSlot };
  } else {
    return { style: styles.regularAppointment };
  }
}
