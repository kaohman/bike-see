import React from 'react';
import { PopUp, mapDispatchToProps } from './PopUp';
import { shallow } from 'enzyme';
import { setError } from '../../actions';

describe('PopUp', () => {
  let wrapper;
  let mockHistory;
  let mockTitle;
  let mockSetError;

  beforeEach(() => {
    mockHistory = {replace: jest.fn()};
    mockTitle = 'User Login';
    mockSetError = jest.fn();
    wrapper = shallow(
      <PopUp 
        history={mockHistory}
        title={mockTitle}
        setError={mockSetError}
      />
    )
  });

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call setError on click', () => {
    wrapper.find('.close-icon').simulate('click');
    expect(mockSetError).toHaveBeenCalled();
  });

  it('should call history.replace on click', () => {
    wrapper.find('.close-icon').simulate('click');
    expect(mockHistory.replace).toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when setError is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setError();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setError();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});