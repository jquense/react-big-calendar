import { navigate } from './constants';
import VIEWS from '../Views';

export default function moveDate(action, date, view){
  switch (action){
    case navigate.TODAY:
      date = new Date()
      break;
    case navigate.DATE:
      break;
    default:
      date = VIEWS[view].navigate(date, action)
  }

  return date
}
