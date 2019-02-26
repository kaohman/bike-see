import React from 'react';
import { Header, mapStateToProps, mapDispatchToProps } from './Header';
import { setCurrentCity, setCurrentUser, setFavorites, setStations } from '../../actions';
import { shallow } from 'enzyme';

describe('Header', () => {
  let wrapper;
  let loadingMock;
  let currentCityMock;
  let locationMock;
  let userMock;

  it('should match the correct snapshot when loading', () => {
    locationMock = { pathname: '/'};
    loadingMock = true;
    currentCityMock = '';
    userMock = { name: 'Karin', email: 'k@k', password: 'password' };

    wrapper = shallow(
      <Header
        loading={loadingMock}
        currentCity={currentCityMock}
        location={locationMock}
        user={userMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot when on the home page', () => {
    locationMock = { pathname: '/' };
    loadingMock = false;
    currentCityMock = '';

    wrapper = shallow(
      <Header
        loading={loadingMock}
        currentCity={currentCityMock}
        location={locationMock}
        user={userMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot when on the stations page', () => {
    locationMock = { pathname: '/stations' };
    loadingMock = false;
    currentCityMock = 'Denver';

    wrapper = shallow(
      <Header
        loading={loadingMock}
        currentCity={currentCityMock}
        location={locationMock}
        user={userMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot when on the my-stops page', () => {
    locationMock = { pathname: '/my-stops' };
    loadingMock = false;
    currentCityMock = '';

    wrapper = shallow(
      <Header
        loading={loadingMock}
        currentCity={currentCityMock}
        location={locationMock}
        user={userMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot when on the login page', () => {
    locationMock = { pathname: '/login' };
    loadingMock = false;
    currentCityMock = '';

    wrapper = shallow(
      <Header
        loading={loadingMock}
        currentCity={currentCityMock}
        location={locationMock}
        user={userMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('signOut', () => {
    let wrapper;
    let mockSetCurrentUser;
    let mockSetCurrentCity;
    let mockSetStations;
    let mockSetFavorites;

    beforeEach(() => {
      mockSetCurrentUser = jest.fn();
      mockSetCurrentCity = jest.fn();
      mockSetStations = jest.fn();
      mockSetFavorites = jest.fn();

      wrapper = shallow(
        <Header
          loading={loadingMock}
          currentCity={currentCityMock}
          location={locationMock}
          user={userMock}
          setCurrentUser={mockSetCurrentUser}
          setCurrentCity={mockSetCurrentCity}
          setStations={mockSetStations}
          setFavorites={mockSetFavorites}
        />
      )
    });

    it('should call setCurrentUser', () => {
      wrapper.find('#sign-out').simulate('click');
      expect(mockSetCurrentUser).toHaveBeenCalled();
    });

    it('should call setCurrentCity', () => {
      wrapper.find('#sign-out').simulate('click');
      expect(mockSetCurrentCity).toHaveBeenCalled();
    });

    it('should call setStations', () => {
      wrapper.find('#sign-out').simulate('click');
      expect(mockSetStations).toHaveBeenCalled();
    });

    it('should call setFavorites', () => {
      wrapper.find('#sign-out').simulate('click');
      expect(mockSetFavorites).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object of props', () => {
      const mockState = {
        loading: true,
        currentCity: 'Denver',
        otherState: false,
      };
      const expected = {
        loading: true,
        currentCity: 'Denver',
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when setCurrentUser is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setCurrentUser();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setCurrentUser();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when setCurrentCity is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setCurrentCity();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setCurrentCity();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when setStations is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setStations();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setStations();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when setFavorites is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setFavorites();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setFavorites();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});