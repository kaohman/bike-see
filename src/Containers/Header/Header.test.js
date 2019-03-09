import React from 'react';
import { Header, mapStateToProps, mapDispatchToProps } from './Header';
import { setCurrentUser, setFavorites } from '../../actions';
import { shallow } from 'enzyme';

describe('Header', () => {
  let wrapper;
  let loadingMock;
  let locationMock;
  let userMock;

  it('should match the correct snapshot when loading', () => {
    locationMock = { pathname: '/'};
    loadingMock = true;
    userMock = { name: 'Karin', id: '1' };

    wrapper = shallow(
      <Header
        loading={loadingMock}
        location={locationMock}
        user={userMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot when on the home page', () => {
    locationMock = { pathname: '/' };
    loadingMock = false;

    wrapper = shallow(
      <Header
        loading={loadingMock}
        location={locationMock}
        user={userMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot when on the stations page', () => {
    locationMock = { pathname: '/stations' };
    loadingMock = false;

    wrapper = shallow(
      <Header
        loading={loadingMock}
        location={locationMock}
        user={userMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot when on the my-stops page', () => {
    locationMock = { pathname: '/my-stops' };
    loadingMock = false;

    wrapper = shallow(
      <Header
        loading={loadingMock}
        location={locationMock}
        user={userMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot when on the login page', () => {
    locationMock = { pathname: '/login' };
    loadingMock = false;

    wrapper = shallow(
      <Header
        loading={loadingMock}
        location={locationMock}
        user={userMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('signOut', () => {
    let wrapper;
    let mockSetCurrentUser;
    let mockSetFavorites;

    beforeEach(() => {
      mockSetCurrentUser = jest.fn();
      mockSetFavorites = jest.fn();

      wrapper = shallow(
        <Header
          loading={loadingMock}
          location={locationMock}
          user={userMock}
          setCurrentUser={mockSetCurrentUser}
          setFavorites={mockSetFavorites}
        />
      )
    });

    it('should call setCurrentUser', () => {
      wrapper.find('#sign-out').simulate('click');
      expect(mockSetCurrentUser).toHaveBeenCalled();
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
        otherState: false,
      };
      const expected = {
        loading: true,
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

    it('should call dispatch when setFavorites is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setFavorites();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setFavorites();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});