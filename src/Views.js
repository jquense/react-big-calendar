import { views } from './utils/constants';
import Month from './Month';
import Day from './Day';
import Week from './Week';
import Agenda from './Agenda';
import Resource from './Resource';

const VIEWS = {
  [views.MONTH]: Month,
  [views.WEEK]: Week,
  [views.DAY]: Day,
  [views.AGENDA]: Agenda,
  [views.RESOURCE]: Resource
};

export default VIEWS;
