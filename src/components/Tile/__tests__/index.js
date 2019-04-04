import React from 'react';
import { shallow } from 'enzyme';
import Tile from '../index';

describe('Tile', () => {
  describe('When show prop is true', () => {
    it('renders a tile with the robot', () => {
      const wrapper = shallow(<Tile show = { true } direction = "NORTH" />);
      expect(wrapper.find('.tile-full--facing-north')).toHaveLength(1);
    });
  });
  describe('When show prop is false', () => {
    it('renders an empty tile', () => {
      const wrapper = shallow(<Tile show = { false } direction = "NORTH" />);
      expect(wrapper.find('.tile')).toHaveLength(1);
    });
  });
});