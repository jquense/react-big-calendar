/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TimeGrid from '../../src/TimeGrid';
import DateContentRow from '../../src/DateContentRow';
import DayColumn from '../../src/DayColumn';
import EventWrapper from '../../src/EventWrapper';
import Week from '../../src/Week';

import events from '../factories/events';

describe('<TimeGrid />', () => {
  let props;
  let sandbox;
  let titleAccessor;
  let allDayAccessor;
  let startAccessor;
  let endAccessor;
  let getDrilldownView;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    titleAccessor = sandbox.stub();
    allDayAccessor = sandbox.stub();
    startAccessor = sandbox.stub();
    endAccessor = sandbox.stub();
    getDrilldownView = sandbox.stub().returns('agenda');

    props = {
      events,
      components: {
        eventWrapper: EventWrapper,
      },
      range: Week.range(events[0].start, {}),
      titleAccessor,
      allDayAccessor,
      startAccessor,
      endAccessor,
      getDrilldownView,
      allDayEventsLimit: 10,
      view: 'week',
      onSelectSlot: sandbox.stub(),
      onSelectEvent: sandbox.stub(),
    };
  });

  afterEach(() => sandbox.restore());

  describe('on componentDidMount', () => {
    it('passes view prop to DateContentRow', () => {
      const wrapper = shallow(<TimeGrid {...props} />);
      const contentRow = wrapper.find(DateContentRow);

      expect(contentRow).to.have.prop('view', 'week');
    });

    it('passes view prop to DayColumn', () => {
      const wrapper = shallow(<TimeGrid {...props} />);

      wrapper.find(DayColumn).forEach((dayColumn) => {
        expect(dayColumn).to.have.prop('view', 'week');
      });
    });
  });
});
