import { navigate } from './constants';

export default function moveDate(action, date, View){
  switch (action){
    case navigate.TODAY:
      date = new Date()
      break;
    case navigate.DATE:
      break;
    default:
      date = View.navigate(date, action)
  }

  return date
}
