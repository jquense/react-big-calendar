/* eslint-env mocha */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';

import Calendar from '../../src/index';
import events from '../factories/events';

describe('<Calendar />', () => {
  let props;

  beforeEach(() => {
    props = {
      events: [],
      views: ['month', 'week', 'day'],
      defaultDate: new Date(2015, 3, 1),
    };
    Calendar.setLocalizer(Calendar.momentLocalizer(moment));
  });

  describe('on componentDidMount', () => {
    it('has allDayEventsLimit prop', () => {
      props.allDayEventsLimit = 3;
      const wrapper = shallow(<Calendar {...props} />);

      expect(wrapper).to.have.prop('allDayEventsLimit', 3);   
    });

    it('has allDayEventsLimit default value', () => {
      const wrapper = shallow(<Calendar {...props} />);

      expect(wrapper).to.have.prop('allDayEventsLimit', 5);
    })
  })
});