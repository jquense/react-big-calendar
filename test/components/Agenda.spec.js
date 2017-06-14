/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Agenda from '../../src/Agenda';

describe('<Agenda />', () => {
  let props;
  let sandbox;
  let titleAccessor;
  let allDayAccessor;
  let startAccessor;
  let endAccessor;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    titleAccessor = sandbox.stub();
    allDayAccessor = sandbox.stub();
    startAccessor = sandbox.stub();
    endAccessor = sandbox.stub();

    props = {
      events: [],
      components: {},
      titleAccessor,
      allDayAccessor,
      startAccessor,
      endAccessor,
    };
  });

  describe('Agenda.range', () => {
    it('returns an array of start date and end date', () => {
      const start = new Date(2017, 6, 1);
      const end = new Date(2017, 6, 11);
      const length = 10;

      const result = Agenda.range(start, { length });

      expect(result).to.deep.equal([start, end]);
    });

    it('use default length of 30', () => {
      const start = new Date(2017, 5, 1);
      const end = new Date(2017, 5, 31);

      const result = Agenda.range(start, {});

      expect(result).to.deep.equal([start, end]);
    });
  });
});