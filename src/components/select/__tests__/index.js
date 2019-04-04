import React from 'react';
import { shallow } from 'enzyme';
import Select from '../index';

describe('Select', () => {
  describe('When onBlur event is executed', () => {
    it('calls onBlur callback prop', () => {
      const optionsMock = [  {title:'1', value:0}, {title:'2', value:1} ];
      const onBlurSpy = jest.fn();
      const eventMock = {target: { id: 'MOCK_ID', value: '0'}};
      
      const wrapper = shallow(<Select 
        label = "position x"
        name = "robotPosX"
        id = "robotPosX"
        value = { 2 }
        options = { optionsMock  }
        onBlur = { onBlurSpy } />);
      wrapper.find('select').simulate('blur', eventMock);
      
      expect(onBlurSpy).toHaveBeenCalledWith({target: { id: 'MOCK_ID', value: '0'}});
    });
  });
});
