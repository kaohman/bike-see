import React from 'react';
import { App, mapDispatchToProps } from './App';
import { shallow } from 'enzyme';
import { fetchExistingUser } from '../../thunks/fetchExistingUser';
jest.mock('../../thunks/fetchExistingUser');

describe('App', () => {
  let wrapper;
  let fetchExistingUserMock;

  beforeEach(() => {
    fetchExistingUserMock = jest.fn();
    wrapper = shallow(
      <App
        fetchExistingUser={fetchExistingUserMock}
      />
    )
  });

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('should call getCurrentUser', () => {
      wrapper.instance().getCurrentUser = jest.fn();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().getCurrentUser).toHaveBeenCalled();
    });
  });

  describe('getCurrentUser', () => {
    it('should fetch user if it exists in local storage', () => {
      const mockUser = { id: '1', name: 'Karin' };
      localStorage.setItem('bike-user', JSON.stringify(mockUser));
      wrapper.instance().getCurrentUser();
      expect(wrapper.instance().props.fetchExistingUser)
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when fetchExistingUser is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchExistingUser();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchExistingUser();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});