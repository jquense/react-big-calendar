/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import DaySlot from '../../src/DayColumn';
import EventWrapper from '../../src/EventWrapper';
import dates from '../../src/utils/dates';

import events from '../factories/events';

describe('<DaySlot />', () => {
  let sandbox;
  let props;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const eventStart = events[0].start;
    props = {
      events,
      step: 30,
      now: eventStart,
      min: dates.startOf(eventStart, 'day'),
      max: dates.endOf(eventStart, 'day'),
      view: 'week',
      allDayAccessor: 'allDay',
      startAccessor: 'start',
      endAccessor: 'end',
      onSelectSlot: sandbox.stub(),
      onSelectEvent: sandbox.stub(),
      eventWrapperComponent: EventWrapper,
    };
  });

  afterEach(() => sandbox.restore());

  describe('on mount', () => {
    it('calls eventPropGetter with the right arguments for each event', () => {
      props.eventPropGetter = sandbox.stub().returns({});
      shallow(<DaySlot {...props} />);

      sinon.assert.calledWith(props.eventPropGetter, events[0], events[0].start, events[0].end, false, 'week');
      sinon.assert.calledWith(props.eventPropGetter, events[1], events[1].start, events[1].end, false, 'week');
    });
  });
});
