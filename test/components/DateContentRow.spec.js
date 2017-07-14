/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import DateContentRow from '../../src/DateContentRow';
import EventWrapper from '../../src/EventWrapper';
import EventRow from '../../src/EventRow';
import dates from '../../src/utils/dates';

import events from '../factories/events';

describe('<DateContentRow />', () => {
  let sandbox;
  let props;
  let range;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const eventStart = events[0].start;
    range = [
      dates.subtract(eventStart, 1, 'day'),
      eventStart,
      dates.add(eventStart, 1, 'day')
    ];
    props = {
      events,
      range,
      view: 'month',
      startAccessor: sandbox.stub(),
      endAccessor: sandbox.stub(),
      eventWrapperComponent: EventWrapper,
    };
  });

  afterEach(() => sandbox.restore());

  describe('on mount', () => {
    it('passes the view prop to the event rows', () => {
      const wrapper = shallow(<DateContentRow {...props} />);
      const eventRows = wrapper.find(EventRow);

      eventRows.forEach((eventRow) => {
        expect(eventRow).to.have.prop('view', 'month');
      });
    });
  });
});
