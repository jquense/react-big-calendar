/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Month from '../../src/Month';
import EventWrapper from '../../src/EventWrapper';
import BackgroundWrapper from '../../src/BackgroundWrapper';
import DateContentRow from '../../src/DateContentRow';

import events from '../factories/events';

describe('<Month />', () => {
  let sandbox;
  let props;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    props = {
      events,
      date: events[0].start,
      allDayAccessor: 'allDay',
      startAccessor: 'start',
      endAccessor: 'end',
      titleAccessor: 'title',
      getDrilldownView: sandbox.stub(),
      components: {
        eventWrapper: EventWrapper,
        dateCellWrapper: BackgroundWrapper,
      },
    };
  });

  afterEach(() => sandbox.restore());

  describe('on mount', () => {
    it('passes the right view to the date content rows', () => {
      const wrapper = mount(<Month {...props} />);

      wrapper.find(DateContentRow).forEach((dateContentRow) => {
        expect(dateContentRow).to.have.prop('view', 'month');
      });
    });
  });
});
