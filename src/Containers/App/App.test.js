import React from 'react';
import { App, mapDispatchToProps } from './App';
import { shallow } from 'enzyme';
import { fetchCities } from '../../thunks/fetchCities';
import { fetchUser } from '../../thunks/fetchUser';
jest.mock('../../thunks/fetchCities');
jest.mock('../../thunks/fetchUser');

describe('App', () => {
  let wrapper;
  let fetchCitiesMock;
  let fetchUserMock;

  beforeEach(() => {
    fetchCitiesMock = jest.fn();
    fetchUserMock = jest.fn();
    wrapper = shallow(
      <App
        fetchCities={fetchCitiesMock}
        fetchUser={fetchUserMock}
      />
    )
  });

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('should call fetchCities', () => {
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().props.fetchCities).toHaveBeenCalled();
    });

    it('should call getCurrentUser', () => {
      wrapper.instance().getCurrentUser = jest.fn();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().getCurrentUser).toHaveBeenCalled();
    });
  });

  describe('getCurrentUser', () => {
    it('should fetch user if it exists in local storage', () => {
      const mockUser = { id: '1', name: 'Karin', email: 'k@k', password: 'password'};
      localStorage.setItem('bike-user', JSON.stringify(mockUser));
      wrapper.instance().getCurrentUser();
      expect(wrapper.instance().props.fetchUser)
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when fetchCities is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchCities();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchCities();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when fetchUser is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchUser();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchUser();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});