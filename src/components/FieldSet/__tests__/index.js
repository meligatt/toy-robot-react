import React from 'react';
import { shallow } from 'enzyme';
import FieldSet from '../index';

describe('FieldSet', () => {
  describe('When legend prop is passed', () => {
    it('renders a FieldSet legend text', () => {
      const wrapper = shallow(<FieldSet legend = 'LEGEND_MOCK'>child</FieldSet>);
      const legend = wrapper.find('legend').text();
      expect(legend).toContain('LEGEND_MOCK');
    });
  });
  describe('When a child element is passed', () => {
    it('renders a node', () => {
      const wrapper = shallow(<FieldSet legend = 'MOCK_LEGEND'><div>child1</div></FieldSet>);
      expect(wrapper.find('.fieldset__fields').children().length).toBe(1);
    });
  });
});