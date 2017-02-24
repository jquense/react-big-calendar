import { views } from './utils/constants';
import Month from './Month';
import Day from './Day';
import Week from './Week';
import Agenda from './Agenda';
import MultiView from './MultiView';

const VIEWS = {
  [views.MONTH]: Month,
  [views.WEEK]: Week,
  [views.DAY]: Day,
  [views.AGENDA]: Agenda,
  [views.MULTI]: MultiView,
};

export default VIEWS;
