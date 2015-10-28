import { views } from './utils/constants';
import Month from './Month';
import Day from './Day';
import Week from './Week';
import Agenda from './Agenda';

const VIEWS = {
  [views.MONTH]: Month,
  [views.WEEK]: Week,
  [views.DAY]: Day,
  [views.AGENDA]: Agenda
};

export default VIEWS;
