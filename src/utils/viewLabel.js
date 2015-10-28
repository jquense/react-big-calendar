import { views } from './constants';
import defaultFormats from '../formats';
import localizer from '../localizer';

import VIEWS from '../Views';

const Formats = {
  [views.MONTH]: 'monthHeaderFormat',
  [views.WEEK]: 'dayRangeHeaderFormat',
  [views.DAY]: 'dayHeaderFormat',
  [views.AGENDA]: 'agendaHeaderFormat'
}

export default function viewLabel(date, view, formats, culture){
  let View = VIEWS[view];
  let headerSingle = view === views.MONTH || view === views.DAY

  formats = defaultFormats(formats || {})

  let headerFormat = formats[Formats[view]];

  return headerSingle
    ? localizer.format(date, headerFormat, culture)
    : localizer.format(View.range(date, { culture }), headerFormat, culture)
}
