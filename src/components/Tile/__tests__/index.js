import React from 'react';
import { shallow } from 'enzyme';
import Tile from '../index';

describe('Tile', () => {
  describe('When show prop is true', () => {
    it('renders a tile with the robot', () => {
      const wrapper = shallow(<Tile show = { true } direction = "NORTH" />);
      const text = wrapper.text();
      expect(text).toContain('robot facing NORTH');
    });
  });
  describe('When show prop is false', () => {
    it('renders an empty tile', () => {
      const wrapper = shallow(<Tile show = { false } direction = "NORTH" />);
      const text = wrapper.text();
      expect(text).toContain('no robot');
    });
  });
});