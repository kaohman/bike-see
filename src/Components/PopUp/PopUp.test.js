import React from 'react';
import PopUp from './PopUp';
import { shallow } from 'enzyme';

describe('PopUp', () => {
  let wrapper;
  let mockHistory;
  let mockTitle;

  beforeEach(() => {
    mockHistory = {replace: jest.fn()};
    mockTitle = 'User Login';
    wrapper = shallow(
      <PopUp 
        history={mockHistory}
        title={mockTitle}
      />
    )
  });

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call history.replace on click', () => {
    wrapper.find('.close-icon').simulate('click');
    expect(mockHistory.replace).toHaveBeenCalled();
  });
});