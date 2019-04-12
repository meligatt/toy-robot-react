import React from 'react';
import { shallow } from 'enzyme';
import Button from '../index';

describe('Button', () => {
  describe('When onClick event is executed', () => {
    it('calls onClick callback prop', () => {
      const onClickSpy = jest.fn();
      const wrapper = shallow(<Button label = "position x" onClick = { onClickSpy } />);
      wrapper.find('button').simulate('click');
      expect(onClickSpy).toHaveBeenCalled();
    });
  });
});